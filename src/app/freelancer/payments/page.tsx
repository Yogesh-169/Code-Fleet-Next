'use client';

import React, { useState } from 'react';

interface Payment {
  id: string;
  task: string;
  company: string;
  amount: number;
  status: 'pending' | 'completed' | 'in-escrow';
  date: string;
  dueDate?: string;
}

const FreelancerPaymentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed' | 'in-escrow'>('all');

  const payments: Payment[] = [
    {
      id: '1',
      task: 'Compliance Specialist',
      company: 'SecureTech Solutions',
      amount: 1200,
      status: 'in-escrow',
      date: '2024-07-15',
      dueDate: '2024-08-15'
    },
    {
      id: '2',
      task: 'Data Analysis Project',
      company: 'TechCorp Inc',
      amount: 675,
      status: 'completed',
      date: '2024-07-10'
    },
    {
      id: '3',
      task: 'UI/UX Design Review',
      company: 'DesignStudio',
      amount: 500,
      status: 'pending',
      date: '2024-07-20',
      dueDate: '2024-08-20'
    },
    {
      id: '4',
      task: 'Website Development',
      company: 'WebSolutions',
      amount: 1800,
      status: 'completed',
      date: '2024-06-28'
    }
  ];

  const filteredPayments = payments.filter(payment => {
    if (activeTab === 'all') return true;
    return payment.status === activeTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-escrow':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-escrow':
        return 'In Escrow';
      case 'pending':
        return 'Pending';
      default:
        return status;
    }
  };

  const totalEarnings = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payments
    .filter(p => p.status === 'pending' || p.status === 'in-escrow')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="w-full">
      <h2 className="text-[#111618] tracking-light text-2xl sm:text-3xl lg:text-[28px] font-bold leading-tight px-4 sm:px-6 text-left pb-3 pt-5">
        Payments
      </h2>

      {/* Payment Summary */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-[#111618] mb-2">Total Earnings</h3>
            <p className="text-3xl font-bold text-green-600">€{totalEarnings.toLocaleString()}</p>
            <p className="text-sm text-[#617c89] mt-1">All time</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-[#111618] mb-2">Pending Payments</h3>
            <p className="text-3xl font-bold text-orange-500">€{pendingAmount.toLocaleString()}</p>
            <p className="text-sm text-[#617c89] mt-1">In escrow & pending</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-[#111618] mb-2">This Month</h3>
            <p className="text-3xl font-bold text-blue-600">€1,875</p>
            <p className="text-sm text-[#617c89] mt-1">July 2024</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-[#dbe2e6]">
            <div className="flex gap-4 sm:gap-8 px-4 sm:px-6 overflow-x-auto">
              {[
                { key: 'all', label: 'All Payments' },
                { key: 'pending', label: 'Pending' },
                { key: 'in-escrow', label: 'In Escrow' },
                { key: 'completed', label: 'Completed' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'border-b-[#111618] text-[#111618]'
                      : 'border-b-transparent text-[#617c89] hover:text-[#111618]'
                  }`}
                >
                  <p className={`text-sm font-bold leading-normal tracking-[0.015em] ${
                    activeTab === tab.key ? 'text-[#111618]' : 'text-[#617c89]'
                  }`}>
                    {tab.label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Payments List */}
          <div className="p-4 sm:p-6">
            {filteredPayments.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#617c89] text-lg">No payments found for this category.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPayments.map((payment) => (
                  <div key={payment.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col gap-2">
                        <div>
                          <h3 className="text-lg font-semibold text-[#111618]">{payment.task}</h3>
                          <p className="text-[#617c89] text-sm">{payment.company}</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-xl font-bold text-[#111618]">€{payment.amount.toLocaleString()}</p>
                          <p className="text-[#617c89] text-sm">
                            {payment.status === 'completed' ? 'Paid on' : 'Due on'} {payment.dueDate || payment.date}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full sm:w-auto">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                        {getStatusText(payment.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Payment Information */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-[#111618] mb-3">Payment Information</h3>
          <div className="space-y-2 text-sm text-[#617c89]">
            <p>• Payments are processed through CodFleet's secure escrow system</p>
            <p>• Completed work is automatically released to your account within 2 business days</p>
            <p>• All payments are protected by CodFleet's payment guarantee</p>
            <p>• You can track payment status in real-time through this dashboard</p>
          </div>
        </div>

        {/* Bank Account Information */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-[#111618] mb-4">Bank Account Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#111618] text-sm font-medium mb-2">Account Holder Name</label>
              <input
                type="text"
                value="John Doe"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-2 focus:ring-[#1193d4] focus:ring-opacity-20 border border-[#dbe2e6] bg-white focus:border-[#1193d4] h-10 placeholder:text-[#617c89] p-3 text-sm font-normal leading-normal"
              />
            </div>
            <div>
              <label className="block text-[#111618] text-sm font-medium mb-2">IBAN</label>
              <input
                type="text"
                value="FI21 1234 5600 0007 85"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-2 focus:ring-[#1193d4] focus:ring-opacity-20 border border-[#dbe2e6] bg-white focus:border-[#1193d4] h-10 placeholder:text-[#617c89] p-3 text-sm font-normal leading-normal"
              />
            </div>
          </div>
          <div className="mt-4">
            <button className="flex w-full sm:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1193d4] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#0f7bb8] transition-colors">
              <span className="truncate">Update Bank Details</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerPaymentsPage;
