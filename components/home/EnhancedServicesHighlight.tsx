'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { FaCode, FaCloud, FaShieldAlt, FaChartLine, FaLaptopCode, FaMobileAlt } from 'react-icons/fa';
import { animations } from '@/utils/animations';

type Service = {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    link: string;
    color: string;
};

export const EnhancedServicesHighlight = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    // Services data with added color gradients
    const services: Service[] = [
        {
            id: 'software-development',
            title: 'Software Development',
            description: 'Custom software solutions tailored to your business needs, from web applications to enterprise systems.',
            icon: <FaCode className="text-4xl text-white" />,
            link: '/services#software-development',
            color: 'from-blue-500 to-blue-600',
        },
        {
            id: 'cloud-solutions',
            title: 'Cloud Solutions',
            description: 'Secure and scalable cloud infrastructure, migration services, and managed cloud solutions.',
            icon: <FaCloud className="text-4xl text-white" />,
            link: '/services#cloud-solutions',
            color: 'from-pink-500 to-pink-600',
        },
        {
            id: 'cybersecurity',
            title: 'Cybersecurity',
            description: 'Comprehensive security solutions to protect your business from threats and ensure data integrity.',
            icon: <FaShieldAlt className="text-4xl text-white" />,
            link: '/services#cybersecurity',
            color: 'from-green-500 to-green-600',
        },
        {
            id: 'digital-transformation',
            title: 'Digital Transformation',
            description: 'Strategic guidance and implementation to modernize your business processes and technology.',
            icon: <FaChartLine className="text-4xl text-white" />,
            link: '/services#digital-transformation',
            color: 'from-purple-500 to-purple-600',
        },
        {
            id: 'it-consulting',
            title: 'IT Consulting',
            description: 'Expert advice on technology strategy, architecture, and implementation to drive business growth.',
            icon: <FaLaptopCode className="text-4xl text-white" />,
            link: '/services#it-consulting',
            color: 'from-yellow-500 to-yellow-600',
        },
        {
            id: 'mobile-development',
            title: 'Mobile Development',
            description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
            icon: <FaMobileAlt className="text-4xl text-white" />,
            link: '/services#mobile-development',
            color: 'from-red-500 to-red-600',
        },
    ];

    return (
        <div ref={ref} className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <motion.div
                    variants={animations.staggeredCards}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="card p-6 group border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300"
                        >
                            <motion.div
                                variants={animations.slideUp}
                                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            >
                                <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110">
                                    <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${service.color} text-white`}>
                                        {service.icon}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                                    {service.title}
                                </h3>

                                <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300">
                                    {service.description}
                                </p>

                                <motion.div
                                    whileHover={{ x: 5 }}
                                    transition={{ type: 'spring', stiffness: 400 }}
                                >
                                    <Link
                                        href={service.link}
                                        className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors duration-300"
                                    >
                                        Learn More
                                        <svg
                                            className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            ></path>
                                        </svg>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};