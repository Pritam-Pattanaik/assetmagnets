'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

type TeamMember = {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
};

export const TeamProfiles = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Team members data
  const teamMembers: TeamMember[] = [
    {
      id: 'john-doe',
      name: 'John Doe',
      position: 'CEO & Founder',
      bio: 'With over 20 years of experience in IT and business leadership, John founded ASSET-MAGNETS with a vision to help businesses leverage technology for growth.',
      image: '/images/team/team-1.svg', // Placeholder
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'john@example.com',
      },
    },
    {
      id: 'jane-smith',
      name: 'Jane Smith',
      position: 'CTO',
      bio: 'Jane leads our technical strategy and innovation initiatives, bringing 15+ years of experience in software architecture and cloud solutions.',
      image: '/images/team/team-2.svg', // Placeholder
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'jane@example.com',
      },
    },
    {
      id: 'michael-brown',
      name: 'Michael Brown',
      position: 'Head of Cybersecurity',
      bio: 'Michael ensures our clients\' systems and data remain secure with his extensive background in cybersecurity and risk management.',
      image: '/images/team/team-3.svg', // Placeholder
      social: {
        linkedin: '#',
        email: 'michael@example.com',
      },
    },
    {
      id: 'sarah-johnson',
      name: 'Sarah Johnson',
      position: 'Director of Client Services',
      bio: 'Sarah oversees our client relationships and ensures we deliver exceptional service and support to all our clients.',
      image: '/images/team/team-4.svg', // Placeholder
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'sarah@example.com',
      },
    },
    {
      id: 'david-wilson',
      name: 'David Wilson',
      position: 'Lead Software Architect',
      bio: 'David designs and implements robust software solutions that address complex business challenges for our clients.',
      image: '/images/team/team-5.svg', // Placeholder
      social: {
        linkedin: '#',
        email: 'david@example.com',
      },
    },
    {
      id: 'emily-chen',
      name: 'Emily Chen',
      position: 'Cloud Solutions Expert',
      bio: 'Emily specializes in cloud migration and optimization, helping businesses leverage the full potential of cloud technologies.',
      image: '/images/team/team-6.svg', // Placeholder
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'emily@example.com',
      },
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="group"
            onMouseEnter={() => setActiveId(member.id)}
            onMouseLeave={() => setActiveId(null)}
          >
            <motion.div
              variants={itemVariants}
              style={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                transition: 'box-shadow 0.3s ease'
              }}
            >
              {/* Team Member Image */}
              <div className="relative h-64 bg-gray-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-6xl font-bold">
                  {member.name.charAt(0)}
                </div>
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: '100%', height: '100%', position: 'relative' }}
                >
                  {/* Actual image would go here */}
                </motion.div>

                {/* Social Icons Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} className="text-white hover:text-primary-400 transition-colors duration-300">
                        <FaLinkedin size={24} />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} className="text-white hover:text-primary-400 transition-colors duration-300">
                        <FaTwitter size={24} />
                      </a>
                    )}
                    {member.social.email && (
                      <a href={`mailto:${member.social.email}`} className="text-white hover:text-primary-400 transition-colors duration-300">
                        <FaEnvelope size={24} />
                      </a>
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Team Member Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-3">{member.position}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};