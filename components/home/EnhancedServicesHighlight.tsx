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
        <div className="py-8">
            <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                    <motion.div
                        key={service.id}
                        variants={animations.slideUp}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        whileHover={{
                            y: -10,
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                            borderColor: 'transparent',
                            transition: { duration: 0.3 }
                        }}
                        style={{
                            borderWidth: '1px',
                            borderColor: 'rgb(243, 244, 246)',
                            borderStyle: 'solid',
                            padding: '1.5rem',
                            transition: 'all 0.3s',
                            boxShadow: 'none',
                        }}

                    >
                        <div>
                            <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110">
                                <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${service.color} text-white`}>
                                    {service.icon}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                                {service.title}
                            </h3>

                            <p className="text-gray-600 mb-4">{service.description}</p>

                            <Link href={service.link} className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors duration-300">
                                Learn More
                                <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};