'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Task {
  id: string;
  title: string;
  company: string;
  status: 'active' | 'pending' | 'completed' | 'proposal-accepted';
  rate: string;
  hours: string;
  startDate: string;
  endDate: string;
  description: string;
  image: string;
}

const FreelancerTasksPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'pending' | 'completed'>('all');

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Compliance Specialist',
      company: 'SecureTech Solutions',
      status: 'proposal-accepted',
      rate: '$60/hour',
      hours: '20 hours/week',
      startDate: 'July 15, 2024',
      endDate: 'October 15, 2024',
      description: 'Ensure compliance with industry regulations and standards.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMtydWoeGvCgxc0fiQPoRENDoi0uJpYsrl6gK7sqSK6ZCGUINIpL3jHHUzDQmeQz7fljl4kDdkAz1cHZsk9HIWC4xDbuD5_0epL5nvkYjaPyyP5EC2uW2dJx1uS0z3BFdpLpHWCDMW46myvzLg1J138cZgp2m8r-eslX1WcFa031y5u-yolNEh28TddfMGj9CSIZJHwCspfk5lESnnmdiEuj4aIMuRekuzPVpcBXNt1um4PgOuIWRQWLBVOgX9HiCk-aXE3anvPfuD'
    },
    {
      id: '2',
      title: 'Data Analysis Project',
      company: 'TechCorp Inc',
      status: 'active',
      rate: '$45/hour',
      hours: '15 hours/week',
      startDate: 'June 1, 2024',
      endDate: 'August 30, 2024',
      description: 'Analyze customer data and provide insights for business decisions.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADRcxt4nj7Cl1jexqaccisgkEbvnCWt7xrZDVc_f6Z6rBtGm66Aw-zTTwltB7bO4Y7U5FEgTdNOLFSbn7AMTv_ApE8-RjONuIzcQ7Ue7tl1rgobFKZssK4u9lq0OSPf-Pvri_KNIFqKNShkiCJSznqTuJIBHgT7vFCrzYJHSbek1u4ZXzn4-AxMRscKPr4fG6L6bpnIrKJqF9IgFSZEvIrb2zRYJJecu9F1iRMbHfPkoRwiiflLVWB319VfD8_IP5E_PWHDjxxPXAO'
    },
    {
      id: '3',
      title: 'UI/UX Design Review',
      company: 'DesignStudio',
      status: 'pending',
      rate: '$50/hour',
      hours: '10 hours/week',
      startDate: 'August 1, 2024',
      endDate: 'September 30, 2024',
      description: 'Review and improve user interface designs for mobile application.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMtydWoeGvCgxc0fiQPoRENDoi0uJpYsrl6gK7sqSK6ZCGUINIpL3jHHUzDQmeQz7fljl4kDdkAz1cHZsk9HIWC4xDbuD5_0epL5nvkYjaPyyP5EC2uW2dJx1uS0z3BFdpLpHWCDMW46myvzLg1J138cZgp2m8r-eslX1WcFa031y5u-yolNEh28TddfMGj9CSIZJHwCspfk5lESnnmdiEuj4aIMuRekuzPVpcBXNt1um4PgOuIWRQWLBVOgX9HiCk-aXE3anvPfuD'
    }
  ];

  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return task.status === 'active' || task.status === 'proposal-accepted';
    return task.status === activeTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'proposal-accepted':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'proposal-accepted':
        return 'Proposal Accepted';
      case 'active':
        return 'Active';
      case 'pending':
        return 'Pending';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-[#111618] tracking-light text-2xl sm:text-3xl lg:text-[28px] font-bold leading-tight px-4 sm:px-6 text-left pb-3 pt-5">
        My Tasks
      </h2>

      {/* Tab Navigation */}
      <div className="px-4 sm:px-6 pb-3">
        <div className="flex border-b border-[#dbe2e6] gap-4 sm:gap-8 overflow-x-auto">
          {[
            { key: 'all', label: 'All Tasks' },
            { key: 'active', label: 'Active' },
            { key: 'pending', label: 'Pending' },
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

      {/* Tasks List */}
      <div className="p-4 sm:p-6 space-y-6">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#617c89] text-lg">No tasks found for this category.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Task Image */}
                  <div
                    className="w-full lg:w-64 h-48 lg:h-32 bg-center bg-no-repeat bg-cover rounded-lg flex-shrink-0"
                    style={{ backgroundImage: `url("${task.image}")` }}
                  />
                  
                  {/* Task Details */}
                  <div className="flex-1">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-[#111618] mb-2">{task.title}</h3>
                          <p className="text-[#617c89] text-sm mb-3">{task.company}</p>
                          <p className="text-[#617c89] text-sm mb-4">{task.description}</p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-[#111618]">Rate: </span>
                              <span className="text-[#617c89]">{task.rate}</span>
                            </div>
                            <div>
                              <span className="font-medium text-[#111618]">Hours: </span>
                              <span className="text-[#617c89]">{task.hours}</span>
                            </div>
                            <div>
                              <span className="font-medium text-[#111618]">Start Date: </span>
                              <span className="text-[#617c89]">{task.startDate}</span>
                            </div>
                            <div>
                              <span className="font-medium text-[#111618]">End Date: </span>
                              <span className="text-[#617c89]">{task.endDate}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Status */}
                        <div className="flex flex-col items-start sm:items-end gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                            {getStatusText(task.status)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        {task.status === 'proposal-accepted' && (
                          <Link
                            href="/freelancer/proposal-accepted"
                            className="flex w-full sm:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1193d4] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#0f7bb8] transition-colors"
                          >
                            <span className="truncate">View Details</span>
                          </Link>
                        )}
                        
                        {task.status === 'active' && (
                          <button className="flex w-full sm:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1193d4] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#0f7bb8] transition-colors">
                            <span className="truncate">Continue Work</span>
                          </button>
                        )}
                        
                        {task.status === 'pending' && (
                          <button className="flex w-full sm:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#e8ebed] transition-colors">
                            <span className="truncate">View Proposal</span>
                          </button>
                        )}
                        
                        <button className="flex w-full sm:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-transparent text-[#111618] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-50 transition-colors border border-gray-300">
                          <span className="truncate">Message Client</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FreelancerTasksPage;
