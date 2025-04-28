import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define public paths that don't require authentication
    const isPublicPath = path === '/admin/login';

    // For admin login page, don't automatically clear cookies
    // This allows existing valid sessions to be maintained
    if (path === '/admin/login') {
        // Check if there's a valid token before deciding to clear cookies
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });

        // If there's no token or the URL has a 'logout' parameter, clear cookies
        if (!token || request.nextUrl.searchParams.has('logout')) {
            const response = NextResponse.next();
            response.cookies.delete('next-auth.session-token');
            response.cookies.delete('next-auth.csrf-token');
            return response;
        }

        // If there's a valid token, allow access to login page without clearing cookies
        // This helps when redirected to login page with a valid session
        return NextResponse.next();
    }

    // Check if the path is an admin path
    const isAdminPath = path.startsWith('/admin');

    // Get the token
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    // Check token expiration
    if (token && token.iat) {
        const issuedAt = token.iat as number;
        const now = Math.floor(Date.now() / 1000);
        const tokenAge = now - issuedAt;

        // If token is older than 30 days, invalidate it
        if (tokenAge > 30 * 24 * 60 * 60) {
            // Token has expired, redirect to login
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // Redirect logic
    if (isPublicPath) {
        // Always allow access to login page without redirecting
        // This ensures users can always access the login page to start a new session
        return NextResponse.next();
    }

    // For admin paths, check if user is authenticated and has admin role
    if (isAdminPath) {
        if (!token) {
            // Redirect to login if not authenticated
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // Check if user has admin role
        if (token.role !== 'ADMIN' && token.role !== 'SUPER_ADMIN') {
            // Redirect to homepage if not an admin
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/admin/:path*',
        '/api/admin/:path*',
        '/api/auth/:path*',
    ],
};