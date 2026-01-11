import React from 'react';
import { Building2, Send, Download } from 'lucide-react';

const BankSection: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Bank Operations</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-purple-100 p-3 rounded-full">
                            <Send className="h-6 w-6 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Bank Pledge Entry</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Send pledges to bank for additional funding</p>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 w-full">
                        Create Bank Pledge
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-green-100 p-3 rounded-full">
                            <Download className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Bank Pledge Receive</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Receive pledges back from bank</p>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-full">
                        Record Receive
                    </button>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">
                    Bank operations module will be fully functional after database setup.
                </p>
            </div>
        </div>
    );
};

export default BankSection;
