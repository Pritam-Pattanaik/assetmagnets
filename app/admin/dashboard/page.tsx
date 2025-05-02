'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { FaUsers, FaFileAlt, FaImage, FaServer, FaChartLine } from 'react-icons/fa';
import { useAdminProtected } from '@/utils/client-auth';
import React from 'react';

// Define typed motion components
const MotionDiv = motion.div as React.FC<HTMLMotionProps<"div">>;
const MotionButton = motion.button as React.FC<HTMLMotionProps<"button">>;

export default function AdminDashboard() {
    // Use the admin protection hook to ensure only admins can access this page
    const { session, status, isAdmin } = useAdminProtected();

    // Dashboard stats (these would typically come from an API)
    const stats = [
        { id: 'users', title: 'Total Users', value: '24', icon: <FaUsers className="h-8 w-8 text-blue-500" />, color: 'bg-blue-100' },
        { id: 'posts', title: 'Published Posts', value: '12', icon: <FaFileAlt className="h-8 w-8 text-green-500" />, color: 'bg-green-100' },
        { id: 'media', title: 'Media Items', value: '48', icon: <FaImage className="h-8 w-8 text-purple-500" />, color: 'bg-purple-100' },
        { id: 'server', title: 'Server Status', value: 'Healthy', icon: <FaServer className="h-8 w-8 text-yellow-500" />, color: 'bg-yellow-100' },
    ];

    // Recent activity (would come from an API)
    const recentActivity = [
        { id: 1, action: 'User Registration', user: 'john.doe@example.com', time: '2 hours ago' },
        { id: 2, action: 'Post Published', user: 'admin@assetmagnets.com', time: '1 day ago' },
        { id: 3, action: 'Media Uploaded', user: 'editor@assetmagnets.com', time: '3 days ago' },
        { id: 4, action: 'Settings Updated', user: session?.user?.email || 'admin', time: 'Just now' },
    ];

    return (
        <div className="space-y-8 p-6">
            <MotionDiv
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold text-gray-900">Welcome, {session?.user?.name || 'Admin'}</h1>
                <p className="text-gray-600">Here's what's happening with your site today.</p>
            </MotionDiv>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <MotionDiv
                        key={stat.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className={`${stat.color} p-6 rounded-lg shadow-sm`}
                    >
                        <MotionDiv
                            className="w-full h-full"
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    {stat.icon}
                                </div>
                                <div className="ml-5">
                                    <p className="text-sm font-medium text-gray-500 truncate">{stat.title}</p>
                                    <p className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</p>
                                </div>
                            </div>
                        </MotionDiv>
                    </MotionDiv>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white overflow-hidden shadow rounded-lg min-h-[400px]">
                    <MotionDiv
                        className="h-full"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                                <FaChartLine className="mr-2" /> Recent Activity
                            </h3>
                        </div>
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flow-root">
                                <ul className="-my-5 divide-y divide-gray-200">
                                    {recentActivity.map((item) => (
                                        <li key={item.id} className="py-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{item.action}</p>
                                                    <p className="text-sm text-gray-500 truncate">{item.user}</p>
                                                </div>
                                                <div className="text-sm text-gray-500">{item.time}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </MotionDiv>
                </div>

                {/* Quick Actions */}
                <div className="bg-white overflow-hidden shadow rounded-lg min-h-[400px]">
                    <MotionDiv
                        className="h-full"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
                        </div>
                        <div className="px-4 py-5 sm:p-6">
                            <div className="grid grid-cols-2 gap-4">
                                <MotionButton
                                    type="button"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <FaFileAlt className="mr-2" /> New Post
                                </MotionButton>
                                <MotionButton
                                    type="button"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    <FaImage className="mr-2" /> Upload Media
                                </MotionButton>
                                <MotionButton
                                    type="button"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                >
                                    <FaUsers className="mr-2" /> Manage Users
                                </MotionButton>
                                <MotionButton
                                    type="button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                >
                                    <FaServer className="mr-2" /> Site Settings
                                </MotionButton>
                            </div>
                        </div>
                    </MotionDiv>
                </div>
            </div>
        </div>
    );
}