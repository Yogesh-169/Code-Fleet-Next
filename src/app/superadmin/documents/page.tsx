'use client';

import Link from 'next/link';

export default function DocumentVault() {
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
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDkTnm65duRjGl8fzAHuSyYHP478wO1bjlrN8rD_WHxvM8unWbwpWQGDg-TUxu2XPxMUz9pS_kgoIqIj99tpRVp65GUS5D2kr6CKu0nWwPw_Hh6WFIcWofb3Q0vL_lWFyubdZxyNPpc8h2kc6IOS8eE1MkH_ePG14E8_mDwFacAakRT-S59wtGrv8taw_v7HmGJH2JaqvBtWnlKsoR9HntexqNuRr8fyacMQcIlsigHf0lF8iJ15OWPZw8CnnulPY34a8Uv5xui2Q2Y")'}} />
          </div>
        </header>

        {/* Main Content */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 p-4">
              <Link href="/superadmin/documents" className="text-[#617c89] text-base font-medium leading-normal">Documents</Link>
              <span className="text-[#617c89] text-base font-medium leading-normal">/</span>
              <span className="text-[#111618] text-base font-medium leading-normal">All Uploaded Files</span>
            </div>

            {/* Page Title */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <h1 className="text-[#111618] tracking-light text-[32px] font-bold leading-tight min-w-72">Document Vault — All Uploaded Files</h1>
            </div>

            {/* Alert */}
            <p className="text-[#617c89] text-sm font-normal leading-normal pb-3 pt-1 px-4">5 documents expiring in next 14 days.</p>

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
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-0 border-none bg-[#f0f3f4] focus:border-none h-full placeholder:text-[#617c89] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                  />
                </div>
              </label>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-3 p-3 flex-wrap pr-4">
              <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#f0f3f4] pl-4 pr-2">
                <p className="text-[#111618] text-sm font-medium leading-normal">Doc type</p>
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
            </div>

            {/* Document Table */}
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-lg border border-[#dbe2e6] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="table-user-column px-4 py-3 text-left text-[#111618] w-[400px] text-sm font-medium leading-normal">User</th>
                      <th className="table-doctype-column px-4 py-3 text-left text-[#111618] w-[400px] text-sm font-medium leading-normal">
                        Doc Type
                      </th>
                      <th className="table-expiry-column px-4 py-3 text-left text-[#111618] w-[400px] text-sm font-medium leading-normal">
                        Expiry Date
                      </th>
                      <th className="table-status-column px-4 py-3 text-left text-[#111618] w-60 text-sm font-medium leading-normal">Status</th>
                      <th className="table-file-column px-4 py-3 text-left text-[#111618] w-60 text-[#617c89] text-sm font-medium leading-normal">
                        File
                      </th>
                      <th className="table-notes-column px-4 py-3 text-left text-[#111618] w-[400px] text-sm font-medium leading-normal">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-t-[#dbe2e6]">
                      <td className="table-user-column h-[72px] px-4 py-2 w-[400px] text-[#111618] text-sm font-normal leading-normal">
                        Ethan Harper
                      </td>
                      <td className="table-doctype-column h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">Visa</td>
                      <td className="table-expiry-column h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">
                        2024-08-15
                      </td>
                      <td className="table-status-column h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Valid</span>
                        </button>
                      </td>
                      <td className="table-file-column h-[72px] px-4 py-2 w-60 text-[#617c89] text-sm font-bold leading-normal tracking-[0.015em]">
                        Download
                      </td>
                      <td className="table-notes-column h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">Updated</td>
                    </tr>
                    <tr className="border-t border-t-[#dbe2e6]">
                      <td className="table-user-column h-[72px] px-4 py-2 w-[400px] text-[#111618] text-sm font-normal leading-normal">
                        Olivia Bennett
                      </td>
                      <td className="table-doctype-column h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">YEL</td>
                      <td className="table-expiry-column h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">
                        2024-07-20
                      </td>
                      <td className="table-status-column h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Expired</span>
                        </button>
                      </td>
                      <td className="table-file-column h-[72px] px-4 py-2 w-60 text-[#617c89] text-sm font-bold leading-normal tracking-[0.015em]">
                        Download
                      </td>
                      <td className="table-notes-column h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">Review</td>
                    </tr>
                    <tr className="border-t border-t-[#dbe2e6]">
                      <td className="table-user-column h-[72px] px-4 py-2 w-[400px] text-[#111618] text-sm font-normal leading-normal">
                        Noah Carter
                      </td>
                      <td className="table-doctype-column h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">Tax</td>
                      <td className="table-expiry-column h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">
                        2024-09-01
                      </td>
                      <td className="table-status-column h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Valid</span>
                        </button>
                      </td>
                      <td className="table-file-column h-[72px] px-4 py-2 w-60 text-[#617c89] text-sm font-bold leading-normal tracking-[0.015em]">
                        Download
                      </td>
                      <td className="table-notes-column h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">Verified</td>
                    </tr>
                    <tr className="border-t border-t-[#dbe2e6]">
                      <td className="table-user-column h-[72px] px-4 py-2 w-[400px] text-[#111618] text-sm font-normal leading-normal">
                        Ava Thompson
                      </td>
                      <td className="table-doctype-column h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">
                        Insurance
                      </td>
                      <td className="table-expiry-column h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">
                        2024-07-10
                      </td>
                      <td className="table-status-column h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Expired</span>
                        </button>
                      </td>
                      <td className="table-file-column h-[72px] px-4 py-2 w-60 text-[#617c89] text-sm font-bold leading-normal tracking-[0.015em]">
                        Download
                      </td>
                      <td className="table-notes-column h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">Renew</td>
                    </tr>
                    <tr className="border-t border-t-[#dbe2e6]">
                      <td className="table-user-column h-[72px] px-4 py-2 w-[400px] text-[#111618] text-sm font-normal leading-normal">
                        Liam Foster
                      </td>
                      <td className="table-doctype-column h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">
                        Certification
                      </td>
                      <td className="table-expiry-column h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">
                        2024-08-25
                      </td>
                      <td className="table-status-column h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Valid</span>
                        </button>
                      </td>
                      <td className="table-file-column h-[72px] px-4 py-2 w-60 text-[#617c89] text-sm font-bold leading-normal tracking-[0.015em]">
                        Download
                      </td>
                      <td className="table-notes-column h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">Approved</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Responsive CSS for table columns */}
              <style jsx>{`
                @container (max-width: 120px) {
                  .table-user-column {
                    display: none;
                  }
                }
                @container (max-width: 240px) {
                  .table-doctype-column {
                    display: none;
                  }
                }
                @container (max-width: 360px) {
                  .table-expiry-column {
                    display: none;
                  }
                }
                @container (max-width: 480px) {
                  .table-status-column {
                    display: none;
                  }
                }
                @container (max-width: 600px) {
                  .table-file-column {
                    display: none;
                  }
                }
                @container (max-width: 720px) {
                  .table-notes-column {
                    display: none;
                  }
                }
              `}</style>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
              <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
                <a className="text-[#617c89] text-base font-normal leading-normal min-w-40" href="#">Terms of Service</a>
                <a className="text-[#617c89] text-base font-normal leading-normal min-w-40" href="#">Privacy Policy</a>
              </div>
              <p className="text-[#617c89] text-base font-normal leading-normal">@2024 CodFleet. All rights reserved.</p>
            </footer>
          </div>
        </footer>
      </div>
    </div>
  );
}
