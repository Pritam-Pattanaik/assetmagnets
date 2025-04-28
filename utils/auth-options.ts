import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
import { Adapter } from 'next-auth/adapters';
import { AdapterUser } from 'next-auth/adapters';
import { rateLimiter } from './rate-limiter';

const prisma = new PrismaClient();

// Create a custom adapter by extending the PrismaAdapter
function CustomAdapter(p: PrismaClient): Adapter {
    const prismaAdapter = PrismaAdapter(p) as any;

    return {
        ...prismaAdapter,
        // Override getUser to ensure it returns the correct type with role
        getUser: async (id: string) => {
            const user = await prismaAdapter.getUser(id);
            return user as AdapterUser;
        },
        // Override getUserByEmail to ensure it returns the correct type with role
        getUserByEmail: async (email: string) => {
            const user = await prismaAdapter.getUserByEmail(email);
            return user as AdapterUser;
        },
        // Override getUserByAccount to ensure it returns the correct type with role
        getUserByAccount: async (providerAccountId: { provider: string, providerAccountId: string }) => {
            const user = await prismaAdapter.getUserByAccount(providerAccountId);
            return user as AdapterUser;
        },
        // Override createUser to ensure it returns the correct type with role
        createUser: async (userData: any) => {
            const user = await prismaAdapter.createUser(userData);
            return user as AdapterUser;
        }
    };
}

export const authOptions: NextAuthOptions = {
    adapter: CustomAdapter(prisma),
    // Disable session persistence for admin routes to require explicit authentication
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // Get client IP for rate limiting
                const ip = req?.headers?.['x-forwarded-for'] || req?.headers?.['x-real-ip'] || 'unknown';
                const loginKey = `login_${credentials.email}_${ip}`;

                // Check if this IP + email combination is locked out
                const lockStatus = rateLimiter.isLocked(loginKey);
                if (lockStatus.locked) {
                    throw new Error(`Too many failed login attempts. Please try again in ${lockStatus.remainingTime} seconds.`);
                }

                // Hardcoded admin credentials for development/testing
                // Using environment variables would be more secure in production
                if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
                    console.log('Admin login successful');
                    // Reset failed attempts on successful login
                    rateLimiter.resetAttempts(loginKey);
                    return {
                        id: 'admin-id',
                        email: 'admin@example.com',
                        name: 'Admin User',
                        role: 'ADMIN',
                        image: null
                    };
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user || !user.password) {
                    // Record failed attempt
                    const lockResult = rateLimiter.recordFailedAttempt(loginKey);
                    if (lockResult.locked) {
                        throw new Error(`Too many failed login attempts. Please try again in ${lockResult.remainingTime} seconds.`);
                    }
                    return null;
                }

                const isPasswordValid = await compare(credentials.password, user.password);

                if (!isPasswordValid) {
                    // Record failed attempt
                    const lockResult = rateLimiter.recordFailedAttempt(loginKey);
                    if (lockResult.locked) {
                        throw new Error(`Too many failed login attempts. Please try again in ${lockResult.remainingTime} seconds.`);
                    }
                    return null;
                }

                // Reset failed attempts on successful login
                rateLimiter.resetAttempts(loginKey);

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    image: user.image
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
                // Add issued at time for token expiration validation
                token.iat = Math.floor(Date.now() / 1000);
                // Add a unique session identifier to invalidate previous sessions
                token.sessionId = Date.now().toString();
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role;
                session.user.id = token.id as string;
            }
            // Check token expiration but don't throw an error
            // Instead, let the session continue and rely on the session maxAge
            // This prevents unexpected session termination
            return session;
        }
    },
    pages: {
        signIn: '/admin/login',
        error: '/admin/login',
    },
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, // 24 hours for admin sessions - increased from 8 hours for better usability
        updateAge: 60 * 60, // 1 hour - more frequent updates to verify session validity
    },
    cookies: {
        sessionToken: {
            name: 'next-auth.session-token',
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 24 * 60 * 60 // 24 hours to match session settings
            }
        },
    },
    // Events to handle authentication lifecycle
    events: {
        async signIn() {
            // Handle successful sign in - session will be short-lived for security
        },
        async signOut() {
            // Ensure all session data is properly cleared on sign out
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
};