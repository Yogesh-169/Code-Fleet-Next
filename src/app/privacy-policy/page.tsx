'use client';

import { useState } from 'react';

export default function PrivacyPolicyPage() {
  const [openSection, setOpenSection] = useState(1);

  const sections = [
    {
      id: 1,
      title: "Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include your name, email address, company information, and any content you upload to our platform. We also automatically collect certain information about your use of our services, including device information, IP address, and usage patterns."
    },
    {
      id: 2,
      title: "How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, respond to your comments and questions, and communicate with you about products, services, and promotional offers. We may also use your information for security purposes and to comply with legal obligations."
    },
    {
      id: 3,
      title: "Information Sharing and Disclosure",
      content: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with service providers who assist us in operating our platform, conducting our business, or serving our users. We may also disclose information when required by law or to protect our rights and safety."
    },
    {
      id: 4,
      title: "Data Security",
      content: "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security of your information."
    },
    {
      id: 5,
      title: "Your Rights and Choices",
      content: "You have the right to access, update, or delete your personal information. You can manage your account settings and preferences through your account dashboard. You may also opt out of certain communications from us. If you have any questions about your rights or wish to exercise them, please contact us using the information provided below."
    },
    {
      id: 6,
      title: "Cookies and Tracking Technologies",
      content: "We use cookies and similar tracking technologies to enhance your experience on our platform, analyze usage patterns, and provide personalized content. You can control cookie settings through your browser preferences, though disabling certain cookies may affect the functionality of our services."
    },
    {
      id: 7,
      title: "International Data Transfers",
      content: "Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your personal information during international transfers."
    },
    {
      id: 8,
      title: "Changes to This Policy",
      content: "We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website and updating the \"Last Updated\" date. Your continued use of our services after such changes constitutes acceptance of the updated policy."
    }
  ];

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white overflow-x-hidden" style={{fontFamily: 'Inter, "Noto Sans", sans-serif'}}>
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 px-10 py-3">
        <div className="flex items-center gap-4 text-slate-900">
          <div className="size-6 text-[#0a2b4d]">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-[-0.015em]">CodFleet</h2>
        </div>
        <div className="flex flex-1 justify-end items-center gap-8">
          <nav className="flex items-center gap-9">
            <a className="text-slate-900 text-base font-medium leading-normal hover:text-[#0a2b4d] transition-colors" href="/">Overview</a>
            <a className="text-slate-900 text-base font-medium leading-normal hover:text-[#0a2b4d] transition-colors" href="/about">Features</a>
            <a className="text-slate-900 text-base font-medium leading-normal hover:text-[#0a2b4d] transition-colors" href="/blogs-news">Pricing</a>
            <a className="text-slate-900 text-base font-medium leading-normal hover:text-[#0a2b4d] transition-colors" href="#">Support</a>
          </nav>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="flex items-center gap-2 text-base font-medium text-slate-900 hover:text-[#0a2b4d] transition-colors" type="button">
                <span>English</span>
                <span className="material-symbols-outlined text-xl">language</span>
              </button>
            </div>
            <button className="flex min-w-[100px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-[#0a2b4d] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-all">
              <span className="truncate">Get Started</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-10">
        <div className="layout-content-container flex flex-col max-w-4xl flex-1">
          <div className="flex flex-wrap justify-between items-center gap-4 p-4 mb-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-[#0a2b4d] tracking-tight text-4xl font-bold leading-tight">Privacy Policy</h1>
              <p className="text-[#4f7396] text-base font-normal leading-normal">How we collect, use, and protect your personal information.</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-[#e8edf3]">
            <nav className="flex px-4 gap-8">
              <a className="flex flex-col items-center justify-center border-b-2 pb-3 pt-4 text-base text-[#4f7396] border-transparent hover:text-[#0a2b4d] transition-colors" href="#">
                <span className="truncate">Terms of Service</span>
              </a>
              <a className="flex flex-col items-center justify-center border-b-2 pb-3 pt-4 text-base text-[#0a2b4d] border-[#0a2b4d] font-bold" href="#">
                <span className="truncate">Privacy Policy</span>
              </a>
              <a className="flex flex-col items-center justify-center border-b-2 pb-3 pt-4 text-base text-[#4f7396] border-transparent hover:text-[#0a2b4d] transition-colors" href="#">
                <span className="truncate">Legal Notices</span>
              </a>
            </nav>
          </div>

          {/* Privacy Policy Sections */}
          <div className="flex flex-col p-4 gap-3 mt-4">
            {sections.map((section) => (
              <div key={section.id} className="flex flex-col rounded-lg border border-[#e8edf3] bg-white group">
                <button
                  className="flex cursor-pointer items-center justify-between gap-6 p-4"
                  onClick={() => setOpenSection(openSection === section.id ? 0 : section.id)}
                >
                  <p className="text-[#0a2b4d] text-lg font-medium leading-normal">{section.id}. {section.title}</p>
                  <div className={`text-[#4f7396] transition-transform ${openSection === section.id ? 'rotate-180' : ''}`}>
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </button>
                {openSection === section.id && (
                  <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-300">
                    <p className="text-[#4f7396] text-base font-normal leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Download Button */}
          <div className="flex items-center justify-between mt-6 px-4 py-3">
            <button className="flex min-w-[84px] items-center justify-center gap-2 overflow-hidden rounded-lg h-11 px-5 bg-transparent border-2 border-[#0a2b4d] text-[#0a2b4d] text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#0a2b4d] hover:text-white transition-all">
              <span className="material-symbols-outlined">download</span>
              <span className="truncate">Download PDF</span>
            </button>
          </div>

          {/* Footer */}
          <footer className="mt-8 border-t border-[#e8edf3] pt-6 px-4">
            <div className="flex justify-between items-center text-sm text-[#4f7396]">
              <p>Last Updated: January 15, 2025</p>
              <a className="underline hover:text-[#0a2b4d] transition-colors" href="mailto:privacy@codfleet.eu">Contact: privacy@codfleet.eu</a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
