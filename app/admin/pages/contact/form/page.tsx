'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSave, FaEnvelope, FaUser, FaPhone, FaCommentAlt, FaToggleOn, FaToggleOff } from 'react-icons/fa';

export default function ContactFormEditor() {
    // Sample state for contact form settings
    const [formSettings, setFormSettings] = useState({
        recipientEmail: 'support@assetmagnets.com',
        subjectPrefix: '[Website Contact]',
        successMessage: 'Thank you for your message. We will get back to you shortly.',
        errorMessage: 'There was an error sending your message. Please try again later.',
        fields: {
            name: { required: true, label: 'Full Name', placeholder: 'Enter your full name' },
            email: { required: true, label: 'Email Address', placeholder: 'Enter your email address' },
            phone: { required: false, label: 'Phone Number', placeholder: 'Enter your phone number (optional)' },
            company: { required: false, label: 'Company', placeholder: 'Enter your company name (optional)' },
            subject: { required: true, label: 'Subject', placeholder: 'What is this regarding?' },
            message: { required: true, label: 'Message', placeholder: 'How can we help you?' }
        },
        enableRecaptcha: true,
        recaptchaSiteKey: '6LexampleExampleKey',
        autoResponder: {
            enabled: true,
            subject: 'Thank you for contacting Asset Magnets',
            message: 'Dear {name},\n\nThank you for reaching out to Asset Magnets. We have received your inquiry and will respond within 24-48 business hours.\n\nBest regards,\nThe Asset Magnets Team'
        }
    });

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically save the data to your backend
        alert('Contact form settings updated successfully!');
    };

    // Handle field settings change
    const handleFieldChange = (fieldName: string, property: string, value: any) => {
        setFormSettings({
            ...formSettings,
            fields: {
                ...formSettings.fields,
                [fieldName]: {
                    ...formSettings.fields[fieldName as keyof typeof formSettings.fields],
                    [property]: value
                }
            }
        });
    };

    // Handle auto responder settings change
    const handleAutoResponderChange = (property: string, value: any) => {
        setFormSettings({
            ...formSettings,
            autoResponder: {
                ...formSettings.autoResponder,
                [property]: value
            }
        });
    };

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold text-gray-900">Contact Form Settings</h1>
                <p className="text-gray-600">Configure how your contact form works and appears on your website.</p>
            </motion.div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-700">Recipient Email</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="recipientEmail"
                                    value={formSettings.recipientEmail}
                                    onChange={(e) => setFormSettings({ ...formSettings, recipientEmail: e.target.value })}
                                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                    placeholder="Where to send form submissions"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subjectPrefix" className="block text-sm font-medium text-gray-700">Email Subject Prefix</label>
                            <input
                                type="text"
                                id="subjectPrefix"
                                value={formSettings.subjectPrefix}
                                onChange={(e) => setFormSettings({ ...formSettings, subjectPrefix: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                placeholder="Prefix for email subjects"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="successMessage" className="block text-sm font-medium text-gray-700">Success Message</label>
                            <textarea
                                id="successMessage"
                                rows={2}
                                value={formSettings.successMessage}
                                onChange={(e) => setFormSettings({ ...formSettings, successMessage: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                placeholder="Message shown after successful submission"
                            />
                        </div>

                        <div>
                            <label htmlFor="errorMessage" className="block text-sm font-medium text-gray-700">Error Message</label>
                            <textarea
                                id="errorMessage"
                                rows={2}
                                value={formSettings.errorMessage}
                                onChange={(e) => setFormSettings({ ...formSettings, errorMessage: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                placeholder="Message shown when submission fails"
                            />
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Form Fields</h3>

                        {Object.entries(formSettings.fields).map(([fieldName, fieldSettings]) => (
                            <div key={fieldName} className="mb-6 p-4 border border-gray-200 rounded-md">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="text-md font-medium text-gray-900 capitalize">{fieldName} Field</h4>
                                    <div className="flex items-center">
                                        <span className="mr-2 text-sm text-gray-600">Required</span>
                                        <button
                                            type="button"
                                            onClick={() => handleFieldChange(fieldName, 'required', !fieldSettings.required)}
                                            className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 focus:outline-none ${fieldSettings.required ? 'bg-primary-600 justify-end' : 'bg-gray-300 justify-start'}`}
                                        >
                                            <span className="w-5 h-5 rounded-full bg-white shadow-md transform mx-0.5"></span>
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor={`${fieldName}-label`} className="block text-sm font-medium text-gray-700">Label</label>
                                        <input
                                            type="text"
                                            id={`${fieldName}-label`}
                                            value={fieldSettings.label}
                                            onChange={(e) => handleFieldChange(fieldName, 'label', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`${fieldName}-placeholder`} className="block text-sm font-medium text-gray-700">Placeholder</label>
                                        <input
                                            type="text"
                                            id={`${fieldName}-placeholder`}
                                            value={fieldSettings.placeholder}
                                            onChange={(e) => handleFieldChange(fieldName, 'placeholder', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">reCAPTCHA Protection</h3>
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    onClick={() => setFormSettings({ ...formSettings, enableRecaptcha: !formSettings.enableRecaptcha })}
                                    className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 focus:outline-none ${formSettings.enableRecaptcha ? 'bg-primary-600 justify-end' : 'bg-gray-300 justify-start'}`}
                                >
                                    <span className="w-5 h-5 rounded-full bg-white shadow-md transform mx-0.5"></span>
                                </button>
                                <span className="ml-2 text-sm text-gray-600">{formSettings.enableRecaptcha ? 'Enabled' : 'Disabled'}</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600">Enable Google reCAPTCHA to protect your form from spam submissions.</p>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Auto-Responder</h3>
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    onClick={() => handleAutoResponderChange('enabled', !formSettings.autoResponder.enabled)}
                                    className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 focus:outline-none ${formSettings.autoResponder.enabled ? 'bg-primary-600 justify-end' : 'bg-gray-300 justify-start'}`}
                                >
                                    <span className="w-5 h-5 rounded-full bg-white shadow-md transform mx-0.5"></span>
                                </button>
                                <span className="ml-2 text-sm text-gray-600">{formSettings.autoResponder.enabled ? 'Enabled' : 'Disabled'}</span>
                            </div>
                        </div>

                        {formSettings.autoResponder.enabled && (
                            <div className="space-y-4 mt-4">
                                <div>
                                    <label htmlFor="autoResponderSubject" className="block text-sm font-medium text-gray-700">Auto-Response Subject</label>
                                    <input
                                        type="text"
                                        id="autoResponderSubject"
                                        value={formSettings.autoResponder.subject}
                                        onChange={(e) => handleAutoResponderChange('subject', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="autoResponderMessage" className="block text-sm font-medium text-gray-700">Auto-Response Message</label>
                                    <p className="text-xs text-gray-500 mb-1">Use {'{name}'} to include the sender's name in the message.</p>
                                    <textarea
                                        id="autoResponderMessage"
                                        rows={5}
                                        value={formSettings.autoResponder.message}
                                        onChange={(e) => handleAutoResponderChange('message', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            <FaSave className="mr-2 -ml-1 h-5 w-5" />
                            Save Settings
                        </button>
                    </div>
                </form>
            </div>

            {/* Preview Section */}
            <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Form Preview</h2>
                <div className="bg-gray-100 p-6 rounded-lg border border-gray-200">
                    <div className="max-w-md mx-auto space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{formSettings.fields.name.label}</label>
                            <input
                                type="text"
                                placeholder={formSettings.fields.name.placeholder}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                disabled
                            />
                            {formSettings.fields.name.required && <span className="text-xs text-red-500">*Required</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">{formSettings.fields.email.label}</label>
                            <input
                                type="email"
                                placeholder={formSettings.fields.email.placeholder}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                disabled
                            />
                            {formSettings.fields.email.required && <span className="text-xs text-red-500">*Required</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">{formSettings.fields.phone.label}</label>
                            <input
                                type="tel"
                                placeholder={formSettings.fields.phone.placeholder}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                disabled
                            />
                            {formSettings.fields.phone.required && <span className="text-xs text-red-500">*Required</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">{formSettings.fields.company.label}</label>
                            <input
                                type="text"
                                placeholder={formSettings.fields.company.placeholder}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                disabled
                            />
                            {formSettings.fields.company.required && <span className="text-xs text-red-500">*Required</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">{formSettings.fields.message.label}</label>
                            <textarea
                                rows={4}
                                placeholder={formSettings.fields.message.placeholder}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                disabled
                            />
                            {formSettings.fields.message.required && <span className="text-xs text-red-500">*Required</span>}
                        </div>

                        {formSettings.enableRecaptcha && (
                            <div className="border border-gray-300 rounded p-3 bg-gray-50 flex items-center justify-center h-[78px]">
                                <span className="text-sm text-gray-500">reCAPTCHA will appear here</span>
                            </div>
                        )}

                        <div>
                            <button
                                type="button"
                                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                disabled
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}