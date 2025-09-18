'use client';

import Link from 'next/link';

export default function SuperAdminConsole() {
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
              <span className="text-[#111618] text-base font-medium leading-normal">Super Admin Console</span>
            </div>

            {/* Page Title */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <h1 className="text-[#111618] tracking-light text-[32px] font-bold leading-tight min-w-72">Super Admin Console</h1>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {/* Users & Roles Management */}
              <Link href="/superadmin/users" className="group">
                <div className="flex flex-col gap-4 rounded-lg p-6 border border-[#dbe2e6] hover:border-[#1193d4] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-[#111618]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M164.47,195.63a8,8,0,0,1-6.7,12.37H10.23a8,8,0,0,1-6.7-12.37,95.83,95.83,0,0,1,47.22-37.71,60,60,0,1,1,66.5,0A95.83,95.83,0,0,1,164.47,195.63Zm87.91-.15a95.87,95.87,0,0,0-47.13-37.56A60,60,0,0,0,144.7,54.59a4,4,0,0,0-1.33,6A75.83,75.83,0,0,1,147,150.53a4,4,0,0,0,1.07,5.53,112.32,112.32,0,0,1,29.85,30.83,23.92,23.92,0,0,1,3.65,16.47,4,4,0,0,0,3.95,4.64h60.3a8,8,0,0,0,7.73-5.93A8.22,8.22,0,0,0,252.38,195.48Z" />
                      </svg>
                    </div>
                    <h3 className="text-[#111618] text-lg font-bold leading-tight">Users & Roles</h3>
                  </div>
                  <p className="text-[#617c89] text-sm font-normal leading-normal">Manage all users, assign roles, and control access permissions across the platform.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#111618] text-2xl font-bold">1,247</span>
                    <span className="text-[#617c89] text-sm">Active Users</span>
                  </div>
                </div>
              </Link>

              {/* Document Vault */}
              <Link href="/superadmin/documents" className="group">
                <div className="flex flex-col gap-4 rounded-lg p-6 border border-[#dbe2e6] hover:border-[#1193d4] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-[#111618]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M224,48H180a12,12,0,0,1-8.49-3.51L163.31,35.31A12,12,0,0,0,154.83,32H40A16,16,0,0,0,24,48V208a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48ZM40,48H152v8a8,8,0,0,0,8,8h64V64H40ZM216,208H40V80H160V48h24V208Z" />
                      </svg>
                    </div>
                    <h3 className="text-[#111618] text-lg font-bold leading-tight">Document Vault</h3>
                  </div>
                  <p className="text-[#617c89] text-sm font-normal leading-normal">Centralized document management with expiry tracking and compliance monitoring.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#111618] text-2xl font-bold">5</span>
                    <span className="text-[#617c89] text-sm">Expiring Soon</span>
                  </div>
                </div>
              </Link>

              {/* Task Oversight */}
              <Link href="/superadmin/tasks" className="group">
                <div className="flex flex-col gap-4 rounded-lg p-6 border border-[#dbe2e6] hover:border-[#1193d4] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-[#111618]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48ZM32,64H224V192H32ZM56,88a8,8,0,0,1,8-8H192a8,8,0,0,1,0,16H64A8,8,0,0,1,56,88Zm0,32a8,8,0,0,1,8-8H192a8,8,0,0,1,0,16H64A8,8,0,0,1,56,120Zm0,32a8,8,0,0,1,8-8H128a8,8,0,0,1,0,16H64A8,8,0,0,1,56,152Z" />
                      </svg>
                    </div>
                    <h3 className="text-[#111618] text-lg font-bold leading-tight">Task Oversight</h3>
                  </div>
                  <p className="text-[#617c89] text-sm font-normal leading-normal">Monitor all tasks, track progress, and manage assignments with map and timeline views.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#111618] text-2xl font-bold">89</span>
                    <span className="text-[#617c89] text-sm">Active Tasks</span>
                  </div>
                </div>
              </Link>

              {/* Compliance Monitor */}
              <Link href="/superadmin/compliance" className="group">
                <div className="flex flex-col gap-4 rounded-lg p-6 border border-[#dbe2e6] hover:border-[#1193d4] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-[#111618]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM48,48H208V208H48ZM80,88a8,8,0,0,1,8-8h80a8,8,0,0,1,0,16H88A8,8,0,0,1,80,88Zm0,32a8,8,0,0,1,8-8h80a8,8,0,0,1,0,16H88A8,8,0,0,1,80,120Zm0,32a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H88A8,8,0,0,1,80,152Z" />
                      </svg>
                    </div>
                    <h3 className="text-[#111618] text-lg font-bold leading-tight">Compliance Monitor</h3>
                  </div>
                  <p className="text-[#617c89] text-sm font-normal leading-normal">Track compliance status, monitor alerts, and ensure regulatory adherence.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#111618] text-2xl font-bold">3</span>
                    <span className="text-[#617c89] text-sm">Active Alerts</span>
                  </div>
                </div>
              </Link>

              {/* Risk Center */}
              <Link href="/superadmin/risk" className="group">
                <div className="flex flex-col gap-4 rounded-lg p-6 border border-[#dbe2e6] hover:border-[#1193d4] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-[#111618]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z" />
                      </svg>
                    </div>
                    <h3 className="text-[#111618] text-lg font-bold leading-tight">Risk Center</h3>
                  </div>
                  <p className="text-[#617c89] text-sm font-normal leading-normal">Monitor fraud alerts, violations, and manage blacklist entries for security.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#111618] text-2xl font-bold">12</span>
                    <span className="text-[#617c89] text-sm">Risk Items</span>
                  </div>
                </div>
              </Link>

              {/* System Overview */}
              <div className="flex flex-col gap-4 rounded-lg p-6 border border-[#dbe2e6] bg-[#f8f9fa]">
                <div className="flex items-center gap-3">
                  <div className="text-[#111618]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z" />
                    </svg>
                  </div>
                  <h3 className="text-[#111618] text-lg font-bold leading-tight">System Health</h3>
                </div>
                <p className="text-[#617c89] text-sm font-normal leading-normal">Overall system performance and health metrics.</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 text-2xl font-bold">99.9%</span>
                  <span className="text-[#617c89] text-sm">Uptime</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 p-4">
              <h2 className="text-[#111618] text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">Quick Stats</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col gap-2 rounded-lg p-4 border border-[#dbe2e6]">
                  <p className="text-[#617c89] text-sm font-normal">Total Users</p>
                  <p className="text-[#111618] text-2xl font-bold">1,247</p>
                </div>
                <div className="flex flex-col gap-2 rounded-lg p-4 border border-[#dbe2e6]">
                  <p className="text-[#617c89] text-sm font-normal">Active Tasks</p>
                  <p className="text-[#111618] text-2xl font-bold">89</p>
                </div>
                <div className="flex flex-col gap-2 rounded-lg p-4 border border-[#dbe2e6]">
                  <p className="text-[#617c89] text-sm font-normal">Compliance Rate</p>
                  <p className="text-[#111618] text-2xl font-bold">92%</p>
                </div>
                <div className="flex flex-col gap-2 rounded-lg p-4 border border-[#dbe2e6]">
                  <p className="text-[#617c89] text-sm font-normal">Risk Score</p>
                  <p className="text-[#111618] text-2xl font-bold">Low</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
