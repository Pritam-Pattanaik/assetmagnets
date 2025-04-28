import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import ClientWrapper from '@/components/layout/ClientWrapper';
import React from 'react';

// Font configuration
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

// Metadata for SEO
export const metadata: Metadata = {
  title: 'ASSET-MAGNETS | Professional IT Services',
  description: 'ASSET-MAGNETS provides professional IT services including software development, cloud solutions, cybersecurity, and digital transformation.',
  keywords: 'IT services, software development, cloud solutions, cybersecurity, digital transformation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <ClientWrapper children={children}></ClientWrapper>
      </body>
    </html>
  );
}