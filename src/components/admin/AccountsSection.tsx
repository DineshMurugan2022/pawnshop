import React from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const AccountsSection: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Accounts & Cash Management</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-green-100 p-3 rounded-full">
                            <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Cash In</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Record cash received</p>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-full">
                        Add Cash In
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-red-100 p-3 rounded-full">
                            <TrendingDown className="h-6 w-6 text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Cash Out</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Record cash payments</p>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 w-full">
                        Add Cash Out
                    </button>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <DollarSign className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">
                    Cash transaction management will be fully functional after database setup.
                </p>
            </div>
        </div>
    );
};

export default AccountsSection;
