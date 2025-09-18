'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const CompanyTasksPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const tasks = [
    {
      id: 1,
      title: 'Project Alpha',
      status: 'in-progress',
      freelancer: 'Liam Harper',
      dueDate: '2024-08-15',
      payRate: '€25/hour',
      hours: '20 hours/week',
      applicants: 12,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbVY2NXV96D1ixi0hARLRA3DLS-cLxKocRHP0nHrYPPNSq01A0FLP0BLjV-P7JTBlCW4tHapfd91s6xy6rUJQcagQ7ShLmTy9L3-rwKpTLIpxVHae1RkSQv8R8E2sE5ACTqM-jatzp10EEPFpRI7D44Kws69f0mJStLNoGseVBbhiBO6hs51qnfAuevNemS1Ny5PCbY-5Uu4kfuBN29KUu5mJrIHd7OPW-hAgVqrult2P_d9fCGZ1GLVn-M9rW9R8wjMfKqA9YEpU'
    },
    {
      id: 2,
      title: 'Project Beta',
      status: 'completed',
      freelancer: 'Olivia Bennett',
      dueDate: '2024-07-20',
      payRate: '€30/hour',
      hours: '25 hours/week',
      applicants: 8,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbVY2NXV96D1ixi0hARLRA3DLS-cLxKocRHP0nHrYPPNSq01A0FLP0BLjV-P7JTBlCW4tHapfd91s6xy6rUJQcagQ7ShLmTy9L3-rwKpTLIpxVHae1RkSQv8R8E2sE5ACTqM-jatzp10EEPFpRI7D44Kws69f0mJStLNoGseVBbhiBO6hs51qnfAuevNemS1Ny5PCbY-5Uu4kfuBN29KUu5mJrIHd7OPW-hAgVqrult2P_d9fCGZ1GLVn-M9rW9R8wjMfKqA9YEpU'
    },
    {
      id: 3,
      title: 'Project Gamma',
      status: 'in-progress',
      freelancer: 'Noah Carter',
      dueDate: '2024-09-01',
      payRate: '€22/hour',
      hours: '30 hours/week',
      applicants: 15,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbVY2NXV96D1ixi0hARLRA3DLS-cLxKocRHP0nHrYPPNSq01A0FLP0BLjV-P7JTBlCW4tHapfd91s6xy6rUJQcagQ7ShLmTy9L3-rwKpTLIpxVHae1RkSQv8R8E2sE5ACTqM-jatzp10EEPFpRI7D44Kws69f0mJStLNoGseVBbhiBO6hs51qnfAuevNemS1Ny5PCbY-5Uu4kfuBN29KUu5mJrIHd7OPW-hAgVqrult2P_d9fCGZ1GLVn-M9rW9R8wjMfKqA9YEpU'
    },
    {
      id: 4,
      title: 'Project Delta',
      status: 'pending-approval',
      freelancer: 'Ava Morgan',
      dueDate: '2024-08-25',
      payRate: '€28/hour',
      hours: '15 hours/week',
      applicants: 6,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbVY2NXV96D1ixi0hARLRA3DLS-cLxKocRHP0nHrYPPNSq01A0FLP0BLjV-P7JTBlCW4tHapfd91s6xy6rUJQcagQ7ShLmTy9L3-rwKpTLIpxVHae1RkSQv8R8E2sE5ACTqM-jatzp10EEPFpRI7D44Kws69f0mJStLNoGseVBbhiBO6hs51qnfAuevNemS1Ny5PCbY-5Uu4kfuBN29KUu5mJrIHd7OPW-hAgVqrult2P_d9fCGZ1GLVn-M9rW9R8wjMfKqA9YEpU'
    },
    {
      id: 5,
      title: 'Project Epsilon',
      status: 'in-progress',
      freelancer: 'Ethan Hayes',
      dueDate: '2024-09-10',
      payRate: '€35/hour',
      hours: '20 hours/week',
      applicants: 9,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbVY2NXV96D1ixi0hARLRA3DLS-cLxKocRHP0nHrYPPNSq01A0FLP0BLjV-P7JTBlCW4tHapfd91s6xy6rUJQcagQ7ShLmTy9L3-rwKpTLIpxVHae1RkSQv8R8E2sE5ACTqM-jatzp10EEPFpRI7D44Kws69f0mJStLNoGseVBbhiBO6hs51qnfAuevNemS1Ny5PCbY-5Uu4kfuBN29KUu5mJrIHd7OPW-hAgVqrult2P_d9fCGZ1GLVn-M9rW9R8wjMfKqA9YEpU'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending-approval':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'pending-approval':
        return 'Pending Approval';
      case 'draft':
        return 'Draft';
      default:
        return status;
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'all') return true;
    return task.status === activeTab;
  });

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Manage your posted tasks and track progress</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 sm:mb-8">
          <div className="border-b border-gray-200">
            <div className="flex gap-2 sm:gap-4 lg:gap-8 overflow-x-auto pb-1">
              {[
                { key: 'all', label: 'All Tasks' },
                { key: 'in-progress', label: 'In Progress' },
                { key: 'pending-approval', label: 'Pending' },
                { key: 'completed', label: 'Completed' },
                { key: 'draft', label: 'Drafts' }
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

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredTasks.map((task) => (
            <div key={task.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Task Image */}
              <div
                className="w-full h-32 sm:h-40 lg:h-48 bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: `url("${task.image}")` }}
              />
              
              {/* Task Content */}
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex-1 mr-2">{task.title}</h3>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getStatusColor(task.status)}`}>
                    {getStatusText(task.status)}
                  </span>
                </div>
                
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z" />
                    </svg>
                    <span>{task.freelancer}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H128v40a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h24V80a8,8,0,0,1,16,0v40h40A8,8,0,0,1,176,128Z" />
                    </svg>
                    <span>Due: {task.dueDate}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z" />
                    </svg>
                    <span>{task.payRate}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H128v40a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h24V80a8,8,0,0,1,16,0v40h40A8,8,0,0,1,176,128Z" />
                    </svg>
                    <span>{task.hours}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z" />
                    </svg>
                    <span>{task.applicants} applicants</span>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
                  <Link
                    href={`/company/tasks/${task.id}`}
                    className="flex-1 text-center py-2 px-3 rounded-lg border border-gray-300 hover:bg-gray-50 text-xs sm:text-sm font-medium transition-colors"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/company/tasks/${task.id}/applicants`}
                    className="flex-1 text-center py-2 px-3 rounded-lg bg-[#1d90c9] text-white hover:bg-[#1766b5] text-xs sm:text-sm font-medium transition-colors"
                  >
                    View Applicants
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">No tasks match your current filter criteria.</p>
            <Link
              href="/company/tasks/post"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#1d90c9] hover:bg-[#1766b5] transition-colors"
            >
              Post New Task
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyTasksPage;
