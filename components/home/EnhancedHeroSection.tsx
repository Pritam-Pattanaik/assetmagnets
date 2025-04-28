'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { animations } from '@/utils/animations';

export const EnhancedHeroSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section ref={ref} className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-primary-100 opacity-30 blur-3xl"
                    variants={animations.float}
                    initial="initial"
                    animate="animate"
                    custom={{ amplitude: 15, duration: 6, delay: 0 }}
                />
                <motion.div
                    className="absolute top-2/3 -left-24 w-72 h-72 rounded-full bg-secondary-100 opacity-25 blur-3xl"
                    variants={animations.float}
                    initial="initial"
                    animate="animate"
                    custom={{ amplitude: 10, duration: 7, delay: 1.5 }}
                />
                <motion.div
                    className="absolute -bottom-20 right-1/4 w-64 h-64 rounded-full bg-primary-200 opacity-20 blur-3xl"
                    variants={animations.float}
                    initial="initial"
                    animate="animate"
                    custom={{ amplitude: 8, duration: 8, delay: 0.8 }}
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Hero Content */}
                    <motion.div
                        variants={animations.fadeInStagger}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="text-center lg:text-left"
                    >
                        <motion.div variants={animations.slideUp}>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight font-heading">
                                Innovative <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">IT Solutions</span> for Your Business
                            </h1>
                        </motion.div>

                        <motion.div variants={animations.slideUp}>
                            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                                Transforming businesses through cutting-edge technology and expert IT services. We help you navigate the digital landscape with confidence.
                            </p>
                        </motion.div>

                        <motion.div variants={animations.slideUp} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/contact" className="btn-primary text-center inline-block">
                                    Get Started
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/services" className="btn-outline text-center inline-block">
                                    Explore Services
                                </Link>
                            </motion.div>
                        </motion.div>

                        <motion.div variants={animations.slideUp} className="mt-12">
                            <div className="flex items-center justify-center lg:justify-start space-x-8">
                                <motion.div
                                    className="flex flex-col items-center lg:items-start"
                                    whileHover={{ y: -5 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">10+</span>
                                    <span className="text-gray-600 text-sm">Years Experience</span>
                                </motion.div>
                                <div className="h-12 w-px bg-gray-300"></div>
                                <motion.div
                                    className="flex flex-col items-center lg:items-start"
                                    whileHover={{ y: -5 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">200+</span>
                                    <span className="text-gray-600 text-sm">Projects Completed</span>
                                </motion.div>
                                <div className="h-12 w-px bg-gray-300"></div>
                                <motion.div
                                    className="flex flex-col items-center lg:items-start"
                                    whileHover={{ y: -5 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">50+</span>
                                    <span className="text-gray-600 text-sm">Tech Experts</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Hero Image */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={animations.scaleUp}
                        className="relative"
                    >
                        <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
                            {/* Replace with actual image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-2xl font-bold">
                                <motion.div
                                    className="text-center p-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                >
                                    <motion.div
                                        className="text-6xl mb-4"
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                    >
                                        🚀
                                    </motion.div>
                                    <div>IT Solutions for the Future</div>
                                    <div className="text-sm mt-4 opacity-80">(Replace with actual hero image)</div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Floating Elements - Repositioned to avoid overlap */}
                        <motion.div
                            className="absolute -top-6 -left-6 bg-white p-4 rounded-lg shadow-lg z-10"
                            variants={animations.float}
                            initial="initial"
                            animate="animate"
                            custom={{ amplitude: 8, duration: 3, delay: 0 }}
                            whileHover={{ scale: 1.1, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                        >
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">✓</div>
                                <div className="text-sm font-medium">99.9% Uptime</div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg z-10"
                            variants={animations.float}
                            initial="initial"
                            animate="animate"
                            custom={{ amplitude: 10, duration: 4, delay: 1.5 }}
                            whileHover={{ scale: 1.1, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                        >
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">🔒</div>
                                <div className="text-sm font-medium">Enterprise Security</div>
                            </div>
                        </motion.div>

                        {/* Lightning Fast floating element - completely repositioned to right side */}
                        <motion.div
                            className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg z-10"
                            animate={{
                                x: [0, 10, 0],
                                y: [0, -5, 0]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 4,
                                ease: "easeInOut"
                            }}
                            whileHover={{ scale: 1.1, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                        >
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">⚡</div>
                                <div className="text-sm font-medium">Lightning Fast</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                variants={animations.float}
                initial="initial"
                animate="animate"
                custom={{ amplitude: 10, duration: 1.5, delay: 0.5 }}
            >
                <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-500 mb-2">Scroll Down</span>
                    <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </motion.div>
        </section>
    );
};