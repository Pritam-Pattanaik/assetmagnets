'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaEye, FaBriefcase, FaFilter, FaSearch, FaUsers } from 'react-icons/fa';
import JobForm from './components/JobForm';
import Link from 'next/link';

// Types based on the Prisma schema
type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP' | 'REMOTE';

interface JobListing {
    id: string;
    title: string;
    slug?: string;
    description: string;
    requirements: string;
    responsibilities: string;
    location: string;
    type: JobType;
    salary: string | null;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count?: {
        applications: number;
    };
}

export default function JobOpeningsManager() {
    // State for job listings
    const [jobs, setJobs] = useState<JobListing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State for filters
    const [filters, setFilters] = useState({
        status: 'all', // 'all', 'active', 'inactive'
        type: 'all', // 'all', 'FULL_TIME', 'PART_TIME', etc.
        search: '',
    });

    // State for job being edited/viewed
    const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');

    // Fetch job listings
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                // Build query parameters based on filters
                const queryParams = new URLSearchParams();
                if (filters.status !== 'all') queryParams.append('status', filters.status);
                if (filters.type !== 'all') queryParams.append('type', filters.type);
                if (filters.search) queryParams.append('search', filters.search);

                const queryString = queryParams.toString();
                const url = `/api/admin/jobs${queryString ? `?${queryString}` : ''}`;

                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch job listings');
                const data = await response.json();
                setJobs(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                // Reset jobs to empty array on error
                setJobs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [filters]); // Re-fetch when filters change

    // No need to filter jobs locally since we're now filtering on the server side
    const filteredJobs = jobs;

    // Handle opening the modal for creating a new job
    const handleCreateJob = () => {
        setSelectedJob(null);
        setModalMode('create');
        setIsModalOpen(true);
    };

    // Handle opening the modal for editing a job
    const handleEditJob = (job: JobListing) => {
        setSelectedJob(job);
        setModalMode('edit');
        setIsModalOpen(true);
    };

    // Handle opening the modal for viewing a job
    const handleViewJob = (job: JobListing) => {
        setSelectedJob(job);
        setModalMode('view');
        setIsModalOpen(true);
    };

    // Handle job form submission (create or update)
    const handleJobSubmit = async (jobData: JobListing) => {
        try {
            setLoading(true);

            if (modalMode === 'create') {
                // Create new job
                const response = await fetch('/api/admin/jobs', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(jobData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to create job listing');
                }

                const newJob = await response.json();
                setJobs([newJob, ...jobs]);
            } else if (modalMode === 'edit' && selectedJob) {
                // Update existing job
                const response = await fetch(`/api/admin/jobs?id=${selectedJob.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(jobData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to update job listing');
                }

                const updatedJob = await response.json();
                setJobs(jobs.map(job => job.id === updatedJob.id ? updatedJob : job));
            }

            // Close modal after successful submission
            setIsModalOpen(false);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while saving the job');
        } finally {
            setLoading(false);
        }
    };

    // Handle modal close
    const handleModalClose = () => {
        setIsModalOpen(false);
        setError(null);
    };

    // Handle deleting a job
    const handleDeleteJob = async (jobId: string) => {
        if (window.confirm('Are you sure you want to delete this job listing? This action cannot be undone.')) {
            try {
                const response = await fetch(`/api/admin/jobs?id=${jobId}`, { method: 'DELETE' });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to delete job listing');
                }

                // Update local state
                setJobs(jobs.filter(job => job.id !== jobId));
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to delete job listing');
            }
        }
    };

    // Handle toggling job active status
    const handleToggleStatus = async (job: JobListing) => {
        try {
            const response = await fetch(`/api/admin/jobs?id=${job.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ active: !job.active })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update job status');
            }

            const updatedJob = await response.json();

            // Update local state
            setJobs(jobs.map(j => j.id === job.id ? updatedJob : j));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update job status');
        }
    };

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold text-gray-900">Job Openings Management</h1>
                <p className="text-gray-600">Create, edit, and manage job listings for your career page.</p>
            </motion.div>

            {/* Filters and Actions */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaSearch className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search jobs..."
                                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            />
                        </div>

                        <div className="flex space-x-4">
                            <select
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>

                            <select
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                value={filters.type}
                                onChange={(e) => setFilters({ ...filters, type: e.target.value as any })}
                            >
                                <option value="all">All Types</option>
                                <option value="FULL_TIME">Full Time</option>
                                <option value="PART_TIME">Part Time</option>
                                <option value="CONTRACT">Contract</option>
                                <option value="INTERNSHIP">Internship</option>
                                <option value="REMOTE">Remote</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={handleCreateJob}
                        className="btn-primary flex items-center space-x-2"
                    >
                        <FaPlus />
                        <span>Add New Job</span>
                    </button>
                </div>

                {/* Job Listings Table */}
                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>
                ) : filteredJobs.length === 0 ? (
                    <div className="text-center py-8">
                        <FaBriefcase className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No job listings found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {filters.search || filters.status !== 'all' || filters.type !== 'all'
                                ? 'Try adjusting your filters to see more results.'
                                : 'Get started by creating a new job listing.'}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredJobs.map((job) => (
                                    <tr key={job.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{job.title}</div>
                                            <div className="text-sm text-gray-500">{job.slug}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.location}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                {job.type.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {job._count?.applications || 0}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => handleToggleStatus(job)}
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${job.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                                            >
                                                {job.active ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={() => handleViewJob(job)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    title="View Details"
                                                >
                                                    <FaEye />
                                                </button>
                                                <button
                                                    onClick={() => handleEditJob(job)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title="Edit"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteJob(job.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Delete"
                                                >
                                                    <FaTrash />
                                                </button>
                                                <Link
                                                    href={`/admin/pages/career/jobs/applications/${job.id}`}
                                                    className="text-green-600 hover:text-green-900"
                                                    title="View Applications"
                                                >
                                                    <FaUsers />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal for Create/Edit/View Job */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-2 sm:my-4 mx-auto">
                        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 z-10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-900">
                                    {modalMode === 'create' ? 'Create New Job Listing' :
                                        modalMode === 'edit' ? 'Edit Job Listing' : 'Job Listing Details'}
                                </h3>
                                <button
                                    onClick={handleModalClose}
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
                            {error && (
                                <div className="mb-4 bg-red-50 text-red-600 p-4 rounded-md">{error}</div>
                            )}

                            {modalMode === 'view' ? (
                                // View mode - display job details
                                <div className="space-y-6 pb-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Job Title</h4>
                                        <p className="mt-1 text-lg font-medium">{selectedJob?.title}</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Location</h4>
                                            <p className="mt-1">{selectedJob?.location}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Job Type</h4>
                                            <p className="mt-1">{selectedJob?.type.replace('_', ' ')}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Salary Range</h4>
                                            <p className="mt-1">{selectedJob?.salary || 'Not specified'}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Status</h4>
                                        <p className="mt-1">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${selectedJob?.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {selectedJob?.active ? 'Active' : 'Inactive'}
                                            </span>
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Description</h4>
                                        <div className="mt-1 prose max-w-none">
                                            <p className="whitespace-pre-wrap">{selectedJob?.description}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Requirements</h4>
                                        <div className="mt-1 prose max-w-none">
                                            <p className="whitespace-pre-wrap">{selectedJob?.requirements}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Responsibilities</h4>
                                        <div className="mt-1 prose max-w-none">
                                            <p className="whitespace-pre-wrap">{selectedJob?.responsibilities}</p>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-200 flex justify-end">
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // Create/Edit mode - show form
                                <JobForm
                                    job={selectedJob || undefined}
                                    onSubmit={handleJobSubmit}
                                    onCancel={handleModalClose}
                                    isSubmitting={loading}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}