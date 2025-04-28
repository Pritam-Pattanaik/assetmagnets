'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSave, FaMapMarkerAlt, FaSearchLocation } from 'react-icons/fa';

export default function MapSettingsEditor() {
    // Sample state for map settings
    const [mapSettings, setMapSettings] = useState({
        apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
        latitude: 40.7128,
        longitude: -74.0060,
        zoom: 15,
        markerTitle: 'Asset Magnets Headquarters',
        enableScrollZoom: false,
        showStreetViewControl: true,
        mapType: 'roadmap',
        customMarkerIcon: '/images/map-marker.png',
        infoWindowContent: '<h3>Asset Magnets</h3><p>123 Investment Avenue, Financial District, New York, NY 10001</p>'
    });

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically save the data to your backend
        alert('Map settings updated successfully!');
    };

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold text-gray-900">Map Settings</h1>
                <p className="text-gray-600">Configure the interactive map that appears on your contact page.</p>
            </motion.div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">Google Maps API Key</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                                type="text"
                                id="apiKey"
                                value={mapSettings.apiKey}
                                onChange={(e) => setMapSettings({ ...mapSettings, apiKey: e.target.value })}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                placeholder="Enter your Google Maps API key"
                            />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">You can get an API key from the <a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">Google Cloud Console</a>.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude</label>
                            <input
                                type="number"
                                step="0.000001"
                                id="latitude"
                                value={mapSettings.latitude}
                                onChange={(e) => setMapSettings({ ...mapSettings, latitude: parseFloat(e.target.value) })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude</label>
                            <input
                                type="number"
                                step="0.000001"
                                id="longitude"
                                value={mapSettings.longitude}
                                onChange={(e) => setMapSettings({ ...mapSettings, longitude: parseFloat(e.target.value) })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="zoom" className="block text-sm font-medium text-gray-700">Zoom Level (1-20)</label>
                            <input
                                type="number"
                                min="1"
                                max="20"
                                id="zoom"
                                value={mapSettings.zoom}
                                onChange={(e) => setMapSettings({ ...mapSettings, zoom: parseInt(e.target.value) })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="markerTitle" className="block text-sm font-medium text-gray-700">Marker Title</label>
                        <input
                            type="text"
                            id="markerTitle"
                            value={mapSettings.markerTitle}
                            onChange={(e) => setMapSettings({ ...mapSettings, markerTitle: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="customMarkerIcon" className="block text-sm font-medium text-gray-700">Custom Marker Icon URL</label>
                        <input
                            type="text"
                            id="customMarkerIcon"
                            value={mapSettings.customMarkerIcon}
                            onChange={(e) => setMapSettings({ ...mapSettings, customMarkerIcon: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            placeholder="/images/custom-marker.png"
                        />
                        <p className="mt-1 text-xs text-gray-500">Leave empty to use the default Google Maps marker.</p>
                    </div>

                    <div>
                        <label htmlFor="infoWindowContent" className="block text-sm font-medium text-gray-700">Info Window HTML Content</label>
                        <textarea
                            id="infoWindowContent"
                            rows={3}
                            value={mapSettings.infoWindowContent}
                            onChange={(e) => setMapSettings({ ...mapSettings, infoWindowContent: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 font-mono text-sm"
                        />
                        <p className="mt-1 text-xs text-gray-500">HTML content to display when the marker is clicked.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="enableScrollZoom"
                                checked={mapSettings.enableScrollZoom}
                                onChange={(e) => setMapSettings({ ...mapSettings, enableScrollZoom: e.target.checked })}
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <label htmlFor="enableScrollZoom" className="ml-2 block text-sm text-gray-700">Enable Scroll Zoom</label>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="showStreetViewControl"
                                checked={mapSettings.showStreetViewControl}
                                onChange={(e) => setMapSettings({ ...mapSettings, showStreetViewControl: e.target.checked })}
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <label htmlFor="showStreetViewControl" className="ml-2 block text-sm text-gray-700">Show Street View Control</label>
                        </div>

                        <div>
                            <label htmlFor="mapType" className="block text-sm font-medium text-gray-700">Map Type</label>
                            <select
                                id="mapType"
                                value={mapSettings.mapType}
                                onChange={(e) => setMapSettings({ ...mapSettings, mapType: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            >
                                <option value="roadmap">Roadmap</option>
                                <option value="satellite">Satellite</option>
                                <option value="hybrid">Hybrid</option>
                                <option value="terrain">Terrain</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="button"
                            className="mr-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            <FaSearchLocation className="mr-2 -ml-1 h-5 w-5 text-gray-500" />
                            Find Coordinates
                        </button>
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
                <h2 className="text-lg font-medium text-gray-900 mb-4">Map Preview</h2>
                <div className="bg-gray-100 p-6 rounded-lg border border-gray-200">
                    <div className="relative rounded-lg overflow-hidden bg-cover bg-center h-96 flex items-center justify-center bg-gray-300">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center p-6">
                                <FaMapMarkerAlt className="mx-auto h-12 w-12 text-primary-600" />
                                <p className="mt-4 text-gray-600">Map preview will appear here when integrated with Google Maps API</p>
                                <div className="mt-4 text-sm text-gray-500">
                                    <p>Latitude: {mapSettings.latitude}</p>
                                    <p>Longitude: {mapSettings.longitude}</p>
                                    <p>Zoom: {mapSettings.zoom}</p>
                                    <p>Map Type: {mapSettings.mapType}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                        <p className="italic">Note: Actual map will be displayed when the Google Maps API is properly configured.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}