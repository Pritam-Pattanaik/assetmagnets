'use client';

import { useState, useEffect } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';

// Types based on the Prisma schema
type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP' | 'REMOTE';

interface JobListing {
    id?: string;
    title: string;
    slug?: string;
    description: string;
    requirements: string;
    responsibilities: string;
    location: string;
    type: JobType;
    salary: string | null;
    active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface JobFormProps {
    job?: JobListing;
    onSubmit: (jobData: JobListing) => void;
    onCancel: () => void;
    isSubmitting?: boolean;
}

export default function JobForm({ job, onSubmit, onCancel, isSubmitting = false }: JobFormProps) {
    // Initialize form state with job data or defaults
    const [formData, setFormData] = useState<JobListing>({
        title: '',
        description: '',
        requirements: '',
        responsibilities: '',
        location: '',
        type: 'FULL_TIME',
        salary: '',
        active: true,
        ...job
    });

    // Form validation state
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Update form data when job prop changes
    useEffect(() => {
        if (job) {
            setFormData({
                ...job,
                // Ensure salary is a string for the form
                salary: job.salary || ''
            });
        }
    }, [job]);

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error for this field if it exists
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    // Handle checkbox changes
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    // Validate form before submission
    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        // Required fields
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.requirements.trim()) newErrors.requirements = 'Requirements are required';
        if (!formData.responsibilities.trim()) newErrors.responsibilities = 'Responsibilities are required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (!formData.type) newErrors.type = 'Job type is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title*</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${errors.title ? 'border-red-300' : 'border-gray-300'}`}
                        placeholder="e.g. Senior Software Engineer"
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                {/* Location */}
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location*</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${errors.location ? 'border-red-300' : 'border-gray-300'}`}
                        placeholder="e.g. Remote / Hybrid / New York, NY"
                    />
                    {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Job Type */}
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Job Type*</label>
                    <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${errors.type ? 'border-red-300' : 'border-gray-300'}`}
                    >
                        <option value="FULL_TIME">Full Time</option>
                        <option value="PART_TIME">Part Time</option>
                        <option value="CONTRACT">Contract</option>
                        <option value="INTERNSHIP">Internship</option>
                        <option value="REMOTE">Remote</option>
                    </select>
                    {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                </div>

                {/* Salary Range */}
                <div>
                    <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary Range (Optional)</label>
                    <input
                        type="text"
                        id="salary"
                        name="salary"
                        value={formData.salary || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        placeholder="e.g. $80,000 - $100,000"
                    />
                </div>

                {/* Active Status */}
                <div className="flex items-center h-full pt-6">
                    <input
                        type="checkbox"
                        id="active"
                        name="active"
                        checked={formData.active}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="active" className="ml-2 block text-sm text-gray-700">
                        Active (visible on career page)
                    </label>
                </div>
            </div>

            {/* Job Description */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description*</label>
                <textarea
                    id="description"
                    name="description"
                    rows={6}
                    value={formData.description}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${errors.description ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="Describe the job role, responsibilities, and what the candidate will be doing..."
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            {/* Job Requirements */}
            <div>
                <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">Job Requirements*</label>
                <textarea
                    id="requirements"
                    name="requirements"
                    rows={6}
                    value={formData.requirements}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${errors.requirements ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="List the skills, qualifications, and experience required for this position..."
                />
                <p className="mt-1 text-xs text-gray-500">Tip: Use line breaks to separate individual requirements for better readability.</p>
                {errors.requirements && <p className="mt-1 text-sm text-red-600">{errors.requirements}</p>}
            </div>

            {/* Job Responsibilities */}
            <div>
                <label htmlFor="responsibilities" className="block text-sm font-medium text-gray-700">Job Responsibilities*</label>
                <textarea
                    id="responsibilities"
                    name="responsibilities"
                    rows={6}
                    value={formData.responsibilities}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${errors.responsibilities ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="List the key responsibilities and duties for this position..."
                />
                <p className="mt-1 text-xs text-gray-500">Tip: Use line breaks to separate individual responsibilities for better readability.</p>
                {errors.responsibilities && <p className="mt-1 text-sm text-red-600">{errors.responsibilities}</p>}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 mt-4 border-t border-gray-200">
                <button
                    type="button"
                    onClick={onCancel}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    disabled={isSubmitting}
                >
                    <FaTimes className="mr-2 -ml-1 h-4 w-4" />
                    Cancel
                </button>
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    disabled={isSubmitting}
                >
                    <FaSave className="mr-2 -ml-1 h-4 w-4" />
                    {isSubmitting ? 'Saving...' : job?.id ? 'Update Job' : 'Create Job'}
                </button>
            </div>
        </form>
    );
}