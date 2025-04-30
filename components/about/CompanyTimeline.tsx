'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type TimelineEvent = {
  id: string;
  year: string;
  title: string;
  description: string;
};

export const CompanyTimeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Timeline data
  const timelineEvents: TimelineEvent[] = [
    {
      id: 'founding',
      year: '2010',
      title: 'Company Founded',
      description: 'ASSET-MAGNETS was founded with a vision to provide innovative IT solutions to businesses of all sizes.',
    },
    {
      id: 'expansion',
      year: '2013',
      title: 'First Major Client',
      description: 'Secured our first enterprise client and expanded our team to meet growing demand for our services.',
    },
    {
      id: 'cloud',
      year: '2015',
      title: 'Cloud Services Launch',
      description: 'Launched our comprehensive cloud solutions portfolio, helping businesses migrate to and optimize cloud infrastructure.',
    },
    {
      id: 'international',
      year: '2017',
      title: 'International Expansion',
      description: 'Opened our first international office and began serving clients across multiple countries.',
    },
    {
      id: 'security',
      year: '2019',
      title: 'Cybersecurity Division',
      description: 'Established a dedicated cybersecurity division to address the growing security challenges faced by our clients.',
    },
    {
      id: 'present',
      year: '2023',
      title: 'Digital Transformation Focus',
      description: 'Expanded our services to include comprehensive digital transformation solutions for enterprises.',
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div ref={ref} className="relative max-w-4xl mx-auto py-8">
      {/* Timeline Line */}
      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-primary-200"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {timelineEvents.map((event, index) => (
          <div key={event.id} className={`relative flex flex-col md:flex-row items-center md:items-start mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            <motion.div
              variants={itemVariants}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary-500 border-4 border-white shadow-md z-10"></div>

              {/* Content */}
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-primary-500">
                  <div className="inline-block px-4 py-2 bg-primary-100 text-primary-800 rounded-full font-bold mb-4">
                    {event.year}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};