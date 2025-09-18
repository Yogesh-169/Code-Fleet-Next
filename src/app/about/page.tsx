export default function AboutUs() {
  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden" 
         style={{
           '--checkbox-tick-svg': "url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(248,250,251)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')",
           fontFamily: 'Inter, "Noto Sans", sans-serif'
         }}>
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e8edf3] px-10 py-4 sticky top-0 bg-[#f8fafb] z-10">
        <div className="flex items-center gap-4 text-[#0e141b]">
          <div className="size-6">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="#0a2b4d"></path>
            </svg>
          </div>
          <h2 className="text-[#0e141b] text-xl font-bold leading-tight tracking-[-0.015em]">CodFleet</h2>
        </div>
        <nav className="flex items-center gap-8 text-base">
          <a className="text-[#4f7396] hover:text-[#0e141b] font-medium leading-normal" href="#">For Freelancers</a>
          <a className="text-[#4f7396] hover:text-[#0e141b] font-medium leading-normal" href="#">For Companies</a>
          <a className="text-[#4f7396] hover:text-[#0e141b] font-medium leading-normal" href="#">Resources</a>
          <a className="text-[#4f7396] hover:text-[#0e141b] font-medium leading-normal" href="#">About Us</a>
        </nav>
        <div className="flex gap-4">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-6 bg-white text-[#0a2c4d] border border-[#d0dbe6] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-50 transition-colors">
            <span className="truncate">Log In</span>
          </button>
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-6 bg-[#0a2c4d] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#08223b] transition-colors">
            <span className="truncate">Join the Fleet</span>
          </button>
        </div>
      </header>
      
      <main className="flex-1">
        <div className="px-40 flex flex-1 justify-center py-16">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 gap-24">
            <div className="grid grid-cols-2 gap-12 items-center text-left">
              <div className="flex flex-col gap-6">
                <h1 className="text-5xl font-black leading-tight tracking-[-0.033em] text-[#0e141b]">The CodFleet Story</h1>
                <p className="text-lg font-normal leading-relaxed text-[#4f7396]">From survival jobs to sustainable careers — CodFleet is building Finland's workforce revolution.</p>
              </div>
              <div className="flex items-center justify-center">
                <img className="w-full h-auto rounded-xl object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu3_tb_upsUcoi5fatUOHeC9eBPRqxv-BxkDhHiUXvZz8Ai_gPS9yIOCXvY2SF132r82QPE9QX9XNWeS16d5haNmDETplFWgHzt5UpIxfRh2oA3hMvntPTH0eSbL3R13OZ2GNnFe6Nzd01BmeS5kaY2oaXlcUDP7VgimwyWLOIVI3NQozF9c-4QYFKdf9Gj_hq9PelOaT9-tBGCwnTocWdNb5zZha7xkzRAQYfuWbdTuztXkSY2ICeXvcDdHNqC3WoDfT7NRY7vzU" alt="CodFleet Story" />
              </div>
            </div>
            
            <section className="flex flex-col items-center gap-12">
              <div className="text-center">
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#0a2c4d]">Vision & Mission</h2>
              </div>
              <div className="grid grid-cols-2 gap-8 w-full">
                <div className="flex flex-col text-left gap-4 rounded-lg bg-white border border-[#e8edf3] p-8 shadow-sm">
                  <div className="flex items-center justify-center size-12 rounded-full bg-[#e8edf3] text-[#0a2c4d]">
                    <span className="material-symbols-outlined text-3xl">compass_calibration</span>
                  </div>
                  <h4 className="text-[#0e141b] text-2xl font-bold leading-tight">Our Vision</h4>
                  <p className="text-[#4f7396] text-base">To create a world where every skilled individual, regardless of origin, has equal access to meaningful work, and every company can seamlessly tap into a global talent pool. We envision a future where borders don't define opportunities, but instead, become bridges for collaboration, innovation, and shared prosperity.</p>
                </div>
                <div className="flex flex-col text-left gap-4 rounded-lg bg-white border border-[#e8edf3] p-8 shadow-sm">
                  <div className="flex items-center justify-center size-12 rounded-full bg-[#e8edf3] text-[#0a2c4d]">
                    <span className="material-symbols-outlined text-3xl">flag</span>
                  </div>
                  <h4 className="text-[#0e141b] text-2xl font-bold leading-tight">Our Mission</h4>
                  <p className="text-[#4f7396] text-base">To empower Finland's workforce by connecting skilled immigrants with local companies through a compliant, trust-based platform. We are dedicated to breaking down employment barriers, fostering upward career mobility, and serving as a key integration partner to build a diverse, resilient, and thriving economy.</p>
                </div>
              </div>
            </section>
            
            <section className="flex flex-col items-center gap-12">
              <div className="text-center">
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#0a2c4d]">Our Aim & Intent</h2>
              </div>
              <div className="grid grid-cols-2 gap-12 items-center">
                <div className="flex flex-col gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-bold text-[#0e141b]">Our Aim</h4>
                      <p className="text-[#4f7396] mt-1">To directly address Finland's labor shortage by activating the latent talent within its immigrant communities. We provide a clear, efficient, and compliant pathway for companies to hire skilled professionals who are already in the country but are currently underemployed or stuck in survival jobs.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-[#0e141b]">Our Intent</h4>
                      <p className="text-[#4f7396] mt-1">We are committed to transforming the narrative from 'immigrant' to 'integrated professional'. Our intent is to build a system that not only fills jobs but also builds careers, fosters social integration, and creates a more inclusive and productive Finnish society for all.</p>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-white border border-[#e8edf3] rounded-lg p-6 shadow-sm">
                  <div className="flex flex-col gap-4">
                    <h4 className="text-center font-bold text-[#0e141b]">The Opportunity Gap</h4>
                    <div className="flex justify-between items-end gap-4 h-64">
                      <div className="flex flex-col justify-end items-center h-full w-1/3 bg-[#e8f0f7] rounded-md p-2">
                        <div className="h-3/4 w-full bg-[#0a2c4d] rounded-t-sm"></div>
                        <p className="text-center text-sm font-medium text-[#0a2c4d] mt-2">Open Jobs</p>
                      </div>
                      <div className="flex-grow text-center text-5xl text-[#d0dbe6] font-black">↔</div>
                      <div className="flex flex-col justify-end items-center h-full w-1/3 bg-[#f7e8e8] rounded-md p-2">
                        <div className="h-1/4 w-full bg-[#b32b2b] rounded-t-sm"></div>
                        <p className="text-center text-sm font-medium text-[#b32b2b] mt-2">Stuck Migrants</p>
                      </div>
                    </div>
                    <p className="text-center text-sm text-[#4f7396] mt-4">CodFleet bridges the gap between Finland's labor needs and the untapped potential of its immigrant population.</p>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="flex flex-col items-center gap-12">
              <div className="text-center">
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#0a2c4d]">Core Principles</h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full">
                <div className="flex flex-col items-center text-center gap-4 rounded-lg bg-white border border-[#e8edf3] p-6 shadow-sm">
                  <div className="flex items-center justify-center size-12 rounded-full bg-[#e8edf3] text-[#0a2c4d]">
                    <span className="material-symbols-outlined text-3xl">verified_user</span>
                  </div>
                  <h4 className="text-[#0e141b] text-lg font-bold leading-tight">Compliance-First</h4>
                  <p className="text-[#4f7396] text-base">We navigate legal complexities so you don't have to, ensuring every placement is secure and by the book.</p>
                </div>
                <div className="flex flex-col items-center text-center gap-4 rounded-lg bg-white border border-[#e8edf3] p-6 shadow-sm">
                  <div className="flex items-center justify-center size-12 rounded-full bg-[#e8edf3] text-[#0a2c4d]">
                    <span className="material-symbols-outlined text-3xl">lock</span>
                  </div>
                  <h4 className="text-[#0e141b] text-lg font-bold leading-tight">Escrow & Trust</h4>
                  <p className="text-[#4f7396] text-base">Our secure payment system protects both freelancers and companies, fostering a reliable partnership.</p>
                </div>
                <div className="flex flex-col items-center text-center gap-4 rounded-lg bg-white border border-[#e8edf3] p-6 shadow-sm">
                  <div className="flex items-center justify-center size-12 rounded-full bg-[#e8edf3] text-[#0a2c4d]">
                    <span className="material-symbols-outlined text-3xl">trending_up</span>
                  </div>
                  <h4 className="text-[#0e141b] text-lg font-bold leading-tight">Upward Path</h4>
                  <p className="text-[#4f7396] text-base">We're committed to career growth, providing resources and opportunities for continuous development.</p>
                </div>
                <div className="flex flex-col items-center text-center gap-4 rounded-lg bg-white border border-[#e8edf3] p-6 shadow-sm">
                  <div className="flex items-center justify-center size-12 rounded-full bg-[#e8edf3] text-[#0a2c4d]">
                    <span className="material-symbols-outlined text-3xl">handshake</span>
                  </div>
                  <h4 className="text-[#0e141b] text-lg font-bold leading-tight">Integration Partner</h4>
                  <p className="text-[#4f7396] text-base">We go beyond job matching, actively helping professionals integrate into Finnish society.</p>
                </div>
              </div>
            </section>
            
            <section className="flex flex-col items-center gap-12">
              <div className="text-center">
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#0a2c4d]">The CodFleet Team</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                <div className="flex flex-col items-center text-center gap-4 rounded-lg bg-white border border-[#e8edf3] p-8 shadow-sm">
                  <img className="w-32 h-32 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu3_tb_upsUcoi5fatUOHeC9eBPRqxv-BxkDhHiUXvZz8Ai_gPS9yIOCXvY2SF132r82QPE9QX9XNWeS16d5haNmDETplFWgHzt5UpIxfRh2oA3hMvntPTH0eSbL3R13OZ2GNnFe6Nzd01BmeS5kaY2oaXlcUDP7VgimwyWLOIVI3NQozF9c-4QYFKdf9Gj_hq9PelOaT9-tBGCwnTocWdNb5zZha7xkzRAQYfuWbdTuztXkSY2ICeXvcDdHNqC3WoDfT7NRY7vzU" alt="Yash Panchal" />
                  <h4 className="text-[#0e141b] text-xl font-bold leading-tight mt-2">Yash Panchal</h4>
                  <p className="text-[#4f7396] text-base font-medium">Founder & CEO</p>
                  <p className="text-[#4f7396] text-base">The visionary driving the mission. Yash combines firsthand experience with a passion for technology to build a more equitable workforce.</p>
                </div>
                <div className="flex flex-col items-center text-center gap-4 rounded-lg bg-white border border-[#e8edf3] p-8 shadow-sm">
                  <div className="w-32 h-32 rounded-full bg-[#e8edf3] flex items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-[#0a2c4d]">psychology</span>
                  </div>
                  <h4 className="text-[#0e141b] text-xl font-bold leading-tight mt-2">Kaizen</h4>
                  <p className="text-[#4f7396] text-base font-medium">AI Compliance Engine</p>
                  <p className="text-[#4f7396] text-base">The intelligence behind our compliance. Kaizen is our proprietary AI, ensuring every contract and connection meets Finland's legal standards.</p>
                </div>
                <div className="flex flex-col items-center text-center gap-4 rounded-lg bg-white border border-[#e8edf3] p-8 shadow-sm">
                  <div className="w-32 h-32 rounded-full bg-[#e8edf3] flex items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-[#0a2c4d]">lightbulb</span>
                  </div>
                  <h4 className="text-[#0e141b] text-xl font-bold leading-tight mt-2">Lumen</h4>
                  <p className="text-[#4f7396] text-base font-medium">AI Matching & Growth Partner</p>
                  <p className="text-[#4f7396] text-base">The spark that connects talent with opportunity. Lumen analyzes skills and aspirations to create perfect matches and illuminate career paths.</p>
                </div>
              </div>
            </section>
            
            <section className="text-center bg-white border border-[#e8edf3] rounded-lg p-16 shadow-lg">
              <h2 className="text-[#0e141b] tracking-tight text-4xl font-bold leading-tight">CodFleet is more than a platform. It's a workforce revolution.</h2>
              <p className="text-[#4f7396] mt-4 text-lg max-w-2xl mx-auto">Join us in shaping the future of work in Finland.</p>
              <div className="mt-8 flex justify-center gap-4">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-[#0a2c4d] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#08223b] transition-colors">
                  <span className="truncate">Join as Freelancer</span>
                </button>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-white text-[#0a2c4d] border border-[#d0dbe6] text-base font-bold leading-normal tracking-[0.015em] hover:bg-gray-50 transition-colors">
                  <span className="truncate">Partner as Company</span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <footer className="bg-[#e8edf3] text-center py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center gap-8 mb-4">
            <a className="text-[#4f7396] text-sm font-medium hover:text-[#0e141b]" href="#">Privacy Policy</a>
            <a className="text-[#4f7396] text-sm font-medium hover:text-[#0e141b]" href="#">Terms of Service</a>
          </div>
          <p className="text-[#4f7396] text-sm">© 2024 CodFleet. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}