'use client';

import React from 'react';
import Link from 'next/link';

const TaskAcceptedPage: React.FC = () => {
  return (
    <>
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-[#111618] tracking-light text-[32px] font-bold leading-tight">
            Task Offer – Accepted by Freelancer
          </p>
          <p className="text-[#617c89] text-sm font-normal leading-normal">
            Freelancer Name ✅ Accepted
          </p>
        </div>
      </div>
      
      <div className="p-4 @container">
        <div className="flex flex-col items-stretch justify-start rounded-lg @xl:flex-row @xl:items-start">
          <div
            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
            style={{
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuADRcxt4nj7Cl1jexqaccisgkEbvnCWt7xrZDVc_f6Z6rBtGm66Aw-zTTwltB7bO4Y7U5FEgTdNOLFSbn7AMTv_ApE8-RjONuIzcQ7Ue7tl1rgobFKZssK4u9lq0OSPf-Pvri_KNIFqKNShkiCJSznqTuJIBHgT7vFCrzYJHSbek1u4ZXzn4-AxMRscKPr4fG6L6bpnIrKJqF9IgFSZEvIrb2zRYJJecu9F1iRMbHfPkoRwiiflLVWB319VfD8_IP5E_PWHDjxxPXAO")'
            }}
          />
          <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 @xl:px-4">
            <p className="text-[#111618] text-lg font-bold leading-tight tracking-[-0.015em]">
              Task Summary
            </p>
            <div className="flex items-end gap-3 justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-[#617c89] text-base font-normal leading-normal">
                  Role: Compliance Officer<br />
                  Duration: 3 Months<br />
                  Hours: 40 hours/week<br />
                  Rate: $50/hour
                </p>
                <p className="text-[#617c89] text-base font-normal leading-normal">
                  Compliance Pack: ✅ Visa, ✅ YEL, ✅ Tax, ✅ Insurance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-[#111618] text-base font-normal leading-normal pb-3 pt-1 px-4">
        Freelancer has accepted your offer. Task will begin on [Start Date].
      </p>

      {/* Quick Actions Sidebar */}
      <div className="layout-content-container flex flex-col w-[360px]">
        <h2 className="text-[#111618] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Quick Actions
        </h2>
        
        <div className="flex items-center gap-4 bg-white px-4 min-h-14 hover:bg-gray-50 cursor-pointer">
          <div className="text-[#111618] flex items-center justify-center rounded-lg bg-[#f0f3f4] shrink-0 size-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,152v56a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V152a8,8,0,0,1,16,0v56H208V152a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,132.69V40a8,8,0,0,0-16,0v92.69L93.66,106.34a8,8,0,0,0-11.32,11.32Z" />
            </svg>
          </div>
          <p className="text-[#111618] text-base font-normal leading-normal flex-1 truncate">
            Download Contract / Compliance Pack
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-white px-4 min-h-14 hover:bg-gray-50 cursor-pointer">
          <div className="text-[#111618] flex items-center justify-center rounded-lg bg-[#f0f3f4] shrink-0 size-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
            </svg>
          </div>
          <p className="text-[#111618] text-base font-normal leading-normal flex-1 truncate">
            Add to Task Monitoring
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-white px-4 min-h-14 hover:bg-gray-50 cursor-pointer">
          <div className="text-[#111618] flex items-center justify-center rounded-lg bg-[#f0f3f4] shrink-0 size-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z" />
            </svg>
          </div>
          <p className="text-[#111618] text-base font-normal leading-normal flex-1 truncate">
            Message Freelancer
          </p>
        </div>
      </div>
    </>
  );
};

export default TaskAcceptedPage;
