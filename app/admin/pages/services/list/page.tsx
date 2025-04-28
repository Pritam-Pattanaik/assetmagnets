'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaEye, FaTools, FaFilter, FaSearch, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import Link from 'next/link';
import { useAdminProtected } from '@/utils/client-auth';

// Types based on the Prisma schema
interface Service {
    id: string;
    title: string;
    slug: string;
    description: string;
    icon: string;
    color: string;
    details: string[];
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export default function ServiceListManager() {
    // Use the admin protection hook to ensure only admins can access this page
    const { session, status, isAdmin } = useAdminProtected();

    // State for services
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State for filters
    const [filters, setFilters] = useState({
        status: 'all', // 'all', 'active', 'inactive'
        search: '',
    });

    // State for service being edited/viewed
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');

    // State for form data
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        icon: '',
        color: 'from-blue-500 to-blue-600',
        details: [''],
        active: true,
    });

    // Fetch services
    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                // Build query parameters based on filters
                const queryParams = new URLSearchParams();
                if (filters.status === 'active') queryParams.append('active', 'true');
                if (filters.status === 'inactive') queryParams.append('active', 'false');

                const queryString = queryParams.toString();
                const url = `/api/services${queryString ? `?${queryString}` : ''}`;

                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch services');
                const data = await response.json();
                setServices(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                // Reset services to empty array on error
                setServices([]);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [filters]); // Re-fetch when filters change

    // Filter services by search term locally
    const filteredServices = services.filter(service => {
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            return (
                service.title.toLowerCase().includes(searchTerm) ||
                service.description.toLowerCase().includes(searchTerm) ||
                service.slug.toLowerCase().includes(searchTerm)
            );
        }
        return true;
    });

    // Handle opening the modal for creating a new service
    const handleCreateService = () => {
        setFormData({
            title: '',
            slug: '',
            description: '',
            icon: '',
            color: 'from-blue-500 to-blue-600',
            details: [''],
            active: true,
        });
        setSelectedService(null);
        setModalMode('create');
        setIsModalOpen(true);
    };

    // Handle opening the modal for editing a service
    const handleEditService = (service: Service) => {
        setFormData({
            title: service.title,
            slug: service.slug,
            description: service.description,
            icon: service.icon || '',
            color: service.color || 'from-blue-500 to-blue-600',
            details: service.details || [''],
            active: service.active,
        });
        setSelectedService(service);
        setModalMode('edit');
        setIsModalOpen(true);
    };

    // Handle opening the modal for viewing a service
    const handleViewService = (service: Service) => {
        setSelectedService(service);
        setModalMode('view');
        setIsModalOpen(true);
    };

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle checkbox changes
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: checked,
        }));
    };

    // Handle details array changes
    const handleDetailChange = (index: number, value: string) => {
        const newDetails = [...formData.details];
        newDetails[index] = value;
        setFormData(prev => ({
            ...prev,
            details: newDetails,
        }));
    };

    // Add a new detail field
    const addDetailField = () => {
        setFormData(prev => ({
            ...prev,
            details: [...prev.details, ''],
        }));
    };

    // Remove a detail field
    const removeDetailField = (index: number) => {
        const newDetails = [...formData.details];
        newDetails.splice(index, 1);
        setFormData(prev => ({
            ...prev,
            details: newDetails.length ? newDetails : [''],
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Validate form
            if (!formData.title || !formData.description) {
                setError('Title and description are required');
                return;
            }

            // Filter out empty details
            const filteredDetails = formData.details.filter(detail => detail.trim() !== '');

            const payload = {
                ...formData,
                details: filteredDetails,
            };

            let response;
            if (modalMode === 'create') {
                // Create new service
                response = await fetch('/api/services', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
            } else if (modalMode === 'edit' && selectedService) {
                // Update existing service
                response = await fetch(`/api/services/${selectedService.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
            }

            if (!response || !response.ok) {
                const errorData = await response?.json();
                throw new Error(errorData?.error || 'Failed to save service');
            }

            // Close modal and refresh services
            setIsModalOpen(false);
            setFilters({ ...filters }); // Trigger a re-fetch
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
    };

    // Handle service deletion
    const handleDeleteService = async (serviceId: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        try {
            const response = await fetch(`/api/services/${serviceId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.error || 'Failed to delete service');
            }

            // Refresh services
            setFilters({ ...filters }); // Trigger a re-fetch
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
    };

    // Handle toggling service active status
    const handleToggleActive = async (service: Service) => {
        try {
            const response = await fetch(`/api/services/${service.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ active: !service.active }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.error || 'Failed to update service status');
            }

            // Refresh services
            setFilters({ ...filters }); // Trigger a re-fetch
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
    };

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold text-gray-900">Service Management</h1>
                <p className="text-gray-600">Manage the services displayed on your website.</p>
            </motion.div>

            {/* Filters and Actions */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Status Filter */}
                    <div className="relative">
                        <select
                            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-auto"
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        >
                            <option value="all">All Statuses</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <FaFilter className="absolute left-3 top-3 text-gray-400" />
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search services..."
                            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                </div>

                {/* Create Button */}
                <button
                    onClick={handleCreateService}
                    className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <FaPlus className="mr-2" /> Add New Service
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                    <button
                        className="absolute top-0 bottom-0 right-0 px-4 py-3"
                        onClick={() => setError(null)}
                    >
                        <span className="sr-only">Close</span>
                        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <title>Close</title>
                            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Services Table */}
            <div className="bg-white shadow overflow-hidden rounded-lg">
                {loading ? (
                    <div className="p-10 flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : filteredServices.length === 0 ? (
                    <div className="p-10 text-center text-gray-500">
                        {filters.search ? 'No services match your search criteria.' : 'No services found. Create your first service!'}
                    </div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredServices.map((service) => (
                                <tr key={service.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-gradient-to-br text-white">
                                                <div className={`h-10 w-10 rounded-md flex items-center justify-center bg-gradient-to-br ${service.color}`}>
                                                    {service.icon ? (
                                                        <span className="text-xl">{service.icon}</span>
                                                    ) : (
                                                        <FaTools className="text-xl" />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{service.title}</div>
                                                <div className="text-sm text-gray-500">{service.slug}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 line-clamp-2">{service.description}</div>
                                        <div className="text-xs text-gray-500 mt-1">{service.details?.length || 0} details</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${service.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                        >
                                            {service.active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleViewService(service)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                                title="View"
                                            >
                                                <FaEye />
                                            </button>
                                            <button
                                                onClick={() => handleEditService(service)}
                                                className="text-blue-600 hover:text-blue-900"
                                                title="Edit"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleToggleActive(service)}
                                                className={service.active ? 'text-orange-600 hover:text-orange-900' : 'text-green-600 hover:text-green-900'}
                                                title={service.active ? 'Deactivate' : 'Activate'}
                                            >
                                                {service.active ? <FaToggleOn /> : <FaToggleOff />}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteService(service.id)}
                                                className="text-red-600 hover:text-red-900"
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Service Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-medium text-gray-900">
                                {modalMode === 'create' ? 'Add New Service' : modalMode === 'edit' ? 'Edit Service' : 'View Service'}
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

                        {modalMode === 'view' && selectedService ? (
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Title</h4>
                                    <p className="mt-1">{selectedService.title}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Slug</h4>
                                    <p className="mt-1">{selectedService.slug}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Description</h4>
                                    <p className="mt-1">{selectedService.description}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Icon</h4>
                                    <div className="mt-1 flex items-center">
                                        <div className={`h-10 w-10 rounded-md flex items-center justify-center bg-gradient-to-br ${selectedService.color} text-white`}>
                                            {selectedService.icon ? (
                                                <span className="text-xl">{selectedService.icon}</span>
                                            ) : (
                                                <FaTools className="text-xl" />
                                            )}
                                        </div>
                                        <span className="ml-2">{selectedService.icon || 'No icon set'}</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Details</h4>
                                    {selectedService.details && selectedService.details.length > 0 ? (
                                        <ul className="mt-1 list-disc list-inside">
                                            {selectedService.details.map((detail, index) => (
                                                <li key={index}>{detail}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="mt-1 text-gray-500">No details provided</p>
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Status</h4>
                                    <p className="mt-1">{selectedService.active ? 'Active' : 'Inactive'}</p>
                                </div>
                                <div className="flex justify-end mt-6">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title *</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug</label>
                                    <input
                                        type="text"
                                        id="slug"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Leave empty to generate from title"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description *</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="icon" className="block text-sm font-medium text-gray-700">Icon</label>
                                    <input
                                        type="text"
                                        id="icon"
                                        name="icon"
                                        value={formData.icon}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Icon component name or code"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color Gradient</label>
                                    <select
                                        id="color"
                                        name="color"
                                        value={formData.color}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="from-blue-500 to-blue-600">Blue</option>
                                        <option value="from-pink-400 to-pink-500">Pink</option>
                                        <option value="from-green-500 to-green-600">Green</option>
                                        <option value="from-purple-500 to-purple-600">Purple</option>
                                        <option value="from-yellow-500 to-yellow-600">Yellow</option>
                                        <option value="from-red-500 to-red-600">Red</option>
                                        <option value="from-indigo-500 to-indigo-600">Indigo</option>
                                        <option value="from-gray-500 to-gray-600">Gray</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Details</label>
                                    {formData.details.map((detail, index) => (
                                        <div key={index} className="flex mb-2">
                                            <input
                                                type="text"
                                                value={detail}
                                                onChange={(e) => handleDetailChange(index, e.target.value)}
                                                className="flex-grow border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                placeholder={`Detail ${index + 1}`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeDetailField(index)}
                                                className="ml-2 inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                disabled={formData.details.length <= 1}
                                            >
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addDetailField}
                                        className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <FaPlus className="mr-2" /> Add Detail
                                    </button>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="active"
                                        name="active"
                                        checked={formData.active}
                                        onChange={handleCheckboxChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
                                        Active
                                    </label>
                                </div>

                                <div className="flex justify-end pt-4 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="mr-3 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        {modalMode === 'create' ? 'Create' : 'Update'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}