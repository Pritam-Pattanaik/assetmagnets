import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
// Import Script from next/script is handled in a client component

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

// Script component is already imported at the top

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Script tag moved to a client component to handle event handlers properly */}
      </head>
      <body>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}