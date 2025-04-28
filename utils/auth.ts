import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/auth-options';
import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';

/**
 * Get the current session on the server side
 */
export async function getSession() {
    return await getServerSession(authOptions);
}

/**
 * Check if the current user is authenticated on the server side
 * Redirects to login page if not authenticated
 */
export async function requireAuth() {
    const session = await getSession();

    if (!session?.user) {
        redirect('/admin/login');
    }

    return session;
}

/**
 * Check if the current user has the required role on the server side
 * Redirects to homepage if the user doesn't have the required role
 * @param allowedRoles - Array of roles that are allowed to access the resource
 */
export async function requireRole(allowedRoles: Role[]) {
    const session = await requireAuth();

    if (!session?.user?.role || !allowedRoles.includes(session.user.role)) {
        redirect('/');
    }

    return session;
}

/**
 * Check if the current user is an admin on the server side
 * Redirects to homepage if the user is not an admin
 */
export async function requireAdmin() {
    return requireRole(['ADMIN', 'SUPER_ADMIN'] as Role[]);
}

/**
 * Helper function to check if a user has admin privileges
 * @param role - The user's role
 */
export function isAdmin(role?: Role | null) {
    return role === 'ADMIN' || role === 'SUPER_ADMIN';
}