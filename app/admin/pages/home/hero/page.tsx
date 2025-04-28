'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSave } from 'react-icons/fa';

export default function HeroSectionEditor() {
    // Sample state for hero section content
    const [heroContent, setHeroContent] = useState({
        title: 'Maximize Your Investment Potential',
        subtitle: 'Strategic asset management solutions for growth-focused investors',
        buttonText: 'Get Started',
        buttonLink: '/contact',
        backgroundImage: '/images/hero-bg.jpg'
    });

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically save the data to your backend
        alert('Hero section content updated successfully!');
    };

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold text-gray-900">Edit Home Page Hero Section</h1>
                <p className="text-gray-600">Customize the main hero section that appears on your homepage.</p>
            </motion.div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Hero Title</label>
                        <input
                            type="text"
                            id="title"
                            value={heroContent.title}
                            onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">Hero Subtitle</label>
                        <textarea
                            id="subtitle"
                            rows={3}
                            value={heroContent.subtitle}
                            onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700">Button Text</label>
                            <input
                                type="text"
                                id="buttonText"
                                value={heroContent.buttonText}
                                onChange={(e) => setHeroContent({ ...heroContent, buttonText: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="buttonLink" className="block text-sm font-medium text-gray-700">Button Link</label>
                            <input
                                type="text"
                                id="buttonLink"
                                value={heroContent.buttonLink}
                                onChange={(e) => setHeroContent({ ...heroContent, buttonLink: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="backgroundImage" className="block text-sm font-medium text-gray-700">Background Image URL</label>
                        <input
                            type="text"
                            id="backgroundImage"
                            value={heroContent.backgroundImage}
                            onChange={(e) => setHeroContent({ ...heroContent, backgroundImage: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            <FaSave className="mr-2 -ml-1 h-5 w-5" />
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>

            {/* Preview Section */}
            <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Preview</h2>
                <div className="bg-gray-100 p-6 rounded-lg border border-gray-200">
                    <div
                        className="relative rounded-lg overflow-hidden bg-cover bg-center h-64 flex items-center justify-center"
                        style={{ backgroundImage: `url(${heroContent.backgroundImage})` }}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        <div className="relative text-center text-white p-6 max-w-2xl">
                            <h3 className="text-2xl font-bold mb-2">{heroContent.title}</h3>
                            <p className="mb-4">{heroContent.subtitle}</p>
                            <button className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                                {heroContent.buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}