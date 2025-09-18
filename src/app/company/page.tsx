'use client';

import React from 'react';
import Link from 'next/link';

const CompanyDashboard: React.FC = () => {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          <div className="col-span-12 lg:col-span-8 space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm border border-gray-100">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Active Tasks</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mt-1">12</p>
              </div>
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm border border-gray-100">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Freelancers Engaged</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mt-1">8</p>
              </div>
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm border border-gray-100">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Invoices Due/Paid</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mt-1">$5k / $15k</p>
              </div>
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm border border-gray-100">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Compliance Status</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 mt-1">Compliant</p>
              </div>
            </div>

            {/* Task Snapshot */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 p-4 sm:p-6">Task Snapshot</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 sm:px-4 lg:px-6 py-3 text-left font-semibold text-gray-600">Task</th>
                      <th className="px-3 sm:px-4 lg:px-6 py-3 text-left font-semibold text-gray-600">Status</th>
                      <th className="hidden sm:table-cell px-3 sm:px-4 lg:px-6 py-3 text-left font-semibold text-gray-600">Freelancer</th>
                      <th className="hidden md:table-cell px-3 sm:px-4 lg:px-6 py-3 text-left font-semibold text-gray-600">Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200">
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-gray-800 font-medium">Project Alpha</td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          In Progress
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-gray-600">Liam Harper</td>
                      <td className="hidden md:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-gray-600">2024-08-15</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-gray-800 font-medium">Project Beta</td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-gray-600">Olivia Bennett</td>
                      <td className="hidden md:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-gray-600">2024-07-20</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-gray-800 font-medium">Project Gamma</td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          In Progress
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-gray-600">Noah Carter</td>
                      <td className="hidden md:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-gray-600">2024-09-01</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-gray-800 font-medium">Project Delta</td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-gray-600">Ava Morgan</td>
                      <td className="hidden md:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-gray-600">2024-08-25</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-gray-800 font-medium">Project Epsilon</td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          In Progress
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-gray-600">Ethan Hayes</td>
                      <td className="hidden md:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-gray-600">2024-09-10</td>
                    </tr>
                  </tbody>
            </table>
          </div>
        </div>

            {/* Financial Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 p-4 sm:p-6">Financial Overview</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Monthly Spend vs Forecast</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">$12,500</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-500">Last 6 Months</p>
                <p className="text-sm font-medium text-green-600">+15%</p>
              </div>
              <div className="mt-4 h-40">
                <svg fill="none" height="100%" preserveAspectRatio="none" viewBox="0 0 472 150" width="100%" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H0V109Z" fill="url(#paint0_linear_1131_5935_new)"></path>
                  <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="#1d90c9" strokeLinecap="round" strokeWidth="2"></path>
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1131_5935_new" x1="236" x2="236" y1="1" y2="149">
                      <stop stopColor="#1d90c9" stopOpacity="0.2"></stop>
                      <stop offset="1" stopColor="#1d90c9" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold text-gray-800">Breakdown</p>
              <div className="flex justify-between text-sm">
                <p className="text-gray-600">Freelancer Payouts</p>
                <p className="font-medium text-gray-800">$8,000</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-gray-600">Platform Fees</p>
                <p className="font-medium text-gray-800">$2,000</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-gray-600">Escrow Hold</p>
                <p className="font-medium text-gray-800">$2,500</p>
              </div>
            </div>
          </div>
        </div>
      </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Compliance Alerts */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Compliance Alerts</h2>
              <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
                <div className="flex gap-3 sm:gap-4">
                  <div className="size-8 sm:size-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-red-600 text-sm sm:text-base">Expiring Visa</p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">Sophia Clark's visa expires in 30 days. Please review.</p>
                  </div>
                </div>
                <div className="flex gap-3 sm:gap-4">
                  <div className="size-8 sm:size-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-yellow-600 text-sm sm:text-base">Pending Insurance Verification</p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">Awaiting insurance documents from Caleb Foster.</p>
                  </div>
                </div>
          </div>
        </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  href="/company/tasks/post"
                  className="flex w-full items-center justify-center rounded-lg h-10 px-4 bg-[#1d90c9] text-white text-sm font-bold hover:bg-[#1766b5] transition-colors"
                >
                  Post New Task
                </Link>
                <Link
                  href="/company/talent-pool"
                  className="flex w-full items-center justify-center rounded-lg h-10 px-4 bg-[#e8eff3] text-[#0e161b] text-sm font-bold hover:bg-[#d1dde6] transition-colors"
                >
                  Browse Talent Pool
                </Link>
                <Link
                  href="/company/compliance"
                  className="flex w-full items-center justify-center rounded-lg h-10 px-4 bg-[#e8eff3] text-[#0e161b] text-sm font-bold hover:bg-[#d1dde6] transition-colors"
                >
                  View Compliance Status
                </Link>
              </div>
            </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
