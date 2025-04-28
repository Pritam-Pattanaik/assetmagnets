'use client';

import { Variants } from 'framer-motion';

// Shared animation variants for consistent animations across components
export const animations = {
    // Fade in animation with staggered children
    fadeInStagger: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    } as Variants,

    // Fade in animation for individual items
    fadeIn: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
            },
        },
    } as Variants,

    // Slide up animation for individual items
    slideUp: {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                duration: 0.6,
            },
        },
    } as Variants,

    // Slide in from left animation
    slideInLeft: {
        hidden: { x: -60, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                duration: 0.6,
            },
        },
    } as Variants,

    // Slide in from right animation
    slideInRight: {
        hidden: { x: 60, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                duration: 0.6,
            },
        },
    } as Variants,

    // Scale up animation
    scaleUp: {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                duration: 0.6,
            },
        },
    } as Variants,

    // Staggered card animations for grids
    staggeredCards: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    } as Variants,

    // Card hover animations
    cardHover: {
        rest: { scale: 1, y: 0, transition: { duration: 0.3, type: 'tween', ease: 'easeOut' } },
        hover: { scale: 1.05, y: -10, transition: { duration: 0.3, type: 'tween', ease: 'easeOut' } },
    } as Variants,

    // Button hover animations
    buttonHover: {
        rest: { scale: 1, transition: { duration: 0.2 } },
        hover: { scale: 1.05, transition: { duration: 0.2 } },
    } as Variants,

    // Carousel slide animations
    carouselSlide: (direction: number) => ({
        enter: { x: direction > 0 ? 1000 : -1000, opacity: 0 },
        center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] } },
        exit: { x: direction > 0 ? -1000 : 1000, opacity: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] } },
    }),

    // Floating animation for decorative elements
    float: {
        initial: { y: 0 },
        animate: (custom = { amplitude: 10, duration: 5, delay: 0 }) => {
            // Extract parameters with defaults
            const amplitude = custom.amplitude || 10;
            const duration = custom.duration || 5;
            const delay = custom.delay || 0;

            return {
                y: [-amplitude, amplitude, -amplitude],
                transition: {
                    repeat: Infinity,
                    duration: duration,
                    delay: delay,
                    ease: 'easeInOut'
                }
            };
        },
    } as Variants,

    // Pulse animation for attention-grabbing elements
    pulse: {
        initial: { scale: 1 },
        animate: { scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' } },
    } as Variants,
};