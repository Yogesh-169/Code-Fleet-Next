'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ComplianceMonitor() {
  const [searchTerm, setSearchTerm] = useState('');
  const [alerts] = useState([
    {
      id: 1,
      alert: 'Freelancer Alex - YEL expired',
      status: 'Needs action',
      statusType: 'warning',
      actions: 'Mark resolved, escalate to Support, Notify'
    },
    {
      id: 2,
      alert: 'Company Tech Solutions Inc. - missing VAT doc',
      status: 'Blocked',
      statusType: 'error',
      actions: 'Mark resolved, escalate to Support, Notify'
    },
    {
      id: 3,
      alert: 'Task Project Alpha - no insurance attached',
      status: 'OK',
      statusType: 'success',
      actions: 'Mark resolved, escalate to Support, Notify'
    }
  ]);

  const filteredAlerts = alerts.filter(alert =>
    alert.alert.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusButtonClass = (statusType: string) => {
    switch (statusType) {
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-[#f0f3f4] text-[#111618]';
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
              <Link href="/superadmin/compliance" className="text-[#1193d4] text-sm font-medium leading-normal">Compliance</Link>
              <Link href="/superadmin/risk" className="text-[#111618] text-sm font-medium leading-normal">Risk</Link>
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
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f0f3f4] text-[#111618] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
              <div className="text-[#111618]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z" />
                </svg>
              </div>
            </button>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDaGLZc2VY3hwXgvsoEUKc0UARZ0f7Ex8Z2SVtQWROQ3HKTbhdXBfBlvJwYzGm_-SWx4GBdOxL2oGsojFcRxE9UUeapwcum_AITI2VgO_r_2hzkkGxulOXFSWFFexEVp-3cBj-8Ngf7-EbGpjYilL5Yqk1XmykUkakMhQylgPk51Hhudz97WdD-bNrHcbpox4mMu6iu6AK4OvVB_LbqVq4Ij1rce5VWxl63VPjOsq_aIK-sy32KFKzIqsk6irl1-Dc_N-iydrAQEsVO")'}} />
          </div>
        </header>

        {/* Main Content */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 p-4">
              <Link href="/superadmin" className="text-[#617c89] text-base font-medium leading-normal hover:text-[#111618]">Super Admin</Link>
              <span className="text-[#617c89] text-base font-medium leading-normal">/</span>
              <span className="text-[#111618] text-base font-medium leading-normal">Compliance Monitor</span>
            </div>

            {/* Page Title */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <h1 className="text-[#111618] tracking-light text-[32px] font-bold leading-tight min-w-72">Compliance Monitor</h1>
            </div>

            {/* Search Bar */}
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

            {/* Stats Cards */}
            <div className="flex flex-wrap gap-4 p-4">
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#dbe2e6]">
                <p className="text-[#111618] text-base font-medium leading-normal">Freelancers Green</p>
                <p className="text-[#111618] tracking-light text-2xl font-bold leading-tight">85%</p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#dbe2e6]">
                <p className="text-[#111618] text-base font-medium leading-normal">Companies Verified</p>
                <p className="text-[#111618] tracking-light text-2xl font-bold leading-tight">92%</p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#dbe2e6]">
                <p className="text-[#111618] text-base font-medium leading-normal">Active Compliance Alerts</p>
                <p className="text-[#111618] tracking-light text-2xl font-bold leading-tight">{alerts.length}</p>
              </div>
            </div>

            {/* Compliance Alerts Section */}
            <h2 className="text-[#111618] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Compliance Alerts</h2>
            <div className="px-4 py-3">
              <div className="flex overflow-hidden rounded-lg border border-[#dbe2e6] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="px-4 py-3 text-left text-[#111618] w-[400px] text-sm font-medium leading-normal">Alert</th>
                      <th className="px-4 py-3 text-left text-[#111618] w-60 text-sm font-medium leading-normal">Status</th>
                      <th className="px-4 py-3 text-left text-[#111618] w-60 text-[#617c89] text-sm font-medium leading-normal">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAlerts.map((alert) => (
                      <tr key={alert.id} className="border-t border-t-[#dbe2e6]">
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#111618] text-sm font-normal leading-normal">
                          {alert.alert}
                        </td>
                        <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                          <button
                            className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 text-sm font-medium leading-normal w-full border ${getStatusButtonClass(alert.statusType)}`}
                          >
                            <span className="truncate">{alert.status}</span>
                          </button>
                        </td>
                        <td className="h-[72px] px-4 py-2 w-60 text-[#617c89] text-sm font-bold leading-normal tracking-[0.015em]">
                          {alert.actions}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <p className="text-[#617c89] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline cursor-pointer hover:text-[#111618]">
              Download option: Audit Report PDF
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
