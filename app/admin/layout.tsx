'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import AdminProtected from '@/components/admin/AdminProtected';
import { FaUsers, FaFileAlt, FaImage, FaCog, FaSignOutAlt, FaTachometerAlt, FaHome, FaInfoCircle, FaTools, FaBriefcase, FaEnvelope, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Inter, Poppins } from 'next/font/google';
import { Providers } from '../providers';
import '../globals.css';

// This is a custom layout for admin pages that completely overrides the root layout

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

// This layout will override the root layout for admin routes
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    // State for dropdown toggles and mobile menu
    const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
        home: false,
        about: false,
        services: false,
        career: false,
        contact: false
    });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Toggle dropdown function
    const toggleDropdown = (key: string) => {
        setOpenDropdowns(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const router = useRouter();
    const isLoginPage = pathname?.includes('/admin/login') || false;

    // If on login page, always render content without protection
    if (isLoginPage) {
        return (
            <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
                <body>
                    <Providers>
                        {children}
                    </Providers>
                </body>
            </html>
        );
    }

    // For all other admin pages, wrap with AdminProtected component
    return (
        <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
            <body>
                <Providers>
                    <AdminProtected>
                        <div className={`min-h-screen bg-gray-100 ${inter.variable} ${poppins.variable}`}>
                            <div className="flex h-screen overflow-hidden">
                                {/* Sidebar */}
                                <div className="hidden md:flex md:flex-shrink-0">
                                    <motion.div
                                        initial={{ x: -100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className="flex flex-col w-64 bg-gray-800 text-white">
                                            <div className="flex items-center justify-center h-16 bg-gray-900">
                                                <span className="text-xl font-bold">Admin Dashboard</span>
                                            </div>
                                            <div className="flex flex-col flex-grow overflow-y-auto">
                                                <nav className="flex-1 px-2 py-4 space-y-1">
                                                    <Link href="/admin/dashboard" className="flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
                                                        <FaTachometerAlt className="mr-3 h-5 w-5" />
                                                        Dashboard
                                                    </Link>

                                                    {/* Home Page Dropdown */}
                                                    <div className="space-y-1">
                                                        <button
                                                            onClick={() => toggleDropdown('home')}
                                                            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
                                                        >
                                                            <div className="flex items-center">
                                                                <FaHome className="mr-3 h-5 w-5" />
                                                                Home Page
                                                            </div>
                                                            {openDropdowns.home ? <FaChevronUp className="h-4 w-4" /> : <FaChevronDown className="h-4 w-4" />}
                                                        </button>

                                                        {openDropdowns.home && (
                                                            <div className="pl-10 space-y-1">
                                                                <Link href="/admin/pages/home/hero" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
                                                                    Hero Section
                                                                </Link>
                                                                <Link href="/admin/pages/home/services" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
                                                                    Services Highlight
                                                                </Link>
                                                                <Link href="/admin/pages/home/stats" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
                                                                    Stats Section
                                                                </Link>
                                                                <Link href="/admin/pages/home/testimonials" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
                                                                    Testimonials
                                                                </Link>
                                                                <Link href="/admin/pages/home/cta" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
                                                                    CTA Section
                                                                </Link>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* About Page Dropdown */}
                                                    <div className="space-y-1">
                                                        <button
                                                            onClick={() => toggleDropdown('about')}
                                                            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
                                                        >
                                                            <div className="flex items-center">
                                                                <FaInfoCircle className="mr-3 h-5 w-5" />
                                                                About Page
                                                            </div>
                                                            {openDropdowns.about ? <FaChevronUp className="h-4 w-4" /> : <FaChevronDown className="h-4 w-4" />}
                                                        </button>

                                                        {openDropdowns.about && (
                                                            <div className="pl-10 space-y-1">
                                                                <Link href="/admin/pages/about/company" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
                                                                    Company Info
                                                                </Link>
                                                                <Link href="/admin/pages/about/values" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
                                                                    Core Values
                                                                </Link>
                                                                <Link href="/admin/pages/about/team" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
                                                                    Team Profiles
                                                                </Link>
                                                                <Link href="/admin/pages/about/timeline" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
                                                                    Company Timeline
                                                                </Link>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Services Page Dropdown */}
                                                    <div className="space-y-1">
                                                        <button
                                                            onClick={() => toggleDropdown('services')}
                                                            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
                                                        >
                                                            <div className="flex items-center">
                                                                <FaTools className="mr-3 h-5 w-5" />
                                                                Services Page
                                                            </div>
                                                            {openDropdowns.services ? <FaChevronUp className="h-4 w-4" /> : <FaChevronDown className="h-4 w-4" />}
                                                        </button>

                                                        {openDropdowns.services && (
                                                            <div className="pl-10 space-y-1">
                                                                <Link href="/admin/pages/services/list" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
                                                                    Services List
                                                                </Link>
                                                                <Link href="/admin/pages/services/details" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
                                                                    Service Details
                                                                </Link>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Career Page Dropdown */}
                                                    <div className="space-y-1">
                                                        <button
                                                            onClick={() => toggleDropdown('career')}
                                                            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
                                                        >
                                                            <div className="flex items-center">
                                                                <FaBriefcase className="mr-3 h-5 w-5" />
                                                                Career Page
                                                            </div>
                                                            {openDropdowns.career ? <FaChevronUp className="h-4 w-4" /> : <FaChevronDown className="h-4 w-4" />}
                                                        </button>

                                                        {openDropdowns.career && (
                                                            <div className="pl-10 space-y-1">
                                                                <Link href="/admin/pages/career/openings" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
                                                                    Job Openings
                                                                </Link>
                                                                <Link href="/admin/pages/career/jobs" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
                                                                    Manage Jobs
                                                                </Link>
                                                                <Link href="/admin/pages/career/benefits" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
                                                                    Benefits
                                                                </Link>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Contact Page Dropdown */}
                                                    <div className="space-y-1">
                                                        <button
                                                            onClick={() => toggleDropdown('contact')}
                                                            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
                                                        >
                                                            <div className="flex items-center">
                                                                <FaEnvelope className="mr-3 h-5 w-5" />
                                                                Contact Page
                                                            </div>
                                                            {openDropdowns.contact ? <FaChevronUp className="h-4 w-4" /> : <FaChevronDown className="h-4 w-4" />}
                                                        </button>

                                                        {openDropdowns.contact && (
                                                            <div className="pl-10 space-y-1">
                                                                <Link href="/admin/pages/contact/info" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
                                                                    Contact Info
                                                                </Link>
                                                                <Link href="/admin/pages/contact/form" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
                                                                    Contact Form
                                                                </Link>
                                                                <Link href="/admin/pages/contact/map" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
                                                                    Map Settings
                                                                </Link>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <Link href="/admin/users" className="flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
                                                        <FaUsers className="mr-3 h-5 w-5" />
                                                        Users
                                                    </Link>
                                                    <Link href="/admin/media" className="flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
                                                        <FaImage className="mr-3 h-5 w-5" />
                                                        Media
                                                    </Link>
                                                    <Link href="/admin/settings" className="flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
                                                        <FaCog className="mr-3 h-5 w-5" />
                                                        Settings
                                                    </Link>
                                                </nav>
                                                <div className="p-4 mt-auto">
                                                    <button
                                                        onClick={() => router.push('/api/auth/signout')}
                                                        className="flex items-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                                                    >
                                                        <FaSignOutAlt className="mr-3 h-5 w-5" />
                                                        Sign Out
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Main content */}
                                <div className="flex flex-col flex-1 overflow-hidden">
                                    {/* Mobile header */}
                                    <div className="md:hidden bg-gray-800 text-white p-4 sticky top-0 z-30 h-16 flex items-center">
                                        <div className="flex items-center justify-between w-full">
                                            <span className="text-xl font-bold">Admin Dashboard</span>
                                            <button
                                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                                className="p-2 rounded-md hover:bg-gray-700"
                                            >
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Mobile menu */}
                                    {mobileMenuOpen && (
                                        <div className="md:hidden fixed inset-0 z-50 bg-gray-800 bg-opacity-90">
                                            <div className="flex justify-end p-4">
                                                <button
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="text-white p-2 rounded-md hover:bg-gray-700"
                                                >
                                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <nav className="px-4 py-2 space-y-2">
                                                <Link href="/admin/dashboard" className="flex items-center px-4 py-3 text-sm font-medium text-white rounded-md hover:bg-gray-700 transition-colors">
                                                    <FaTachometerAlt className="mr-3 h-5 w-5" />
                                                    Dashboard
                                                </Link>
                                                <Link href="/admin/users" className="flex items-center px-4 py-3 text-sm font-medium text-white rounded-md hover:bg-gray-700 transition-colors">
                                                    <FaUsers className="mr-3 h-5 w-5" />
                                                    Users
                                                </Link>
                                                <Link href="/admin/media" className="flex items-center px-4 py-3 text-sm font-medium text-white rounded-md hover:bg-gray-700 transition-colors">
                                                    <FaImage className="mr-3 h-5 w-5" />
                                                    Media
                                                </Link>
                                                <Link href="/admin/settings" className="flex items-center px-4 py-3 text-sm font-medium text-white rounded-md hover:bg-gray-700 transition-colors">
                                                    <FaCog className="mr-3 h-5 w-5" />
                                                    Settings
                                                </Link>
                                                <button
                                                    onClick={() => router.push('/api/auth/signout')}
                                                    className="flex items-center w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                                                >
                                                    <FaSignOutAlt className="mr-3 h-5 w-5" />
                                                    Sign Out
                                                </button>
                                            </nav>
                                        </div>
                                    )}

                                    {/* Content area */}
                                    <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100 pt-6 md:pt-6 mt-0 md:mt-0">
                                        {children}
                                    </main>
                                </div>
                            </div>
                        </div>
                    </AdminProtected>
                </Providers>
            </body>
        </html>
    );
}