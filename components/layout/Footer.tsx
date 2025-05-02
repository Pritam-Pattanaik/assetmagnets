'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Footer animation variants
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
    <div className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-4 text-primary-400">ASSET-MAGNETS</h3>
              <p className="mb-4 text-gray-400">
                Providing innovative IT solutions to businesses worldwide, helping them transform and thrive in the digital age.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                  <FaLinkedin size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                  <FaInstagram size={20} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-4 text-primary-400">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/career" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Services */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-4 text-primary-400">Our Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/services#software-development" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Software Development
                  </Link>
                </li>
                <li>
                  <Link href="/services#cloud-solutions" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Cloud Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/services#cybersecurity" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Cybersecurity
                  </Link>
                </li>
                <li>
                  <Link href="/services#digital-transformation" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Digital Transformation
                  </Link>
                </li>
                <li>
                  <Link href="/services#it-consulting" className="text-gray-400 hover:text-white transition-colors duration-300">
                    IT Consulting
                  </Link>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-4 text-primary-400">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MdLocationOn className="text-primary-400 mr-3 mt-1" size={20} />
                  <span className="text-gray-400">123 Tech Park, Silicon Valley, CA 94043, USA</span>
                </li>
                <li className="flex items-center">
                  <MdPhone className="text-primary-400 mr-3" size={20} />
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <MdEmail className="text-primary-400 mr-3" size={20} />
                  <span className="text-gray-400">info@assetmagnets.com</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} ASSET-MAGNETS. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-gray-500 hover:text-gray-400 text-sm transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-500 hover:text-gray-400 text-sm transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-500 hover:text-gray-400 text-sm transition-colors duration-300">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};