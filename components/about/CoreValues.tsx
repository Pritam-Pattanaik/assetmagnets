'use client';

import { motion } from 'framer-motion';
import { FaLightbulb, FaHandshake, FaRocket, FaUserShield, FaChartLine, FaUsers } from 'react-icons/fa';

type CoreValue = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
};

export const CoreValues = (): JSX.Element => {
  // Core values data
  const values: CoreValue[] = [
    {
      id: 'innovation',
      title: 'Innovation',
      description: 'We constantly explore new technologies and approaches to deliver cutting-edge solutions.',
      icon: <FaLightbulb className="text-4xl" />,
      color: 'bg-yellow-500',
    },
    {
      id: 'integrity',
      title: 'Integrity',
      description: 'We operate with transparency, honesty, and ethical standards in all our interactions.',
      icon: <FaHandshake className="text-4xl" />,
      color: 'bg-blue-500',
    },
    {
      id: 'excellence',
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from code quality to client service.',
      icon: <FaRocket className="text-4xl" />,
      color: 'bg-purple-500',
    },
    {
      id: 'security',
      title: 'Security',
      description: 'We prioritize the security and privacy of our clients\' data and systems.',
      icon: <FaUserShield className="text-4xl" />,
      color: 'bg-red-500',
    },
    {
      id: 'results',
      title: 'Results-Driven',
      description: 'We focus on delivering measurable business outcomes that drive growth and success.',
      icon: <FaChartLine className="text-4xl" />,
      color: 'bg-green-500',
    },
    {
      id: 'collaboration',
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and partnership with our clients and each other.',
      icon: <FaUsers className="text-4xl" />,
      color: 'bg-pink-500',
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

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {values.map((value) => (
        <motion.div
          key={value.id}
          variants={itemVariants}
          whileHover="hover"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-primary-500"
        >
          <div className="flex items-center mb-4">
            <motion.div
              variants={iconVariants}
              className={`p-3 rounded-full ${value.color} text-white mr-4`}
            >
              {value.icon}
            </motion.div>
            <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
          </div>
          <p className="text-gray-600">{value.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};