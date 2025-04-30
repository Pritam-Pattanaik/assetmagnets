'use client';

import { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import dynamic from 'next/dynamic';

// Import motion from framer-motion with dynamic import to avoid hydration issues
const MotionDiv = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), { ssr: false });

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
    const [contactBranches, setContactBranches] = useState<any[]>([]);
    const [socialLinks, setSocialLinks] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);

    // Fetch contact information from the API
    useEffect(() => {
        async function fetchContactInfo() {
            try {
                const response = await fetch('/api/contact');

                if (!response.ok) {
                    throw new Error('Failed to fetch contact information');
                }

                const data = await response.json();

                if (data.branches && data.branches.length > 0) {
                    setContactBranches(data.branches);
                }

                if (data.socialMedia) {
                    const socialMediaData: Record<string, string> = {};

                    data.socialMedia.forEach((item: { platform: string; url: string }) => {
                        socialMediaData[item.platform] = item.url;
                    });

                    setSocialLinks(socialMediaData);
                }
            } catch (error) {
                console.error('Error fetching contact information:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchContactInfo();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);

        // Simulate form submission
        try {
            // In a real application, you would send the form data to your backend
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Transform contact branches into display format
    const contactInfo = isLoading ? [] : [
        ...contactBranches.map(branch => ({
            icon: <FaMapMarkerAlt className="text-2xl text-primary-600" />,
            title: branch.name,
            details: [
                branch.country,
                branch.address,
                branch.phone && `Phone: ${branch.phone}`,
                branch.email && `Email: ${branch.email}`,
                branch.officeHours && `Hours: ${branch.officeHours}`
            ].filter(Boolean)
        })),
    ];



    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
                    <div className="absolute -top-24 -right-48 w-72 h-72 rounded-full bg-primary-100 blur-3xl">
                        <MotionDiv
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            transition={{ duration: 1.2 }}
                        ></MotionDiv>
                    </div>
                    <div className="absolute -bottom-10 left-20 w-56 h-56 rounded-full bg-primary-200 blur-3xl">
                        <MotionDiv
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.25 }}
                            transition={{ duration: 1.2, delay: 0.3 }}
                        ></MotionDiv>
                    </div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-heading">
                            Get in <span className="text-primary-600">Touch</span>
                        </h1>
                        <p className="text-xl text-gray-600">
                            Have questions or need assistance? We're here to help. Contact our team today.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Information Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {contactInfo.map((info, index) => (
                            <MotionDiv
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                style={{
                                    padding: '1.5rem',
                                    backgroundColor: 'rgb(249 250 251)',
                                    borderRadius: '0.75rem',
                                    transition: 'all 300ms',
                                }}
                                whileHover={{
                                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
                                }}
                            >
                                <div className="flex items-center mb-4">
                                    {info.icon}
                                    <h3 className="text-xl font-bold ml-3">{info.title}</h3>
                                </div>
                                <div className="space-y-1">
                                    {info.details.map((detail, idx) => (
                                        <p key={idx} className="text-gray-600">{detail}</p>
                                    ))}
                                </div>
                            </MotionDiv>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">Send Us a Message</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Fill out the form below and our team will get back to you as soon as possible.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-8">
                                {submitStatus === 'success' && (
                                    <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
                                        Thank you for your message! We'll get back to you soon.
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
                                        There was an error sending your message. Please try again.
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                            <input
                                                type="text"
                                                id="company"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        ></textarea>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full md:w-auto px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center justify-center">
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Sending...
                                                </span>
                                            ) : (
                                                'Send Message'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">Our Location</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Visit our office or get in touch with us online. We're always happy to hear from you.
                        </p>
                    </div>

                    <div className="rounded-xl overflow-hidden shadow-lg h-96 bg-gray-200">
                        {/* In a real application, you would embed a Google Map or other map service here */}
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <p className="text-gray-500">Map Placeholder - In a real application, an interactive map would be displayed here</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}