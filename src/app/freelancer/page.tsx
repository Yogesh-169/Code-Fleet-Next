'use client';

import React from 'react';
import Link from 'next/link';

const FreelancerDashboard: React.FC = () => {
  return (
    <div className="w-full">
      <h2 className="text-[#111618] tracking-light text-2xl sm:text-3xl lg:text-[28px] font-bold leading-tight px-4 sm:px-6 text-left pb-3 pt-5">
        Welcome to Your Dashboard
      </h2>
      
      {/* Dashboard Stats */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-[#111618] mb-2">Active Tasks</h3>
            <p className="text-3xl font-bold text-[#1193d4]">3</p>
            <p className="text-sm text-[#617c89] mt-1">Currently working on</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-[#111618] mb-2">Total Earnings</h3>
            <p className="text-3xl font-bold text-green-600">$2,450</p>
            <p className="text-sm text-[#617c89] mt-1">This month</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-[#111618] mb-2">Pending Payments</h3>
            <p className="text-3xl font-bold text-orange-500">$850</p>
            <p className="text-sm text-[#617c89] mt-1">In escrow</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-[#111618] mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#111618]">Proposal accepted for "Compliance Specialist" role</p>
                <p className="text-xs text-[#617c89]">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#111618]">New task available: "Data Analysis Project"</p>
                <p className="text-xs text-[#617c89]">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-yellow-50 rounded-lg">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#111618]">Payment of $1,200 received</p>
                <p className="text-xs text-[#617c89]">1 day ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-[#111618] mb-4">Quick Actions</h3>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Link
              href="/freelancer/tasks"
              className="flex w-full sm:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1193d4] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#0f7bb8] transition-colors"
            >
              <span className="truncate">View My Tasks</span>
            </Link>
            <Link
              href="/freelancer/profile"
              className="flex w-full sm:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#e8ebed] transition-colors"
            >
              <span className="truncate">Update Profile</span>
            </Link>
            <Link
              href="/freelancer/payments"
              className="flex w-full sm:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#e8ebed] transition-colors"
            >
              <span className="truncate">View Payments</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
