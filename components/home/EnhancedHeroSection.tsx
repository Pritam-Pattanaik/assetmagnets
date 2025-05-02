'use client';

import { useRef } from 'react';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { animations } from '@/utils/animations';

export const EnhancedHeroSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section className="min-h-[80vh] h-auto flex items-center justify-center py-10 md:py-16 mt-8 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Hero Content */}
                    <div className="flex flex-col space-y-6">
                        <motion.div
                            variants={animations.fadeInStagger}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.h1
                                variants={animations.slideInLeft}
                                initial="hidden"
                                animate="visible"
                                style={{
                                    fontSize: 'calc(1.5rem + 0.9vw)',
                                    fontWeight: 'bold',
                                    color: 'rgb(17, 24, 39)',
                                    lineHeight: '1.2',
                                    fontFamily: 'var(--font-heading)'
                                }}
                            >
                                Innovative IT Solutions for <span className="text-primary-600">Modern Businesses</span>
                            </motion.h1>

                            <motion.p
                                variants={animations.slideInLeft}
                                initial="hidden"
                                animate="visible"
                                style={{
                                    fontSize: '1.25rem',
                                    color: 'rgb(75, 85, 99)',
                                    maxWidth: '32rem',
                                    marginTop: '1.5rem'
                                }}
                            >
                                We deliver cutting-edge technology services to help your business thrive in the digital landscape.
                            </motion.p>

                            <motion.div
                                variants={animations.slideInLeft}
                                initial="hidden"
                                animate="visible"
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '1rem',
                                    paddingTop: '1rem',
                                    marginTop: '1.5rem'
                                }}
                            >
                                <Link href="/contact" className="btn-primary">
                                    Get Started
                                </Link>
                                <Link href="/services" className="btn-outline">
                                    Our Services
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Hero Image/Visual */}
                    <div className="relative">
                        <motion.div
                            variants={animations.slideInRight}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="bg-gradient-to-tr from-primary-600 to-secondary-500 rounded-2xl p-8 text-white shadow-xl">
                                <h3 className="text-2xl font-bold mb-4">Enterprise-Grade Solutions</h3>
                                <p className="mb-6">Scalable, secure, and reliable technology infrastructure for businesses of all sizes.</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                                        <div className="text-xl font-bold">Cloud-Native</div>
                                        <p className="text-sm">Modern architecture</p>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                                        <div className="text-xl font-bold">AI-Powered</div>
                                        <p className="text-sm">Smart solutions</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Elements */}
                        <div className="absolute -top-4 -right-4 z-20">
                            {React.createElement(motion.div, {
                                animate: { y: [0, -10, 0] },
                                transition: { repeat: Infinity, duration: 3 },
                                style: {
                                    backgroundColor: '#8b5cf6', /* Using secondary-500 color directly */
                                    borderRadius: '9999px',
                                    padding: '1rem',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                                },
                                children: <div className="text-white font-bold">99.9% Uptime</div>
                            })}
                        </div>

                        <div className="absolute -bottom-4 -left-4 z-20">
                            {React.createElement(motion.div, {
                                animate: { y: [0, 10, 0] },
                                transition: { repeat: Infinity, duration: 4, delay: 1 },
                                style: {
                                    backgroundColor: '#0369a1', /* Using primary-700 color directly */
                                    borderRadius: '9999px',
                                    padding: '1rem',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                                },
                                children: <div className="text-white font-bold">Enterprise Security</div>
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 right-10 w-[50%] h-[50%] bg-primary-100 rounded-full opacity-50 blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-[40%] h-[40%] bg-secondary-100 rounded-full opacity-50 blur-3xl"></div>
            </div>
        </section>
    );
};