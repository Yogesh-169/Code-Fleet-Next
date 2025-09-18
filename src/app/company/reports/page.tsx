'use client';

import React, { useState } from 'react';

const CompanyReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30days');

  const reportData = {
    overview: {
      totalSpent: 15750,
      totalTasks: 25,
      activeFreelancers: 12,
      averageTaskDuration: 4.2,
      completionRate: 96,
      satisfactionScore: 4.7
    },
    financial: {
      monthlySpending: [
        { month: 'Feb', amount: 3200 },
        { month: 'Mar', amount: 2800 },
        { month: 'Apr', amount: 3500 },
        { month: 'May', amount: 4200 },
        { month: 'Jun', amount: 3800 },
        { month: 'Jul', amount: 4250 }
      ],
      categoryBreakdown: [
        { category: 'Development', amount: 8500, percentage: 54 },
        { category: 'Design', amount: 3200, percentage: 20 },
        { category: 'Marketing', amount: 2800, percentage: 18 },
        { category: 'Other', amount: 1250, percentage: 8 }
      ]
    },
    performance: {
      topFreelancers: [
        { name: 'Liam Harper', tasks: 8, rating: 4.9, totalEarned: 4200 },
        { name: 'Olivia Bennett', tasks: 6, rating: 4.8, totalEarned: 3600 },
        { name: 'Noah Carter', tasks: 5, rating: 4.7, totalEarned: 2800 },
        { name: 'Ava Morgan', tasks: 4, rating: 4.6, totalEarned: 2400 }
      ],
      taskMetrics: {
        averageCompletionTime: 3.8,
        onTimeDelivery: 94,
        qualityScore: 4.6,
        reworkRate: 6
      }
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="text-gray-600 mt-2">Track performance and analyze your freelancer operations</p>
            </div>
            <div className="flex gap-4">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1d90c9] focus:border-[#1d90c9]"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="1year">Last year</option>
              </select>
              <button className="px-4 py-2 bg-[#1d90c9] text-white rounded-lg hover:bg-[#1766b5] transition-colors">
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <div className="flex gap-4 sm:gap-8 overflow-x-auto">
              {[
                { key: 'overview', label: 'Overview' },
                { key: 'financial', label: 'Financial' },
                { key: 'performance', label: 'Performance' },
                { key: 'compliance', label: 'Compliance' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'border-b-[#0e161b] text-[#0e161b]'
                      : 'border-b-transparent text-[#507e95] hover:text-[#0e161b]'
                  }`}
                >
                  <p className={`text-sm font-bold leading-normal tracking-[0.015em] ${
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
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Spent</h3>
                <p className="text-3xl font-bold text-gray-800">€{reportData.overview.totalSpent.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">+12% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Tasks</h3>
                <p className="text-3xl font-bold text-gray-800">{reportData.overview.totalTasks}</p>
                <p className="text-sm text-gray-500 mt-1">+3 from last month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Active Freelancers</h3>
                <p className="text-3xl font-bold text-gray-800">{reportData.overview.activeFreelancers}</p>
                <p className="text-sm text-gray-500 mt-1">Currently working</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Avg. Task Duration</h3>
                <p className="text-3xl font-bold text-gray-800">{reportData.overview.averageTaskDuration} weeks</p>
                <p className="text-sm text-gray-500 mt-1">-0.3 weeks improvement</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Completion Rate</h3>
                <p className="text-3xl font-bold text-green-600">{reportData.overview.completionRate}%</p>
                <p className="text-sm text-gray-500 mt-1">+2% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Satisfaction Score</h3>
                <p className="text-3xl font-bold text-blue-600">{reportData.overview.satisfactionScore}/5</p>
                <p className="text-sm text-gray-500 mt-1">+0.2 improvement</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Spending Trend</h3>
                <div className="h-64 flex items-end justify-between gap-2">
                  {reportData.financial.monthlySpending.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className="w-8 bg-[#1d90c9] rounded-t"
                        style={{ height: `${(item.amount / 5000) * 200}px` }}
                      />
                      <span className="text-xs text-gray-500 mt-2">{item.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Spending by Category</h3>
                <div className="space-y-4">
                  {reportData.financial.categoryBreakdown.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.category}</span>
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
            </div>
          </div>
        )}

        {activeTab === 'financial' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Monthly Spending</h3>
                <div className="space-y-4">
                  {reportData.financial.monthlySpending.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-800">{item.month} 2024</span>
                      <span className="text-lg font-bold text-gray-800">€{item.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Cost Analysis</h3>
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-800">€{reportData.overview.totalSpent.toLocaleString()}</p>
                    <p className="text-gray-500">Total Spent</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">€8,500</p>
                      <p className="text-sm text-blue-600">Freelancer Payments</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">€2,100</p>
                      <p className="text-sm text-green-600">Platform Fees</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Top Performing Freelancers</h3>
                <div className="space-y-4">
                  {reportData.performance.topFreelancers.map((freelancer, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#1d90c9] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {freelancer.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{freelancer.name}</p>
                          <p className="text-sm text-gray-500">{freelancer.tasks} tasks completed</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">⭐ {freelancer.rating}</p>
                        <p className="text-sm text-gray-500">€{freelancer.totalEarned.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Task Performance Metrics</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Completion Time</span>
                    <span className="text-2xl font-bold text-gray-800">{reportData.performance.taskMetrics.averageCompletionTime} weeks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">On-Time Delivery</span>
                    <span className="text-2xl font-bold text-green-600">{reportData.performance.taskMetrics.onTimeDelivery}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Quality Score</span>
                    <span className="text-2xl font-bold text-blue-600">{reportData.performance.taskMetrics.qualityScore}/5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rework Rate</span>
                    <span className="text-2xl font-bold text-orange-600">{reportData.performance.taskMetrics.reworkRate}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'compliance' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Compliance Rate</h3>
                <p className="text-3xl font-bold text-green-600">94%</p>
                <p className="text-sm text-gray-500 mt-1">All freelancers compliant</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Document Verification</h3>
                <p className="text-3xl font-bold text-blue-600">98%</p>
                <p className="text-sm text-gray-500 mt-1">Documents verified</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Active Alerts</h3>
                <p className="text-3xl font-bold text-yellow-600">3</p>
                <p className="text-sm text-gray-500 mt-1">Require attention</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Compliance Status Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">10</p>
                  <p className="text-sm text-green-600">Fully Compliant</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">2</p>
                  <p className="text-sm text-yellow-600">Partially Compliant</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">0</p>
                  <p className="text-sm text-red-600">Non-Compliant</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">12</p>
                  <p className="text-sm text-blue-600">Total Freelancers</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyReportsPage;
