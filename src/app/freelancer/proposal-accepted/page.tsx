'use client';

import React from 'react';
import Link from 'next/link';

const ProposalAcceptedPage: React.FC = () => {
  return (
    <div className="w-full">
      <h2 className="text-[#111618] tracking-light text-2xl sm:text-3xl lg:text-[28px] font-bold leading-tight px-4 sm:px-6 text-left pb-3 pt-5">
        Great News! Your Proposal Accepted!
      </h2>
      
      <div className="p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-4 rounded-lg">
          <div className="flex flex-col gap-1 flex-1 lg:flex-[2_2_0px]">
            <p className="text-[#111618] text-base font-bold leading-tight">Task Summary</p>
            <p className="text-[#617c89] text-sm font-normal leading-normal">
              Role: Compliance Specialist<br />
              Company Name: SecureTech Solutions<br />
              Final Hours: 20 hours/week<br />
              Final Schedule: Flexible<br />
              Final Rate: $60/hour<br />
              Start Date: July 15, 2024
            </p>
          </div>
          <div
            className="w-full lg:w-64 h-48 lg:h-32 bg-center bg-no-repeat bg-cover rounded-lg flex-shrink-0"
            style={{
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCMtydWoeGvCgxc0fiQPoRENDoi0uJpYsrl6gK7sqSK6ZCGUINIpL3jHHUzDQmeQz7fljl4kDdkAz1cHZsk9HIWC4xDbuD5_0epL5nvkYjaPyyP5EC2uW2dJx1uS0z3BFdpLpHWCDMW46myvzLg1J138cZgp2m8r-eslX1WcFa031y5u-yolNEh28TddfMGj9CSIZJHwCspfk5lESnnmdiEuj4aIMuRekuzPVpcBXNt1um4PgOuIWRQWLBVOgX9HiCk-aXE3anvPfuD")'
            }}
          />
        </div>
      </div>
      
      <p className="text-[#111618] text-base font-normal leading-normal pb-3 pt-1 px-4 sm:px-6">
        Your task is now confirmed and added to your 'My Tasks' list.
      </p>
      
      <div className="flex justify-stretch">
        <div className="flex flex-1 gap-3 flex-wrap px-4 sm:px-6 py-3 justify-start">
          <Link
            href="/freelancer/tasks"
            className="flex w-full sm:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1193d4] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#0f7bb8] transition-colors"
          >
            <span className="truncate">View Task Details</span>
          </Link>
          <Link
            href="/freelancer/tasks"
            className="flex w-full sm:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#e8ebed] transition-colors"
          >
            <span className="truncate">Go to My Tasks</span>
          </Link>
        </div>
      </div>
      
      <div className="flex px-4 sm:px-6 py-3 justify-start">
        <button className="flex w-full sm:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#e8ebed] transition-colors">
          <span className="truncate">Download Contract</span>
        </button>
      </div>
      
      <p className="text-[#617c89] text-sm font-normal leading-normal pb-3 pt-1 px-4 sm:px-6">
        Payments are securely managed through CodFleet Escrow.
      </p>
    </div>
  );
};

export default ProposalAcceptedPage;
