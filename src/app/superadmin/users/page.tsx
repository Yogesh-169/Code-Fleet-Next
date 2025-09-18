'use client';

import Link from 'next/link';

export default function UsersAndRolesPage() {
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
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          {/* Sidebar */}
          <div className="layout-content-container flex flex-col w-80">
            <div className="flex h-full min-h-[700px] flex-col justify-between bg-white p-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <h1 className="text-[#111618] text-base font-medium leading-normal">CodFleet</h1>
                  <p className="text-[#617c89] text-sm font-normal leading-normal">Super Admin</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Link href="/superadmin" className="flex items-center gap-3 px-3 py-2 hover:bg-[#f0f3f4] rounded-lg transition-colors">
                    <div className="text-[#111618]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z" />
                      </svg>
                    </div>
                    <p className="text-[#111618] text-sm font-medium leading-normal">Dashboard</p>
                  </Link>
                  <Link href="/superadmin/tasks" className="flex items-center gap-3 px-3 py-2 hover:bg-[#f0f3f4] rounded-lg transition-colors">
                    <div className="text-[#111618]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v41.61A184,184,0,0,1,128,136a184.07,184.07,0,0,1-88-22.38V72Zm0,128H40V131.64A200.19,200.19,0,0,0,128,152a200.25,200.25,0,0,0,88-20.37V200ZM104,112a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H112A8,8,0,0,1,104,112Z" />
                      </svg>
                    </div>
                    <p className="text-[#111618] text-sm font-medium leading-normal">Projects</p>
                  </Link>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#f0f3f4]">
                    <div className="text-[#111618]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M164.47,195.63a8,8,0,0,1-6.7,12.37H10.23a8,8,0,0,1-6.7-12.37,95.83,95.83,0,0,1,47.22-37.71,60,60,0,1,1,66.5,0A95.83,95.83,0,0,1,164.47,195.63Zm87.91-.15a95.87,95.87,0,0,0-47.13-37.56A60,60,0,0,0,144.7,54.59a4,4,0,0,0-1.33,6A75.83,75.83,0,0,1,147,150.53a4,4,0,0,0,1.07,5.53,112.32,112.32,0,0,1,29.85,30.83,23.92,23.92,0,0,1,3.65,16.47,4,4,0,0,0,3.95,4.64h60.3a8,8,0,0,0,7.73-5.93A8.22,8.22,0,0,0,252.38,195.48Z" />
                      </svg>
                    </div>
                    <p className="text-[#111618] text-sm font-medium leading-normal">Freelancers</p>
                  </div>
                  <Link href="/superadmin/documents" className="flex items-center gap-3 px-3 py-2 hover:bg-[#f0f3f4] rounded-lg transition-colors">
                    <div className="text-[#111618]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M240,208H224V96a16,16,0,0,0-16-16H144V32a16,16,0,0,0-24.88-13.32L39.12,72A16,16,0,0,0,32,85.34V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM208,96V208H144V96ZM48,85.34,128,32V208H48ZM112,112v16a8,8,0,0,1-16,0V112a8,8,0,1,1,16,0Zm-32,0v16a8,8,0,0,1-16,0V112a8,8,0,1,1,16,0Zm0,56v16a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Zm32,0v16a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Z" />
                      </svg>
                    </div>
                    <p className="text-[#111618] text-sm font-medium leading-normal">Companies</p>
                  </Link>
                  <Link href="/superadmin/compliance" className="flex items-center gap-3 px-3 py-2 hover:bg-[#f0f3f4] rounded-lg transition-colors">
                    <div className="text-[#111618]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z" />
                      </svg>
                    </div>
                    <p className="text-[#111618] text-sm font-medium leading-normal">Payments</p>
                  </Link>
                  <Link href="/superadmin/risk" className="flex items-center gap-3 px-3 py-2 hover:bg-[#f0f3f4] rounded-lg transition-colors">
                    <div className="text-[#111618]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M216,40H136V24a8,8,0,0,0-16,0V40H40A16,16,0,0,0,24,56V176a16,16,0,0,0,16,16H79.36L57.75,219a8,8,0,0,0,12.5,10l29.59-37h56.32l29.59,37a8,8,0,1,0,12.5-10l-21.61-27H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,136H40V56H216V176ZM104,120v24a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm32-16v40a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm32-16v56a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Z" />
                      </svg>
                    </div>
                    <p className="text-[#111618] text-sm font-medium leading-normal">Reports</p>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="text-[#111618]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                  </div>
                  <p className="text-[#111618] text-sm font-medium leading-normal">Help and docs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 p-4">
              <Link href="/superadmin" className="text-[#617c89] text-base font-medium leading-normal">CodFleet</Link>
              <span className="text-[#617c89] text-base font-medium leading-normal">/</span>
              <span className="text-[#111618] text-base font-medium leading-normal">Users &amp; Roles Management</span>
            </div>

            {/* Page Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111618] tracking-light text-[32px] font-bold leading-tight min-w-72">Users &amp; Roles Management</p>
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-medium leading-normal">
                <span className="truncate">Create New User / Assign Role</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="pb-3">
              <div className="flex border-b border-[#dbe2e6] px-4 gap-8">
                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-[#111618] text-[#111618] pb-[13px] pt-4" href="#">
                  <p className="text-[#111618] text-sm font-bold leading-normal tracking-[0.015em]">Freelancers</p>
                </a>
                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#617c89] pb-[13px] pt-4" href="#">
                  <p className="text-[#617c89] text-sm font-bold leading-normal tracking-[0.015em]">Companies</p>
                </a>
                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#617c89] pb-[13px] pt-4" href="#">
                  <p className="text-[#617c89] text-sm font-bold leading-normal tracking-[0.015em]">Admins</p>
                </a>
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
                    placeholder="Search users"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-0 border-none bg-[#f0f3f4] focus:border-none h-full placeholder:text-[#617c89] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                  />
                </div>
              </label>
            </div>

            {/* Filters */}
            <div className="flex gap-3 p-3 flex-wrap pr-4">
              <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#f0f3f4] pl-4 pr-2">
                <p className="text-[#111618] text-sm font-medium leading-normal">Role</p>
                <div className="text-[#111618]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
                  </svg>
                </div>
              </button>
              <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#f0f3f4] pl-4 pr-2">
                <p className="text-[#111618] text-sm font-medium leading-normal">Status</p>
                <div className="text-[#111618]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
                  </svg>
                </div>
              </button>
              <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#f0f3f4] pl-4 pr-2">
                <p className="text-[#111618] text-sm font-medium leading-normal">Registration Date</p>
                <div className="text-[#111618]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Users Table */}
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-lg border border-[#dbe2e6] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="px-4 py-3 text-left text-[#111618] w-[400px] text-sm font-medium leading-normal">User ID</th>
                      <th className="px-4 py-3 text-left text-[#111618] w-[400px] text-sm font-medium leading-normal">Name</th>
                      <th className="px-4 py-3 text-left text-[#111618] w-[400px] text-sm font-medium leading-normal">Email</th>
                      <th className="px-4 py-3 text-left text-[#111618] w-60 text-sm font-medium leading-normal">Role</th>
                      <th className="px-4 py-3 text-left text-[#111618] w-60 text-sm font-medium leading-normal">Status</th>
                      <th className="px-4 py-3 text-left text-[#111618] w-[400px] text-sm font-medium leading-normal">Last Login</th>
                      <th className="px-4 py-3 text-left text-[#111618] w-60 text-[#617c89] text-sm font-medium leading-normal">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-t-[#dbe2e6]">
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">#12345</td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#111618] text-sm font-normal leading-normal">Ethan Carter</td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">ethan.carter@email.com</td>
                      <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Developer</span>
                        </button>
                      </td>
                      <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Active</span>
                        </button>
                      </td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">2023-11-15</td>
                      <td className="h-[72px] px-4 py-2 w-60 text-[#617c89] text-sm font-bold leading-normal tracking-[0.015em]">View, Edit, Suspend</td>
                    </tr>
                    <tr className="border-t border-t-[#dbe2e6]">
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">#67890</td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#111618] text-sm font-normal leading-normal">Olivia Bennett</td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">olivia.bennett@email.com</td>
                      <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Designer</span>
                        </button>
                      </td>
                      <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Active</span>
                        </button>
                      </td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">2023-11-14</td>
                      <td className="h-[72px] px-4 py-2 w-60 text-[#617c89] text-sm font-bold leading-normal tracking-[0.015em]">View, Edit, Suspend</td>
                    </tr>
                    <tr className="border-t border-t-[#dbe2e6]">
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">#11223</td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#111618] text-sm font-normal leading-normal">Noah Thompson</td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">noah.thompson@email.com</td>
                      <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Project Manager</span>
                        </button>
                      </td>
                      <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Hold</span>
                        </button>
                      </td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">2023-11-13</td>
                      <td className="h-[72px] px-4 py-2 w-60 text-[#617c89] text-sm font-bold leading-normal tracking-[0.015em]">View, Edit, Suspend</td>
                    </tr>
                    <tr className="border-t border-t-[#dbe2e6]">
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">#44556</td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#111618] text-sm font-normal leading-normal">Ava Rodriguez</td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">ava.rodriguez@email.com</td>
                      <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Developer</span>
                        </button>
                      </td>
                      <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Active</span>
                        </button>
                      </td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">2023-11-12</td>
                      <td className="h-[72px] px-4 py-2 w-60 text-[#617c89] text-sm font-bold leading-normal tracking-[0.015em]">View, Edit, Suspend</td>
                    </tr>
                    <tr className="border-t border-t-[#dbe2e6]">
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">#77889</td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#111618] text-sm font-normal leading-normal">Liam Harper</td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">liam.harper@email.com</td>
                      <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Designer</span>
                        </button>
                      </td>
                      <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Suspended</span>
                        </button>
                      </td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">2023-11-11</td>
                      <td className="h-[72px] px-4 py-2 w-60 text-[#617c89] text-sm font-bold leading-normal tracking-[0.015em]">View, Edit, Suspend</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-[#617c89] text-sm font-normal leading-normal pb-3 pt-1 px-4">Super Admin can override any role or assign cross-console privileges.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
