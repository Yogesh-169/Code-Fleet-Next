'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface CompanyLayoutProps {
  children: React.ReactNode;
}

const CompanyLayout: React.FC<CompanyLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        // Check if user has company role
        if (userData.roles && (userData.roles.includes('company_org_admin') || userData.roles.includes('company'))) {
          setIsAuthenticated(true);
        } else {
          // Redirect to appropriate dashboard based on role
          if (userData.roles.includes('freelancer')) {
            router.push('/freelancer');
          } else if (userData.roles.includes('admin')) {
            router.push('/admin');
          } else {
            router.push('/login');
          }
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
    
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1d90c9] mx-auto mb-4"></div>
          <p className="text-[#507e95]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  const isActive = (href: string) => {
    if (href === '/company') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const navigationItems = [
    { href: '/company', label: 'Dashboard', icon: 'House' },
    { href: '/company/tasks', label: 'Tasks', icon: 'ListBullets' },
    { href: '/company/talent-pool', label: 'Talent Pool', icon: 'Users' },
    { href: '/company/billing', label: 'Billing & Invoices', icon: 'CreditCard' },
    { href: '/company/compliance', label: 'Compliance', icon: 'Shield' },
    { href: '/company/reports', label: 'Reports', icon: 'ChartBar' },
  ];

  return (
    <div 
      className="relative flex size-full min-h-screen flex-col bg-gray-50 group/design-root overflow-x-hidden" 
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-4 sm:py-5 px-2 sm:px-4 lg:px-6">
          {/* Sidebar */}
          <div className="hidden lg:flex flex-col w-64 xl:w-80 flex-shrink-0">
            <div className="flex h-full min-h-[700px] flex-col justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="size-8 text-blue-600">
                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_6_319)">
                        <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_6_319"><rect fill="white" height="48" width="48"></rect></clipPath>
                      </defs>
                    </svg>
                  </div>
                  <h1 className="text-[#0e161b] text-lg font-bold">Acme Co</h1>
                </div>
                <div className="flex flex-col gap-2">
                  {navigationItems.map((item) => (
                    <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg ${isActive(item.href) ? 'bg-[#e8eff3] text-[#0e161b] font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}>
                      <div className="text-[#0e161b]" data-icon={item.icon} data-size="24px" data-weight="fill">
                        {/* SVG for House icon */}
                        {item.icon === 'House' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                            <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></path>
                          </svg>
                        )}
                        {/* SVG for ListBullets icon */}
                        {item.icon === 'ListBullets' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                            <path d="M80,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H88A8,8,0,0,1,80,64Zm136,56H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,64H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM44,52A12,12,0,1,0,56,64,12,12,0,0,0,44,52Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,116Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,180Z"></path>
                          </svg>
                        )}
                        {/* SVG for Users icon */}
                        {item.icon === 'Users' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                            <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
                          </svg>
                        )}
                        {/* SVG for CreditCard icon */}
                        {item.icon === 'CreditCard' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                            <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"></path>
                          </svg>
                        )}
                        {/* SVG for Shield icon */}
                        {item.icon === 'Shield' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                            <path d="M208,40H48A16,16,0,0,0,32,56v58.78c0,89.61,75.82,119.34,91,124.39a15.53,15.53,0,0,0,10,0c15.2-5.05,91-34.78,91-124.39V56A16,16,0,0,0,208,40Zm0,74.79c0,78.42-66.35,104.62-80,109.18-13.53-4.51-80-30.69-80-109.18V56H208ZM82.34,141.66a8,8,0,0,1,11.32-11.32L112,148.68l50.34-50.34a8,8,0,0,1,11.32,11.32l-56,56a8,8,0,0,1-11.32,0Z"></path>
                          </svg>
                        )}
                        {/* SVG for ChartBar icon */}
                        {item.icon === 'ChartBar' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                            <path d="M216,40H136V24a8,8,0,0,0-16,0V40H40A16,16,0,0,0,24,56V176a16,16,0,0,0,16,16H79.36L57.75,219a8,8,0,0,0,12.5,10l29.59-37h56.32l29.59,37a8,8,0,1,0,12.5-10l-21.61-27H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,136H40V56H216V176ZM104,120v24a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm32-16v40a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm32-16v56a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Z"></path>
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 px-4 py-2.5">
                  <div className="text-[#0e161b]" data-icon="Question" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                    </svg>
                  </div>
                  <p className="text-[#0e161b] text-sm font-medium">Support</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex flex-col w-full max-w-6xl flex-1">
            {/* Header */}
            <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-gray-200 bg-white rounded-lg shadow-sm mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-[#0e161b]">Dashboard</h1>
              <div className="flex items-center gap-2 sm:gap-4">
                <Link
                  href="/company/tasks/post"
                  className="hidden sm:flex items-center justify-center rounded-lg h-10 px-3 lg:px-4 bg-[#1d90c9] text-white text-xs sm:text-sm font-bold hover:bg-[#1766b5] transition-colors"
                >
                  Post New Task
                </Link>
                <Link
                  href="/company/compliance"
                  className="hidden md:flex items-center justify-center rounded-lg h-10 px-3 lg:px-4 bg-[#e8eff3] text-[#0e161b] text-xs sm:text-sm font-bold hover:bg-[#d1dde6] transition-colors"
                >
                  Download Compliance Pack
                </Link>
                <button className="flex items-center justify-center size-8 sm:size-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                  <svg fill="currentColor" height="16px" width="16px" className="sm:h-5 sm:w-5" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                    <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
                  </svg>
                </button>
                <div className="size-8 sm:size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAUNc9Op7Bd-_gq9GalnaLC1sIKimfh4mxU1u4gOSykFuxnXtHPBZlVkRjy3t1jBrn1iB85_xsB2sR5Wgd4nIXiFQyh3NeFw0kBttDuOQDsNFBz_yJQY_O1WhDefWEEqD8Ylv7_fItmuLSFbXrsCcIBpt-I0vQbjU2qx0qqlcHwC3GIDz9hh_1z-wuS4GbGWMyCrgZvi67dFPhXPK8WxQM4_usMUQ14669PXU1LMcMwgQfKR7e6xn5DCuQsVc5iOQpk1VgMoizwFxs")' }}></div>
              </div>
            </header>
            
            {children}
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-pb">
          <div className="flex justify-around py-2 px-2">
            {navigationItems.slice(0, 4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors min-w-0 flex-1 ${
                  isActive(item.href) 
                    ? 'text-[#1d90c9] bg-blue-50' 
                    : 'text-[#507e95] hover:text-[#0e161b]'
                }`}
              >
                <div className="text-[#0e161b] mb-1">
                  {item.icon === 'House' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z" />
                    </svg>
                  )}
                  {item.icon === 'ListBullets' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M80,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H88A8,8,0,0,1,80,64Zm136,56H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,64H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM44,52A12,12,0,1,0,56,64,12,12,0,0,0,44,52Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,116Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,180Z" />
                    </svg>
                  )}
                  {item.icon === 'Users' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z" />
                    </svg>
                  )}
                  {item.icon === 'CreditCard' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z" />
                    </svg>
                  )}
                </div>
                <span className="text-xs font-medium truncate">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLayout;
