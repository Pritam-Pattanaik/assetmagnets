'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaCode, FaCloud, FaShieldAlt, FaChartLine, FaLaptopCode, FaMobileAlt } from 'react-icons/fa';
import { useAdminProtected } from '@/utils/client-auth';

// Types for the service cards
interface ServiceCard {
    id: string;
    title: string;
    description: string;
    icon: string;
    link: string;
    color: string;
    order: number;
}

// Map of icon names to their components
const iconMap: Record<string, React.ReactNode> = {
    'FaCode': <FaCode className="text-4xl text-white" />,
    'FaCloud': <FaCloud className="text-4xl text-white" />,
    'FaShieldAlt': <FaShieldAlt className="text-4xl text-white" />,
    'FaChartLine': <FaChartLine className="text-4xl text-white" />,
    'FaLaptopCode': <FaLaptopCode className="text-4xl text-white" />,
    'FaMobileAlt': <FaMobileAlt className="text-4xl text-white" />,
};

// Available color options
const colorOptions = [
    { value: 'from-blue-500 to-blue-600', label: 'Blue' },
    { value: 'from-pink-500 to-pink-600', label: 'Pink' },
    { value: 'from-green-500 to-green-600', label: 'Green' },
    { value: 'from-purple-500 to-purple-600', label: 'Purple' },
    { value: 'from-yellow-500 to-yellow-600', label: 'Yellow' },
    { value: 'from-red-500 to-red-600', label: 'Red' },
    { value: 'from-indigo-500 to-indigo-600', label: 'Indigo' },
    { value: 'from-teal-500 to-teal-600', label: 'Teal' },
    { value: 'from-orange-500 to-orange-600', label: 'Orange' },
];

// Available icon options
const iconOptions = [
    { value: 'FaCode', label: 'Code' },
    { value: 'FaCloud', label: 'Cloud' },
    { value: 'FaShieldAlt', label: 'Shield' },
    { value: 'FaChartLine', label: 'Chart' },
    { value: 'FaLaptopCode', label: 'Laptop' },
    { value: 'FaMobileAlt', label: 'Mobile' },
];

export default function HomeServicesManager() {
    // Use the admin protection hook to ensure only admins can access this page
    const { session, status, isAdmin } = useAdminProtected();

    // State for services
    const [services, setServices] = useState<ServiceCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // State for service being edited
    const [selectedService, setSelectedService] = useState<ServiceCard | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

    // State for form data
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        icon: 'FaCode',
        link: '',
        color: 'from-blue-500 to-blue-600',
        order: 0,
    });

    // Mock fetch services - in a real app, this would come from an API
    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                // This is mock data - in a real app, you would fetch from an API
                const mockServices: ServiceCard[] = [
                    {
                        id: 'software-development',
                        title: 'Software Development',
                        description: 'Custom software solutions tailored to your business needs, from web applications to enterprise systems.',
                        icon: 'FaCode',
                        link: '/services#software-development',
                        color: 'from-blue-500 to-blue-600',
                        order: 1,
                    },
                    {
                        id: 'cloud-solutions',
                        title: 'Cloud Solutions',
                        description: 'Secure and scalable cloud infrastructure, migration services, and managed cloud solutions.',
                        icon: 'FaCloud',
                        link: '/services#cloud-solutions',
                        color: 'from-pink-500 to-pink-600',
                        order: 2,
                    },
                    {
                        id: 'cybersecurity',
                        title: 'Cybersecurity',
                        description: 'Comprehensive security solutions to protect your business from threats and ensure data integrity.',
                        icon: 'FaShieldAlt',
                        link: '/services#cybersecurity',
                        color: 'from-green-500 to-green-600',
                        order: 3,
                    },
                    {
                        id: 'digital-transformation',
                        title: 'Digital Transformation',
                        description: 'Strategic guidance and implementation to modernize your business processes and technology.',
                        icon: 'FaChartLine',
                        link: '/services#digital-transformation',
                        color: 'from-purple-500 to-purple-600',
                        order: 4,
                    },
                    {
                        id: 'it-consulting',
                        title: 'IT Consulting',
                        description: 'Expert advice on technology strategy, architecture, and implementation to drive business growth.',
                        icon: 'FaLaptopCode',
                        link: '/services#it-consulting',
                        color: 'from-yellow-500 to-yellow-600',
                        order: 5,
                    },
                    {
                        id: 'mobile-development',
                        title: 'Mobile Development',
                        description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
                        icon: 'FaMobileAlt',
                        link: '/services#mobile-development',
                        color: 'from-red-500 to-red-600',
                        order: 6,
                    },
                ];

                setServices(mockServices);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                setServices([]);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    // Handle opening the modal for creating a new service
    const handleCreateService = () => {
        setFormData({
            id: '',
            title: '',
            description: '',
            icon: 'FaCode',
            link: '',
            color: 'from-blue-500 to-blue-600',
            order: services.length + 1,
        });
        setSelectedService(null);
        setModalMode('create');
        setIsModalOpen(true);
    };

    // Handle opening the modal for editing a service
    const handleEditService = (service: ServiceCard) => {
        setFormData({
            id: service.id,
            title: service.title,
            description: service.description,
            icon: service.icon,
            link: service.link,
            color: service.color,
            order: service.order,
        });
        setSelectedService(service);
        setModalMode('edit');
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

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Validate form
            if (!formData.title || !formData.description) {
                setError('Title and description are required');
                return;
            }

            // Generate an ID if creating a new service
            const serviceId = modalMode === 'create'
                ? formData.title.toLowerCase().replace(/\s+/g, '-')
                : formData.id;

            const updatedService = {
                ...formData,
                id: serviceId,
            };

            if (modalMode === 'create') {
                // Add new service
                setServices(prev => [...prev, updatedService]);
                setSuccess('Service created successfully');
            } else {
                // Update existing service
                setServices(prev =>
                    prev.map(service =>
                        service.id === selectedService?.id ? updatedService : service
                    )
                );
                setSuccess('Service updated successfully');
            }

            // Close modal
            setIsModalOpen(false);

            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
    };

    // Handle service deletion
    const handleDeleteService = (serviceId: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        try {
            setServices(prev => prev.filter(service => service.id !== serviceId));
            setSuccess('Service deleted successfully');

            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
    };

    // Handle moving a service up in order
    const handleMoveUp = (index: number) => {
        if (index === 0) return;

        const newServices = [...services];
        const temp = newServices[index - 1].order;
        newServices[index - 1].order = newServices[index].order;
        newServices[index].order = temp;

        // Sort by order
        newServices.sort((a, b) => a.order - b.order);

        setServices(newServices);
        setSuccess('Service order updated');

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
    };

    // Handle moving a service down in order
    const handleMoveDown = (index: number) => {
        if (index === services.length - 1) return;

        const newServices = [...services];
        const temp = newServices[index + 1].order;
        newServices[index + 1].order = newServices[index].order;
        newServices[index].order = temp;

        // Sort by order
        newServices.sort((a, b) => a.order - b.order);

        setServices(newServices);
        setSuccess('Service order updated');

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
    };

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold text-gray-900">Home Page Services</h1>
                <p className="text-gray-600">Manage the services displayed on your home page.</p>
            </motion.div>

            {/* Success and Error Messages */}
            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            {success && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                    <p className="text-green-700">{success}</p>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                    <button
                        onClick={handleCreateService}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        <FaPlus className="mr-2" /> Add New Service
                    </button>
                </div>
            </div>

            {/* Services Preview */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {loading ? (
                        <li className="p-4 text-center">Loading services...</li>
                    ) : services.length === 0 ? (
                        <li className="p-4 text-center">No services found. Create your first service!</li>
                    ) : (
                        services.map((service, index) => (
                            <li key={service.id} className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className={`p-3 rounded-full bg-gradient-to-r ${service.color}`}>
                                            {iconMap[service.icon]}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900">{service.title}</h3>
                                            <p className="text-sm text-gray-500 line-clamp-1">{service.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleMoveUp(index)}
                                            disabled={index === 0}
                                            className={`p-2 rounded-full ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                                            title="Move Up"
                                        >
                                            <FaArrowUp />
                                        </button>
                                        <button
                                            onClick={() => handleMoveDown(index)}
                                            disabled={index === services.length - 1}
                                            className={`p-2 rounded-full ${index === services.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                                            title="Move Down"
                                        >
                                            <FaArrowDown />
                                        </button>
                                        <button
                                            onClick={() => handleEditService(service)}
                                            className="p-2 rounded-full text-blue-600 hover:bg-blue-50"
                                            title="Edit"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteService(service.id)}
                                            className="p-2 rounded-full text-red-600 hover:bg-red-50"
                                            title="Delete"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>

            {/* Service Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">
                                {modalMode === 'create' ? 'Add New Service' : 'Edit Service'}
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

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                {/* Title */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        rows={3}
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                        required
                                    />
                                </div>

                                {/* Link */}
                                <div>
                                    <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                                        Link
                                    </label>
                                    <input
                                        type="text"
                                        name="link"
                                        id="link"
                                        value={formData.link}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="/services#service-name"
                                        required
                                    />
                                </div>

                                {/* Icon */}
                                <div>
                                    <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
                                        Icon
                                    </label>
                                    <select
                                        name="icon"
                                        id="icon"
                                        value={formData.icon}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                    >
                                        {iconOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Color */}
                                <div>
                                    <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                                        Color
                                    </label>
                                    <select
                                        name="color"
                                        id="color"
                                        value={formData.color}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                    >
                                        {colorOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Preview */}
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Preview
                                    </label>
                                    <div className="p-4 border rounded-md">
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-3 rounded-full bg-gradient-to-r ${formData.color}`}>
                                                {iconMap[formData.icon]}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">{formData.title || 'Service Title'}</h3>
                                                <p className="text-sm text-gray-500">{formData.description || 'Service description will appear here'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                >
                                    {modalMode === 'create' ? 'Create' : 'Update'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}