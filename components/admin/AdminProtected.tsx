'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

/**
 * Higher-order component that protects admin pages by checking authentication
 * and admin role on every render and navigation
 */
export default function AdminProtected({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        // Only redirect if explicitly unauthenticated to prevent infinite loading
        if (status === 'unauthenticated') {
            router.replace('/admin/login');
            return;
        }

        // Only redirect non-admin users when session is fully loaded
        if (status === 'authenticated' && session?.user) {
            const userRole = session.user.role;
            if (userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
                router.replace('/');
            }
        }
    }, [status, session, router]);

    // Show loading state while checking authentication
    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    // If not authenticated or not admin, don't render anything (will redirect)
    if (status === 'unauthenticated' || (status === 'authenticated' && session?.user?.role !== 'ADMIN' && session?.user?.role !== 'SUPER_ADMIN')) {
        return null;
    }

    // If authenticated and has admin role, render the children
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.div>
    );
}