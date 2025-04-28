'use client';

import { Navbar } from './Navbar';
import { Footer } from './Footer';
import React from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}