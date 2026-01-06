import React from 'react';
import { BarChart3, FileText, Download, Calendar } from 'lucide-react';

const ReportsSection: React.FC = () => {
    const reports = [
        { id: 'detail', name: 'Detail Report', description: 'Comprehensive transaction details', icon: FileText },
        { id: 'customer_pledge', name: 'Customer Pledge Report', description: 'Customer-wise pledge summary', icon: BarChart3 },
        { id: 'bank_pledge', name: 'Bank Pledge Report', description: 'Bank pledge tracking', icon: FileText },
        { id: 'pledge_sales', name: 'Pledge Sales Report', description: 'Sales report for unredeemed items', icon: BarChart3 },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Reports</h2>

            {/* Date Range Filter */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date Range</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                        <input
                            type="date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                        <input
                            type="date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div className="flex items-end">
                        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 w-full flex items-center justify-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>Apply Filter</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Report Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reports.map((report) => {
                    const Icon = report.icon;
                    return (
                        <div key={report.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-purple-100 p-3 rounded-full">
                                        <Icon className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{report.name}</h3>
                                        <p className="text-sm text-gray-600">{report.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2">
                                    <BarChart3 className="h-4 w-4" />
                                    <span>View Report</span>
                                </button>
                                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
                                    <Download className="h-4 w-4" />
                                    <span>Export</span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">
                    Reports will be generated from live data after database setup and transactions are recorded.
                </p>
            </div>
        </div>
    );
};

export default ReportsSection;
