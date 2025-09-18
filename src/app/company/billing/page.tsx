'use client';

import React, { useState } from 'react';

const CompanyBillingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const billingData = {
    totalSpent: 15750,
    pendingPayments: 3200,
    thisMonth: 4250,
    lastMonth: 3800,
    invoices: [
      {
        id: 'INV-2024-001',
        date: '2024-08-01',
        amount: 2500,
        status: 'paid',
        description: 'Project Alpha - Liam Harper',
        dueDate: '2024-08-15'
      },
      {
        id: 'INV-2024-002',
        date: '2024-08-05',
        amount: 1800,
        status: 'paid',
        description: 'Project Beta - Olivia Bennett',
        dueDate: '2024-08-20'
      },
      {
        id: 'INV-2024-003',
        date: '2024-08-10',
        amount: 3200,
        status: 'pending',
        description: 'Project Gamma - Noah Carter',
        dueDate: '2024-08-25'
      },
      {
        id: 'INV-2024-004',
        date: '2024-08-12',
        amount: 1500,
        status: 'overdue',
        description: 'Project Delta - Ava Morgan',
        dueDate: '2024-08-10'
      }
    ],
    upcomingPayments: [
      {
        id: 'UP-001',
        freelancer: 'Ethan Hayes',
        project: 'Project Epsilon',
        amount: 2100,
        dueDate: '2024-08-30',
        status: 'scheduled'
      },
      {
        id: 'UP-002',
        freelancer: 'Sophia Clark',
        project: 'Project Zeta',
        amount: 1800,
        dueDate: '2024-09-05',
        status: 'scheduled'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Paid';
      case 'pending':
        return 'Pending';
      case 'overdue':
        return 'Overdue';
      case 'scheduled':
        return 'Scheduled';
      default:
        return status;
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Billing & Invoices</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Manage your payments and track spending</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">Total Spent</h3>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">€{billingData.totalSpent.toLocaleString()}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">All time</p>
          </div>
          <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">Pending Payments</h3>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600">€{billingData.pendingPayments.toLocaleString()}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Awaiting payment</p>
          </div>
          <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">This Month</h3>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">€{billingData.thisMonth.toLocaleString()}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">August 2024</p>
          </div>
          <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">Last Month</h3>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-600">€{billingData.lastMonth.toLocaleString()}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">July 2024</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 sm:mb-8">
          <div className="border-b border-gray-200">
            <div className="flex gap-2 sm:gap-4 lg:gap-8 overflow-x-auto pb-1">
              {[
                { key: 'overview', label: 'Overview' },
                { key: 'invoices', label: 'Invoices' },
                { key: 'upcoming', label: 'Upcoming' },
                { key: 'reports', label: 'Reports' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-2 sm:pb-3 pt-3 sm:pt-4 transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'border-b-[#0e161b] text-[#0e161b]'
                      : 'border-b-transparent text-[#507e95] hover:text-[#0e161b]'
                  }`}
                >
                  <p className={`text-xs sm:text-sm font-bold leading-normal tracking-[0.015em] ${
                    activeTab === tab.key ? 'text-[#0e161b]' : 'text-[#507e95]'
                  }`}>
                    {tab.label}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Spending Chart */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Spending Trend</h3>
              <div className="h-48 sm:h-64 flex items-end justify-between gap-1 sm:gap-2">
                {[3200, 2800, 3500, 4200, 3800, 4250].map((amount, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="w-4 sm:w-6 lg:w-8 bg-[#1d90c9] rounded-t"
                      style={{ height: `${(amount / 5000) * 180}px` }}
                    />
                    <span className="text-xs text-gray-500 mt-2">
                      {['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Recent Activity</h3>
              <div className="space-y-3 sm:space-y-4">
                {billingData.invoices.slice(0, 4).map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-800 text-sm sm:text-base truncate">{invoice.description}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{invoice.date}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">€{invoice.amount.toLocaleString()}</p>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(invoice.status)}`}>
                        {getStatusText(invoice.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'invoices' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">All Invoices</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left font-semibold text-gray-600">Invoice ID</th>
                    <th className="hidden sm:table-cell px-3 sm:px-6 py-3 text-left font-semibold text-gray-600">Description</th>
                    <th className="px-3 sm:px-6 py-3 text-left font-semibold text-gray-600">Date</th>
                    <th className="px-3 sm:px-6 py-3 text-left font-semibold text-gray-600">Amount</th>
                    <th className="px-3 sm:px-6 py-3 text-left font-semibold text-gray-600">Status</th>
                    <th className="px-3 sm:px-6 py-3 text-left font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {billingData.invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-800 font-medium">{invoice.id}</td>
                      <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-gray-800">{invoice.description}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600">{invoice.date}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-800 font-semibold">€{invoice.amount.toLocaleString()}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(invoice.status)}`}>
                          {getStatusText(invoice.status)}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                          <button className="text-[#1d90c9] hover:text-[#1766b5] text-xs sm:text-sm font-medium">
                            Download
                          </button>
                          {invoice.status === 'pending' && (
                            <button className="text-[#1d90c9] hover:text-[#1766b5] text-xs sm:text-sm font-medium">
                              Pay Now
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'upcoming' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Upcoming Payments</h3>
              <div className="space-y-3 sm:space-y-4">
                {billingData.upcomingPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1d90c9] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm sm:text-lg">
                          {payment.freelancer.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">{payment.freelancer}</p>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{payment.project}</p>
                        <p className="text-xs sm:text-sm text-gray-500">Due: {payment.dueDate}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <p className="text-lg sm:text-xl font-bold text-gray-800">€{payment.amount.toLocaleString()}</p>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payment.status)}`}>
                        {getStatusText(payment.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Monthly Breakdown</h3>
              <div className="space-y-4">
                {[
                  { month: 'August 2024', amount: 4250, percentage: 100 },
                  { month: 'July 2024', amount: 3800, percentage: 89 },
                  { month: 'June 2024', amount: 3500, percentage: 82 },
                  { month: 'May 2024', amount: 4200, percentage: 99 },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.month}</span>
                      <span className="font-medium text-gray-800">€{item.amount.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#1d90c9] h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Payment Methods</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-sm font-bold">V</span>
                    </div>
                    <span className="font-medium text-sm sm:text-base">Visa ending in 4242</span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500">Primary</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                      <span className="text-white text-sm font-bold">M</span>
                    </div>
                    <span className="font-medium text-sm sm:text-base">Mastercard ending in 8888</span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500">Secondary</span>
                </div>
                <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#1d90c9] hover:text-[#1d90c9] transition-colors text-sm sm:text-base">
                  + Add Payment Method
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyBillingPage;
