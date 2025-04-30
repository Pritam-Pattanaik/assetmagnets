'use client';

import { Providers } from '@/app/providers';
import ClientLayout from './ClientLayout';
import React from 'react';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <ClientLayout>
                {children}
            </ClientLayout>
        </Providers>
    );
}