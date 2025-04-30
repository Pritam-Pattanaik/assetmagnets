'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type Testimonial = {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  image: string;
};

export const TestimonialsCarousel = () => {
  // Testimonials data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'CTO',
      company: 'TechGrowth Inc.',
      content: "Asset-Magnets transformed our IT infrastructure completely. Their team's expertise in cloud solutions helped us scale our operations efficiently while reducing costs by 30%.",
      image: '/images/testimonials/testimonial-1.svg', // Placeholder
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'CEO',
      company: 'Innovate Solutions',
      content: 'The cybersecurity solutions provided by Asset-Magnets have been instrumental in protecting our sensitive data. Their proactive approach to security has prevented several potential breaches.',
      image: '/images/testimonials/testimonial-2.svg', // Placeholder
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'Director of Operations',
      company: 'Global Enterprises',
      content: 'Working with Asset-Magnets on our digital transformation journey has been exceptional. Their team understood our business needs and delivered solutions that increased our productivity by 40%.',
      image: '/images/testimonials/testimonial-3.svg', // Placeholder
    },
    {
      id: 4,
      name: 'David Wilson',
      position: 'IT Manager',
      company: 'Retail Solutions Co.',
      content: 'The custom software developed by Asset-Magnets has streamlined our inventory management process. Their ongoing support and maintenance have been outstanding.',
      image: '/images/testimonials/testimonial-4.svg', // Placeholder
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Handle autoplay
  useEffect(() => {
    if (isAutoplay) {
      autoplayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isAutoplay, currentIndex]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setIsAutoplay(false);
  const handleMouseLeave = () => setIsAutoplay(true);

  // Navigation functions
  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  return (
    <div
      className="relative max-w-4xl mx-auto py-8"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Testimonial Carousel */}
      <div className="relative overflow-hidden rounded-xl bg-white shadow-lg border border-gray-100">
        <AnimatePresence initial={false} custom={direction}>
          <div className="p-8 md:p-12">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Testimonial Image */}
                <div className="w-24 h-24 md:w-32 md:h-32 relative rounded-full overflow-hidden border-4 border-primary-100 flex-shrink-0 mx-auto md:mx-0 shadow-md">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-4xl">
                    {testimonials[currentIndex].name.charAt(0)}
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="flex-1">
                  <FaQuoteLeft className="text-primary-200 text-4xl mb-4" />
                  <p className="text-gray-700 italic mb-6 text-lg">
                    {testimonials[currentIndex].content}
                  </p>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900">{testimonials[currentIndex].name}</span>
                    <span className="text-primary-600">
                      {testimonials[currentIndex].position}, {testimonials[currentIndex].company}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-white shadow-md hover:bg-primary-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Previous testimonial"
        >
          <FaChevronLeft className="text-primary-600" />
        </button>

        {/* Indicators */}
        <div className="flex items-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-primary-600 w-6' : 'bg-gray-300'}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-white shadow-md hover:bg-primary-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Next testimonial"
        >
          <FaChevronRight className="text-primary-600" />
        </button>
      </div>
    </div>
  );
};