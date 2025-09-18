'use client';

import React, { useState } from 'react';

const FreelancerHelpPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('getting-started');

  const faqSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      questions: [
        {
          question: 'How do I create my freelancer profile?',
          answer: 'To create your profile, go to the "My Profile" section and fill in your personal information, skills, experience, and hourly rate. Make sure to upload a professional photo and write a compelling bio.'
        },
        {
          question: 'How do I apply for tasks?',
          answer: 'Browse available tasks in the "My Tasks" section, click on a task that interests you, and submit a proposal with your rate and timeline. Companies will review your application and get back to you.'
        },
        {
          question: 'What documents do I need to provide?',
          answer: 'You may need to provide identification documents, proof of work authorization, and any relevant certifications depending on the task requirements.'
        }
      ]
    },
    {
      id: 'payments',
      title: 'Payments & Billing',
      questions: [
        {
          question: 'How do payments work?',
          answer: 'Payments are processed through CodFleet\'s secure escrow system. Once you complete work and the client approves it, funds are automatically released to your bank account within 2 business days.'
        },
        {
          question: 'What are the payment terms?',
          answer: 'Payment terms vary by task but typically include milestone-based payments or completion-based payments. All terms are clearly outlined in your task agreement.'
        },
        {
          question: 'How do I update my bank details?',
          answer: 'Go to the "Payments" section and click "Update Bank Details" to change your IBAN or account information.'
        }
      ]
    },
    {
      id: 'tasks',
      title: 'Working on Tasks',
      questions: [
        {
          question: 'How do I communicate with clients?',
          answer: 'Use the built-in messaging system to communicate with clients. All messages are logged and can be used for dispute resolution if needed.'
        },
        {
          question: 'What if I need to extend a deadline?',
          answer: 'Contact your client through the messaging system to discuss deadline extensions. Make sure to communicate any delays as early as possible.'
        },
        {
          question: 'How do I submit completed work?',
          answer: 'Upload your completed work through the task interface and notify your client. They will review and approve the work before payment is released.'
        }
      ]
    },
    {
      id: 'support',
      title: 'Support & Issues',
      questions: [
        {
          question: 'How do I contact support?',
          answer: 'You can contact our support team through the help center, email support@codfleet.com, or use the live chat feature during business hours.'
        },
        {
          question: 'What if I have a dispute with a client?',
          answer: 'CodFleet provides dispute resolution services. Contact support immediately if you encounter any issues with a client or payment.'
        },
        {
          question: 'How do I report a problem?',
          answer: 'Use the "Report Issue" button in the task interface or contact support directly with details about the problem you\'re experiencing.'
        }
      ]
    }
  ];

  const activeSectionData = faqSections.find(section => section.id === activeSection);

  return (
    <div className="w-full">
      <h2 className="text-[#111618] tracking-light text-2xl sm:text-3xl lg:text-[28px] font-bold leading-tight px-4 sm:px-6 text-left pb-3 pt-5">
        Help & Support
      </h2>

      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-[#111618] mb-4">Help Topics</h3>
              <nav className="space-y-2">
                {faqSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === section.id
                        ? 'bg-[#1193d4] text-white'
                        : 'text-[#617c89] hover:bg-gray-100 hover:text-[#111618]'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>

            {/* Contact Support */}
            <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-[#111618] mb-3">Need More Help?</h3>
              <p className="text-sm text-[#617c89] mb-4">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="space-y-2">
                <button className="w-full flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1193d4] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#0f7bb8] transition-colors">
                  <span className="truncate">Contact Support</span>
                </button>
                <button className="w-full flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#e8ebed] transition-colors">
                  <span className="truncate">Live Chat</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-2xl font-bold text-[#111618] mb-6">
                {activeSectionData?.title}
              </h3>

              <div className="space-y-6">
                {activeSectionData?.questions.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <h4 className="text-lg font-semibold text-[#111618] mb-3">
                      {faq.question}
                    </h4>
                    <p className="text-[#617c89] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-6 bg-blue-50 rounded-lg p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-[#111618] mb-4">Quick Links</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <a href="#" className="block text-[#1193d4] hover:text-[#0f7bb8] text-sm font-medium">
                    → Freelancer Terms of Service
                  </a>
                  <a href="#" className="block text-[#1193d4] hover:text-[#0f7bb8] text-sm font-medium">
                    → Payment Policy
                  </a>
                  <a href="#" className="block text-[#1193d4] hover:text-[#0f7bb8] text-sm font-medium">
                    → Privacy Policy
                  </a>
                </div>
                <div className="space-y-2">
                  <a href="#" className="block text-[#1193d4] hover:text-[#0f7bb8] text-sm font-medium">
                    → Community Guidelines
                  </a>
                  <a href="#" className="block text-[#1193d4] hover:text-[#0f7bb8] text-sm font-medium">
                    → Dispute Resolution
                  </a>
                  <a href="#" className="block text-[#1193d4] hover:text-[#0f7bb8] text-sm font-medium">
                    → Security Best Practices
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerHelpPage;
