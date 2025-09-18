'use client';

import React from 'react';
import Link from 'next/link';

const TaskDeclinedPage: React.FC = () => {
  const suggestedReplacements = [
    {
      name: 'Emily Carter',
      role: 'Compliance Specialist',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHpaBGGoRQzu4fc9urIz07-6887uUyGect_hdR5rXlwwiT5N12P9TEt7r64TxkwqkakxeWnADcL2_SB5oLClvWWEq3LS7ltHHUPtOTPmdUwjkkLomm7ibMXwhqQ69A9h0e7qE3u-faoJfDKbFjUkwvR0Yv4W9ZrKj3o1uUiT_PLKkyjyiqNpTQkj2UPX8FdCRO1-in212VuJPphjLGWqqVOi139hHkcHxYVWC5ZYiMCuFFHOMO8InBd0PUuso1lvOoMjIgfGH5nmRg'
    },
    {
      name: 'David Lee',
      role: 'Regulatory Analyst',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy5pbGGUlNEYRkGEOCvFxpg4fUjYETUggSZn6ahRFVa8_CHgKw2BBKqMQqc2EXBOl2vvDtuGSmP7pAKtbrjhHLKMHAqs6oXifJLLFo1cUGMTMIDReeSXcHhBgGbaTgi12fAGsX9MCu4ZfoVmroMJFQjKf0bmVNpzWm1AZD5TXqbGpTf9ThCDUAbqCBjTJLIxC6uFL7BBRNabD8Hlm9pRFIeo44E6Sb0g04zGLuvThWXQGjBq_2ulV2FFtdhiLAyZgmEADYtKWDI_jO'
    },
    {
      name: 'Jessica Ramirez',
      role: 'Compliance Officer',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALMT7aV0htctKHczfk2iOd3dpzc8xVZw_U7-037tiaBB8fXwS2ahR_g5YGJPyf3883wpoy3FWIXhRBoQ0erxwRNTxsEUrGLKY13yywDiwHs3YN6lxlVQ_oeg6ChbLx0ceHFqA5LXwv9lBpFNMihmCWHjRN-IiGFCwl_wrJHYFwffqoA7fBRsmfVQesYp2FiD0FEvPxP97WIach6AwssqJ6B5uX29cceHPGcM-8GoBsH0gSXKfZ5XXD_6vx4qJ2gvnHIITPfCTQR0c3'
    }
  ];

  return (
    <>
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-[#181111] tracking-light text-[32px] font-bold leading-tight">
            Task Offer – Declined
          </p>
          <p className="text-[#896161] text-sm font-normal leading-normal">
            Freelancer: Sarah Chen ❌ Declined
          </p>
        </div>
      </div>
      
      <p className="text-[#896161] text-sm font-normal leading-normal pb-3 pt-1 px-4">
        Decline Reason: "I'm currently overbooked and unable to take on new projects at this time."
      </p>
      
      <div className="flex justify-stretch">
        <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-start">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f4f0f0] text-[#181111] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#e8e4e4] transition-colors">
            <span className="truncate">Review Other Applicants</span>
          </button>
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#ec1313] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#d10f0f] transition-colors">
            <span className="truncate">Repost Task</span>
          </button>
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-transparent text-[#181111] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-50 transition-colors">
            <span className="truncate">Message Freelancer</span>
          </button>
        </div>
      </div>

      {/* Suggested Replacements Sidebar */}
      <div className="layout-content-container flex flex-col w-[360px]">
        <h2 className="text-[#181111] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Suggested Replacements
        </h2>
        <p className="text-[#181111] text-base font-normal leading-normal pb-3 pt-1 px-4">
          Similar candidates (Relevance 4–5) available.
        </p>
        
        {suggestedReplacements.map((candidate, index) => (
          <div key={index} className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 hover:bg-gray-50 cursor-pointer">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
              style={{ backgroundImage: `url("${candidate.avatar}")` }}
            />
            <div className="flex flex-col justify-center">
              <p className="text-[#181111] text-base font-medium leading-normal line-clamp-1">
                {candidate.name}
              </p>
              <p className="text-[#896161] text-sm font-normal leading-normal line-clamp-2">
                {candidate.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskDeclinedPage;
