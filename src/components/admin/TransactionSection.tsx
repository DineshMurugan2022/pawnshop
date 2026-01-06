import React from 'react';
import { FileText, Plus, DollarSign, XCircle } from 'lucide-react';

const TransactionSection: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState('pledge_entry');

    const tabs = [
        { id: 'pledge_entry', label: 'Pledge Entry', icon: Plus },
        { id: 'additional_pledge', label: 'Additional Pledge', icon: FileText },
        { id: 'pledge_return', label: 'Pledge Return', icon: DollarSign },
        { id: 'part_payment', label: 'Part Payment', icon: DollarSign },
        { id: 'pledge_sales', label: 'Pledge Sales', icon: FileText },
        { id: 'cancel', label: 'Cancel Transaction', icon: XCircle },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Transaction Management</h2>

            {/* Sub Tabs */}
            <div className="bg-white rounded-lg shadow-md p-2">
                <div className="flex flex-wrap gap-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${activeTab === tab.id
                                        ? 'bg-purple-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <Icon className="h-4 w-4" />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                    <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Transaction Module</h3>
                    <p className="text-gray-600">
                        Transaction management features including pledge entry, returns, and part payments will be available here.
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        This section requires the database to be set up first. Please run the SQL script in Supabase SQL Editor.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TransactionSection;
