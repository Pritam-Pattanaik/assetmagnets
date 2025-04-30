'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSave, FaPhone, FaEnvelope, FaMapMarkerAlt, FaPlus, FaTrash, FaEdit, FaGlobe } from 'react-icons/fa';

interface Branch {
    id: string;
    name: string;
    country: string;
    address: string;
    phone: string;
    email: string;
    officeHours: string;
    isDefault?: boolean;
}

export default function ContactInfoEditor() {
    // State for managing multiple branches
    const [branches, setBranches] = useState<Branch[]>([]);

    // State for social media links
    const [socialMedia, setSocialMedia] = useState({
        linkedin: '',
        twitter: '',
        facebook: ''
    });

    // State for tracking which branch is being edited
    const [editingBranch, setEditingBranch] = useState<Branch | null>(null);

    // State for showing/hiding the branch form
    const [showBranchForm, setShowBranchForm] = useState(false);

    // State for loading status
    const [isLoading, setIsLoading] = useState(true);

    // State for submission status
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    // Fetch contact information from the API
    useEffect(() => {
        async function fetchContactInfo() {
            try {
                setIsLoading(true);
                const response = await fetch('/api/contact');

                if (!response.ok) {
                    throw new Error('Failed to fetch contact information');
                }

                const data = await response.json();

                if (data.branches && data.branches.length > 0) {
                    setBranches(data.branches);
                }

                if (data.socialMedia) {
                    const socialMediaData: Record<string, string> = {};

                    data.socialMedia.forEach((item: { platform: string; url: string }) => {
                        socialMediaData[item.platform] = item.url;
                    });

                    setSocialMedia({
                        linkedin: socialMediaData.linkedin || '',
                        twitter: socialMediaData.twitter || '',
                        facebook: socialMediaData.facebook || ''
                    });
                }
            } catch (error) {
                console.error('Error fetching contact information:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchContactInfo();
    }, []);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setSubmitStatus('loading');

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    branches,
                    socialMedia
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update contact information');
            }

            setSubmitStatus('success');
            setTimeout(() => setSubmitStatus('idle'), 3000);
        } catch (error) {
            console.error('Error updating contact information:', error);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 3000);
        }
    };

    // Handle social media input changes
    const handleSocialMediaChange = (platform: string, value: string) => {
        setSocialMedia({
            ...socialMedia,
            [platform]: value
        });
    };

    // Generate a unique ID for new branches
    const generateId = () => {
        return Date.now().toString();
    };

    // Add a new branch
    const addBranch = () => {
        setEditingBranch({
            id: generateId(),
            name: '',
            country: '',
            address: '',
            phone: '',
            email: '',
            officeHours: ''
        });
        setShowBranchForm(true);
    };

    // Edit an existing branch
    const editBranch = (branch: Branch) => {
        setEditingBranch({ ...branch });
        setShowBranchForm(true);
    };

    // Delete a branch
    const deleteBranch = (id: string) => {
        if (confirm('Are you sure you want to delete this branch?')) {
            setBranches(branches.filter(branch => branch.id !== id));
        }
    };

    // Save branch changes
    const saveBranchChanges = () => {
        if (!editingBranch) return;

        // Validate required fields
        if (!editingBranch.name || !editingBranch.country || !editingBranch.address) {
            alert('Please fill in all required fields (Name, Country, and Address)');
            return;
        }

        const isNewBranch = !branches.some(branch => branch.id === editingBranch.id);

        if (isNewBranch) {
            // Add new branch
            setBranches([...branches, editingBranch]);
        } else {
            // Update existing branch
            setBranches(branches.map(branch =>
                branch.id === editingBranch.id ? editingBranch : branch
            ));
        }

        // Reset form
        setEditingBranch(null);
        setShowBranchForm(false);
    };

    // Cancel branch editing
    const cancelBranchEdit = () => {
        setEditingBranch(null);
        setShowBranchForm(false);
    };

    // Update branch field
    const updateBranchField = (field: keyof Branch, value: string) => {
        if (!editingBranch) return;

        setEditingBranch({
            ...editingBranch,
            [field]: value
        });
    };

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold text-gray-900">Edit Contact Information</h1>
                <p className="text-gray-600">Manage your company's branch offices and contact details that appear on your website.</p>
            </motion.div>

            {/* Branch Management Section */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-gray-900">Branch Offices</h2>
                    <button
                        type="button"
                        onClick={addBranch}
                        className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        <FaPlus className="mr-2 -ml-1 h-4 w-4" />
                        Add Branch
                    </button>
                </div>

                {/* Branch List */}
                <div className="space-y-4 mb-6">
                    {branches.length === 0 ? (
                        <p className="text-gray-500 italic">No branches added yet. Click "Add Branch" to create your first branch office.</p>
                    ) : (
                        branches.map(branch => (
                            <div key={branch.id} className="border border-gray-200 rounded-md p-4 hover:bg-gray-50">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-medium text-gray-900">{branch.name}</h3>
                                        <div className="mt-1 text-sm text-gray-500">
                                            <p className="flex items-center"><FaGlobe className="mr-2 h-4 w-4" />{branch.country}</p>
                                            <p className="flex items-center"><FaMapMarkerAlt className="mr-2 h-4 w-4" />{branch.address}</p>
                                            <p className="flex items-center"><FaPhone className="mr-2 h-4 w-4" />{branch.phone}</p>
                                            <p className="flex items-center"><FaEnvelope className="mr-2 h-4 w-4" />{branch.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => editBranch(branch)}
                                            className="text-primary-600 hover:text-primary-800"
                                            title="Edit Branch"
                                        >
                                            <FaEdit className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => deleteBranch(branch.id)}
                                            className="text-red-600 hover:text-red-800"
                                            title="Delete Branch"
                                        >
                                            <FaTrash className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Branch Edit Form */}
                {showBranchForm && editingBranch && (
                    <div className="border border-gray-300 rounded-md p-4 mb-6 bg-gray-50">
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <h3 className="text-md font-medium text-gray-900 mb-4">
                                {branches.some(b => b.id === editingBranch.id) ? 'Edit Branch' : 'Add New Branch'}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="branchName" className="block text-sm font-medium text-gray-700">Branch Name*</label>
                                    <input
                                        type="text"
                                        id="branchName"
                                        value={editingBranch.name}
                                        onChange={(e) => updateBranchField('name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                        placeholder="Headquarters, Regional Office, etc."
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="branchCountry" className="block text-sm font-medium text-gray-700">Country*</label>
                                    <input
                                        type="text"
                                        id="branchCountry"
                                        value={editingBranch.country}
                                        onChange={(e) => updateBranchField('country', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                        placeholder="United States, United Kingdom, etc."
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="branchAddress" className="block text-sm font-medium text-gray-700">Address*</label>
                                <textarea
                                    id="branchAddress"
                                    rows={2}
                                    value={editingBranch.address}
                                    onChange={(e) => updateBranchField('address', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                    placeholder="Full street address"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="branchPhone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input
                                        type="text"
                                        id="branchPhone"
                                        value={editingBranch.phone}
                                        onChange={(e) => updateBranchField('phone', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="branchEmail" className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input
                                        type="email"
                                        id="branchEmail"
                                        value={editingBranch.email}
                                        onChange={(e) => updateBranchField('email', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                        placeholder="branch@example.com"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="branchHours" className="block text-sm font-medium text-gray-700">Office Hours</label>
                                <input
                                    type="text"
                                    id="branchHours"
                                    value={editingBranch.officeHours}
                                    onChange={(e) => updateBranchField('officeHours', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                    placeholder="Monday - Friday: 9:00 AM - 5:00 PM"
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={cancelBranchEdit}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={saveBranchChanges}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                >
                                    Save Branch
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Social Media Section */}
                <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                    <div className="border-t border-gray-200 pt-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Social Media Links</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn</label>
                                <input
                                    type="url"
                                    id="linkedin"
                                    value={socialMedia.linkedin}
                                    onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">Twitter</label>
                                <input
                                    type="url"
                                    id="twitter"
                                    value={socialMedia.twitter}
                                    onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">Facebook</label>
                                <input
                                    type="url"
                                    id="facebook"
                                    value={socialMedia.facebook}
                                    onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            <FaSave className="mr-2 -ml-1 h-5 w-5" />
                            Save All Changes
                        </button>
                    </div>
                </form>
            </div>

            {/* Preview Section */}
            <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Preview</h2>
                <div className="bg-gray-100 p-6 rounded-lg border border-gray-200">
                    <div className="space-y-6">
                        {branches.map((branch, index) => (
                            <div key={branch.id} className="bg-white p-4 rounded-md shadow-sm">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">{branch.name}</h3>
                                <p className="text-sm text-gray-500 mb-1">{branch.country}</p>
                                <div className="space-y-2">
                                    <div className="flex items-start">
                                        <FaMapMarkerAlt className="h-5 w-5 text-primary-600 mt-1 mr-3" />
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900">Address</h4>
                                            <p className="text-gray-600">{branch.address}</p>
                                        </div>
                                    </div>
                                    {branch.phone && (
                                        <div className="flex items-start">
                                            <FaPhone className="h-5 w-5 text-primary-600 mt-1 mr-3" />
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">Phone</h4>
                                                <p className="text-gray-600">{branch.phone}</p>
                                            </div>
                                        </div>
                                    )}
                                    {branch.email && (
                                        <div className="flex items-start">
                                            <FaEnvelope className="h-5 w-5 text-primary-600 mt-1 mr-3" />
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">Email</h4>
                                                <p className="text-gray-600">{branch.email}</p>
                                            </div>
                                        </div>
                                    )}
                                    {branch.officeHours && (
                                        <div className="border-t border-gray-200 pt-2 mt-2">
                                            <h4 className="text-sm font-medium text-gray-900 mb-1">Office Hours</h4>
                                            <p className="text-gray-600">{branch.officeHours}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        <div className="border-t border-gray-200 pt-4">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Connect With Us</h3>
                            <div className="flex space-x-4">
                                <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">
                                    LinkedIn
                                </a>
                                <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">
                                    Twitter
                                </a>
                                <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">
                                    Facebook
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}