'use client';

import Link from 'next/link';

export default function TaskOversight() {
  const tasks = [
    {
      id: '#12345',
      company: 'Tech Innovators Inc.',
      jobTitle: 'Software Engineer',
      sector: 'Technology',
      startEndDates: '2024-01-15 – 2024-06-15',
      assignedFreelancers: 'Emily Carter',
      status: 'Active'
    },
    {
      id: '#67890',
      company: 'Global Solutions Ltd.',
      jobTitle: 'Project Manager',
      sector: 'Consulting',
      startEndDates: '2024-02-01 – 2024-07-31',
      assignedFreelancers: 'David Lee',
      status: 'Open'
    },
    {
      id: '#24680',
      company: 'Creative Minds Agency',
      jobTitle: 'Graphic Designer',
      sector: 'Design',
      startEndDates: '2024-03-10 – 2024-08-30',
      assignedFreelancers: 'Sophia Clark',
      status: 'Completed'
    },
    {
      id: '#13579',
      company: 'Data Dynamics Corp.',
      jobTitle: 'Data Analyst',
      sector: 'Analytics',
      startEndDates: '2024-04-05 – 2024-09-20',
      assignedFreelancers: 'Ethan Walker',
      status: 'Active'
    },
    {
      id: '#98765',
      company: 'Financial Frontiers LLC',
      jobTitle: 'Financial Advisor',
      sector: 'Finance',
      startEndDates: '2024-05-01 – 2024-10-15',
      assignedFreelancers: 'Olivia Green',
      status: 'Open'
    },
    {
      id: '#11223',
      company: 'Health Harmony Group',
      jobTitle: 'Medical Consultant',
      sector: 'Healthcare',
      startEndDates: '2024-06-15 – 2024-11-30',
      assignedFreelancers: 'Liam Hall',
      status: 'Completed'
    },
    {
      id: '#44556',
      company: 'EduTech Solutions Inc.',
      jobTitle: 'Instructional Designer',
      sector: 'Education',
      startEndDates: '2024-07-01 – 2024-12-15',
      assignedFreelancers: 'Ava Stone',
      status: 'Active'
    },
    {
      id: '#77889',
      company: 'Green Earth Initiatives',
      jobTitle: 'Environmental Scientist',
      sector: 'Environment',
      startEndDates: '2024-08-10 – 2025-01-31',
      assignedFreelancers: 'Noah Hill',
      status: 'Open'
    },
    {
      id: '#10111',
      company: 'Legal Eagle Associates',
      jobTitle: 'Legal Counsel',
      sector: 'Legal',
      startEndDates: '2024-09-05 – 2025-02-20',
      assignedFreelancers: 'Isabella Reed',
      status: 'Completed'
    },
    {
      id: '#12131',
      company: 'Manufacturing Masters Co.',
      jobTitle: 'Operations Manager',
      sector: 'Manufacturing',
      startEndDates: '2024-10-01 – 2025-03-15',
      assignedFreelancers: 'Jackson Ford',
      status: 'Active'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Open':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
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
              <Link href="/superadmin/tasks" className="text-[#1193d4] text-sm font-medium leading-normal">Tasks</Link>
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
          <div className="layout-content-container flex flex-col max-w-[920px] flex-1">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 p-4">
              <Link href="/superadmin" className="text-[#617c89] text-base font-medium leading-normal">Home</Link>
              <span className="text-[#617c89] text-base font-medium leading-normal">/</span>
              <span className="text-[#111618] text-base font-medium leading-normal">Task Oversight</span>
            </div>

            {/* Page Title */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <h1 className="text-[#111618] tracking-light text-[32px] font-bold leading-tight min-w-72">Task Oversight</h1>
            </div>

            {/* Filter Tags */}
            <div className="flex gap-3 p-3 flex-wrap pr-4">
              <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#f0f3f4] pl-4 pr-4">
                <p className="text-[#111618] text-sm font-medium leading-normal">Sector</p>
              </div>
              <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#f0f3f4] pl-4 pr-4">
                <p className="text-[#111618] text-sm font-medium leading-normal">Client</p>
              </div>
              <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#f0f3f4] pl-4 pr-4">
                <p className="text-[#111618] text-sm font-medium leading-normal">Status</p>
              </div>
              <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#f0f3f4] pl-4 pr-4">
                <p className="text-[#111618] text-sm font-medium leading-normal">Compliance Pack attached</p>
              </div>
            </div>

            {/* Task Table */}
            <div className="px-4 py-3">
              <div className="flex overflow-hidden rounded-lg border border-[#dbe2e6] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="px-4 py-3 text-left text-[#111618] w-[400px] text-sm font-medium leading-normal">Task ID</th>
                      <th className="px-4 py-3 text-left text-[#111618] w-[400px] text-sm font-medium leading-normal">Company</th>
                      <th className="px-4 py-3 text-left text-[#111618] w-[400px] text-sm font-medium leading-normal">Job Title</th>
                      <th className="px-4 py-3 text-left text-[#111618] w-[400px] text-sm font-medium leading-normal">Sector</th>
                      <th className="px-4 py-3 text-left text-[#111618] w-[400px] text-sm font-medium leading-normal">Start–End Dates</th>
                      <th className="px-4 py-3 text-left text-[#111618] w-[400px] text-sm font-medium leading-normal">Assigned Freelancers</th>
                      <th className="px-4 py-3 text-left text-[#111618] w-60 text-sm font-medium leading-normal">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task, index) => (
                      <tr key={task.id} className="border-t border-t-[#dbe2e6]">
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#111618] text-sm font-normal leading-normal">{task.id}</td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">{task.company}</td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">{task.jobTitle}</td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">{task.sector}</td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">{task.startEndDates}</td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#617c89] text-sm font-normal leading-normal">{task.assignedFreelancers}</td>
                        <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                          <button className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 w-full ${getStatusColor(task.status)}`}>
                            <span className="truncate">{task.status}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar - Map/Timeline */}
          <div className="layout-content-container flex flex-col w-[360px]">
            <div className="pb-3">
              <div className="flex border-b border-[#dbe2e6] px-4 gap-8">
                <button className="flex flex-col items-center justify-center border-b-[3px] border-b-[#111618] text-[#111618] pb-[13px] pt-4">
                  <p className="text-[#111618] text-sm font-bold leading-normal tracking-[0.015em]">Map</p>
                </button>
                <button className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#617c89] pb-[13px] pt-4">
                  <p className="text-[#617c89] text-sm font-bold leading-normal tracking-[0.015em]">Timeline</p>
                </button>
              </div>
            </div>
            <div className="flex px-4 py-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg object-cover"
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB9lu6oBao7-YMXu_WTfmLO1p2zXFv0ITjEeYi3IQJMaOMp5M0GUS2HdgM7mlxyp8crh4MBqJTi7HR2IclUor8bSWNEwFN1in2AegZAX-L69LVRgpRZPeF3hJXrAgWjyuAqDiI5-mSlr_jMeaiWoXcVjwcZ8lXfih0R49PISX5sEuSxvierIo6maMtw54XPRbgZ1ltBSF-OT-kCzUDAFB2gGfdyEKbiLcnSiV2Hd2kNkLWQtfXYfAsmsBHsDQP8GzOHJVIw9nm5ZEEi")'}}
              />
            </div>
            <div className="flex px-4 py-3">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 flex-1 bg-[#1193d4] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Flag Task</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
