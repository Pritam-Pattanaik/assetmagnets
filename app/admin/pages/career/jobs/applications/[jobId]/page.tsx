'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaDownload, FaEnvelope, FaPhone, FaUser, FaCalendar, FaCheck, FaTimes, FaClock } from 'react-icons/fa';
import Link from 'next/link';

// Types based on the Prisma schema
type ApplicationStatus = 'RECEIVED' | 'REVIEWING' | 'INTERVIEW' | 'REJECTED' | 'ACCEPTED';

interface JobApplication {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    resumeUrl: string;
    coverLetter: string | null;
    position: string;
    status: ApplicationStatus;
    createdAt: Date;
    updatedAt: Date;
    jobListingId: string;
}

interface JobListing {
    id: string;
    title: string;
    slug: string;
}

export default function JobApplicationsPage({ params }: { params: { jobId: string } }) {
    const { jobId } = params;

    // State for job applications
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [jobDetails, setJobDetails] = useState<JobListing | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State for filters
    const [filters, setFilters] = useState({
        status: 'all', // 'all', 'RECEIVED', 'REVIEWING', etc.
        search: '',
    });

    // State for application being viewed
    const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch job applications
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true);
                // Build query parameters based on filters
                const queryParams = new URLSearchParams();
                queryParams.append('jobId', jobId);
                if (filters.status !== 'all') queryParams.append('status', filters.status);
                if (filters.search) queryParams.append('search', filters.search);

                const queryString = queryParams.toString();
                const url = `/api/admin/jobs/applications?${queryString}`;

                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch job applications');

                const data = await response.json();
                setApplications(data.applications);
                setJobDetails(data.jobDetails);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [jobId, filters.status, filters.search]);

    // Filter applications based on current filters
    const filteredApplications = applications.filter(application => {
        // Filter by status
        if (filters.status !== 'all' && application.status !== filters.status) return false;

        // Filter by search term
        if (filters.search && !(
            application.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            application.email.toLowerCase().includes(filters.search.toLowerCase())
        )) return false;

        return true;
    });

    // Handle viewing an application
    const handleViewApplication = (application: JobApplication) => {
        setSelectedApplication(application);
        setIsModalOpen(true);
    };

    // Handle updating application status
    const handleUpdateStatus = async (applicationId: string, newStatus: ApplicationStatus) => {
        try {
            // Make API call to update application status
            const response = await fetch(`/api/admin/applications/${applicationId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) {
                throw new Error('Failed to update application status');
            }

            // Update local state after successful API call
            setApplications(applications.map(app =>
                app.id === applicationId ? { ...app, status: newStatus } : app
            ));

            // If the modal is open and this is the selected application, update it too
            if (selectedApplication && selectedApplication.id === applicationId) {
                setSelectedApplication({ ...selectedApplication, status: newStatus });
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update application status');
        }
    };

    // Get status badge color
    const getStatusBadgeColor = (status: ApplicationStatus) => {
        switch (status) {
            case 'RECEIVED': return 'bg-blue-100 text-blue-800';
            case 'REVIEWING': return 'bg-yellow-100 text-yellow-800';
            case 'INTERVIEW': return 'bg-purple-100 text-purple-800';
            case 'REJECTED': return 'bg-red-100 text-red-800';
            case 'ACCEPTED': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Get status icon
    const getStatusIcon = (status: ApplicationStatus) => {
        switch (status) {
            case 'RECEIVED': return <FaClock className="mr-1" />;
            case 'REVIEWING': return <FaUser className="mr-1" />;
            case 'INTERVIEW': return <FaCalendar className="mr-1" />;
            case 'REJECTED': return <FaTimes className="mr-1" />;
            case 'ACCEPTED': return <FaCheck className="mr-1" />;
            default: return null;
        }
    };

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
                <div>
                    <Link href="/admin/pages/career/jobs" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-2">
                        <FaArrowLeft className="mr-2" /> Back to Job Listings
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Applications for {jobDetails?.title || 'Job Position'}
                    </h1>
                    <p className="text-gray-600">
                        Manage and review applications for this position.
                    </p>
                </div>
            </motion.div>

            {/* Filters */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        />

                        <select
                            className="block w-full sm:w-auto rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        >
                            <option value="all">All Status</option>
                            <option value="RECEIVED">Received</option>
                            <option value="REVIEWING">Reviewing</option>
                            <option value="INTERVIEW">Interview</option>
                            <option value="REJECTED">Rejected</option>
                            <option value="ACCEPTED">Accepted</option>
                        </select>
                    </div>
                </div>

                {/* Applications Table */}
                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>
                ) : filteredApplications.length === 0 ? (
                    <div className="text-center py-8">
                        <FaUser className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {filters.search || filters.status !== 'all'
                                ? 'Try adjusting your filters to see more results.'
                                : 'There are no applications for this job listing yet.'}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Applied</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredApplications.map((application) => (
                                    <tr key={application.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                    <FaUser className="text-gray-500" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{application.name}</div>
                                                    <div className="text-sm text-gray-500">{application.position}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 flex items-center">
                                                <FaEnvelope className="mr-2 text-gray-400" /> {application.email}
                                            </div>
                                            {application.phone && (
                                                <div className="text-sm text-gray-500 flex items-center">
                                                    <FaPhone className="mr-2 text-gray-400" /> {application.phone}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(application.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(application.status)}`}>
                                                {getStatusIcon(application.status)}
                                                {application.status.charAt(0) + application.status.slice(1).toLowerCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={() => handleViewApplication(application)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    title="View Details"
                                                >
                                                    View Details
                                                </button>
                                                <a
                                                    href={application.resumeUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-green-600 hover:text-green-900 flex items-center"
                                                    title="Download Resume"
                                                >
                                                    <FaDownload className="mr-1" /> Resume
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal for Viewing Application */}
            {isModalOpen && selectedApplication && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-900">
                                    Application Details
                                </h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <span className="sr-only">Close</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="px-6 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Applicant Name</h4>
                                    <p className="text-base">{selectedApplication.name}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Position</h4>
                                    <p className="text-base">{selectedApplication.position}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Email</h4>
                                    <p className="text-base">{selectedApplication.email}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Phone</h4>
                                    <p className="text-base">{selectedApplication.phone || 'Not provided'}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Date Applied</h4>
                                    <p className="text-base">{new Date(selectedApplication.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                                    <div className="flex items-center">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(selectedApplication.status)}`}>
                                            {getStatusIcon(selectedApplication.status)}
                                            {selectedApplication.status.charAt(0) + selectedApplication.status.slice(1).toLowerCase()}
                                        </span>
                                        <div className="ml-4">
                                            <select
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
                                                value={selectedApplication.status}
                                                onChange={(e) => handleUpdateStatus(selectedApplication.id, e.target.value as ApplicationStatus)}
                                            >
                                                <option value="RECEIVED">Received</option>
                                                <option value="REVIEWING">Reviewing</option>
                                                <option value="INTERVIEW">Interview</option>
                                                <option value="REJECTED">Rejected</option>
                                                <option value="ACCEPTED">Accepted</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-500 mb-1">Resume</h4>
                                <a
                                    href={selectedApplication.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                                >
                                    <FaDownload className="mr-2" /> Download Resume
                                </a>
                            </div>

                            {selectedApplication.coverLetter && (
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Cover Letter</h4>
                                    <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap">
                                        {selectedApplication.coverLetter}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}