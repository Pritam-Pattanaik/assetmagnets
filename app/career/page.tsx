'use client';

import { useState, useEffect } from 'react';
import { FaBriefcase, FaGraduationCap, FaUsers, FaLaptopCode, FaHandshake, FaChartLine } from 'react-icons/fa';
import JobApplicationForm from './components/JobApplicationForm';

interface JobPosition {
    id: string;
    title: string;
    description: string;
    location: string;
    type: string;
    requirements: string[] | string;
    slug: string;
    department?: string;
    responsibilities?: string[] | string;
}

const benefits = [
    {
        icon: <FaBriefcase className="text-3xl text-primary-500" />,
        title: 'Competitive Salary',
        description: 'We offer competitive compensation packages that recognize your skills and experience.'
    },
    {
        icon: <FaGraduationCap className="text-3xl text-primary-500" />,
        title: 'Professional Development',
        description: 'Continuous learning opportunities with access to courses, conferences, and certifications.'
    },
    {
        icon: <FaUsers className="text-3xl text-primary-500" />,
        title: 'Collaborative Environment',
        description: 'Work with talented professionals in a supportive and collaborative atmosphere.'
    },
    {
        icon: <FaLaptopCode className="text-3xl text-primary-500" />,
        title: 'Remote Work Options',
        description: 'Flexible work arrangements including remote and hybrid options.'
    },
    {
        icon: <FaHandshake className="text-3xl text-primary-500" />,
        title: 'Work-Life Balance',
        description: 'We value your personal time and promote a healthy work-life balance.'
    },
    {
        icon: <FaChartLine className="text-3xl text-primary-500" />,
        title: 'Growth Opportunities',
        description: 'Clear career paths with opportunities for advancement and leadership roles.'
    },
];

export default function CareerPage() {
    // State for job listings
    const [openPositions, setOpenPositions] = useState<JobPosition[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State for job application modal
    const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<{
        id: string;
        title: string;
    } | null>(null);

    // Fetch job listings from API
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/jobs');

                if (!response.ok) {
                    throw new Error('Failed to fetch job listings');
                }

                const data = await response.json();
                setOpenPositions(data);
            } catch (err) {
                console.error('Error fetching job listings:', err);
                setError('Failed to load job openings. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    // Handle opening the application modal
    const handleApplyNow = (jobId: string, jobTitle: string) => {
        setSelectedJob({ id: jobId, title: jobTitle });
        setIsApplicationModalOpen(true);
    };

    // Handle closing the application modal
    const handleCloseModal = () => {
        setIsApplicationModalOpen(false);
        // Reset selected job after a short delay to allow for closing animation
        setTimeout(() => setSelectedJob(null), 300);
    };
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-100 opacity-50 blur-3xl"></div>
                    <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-primary-200 opacity-40 blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-heading">
                            Join Our <span className="text-primary-600">Team</span>
                        </h1>
                        <p className="text-xl text-gray-600">
                            Build your career with us and be part of a team that's transforming businesses through technology.
                        </p>
                    </div>
                </div>
            </section>

            {/* Why Join Us Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">Why Join Us</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            At ASSET-MAGNETS, we offer more than just a job. We provide an environment where you can grow, innovate, and make an impact.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
                                <div className="mb-4">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">Open Positions</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Explore our current job openings and find the perfect role for your skills and career goals.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <p className="text-red-500">{error}</p>
                        </div>
                    ) : openPositions.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No open positions available at this time. Please check back later.</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {openPositions.map((position) => (
                                <div key={position.id} id={position.slug} className="bg-white rounded-xl shadow-md overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                                            <h3 className="text-2xl font-bold text-gray-900">{position.title}</h3>
                                            <div className="mt-2 md:mt-0 flex flex-wrap gap-2">
                                                {position.department && (
                                                    <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">{position.department}</span>
                                                )}
                                                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">{position.location}</span>
                                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{position.type}</span>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 mb-6">{position.description}</p>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="text-lg font-semibold mb-3">Requirements</h4>
                                                <ul className="space-y-2">
                                                    {(Array.isArray(position.requirements) ? position.requirements : position.requirements.split('\n').filter(req => req.trim())).map((req, index) => (
                                                        <li key={index} className="flex items-start">
                                                            <span className="text-primary-600 mr-2">•</span>
                                                            <span className="text-gray-600">{req}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="text-lg font-semibold mb-3">Responsibilities</h4>
                                                <ul className="space-y-2">
                                                    {position.responsibilities ? (
                                                        (Array.isArray(position.responsibilities) ? position.responsibilities : position.responsibilities.split('\n').filter(resp => resp.trim())).map((resp, index) => (
                                                            <li key={index} className="flex items-start">
                                                                <span className="text-primary-600 mr-2">•</span>
                                                                <span className="text-gray-600">{resp}</span>
                                                            </li>
                                                        ))
                                                    ) : (
                                                        <li className="flex items-start">
                                                            <span className="text-primary-600 mr-2">•</span>
                                                            <span className="text-gray-600">Please contact us for more details about this role.</span>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <button
                                                onClick={() => handleApplyNow(position.id, position.title)}
                                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                                            >
                                                Apply Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary-600 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Don't See the Right Fit?</h2>
                        <p className="text-xl mb-8 text-white/90">
                            We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future opportunities.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a href="/contact" className="btn-white">
                                Contact Us
                            </a>
                            <a href="/about" className="btn-outline-white">
                                Learn More About Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Job Application Modal */}
            {
                isApplicationModalOpen && selectedJob && (
                    <JobApplicationForm
                        jobId={selectedJob.id}
                        jobTitle={selectedJob.title}
                        onClose={handleCloseModal}
                    />
                )
            }
        </main>
    );
}