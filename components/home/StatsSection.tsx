'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaUsers, FaLaptopCode, FaGlobe, FaAward } from 'react-icons/fa';

type Stat = {
  id: string;
  title: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
  color: string;
};

export const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Stats data
  const stats: Stat[] = [
    {
      id: 'clients',
      title: 'Happy Clients',
      value: 200,
      suffix: '+',
      icon: <FaUsers className="text-3xl" />,
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'projects',
      title: 'Projects Completed',
      value: 500,
      suffix: '+',
      icon: <FaLaptopCode className="text-3xl" />,
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'countries',
      title: 'Countries Served',
      value: 30,
      suffix: '+',
      icon: <FaGlobe className="text-3xl" />,
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'awards',
      title: 'Awards Won',
      value: 25,
      suffix: '+',
      icon: <FaAward className="text-3xl" />,
      color: 'from-yellow-500 to-yellow-600',
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  // Counter animation
  const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
    return (
      <span className="text-4xl md:text-5xl font-bold">
        {isInView ? value : 0}{suffix}
      </span>
    );
  };

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-800 hover:bg-gray-750 transition-colors duration-300"
            >
              <div className={`p-4 rounded-full bg-gradient-to-r ${stat.color} mb-4`}>
                {stat.icon}
              </div>
              <Counter value={stat.value} suffix={stat.suffix} />
              <h3 className="text-xl font-medium mt-2 text-gray-300">{stat.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};