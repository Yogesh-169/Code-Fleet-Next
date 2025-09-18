'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RiskCenter() {
  const [activeTab, setActiveTab] = useState('blacklist');
  const [searchTerm, setSearchTerm] = useState('');

  const blacklistData = [
    {
      entity: 'Freelancer: Alex Bennett',
      reason: 'Suspicious activity detected',
      severity: 'High',
      date: '2023-09-15',
      actions: 'Blacklist, Review, Clear'
    },
    {
      entity: 'Company: Tech Innovators Inc.',
      reason: 'Violation of terms of service',
      severity: 'Medium',
      date: '2023-09-10',
      actions: 'Blacklist, Review, Clear'
    },
    {
      entity: 'Freelancer: Sarah Collins',
      reason: 'Fraudulent payment attempts',
      severity: 'High',
      date: '2023-09-05',
      actions: 'Blacklist, Review, Clear'
    },
    {
      entity: 'Company: Global Solutions Ltd.',
      reason: 'Repeated policy violations',
      severity: 'Medium',
      date: '2023-08-28',
      actions: 'Blacklist, Review, Clear'
    },
    {
      entity: 'Freelancer: Mark Thompson',
      reason: 'Identity theft suspected',
      severity: 'High',
      date: '2023-08-20',
      actions: 'Blacklist, Review, Clear'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{fontFamily: 'Inter, "Noto Sans", sans-serif'}}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f3f4] px-10 py-3">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-[#111618]">
              <div className="size-4">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h2 className="text-[#111618] text-lg font-bold leading-tight tracking-[-0.015em]">CodFleet</h2>
            </div>
            <div className="flex items-center gap-9">
              <Link href="/superadmin" className="text-[#111618] text-sm font-medium leading-normal">Dashboard</Link>
              <Link href="/superadmin/users" className="text-[#111618] text-sm font-medium leading-normal">Users</Link>
              <Link href="/superadmin/documents" className="text-[#111618] text-sm font-medium leading-normal">Documents</Link>
              <Link href="/superadmin/tasks" className="text-[#111618] text-sm font-medium leading-normal">Tasks</Link>
              <Link href="/superadmin/compliance" className="text-[#111618] text-sm font-medium leading-normal">Compliance</Link>
              <Link href="/superadmin/risk" className="text-[#111618] text-sm font-bold leading-normal border-b-2 border-[#111618]">Risk</Link>
            </div>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <label className="flex flex-col min-w-40 !h-10 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div className="text-[#617c89] flex border-none bg-[#f0f3f4] items-center justify-center pl-4 rounded-l-lg border-r-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                  </svg>
                </div>
                <input
                  placeholder="Search"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-0 border-none bg-[#f0f3f4] focus:border-none h-full placeholder:text-[#617c89] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                />
              </div>
            </label>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDVuo9LpVT37xmALFw1TtTuGGsDgkRV3Byj3FQB0UAwZms2yhnq-hNbn0vm226_e7V2HbBcwosdEwn5rjZUl8BP63eJKsv8ZwaA-5g1gGjR2ox_Yh3kV3d5y2ka1O7zV4AXVO1wyao0fff1foyIWJDeZL9iPvn8-U4dTl4QsZz6UP9Iptw3aSqBK4heFUhV4LsrxYpSt1n47sD3eC4WTItnaJ6OS6GkivacrkUsR87dKvxxG9eewheuNZUa5JHnh0CqAUm-hbzcwCDA")'}} />
          </div>
        </header>

        {/* Main Content */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 p-4">
              <Link href="/superadmin" className="text-[#617c89] text-base font-medium leading-normal hover:text-[#111618]">Risk Center</Link>
              <span className="text-[#617c89] text-base font-medium leading-normal">/</span>
              <span className="text-[#111618] text-base font-medium leading-normal">Fraud & Violations</span>
            </div>

            {/* Page Title */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <h1 className="text-[#111618] tracking-light text-[32px] font-bold leading-tight min-w-72">Risk Center — Fraud & Violations</h1>
            </div>

            {/* Tabs */}
            <div className="pb-3">
              <div className="flex border-b border-[#dbe2e6] px-4 gap-8">
                <button
                  onClick={() => setActiveTab('fraud-alerts')}
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                    activeTab === 'fraud-alerts'
                      ? 'border-b-[#111618] text-[#111618]'
                      : 'border-b-transparent text-[#617c89]'
                  }`}
                >
                  <p className="text-sm font-bold leading-normal tracking-[0.015em]">Fraud Alerts</p>
                </button>
                <button
                  onClick={() => setActiveTab('violations')}
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                    activeTab === 'violations'
                      ? 'border-b-[#111618] text-[#111618]'
                      : 'border-b-transparent text-[#617c89]'
                  }`}
                >
                  <p className="text-sm font-bold leading-normal tracking-[0.015em]">Violations</p>
                </button>
                <button
                  onClick={() => setActiveTab('blacklist')}
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                    activeTab === 'blacklist'
                      ? 'border-b-[#111618] text-[#111618]'
                      : 'border-b-transparent text-[#617c89]'
                  }`}
                >
                  <p className="text-sm font-bold leading-normal tracking-[0.015em]">Blacklist</p>
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="px-4 py-3">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                  <div className="text-[#617c89] flex border-none bg-[#f0f3f4] items-center justify-center pl-4 rounded-l-lg border-r-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                    </svg>
                  </div>
                  <input
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-0 border-none bg-[#f0f3f4] focus:border-none h-full placeholder:text-[#617c89] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                  />
                </div>
              </label>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'blacklist' && (
              <div className="px-4 py-3 @container">
                <div className="flex overflow-hidden rounded-lg border border-[#dbe2e6] bg-white">
                  <table className="flex-1">
                    <thead>
                      <tr className="bg-white">
                        <th className="px-4 py-3 text-left text-[#111618] w-[400px] text-sm font-medium leading-normal">Entity</th>
                        <th className="px-4 py-3 text-left text-[#111618] w-[400px] text-sm font-medium leading-normal">Reason</th>
                        <th className="px-4 py-3 text-left text-[#111618] w-60 text-sm font-medium leading-normal">Severity</th>
                        <th className="px-4 py-3 text-left text-[#111618] w-[400px] text-sm font-medium leading-normal">Date</th>
                        <th className="px-4 py-3 text-left text-[#111618] w-60 text-[#617c89] text-sm font-medium leading-normal">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {blacklistData.map((item, index) => (
                        <tr key={index} className="border-t border-t-[#dbe2e6]">
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#111618] text-sm font-normal leading-normal">
                            {item.entity}
                          </td>
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">
                            {item.reason}
                          </td>
                          <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                            <button className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 w-full ${getSeverityColor(item.severity)}`}>
                              <span className="truncate">{item.severity}</span>
                            </button>
                          </td>
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">
                            {item.date}
                          </td>
                          <td className="h-[72px] px-4 py-2 w-60 text-[#617c89] text-sm font-bold leading-normal tracking-[0.015em]">
                            {item.actions}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'fraud-alerts' && (
              <div className="px-4 py-3">
                <div className="flex items-center justify-center h-64 border border-[#dbe2e6] rounded-lg bg-gray-50">
                  <p className="text-[#617c89] text-lg">Fraud Alerts content coming soon...</p>
                </div>
              </div>
            )}

            {activeTab === 'violations' && (
              <div className="px-4 py-3">
                <div className="flex items-center justify-center h-64 border border-[#dbe2e6] rounded-lg bg-gray-50">
                  <p className="text-[#617c89] text-lg">Violations content coming soon...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <p className="text-[#617c89] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">© 2023 CodFleet. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
