'use client';

import { Navbar } from './Navbar';
import { Footer } from './Footer';
import React from 'react';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith('/admin');

    return (
        <>
            <Navbar />
            {children}
            {!isAdminPage && <Footer />}
        </>
    );
}