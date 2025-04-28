'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useCallback, useState } from 'react';

/**
 * Hook to check if the current user is authenticated and has admin privileges
 * Redirects to login page if not authenticated or to homepage if not an admin
 */
export function useAdminProtected() {
    const { data: session, status, update } = useSession();
    const router = useRouter();
    const [lastValidated, setLastValidated] = useState(Date.now());

    // Function to validate session and check for expiration
    const validateSession = useCallback(async () => {
        try {
            // Force session refresh to check if it's still valid
            await update();
            setLastValidated(Date.now());
        } catch (error) {
            // If session update fails, redirect to login without forcing sign out
            // This allows the login page to handle the session state
            router.replace('/admin/login');
        }
    }, [update, router]);

    useEffect(() => {
        // Check authentication status
        if (status === 'unauthenticated') {
            router.replace('/admin/login');
            return;
        }

        // Check admin role when session is loaded
        if (status === 'authenticated') {
            const userRole = session?.user?.role;
            if (userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
                router.replace('/');
                return;
            }

            // Token age check removed to prevent automatic sign-out
            // Admin sessions will now persist until manually signed out
        }
    }, [status, session, router]);

    // Removed automatic session validation to prevent infinite loading issues
    // Session will still be validated through Next.js built-in mechanisms

    return { session, status, isAdmin: status === 'authenticated' && (session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPER_ADMIN') };
}

/**
 * Helper function to check if a user has admin privileges
 */
export function isAdminUser(session: any) {
    return session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPER_ADMIN';
}