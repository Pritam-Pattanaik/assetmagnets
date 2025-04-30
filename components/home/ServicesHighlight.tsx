'use client';

import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCode, FaCloud, FaShieldAlt, FaChartLine, FaLaptopCode, FaMobileAlt } from 'react-icons/fa';

type Service = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
};

export const ServicesHighlight = () => {
  // Services data
  const services: Service[] = [
    {
      id: 'software-development',
      title: 'Software Development',
      description: 'Custom software solutions tailored to your business needs, from web applications to enterprise systems.',
      icon: <FaCode className="text-4xl text-primary-500" />,
      link: '/services#software-development',
    },
    {
      id: 'cloud-solutions',
      title: 'Cloud Solutions',
      description: 'Secure and scalable cloud infrastructure, migration services, and managed cloud solutions.',
      icon: <FaCloud className="text-4xl text-primary-500" />,
      link: '/services#cloud-solutions',
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions to protect your business from threats and ensure data integrity.',
      icon: <FaShieldAlt className="text-4xl text-primary-500" />,
      link: '/services#cybersecurity',
    },
    {
      id: 'digital-transformation',
      title: 'Digital Transformation',
      description: 'Strategic guidance and implementation to modernize your business processes and technology.',
      icon: <FaChartLine className="text-4xl text-primary-500" />,
      link: '/services#digital-transformation',
    },
    {
      id: 'it-consulting',
      title: 'IT Consulting',
      description: 'Expert advice on technology strategy, architecture, and implementation to drive business growth.',
      icon: <FaLaptopCode className="text-4xl text-primary-500" />,
      link: '/services#it-consulting',
    },
    {
      id: 'mobile-development',
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
      icon: <FaMobileAlt className="text-4xl text-primary-500" />,
      link: '/services#mobile-development',
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="card p-6 group">
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};