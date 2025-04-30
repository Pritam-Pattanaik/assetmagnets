'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
    <section className="relative min-h-screen h-auto py-20 bg-gradient-to-br from-gray-50 to-gray-100 overflow-visible">
      {/* Background Elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-100 opacity-50 blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-80 h-80 rounded-full bg-secondary-100 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-64 h-64 rounded-full bg-primary-200 opacity-40 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight font-heading">
                  Innovative <span className="text-primary-600">IT Solutions</span> for Your Business
                </h1>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                Transforming businesses through cutting-edge technology and expert IT services. We help you navigate the digital landscape with confidence.
              </p>
            </motion.div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.div variants={itemVariants}>
                <Link href="/contact" className="btn-primary text-center">
                  Get Started
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link href="/services" className="btn-outline text-center">
                  Explore Services
                </Link>
              </motion.div>
            </div>

            <div className="mt-12">
              <motion.div variants={itemVariants}>
                <div className="flex items-center justify-center lg:justify-start space-x-8">
                  <div className="flex flex-col items-center lg:items-start">
                    <span className="text-3xl font-bold text-primary-600">10+</span>
                    <span className="text-gray-600 text-sm">Years Experience</span>
                  </div>
                  <div className="h-12 w-px bg-gray-300"></div>
                  <div className="flex flex-col items-center lg:items-start">
                    <span className="text-3xl font-bold text-primary-600">200+</span>
                    <span className="text-gray-600 text-sm">Projects Completed</span>
                  </div>
                  <div className="h-12 w-px bg-gray-300"></div>
                  <div className="flex flex-col items-center lg:items-start">
                    <span className="text-3xl font-bold text-primary-600">50+</span>
                    <span className="text-gray-600 text-sm">Tech Experts</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative h-[400px] md:h-[500px] w-full rounded-lg overflow-hidden shadow-2xl">
                {/* Replace with actual image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-2xl font-bold">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🚀</div>
                    <div>IT Solutions for the Future</div>
                    <div className="text-sm mt-4 opacity-80">(Replace with actual hero image)</div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg z-10">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">✓</div>
                    <div className="text-sm font-medium">99.9% Uptime</div>
                  </div>
                </motion.div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg z-10">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">🔒</div>
                    <div className="text-sm font-medium">Enterprise Security</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};