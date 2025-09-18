'use client';

import { useState } from 'react';

export default function BlogsNewsPage() {
  const [activeTab, setActiveTab] = useState('press-releases');

  const tabs = [
    { id: 'press-releases', label: 'Press Releases' },
    { id: 'market-updates', label: 'Market Updates' },
    { id: 'integration-stories', label: 'Integration Stories' }
  ];

  const articles = [
    {
      id: 1,
      title: "CodFleet Announces Strategic Partnership with Global Tech Innovator",
      description: "CodFleet, a leading provider of workforce management solutions, today announced a strategic partnership with TechGlobal, a global technology innovator. This collaboration will enable CodFleet to expand its reach and offer enhanced solutions to its clients.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDInAZNepzB4pxQGGzEj2O9-AIYXQwzrk-5zP7Q3AWgix2gRn-r4D9wlOMYKasyrN0ThMTfZGxaV08XydPisq10adRSG_8Np3mCnmtpEJOGL2jFZn65NACZ0MEcBQoJ8mkVmP0i_sNMCUKOsoXudAXEnskW9tkvMAduizPZC8FHObde0x1lZpsO_v-JW0zbCSE8YYqk6-I0HCKwylMlJUOev4cLqW6Iv6jSYal_OPyumnSZJHnMMFQSF1TQptUeIu0U7hMjWt97DzM",
      category: "press-releases"
    },
    {
      id: 2,
      title: "Market Update: The Rise of the Freelance Economy in 2024",
      description: "The freelance economy continues to grow at an unprecedented pace, with more professionals opting for flexible work arrangements. This report analyzes the key trends driving this growth and the opportunities it presents for businesses and individuals.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdCKIUCu0QPKLLrMBNgZO9wtFYSdfJsmes0W3XiVd96vBwBrmCOZevLbAf2663Pv4aRywNQ2o_hUECD0zNFFhxiRMGqIWJQ3blcmPQRgG_6nZZ-2nViJyH9Q_xiMHY1UfVUSuAwaWL6ZkJOV7nU-psvo5VHkJT3Gq94yTlu9VB53Ow-wOYp1RSJvdA_giUTme_0DZkBqnIMzHvTRDu7lGwbas7fk2DIpaEntDwqceHf2Zn9IArVcc6-pTRi7gz21pf0AuCYEA8mIQ",
      category: "market-updates"
    },
    {
      id: 3,
      title: "Integration Story: How a Government Agency Streamlined Operations with CodFleet",
      description: "A government agency responsible for managing a large workforce faced challenges with manual processes and inefficient workflows. By implementing CodFleet's solutions, they were able to streamline operations, improve efficiency, and reduce costs.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqzf6wot9XbVImcKFXav-iGa1NO1PfTa1PbTZxatdoNh2u2B_QVZylrd_sa-K1C8GB4KANTkMVbWNR02XxnjgWQb4f2oP4no0qB3XfD8aLRoFRFZ5eIeezhcHgA0HC7O44sJ1q1d1Tfz6muiPy4yEDekbQJ-4f6x2Qa1wqCdclKWps_fs2y0RN-7EVoRpiYxUL_n2xNwnJkO0S9t2NGS_ozAPphhlcKQZBakbOw10TSLDG995JKpedFR6et54U3_-K5rJX9YKU6K8",
      category: "integration-stories"
    }
  ];

  const filteredArticles = articles.filter(article => article.category === activeTab);

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-slate-50 overflow-x-hidden" style={{fontFamily: 'Newsreader, "Noto Sans", sans-serif'}}>
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 px-10 py-3">
        <div className="flex items-center gap-4 text-slate-900">
          <div className="size-6 text-[#1766b5]">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-[-0.015em]">CodFleet</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <a className="text-slate-900 text-base font-medium leading-normal hover:text-[#1766b5] transition-colors" href="#">Product</a>
            <a className="text-slate-900 text-base font-medium leading-normal hover:text-[#1766b5] transition-colors" href="#">Solutions</a>
            <a className="text-slate-900 text-base font-medium leading-normal hover:text-[#1766b5] transition-colors" href="#">Resources</a>
            <a className="text-slate-900 text-base font-medium leading-normal hover:text-[#1766b5] transition-colors" href="#">Pricing</a>
          </div>
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-[#1766b5] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-sky-700 transition-colors">
            <span className="truncate">Get Started</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="gap-12 px-6 flex flex-1 justify-center py-10">
        <div className="flex flex-col max-w-[920px] flex-1">
          {/* Hero Section */}
          <div className="p-4">
            <div className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-2xl items-start justify-end px-10 pb-10" style={{
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAv5B8RWN91ACb2Ngm8xqnrJ8H8FverEadw-ewg-VgfgmQ_9tSYLev5iV8LDtzzSwY12WfinxkXcYb6IOAddwvQj9BtHZmeetdVQUruAEr9FbVrXj1cNyRl1Bjzi3ar_C6U0WHEPuyiGDew3NxsBUgCZvqb0nZeadQ2ONkzeifFTQvdYWDu0No7ux7Yu53Br0yVwwyHAZmk51CBrr7x_eFx2ogHhj_T17_q3KgI5JAi4dE-A6JIOQK1SZiZ-Pl_vVcBLj_h4Wkiaec")'
            }}>
              <div className="flex flex-col gap-4 text-left">
                <h1 className="text-white text-5xl font-extrabold leading-tight tracking-[-0.033em]">CodFleet Insights & Updates</h1>
                <h2 className="text-white text-lg font-normal leading-normal max-w-3xl">
                  Stay informed with the latest news, market trends, and success stories from CodFleet. Discover how we're empowering freelancers, companies, and government agencies to achieve their goals.
                </h2>
              </div>
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#1766b5] text-slate-50 text-base font-bold leading-normal tracking-[0.015em] hover:bg-sky-700 transition-colors">
                <span className="truncate">Explore Featured Article</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="pb-3 mt-8">
            <div className="flex border-b border-slate-300 px-4 gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-b-[#1766b5] text-slate-900'
                      : 'border-b-transparent text-slate-500 hover:border-b-[#1766b5] hover:text-slate-900'
                  }`}
                >
                  <p className="text-base font-bold leading-normal tracking-[0.015em]">{tab.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Articles */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {filteredArticles.map((article) => (
                <div key={article.id} className="p-4 group">
                  <div className="flex flex-col xl:flex-row xl:items-start gap-8 rounded-2xl">
                    <div className="w-full xl:w-1/2 aspect-video bg-cover bg-center rounded-2xl overflow-hidden" style={{
                      backgroundImage: `url("${article.image}")`
                    }}></div>
                    <div className="flex w-full xl:w-1/2 min-w-72 grow flex-col items-stretch justify-center gap-3 py-4">
                      <p className="text-slate-900 text-2xl font-bold leading-tight tracking-[-0.015em]">{article.title}</p>
                      <p className="text-slate-600 text-base font-normal leading-normal">
                        {article.description}
                      </p>
                      <a className="inline-flex items-center gap-2 text-[#1766b5] font-bold group-hover:underline" href="#">
                        Read More
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              <div className="flex items-center justify-center p-4 mt-8">
                <a className="flex size-10 items-center justify-center text-slate-500 hover:text-slate-900 transition-colors" href="#">
                  <span className="material-symbols-outlined">chevron_left</span>
                </a>
                <a className="text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center text-white rounded-full bg-[#1766b5]" href="#">1</a>
                <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-slate-600 rounded-full hover:bg-slate-200 transition-colors" href="#">2</a>
                <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-slate-600 rounded-full hover:bg-slate-200 transition-colors" href="#">3</a>
                <span className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-slate-600 rounded-full">...</span>
                <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-slate-600 rounded-full hover:bg-slate-200 transition-colors" href="#">10</a>
                <a className="flex size-10 items-center justify-center text-slate-500 hover:text-slate-900 transition-colors" href="#">
                  <span className="material-symbols-outlined">chevron_right</span>
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-[360px] space-y-8 pt-8">
              {/* Newsletter */}
              <div className="bg-slate-100 p-6 rounded-2xl">
                <h3 className="text-slate-900 text-xl font-bold leading-tight tracking-[-0.015em] mb-4">Newsletter</h3>
                <div className="flex flex-col gap-4">
                  <input 
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-0 focus:ring-2 focus:ring-[#1766b5] border border-slate-300 bg-white h-12 placeholder:text-slate-500 px-4 text-base font-normal leading-normal" 
                    placeholder="Your email address" 
                  />
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 flex-1 bg-[#1766b5] text-slate-50 text-base font-bold leading-normal tracking-[0.015em] hover:bg-sky-700 transition-colors">
                    <span className="truncate">Subscribe</span>
                  </button>
                </div>
              </div>

              {/* Trending Articles */}
              <div className="bg-slate-100 p-6 rounded-2xl">
                <h3 className="text-slate-900 text-xl font-bold leading-tight tracking-[-0.015em] mb-4">Trending Articles</h3>
                <div className="space-y-4">
                  <a className="block text-slate-900 text-base font-normal leading-normal hover:text-[#1766b5] transition-colors" href="#">The Future of Work: Trends Shaping the Industry</a>
                  <a className="block text-slate-900 text-base font-normal leading-normal hover:text-[#1766b5] transition-colors" href="#">Best Practices for Managing Remote Teams</a>
                  <a className="block text-slate-900 text-base font-normal leading-normal hover:text-[#1766b5] transition-colors" href="#">Maximizing Productivity with CodFleet's Tools</a>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-slate-100 p-6 rounded-2xl">
                <h3 className="text-slate-900 text-xl font-bold leading-tight tracking-[-0.015em] mb-4">Categories</h3>
                <div className="space-y-4">
                  <a className="block text-slate-900 text-base font-normal leading-normal hover:text-[#1766b5] transition-colors" href="#">Press Releases</a>
                  <a className="block text-slate-900 text-base font-normal leading-normal hover:text-[#1766b5] transition-colors" href="#">Market Updates</a>
                  <a className="block text-slate-900 text-base font-normal leading-normal hover:text-[#1766b5] transition-colors" href="#">Integration Stories</a>
                </div>
              </div>

              {/* Social Share */}
              <div className="bg-slate-100 p-6 rounded-2xl">
                <h3 className="text-slate-900 text-xl font-bold leading-tight tracking-[-0.015em] mb-4">Share</h3>
                <div className="gap-2 grid-cols-[repeat(auto-fit, minmax(80px,_1fr))] grid">
                  <a className="flex flex-col items-center gap-2 py-2.5 text-center group" href="#">
                    <div className="rounded-full bg-slate-200 p-3 group-hover:bg-[#1766b5] transition-colors">
                      <svg className="text-slate-800 group-hover:text-white transition-colors" fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                        <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path>
                      </svg>
                    </div>
                    <p className="text-slate-900 text-sm font-medium leading-normal">Twitter</p>
                  </a>
                  <a className="flex flex-col items-center gap-2 py-2.5 text-center group" href="#">
                    <div className="rounded-full bg-slate-200 p-3 group-hover:bg-[#1766b5] transition-colors">
                      <svg className="text-slate-800 group-hover:text-white transition-colors" fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path>
                      </svg>
                    </div>
                    <p className="text-slate-900 text-sm font-medium leading-normal">Facebook</p>
                  </a>
                  <a className="flex flex-col items-center gap-2 py-2.5 text-center group" href="#">
                    <div className="rounded-full bg-slate-200 p-3 group-hover:bg-[#1766b5] transition-colors">
                      <svg className="text-slate-800 group-hover:text-white transition-colors" fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                        <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
                      </svg>
                    </div>
                    <p className="text-slate-900 text-sm font-medium leading-normal">LinkedIn</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
