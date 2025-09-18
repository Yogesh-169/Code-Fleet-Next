'use client';

import React, { useState } from 'react';

const TalentPoolPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    compliance: '',
    skills: '',
    availability: ''
  });

  const freelancers = [
    {
      id: 1,
      name: 'Sophia Carter',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCo5xNPO_RiLkJECpvm0ZxIsP304ezYZK9HyE_75k6IWztFXfa-qyeinZxH-cTwMq0zRskRDrANLh4NnCIgIVKU-HB_vdeKhuDYAVqHUbX-IZzkw6W2o1NIWr__hAcpk-swNfxwT5LVaiIEec2m4vR4slzIucZtSRAiouci3c1Noey-bWdfiTUsBDYT6TS7OfGKIXKQauHeWsyE2hZYeVsxpYVFBXqHCgptiEULcfndO484kiDn-lEINlpMiGHvh_SedyDV3GIulTs',
      compliance: 'compliant',
      skills: ['Forklift License', 'Hygiene Passport'],
      availability: '20 hours/week',
      documents: 'Visa ✅, YEL ✅, Insurance ✅',
      rating: 4.8,
      completedTasks: 15
    },
    {
      id: 2,
      name: 'Ethan Bennett',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKbebVQcJ9hmHE3DRMs2r6Jas8N51CcTWpPoSDSU7VFuv2fIUJr-5pUTvr50fgp6nOfIyCSxmow-fM_jTaGwxTtoXXqD3TuSJf7nmP-K8Sbzj2fBHx24xfZrKz7E04GWLkjtwoCo9pdq-uY_QjTBZbCF4jNzNnaG6sEzKrS1-eqwhg8HDOQsfsVlNp0N0RXnrCr9MA_ocbI_KIAonfyXP8LiOvMo3iLZ3EsZzX7-24KUzwdns3DSj1_qbpqm7prbAw2OFd7avlKp4',
      compliance: 'compliant',
      skills: ['Forklift License'],
      availability: '30 hours/week',
      documents: 'Visa ✅, YEL ✅, Insurance ✅',
      rating: 4.6,
      completedTasks: 12
    },
    {
      id: 3,
      name: 'Olivia Hayes',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZJ7TqlUZcRlsTsCaUb-QJoVM48m0YioX4EwWPB64YDy0euZrTqoH1hJ69TPah5vs925JmslCuawJ6mX45LrE8ABQ14VeCUTCipAp9ZjGGNS4F6jbkpzMcrFZjefXeBK8gBliB6Md0MxfwIM0hYVwvoqU6T-GaAxpr9V28oMEUlOhkIsfCnZCME4wrS2erm22umAyR3RJ_z9UPElceSc0JO-10VZrYl1UzL_J074sV35IPpPBtOzkd6tNYZx5UdX6P9YNYWI3yYZI',
      compliance: 'non-compliant',
      skills: ['Hygiene Passport'],
      availability: '15 hours/week',
      documents: 'Visa ✅, YEL ✅, Insurance ✅',
      rating: 4.2,
      completedTasks: 8
    },
    {
      id: 4,
      name: 'Liam Foster',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ_pG5uM1lEOF4WC22E-tuHRTWutN9SsQ8X-T5_tzk8cFDrHQDUYdlhv6t_cKFJzobN6GCYiNqtLPc9cezGdSOIHctOQxis-Or5NAjEuWqzhSNUfp4WmED-hdV9_iEDLyNnqBgv_HMF-THEcxcwKVTz0Ro0KN4AgW2qzLjX-f5nqxAbvYr0TRLshlux59UqE6FV_a1WuzIxn5ck1uNiSLhACizgfy30j1R7FOuH_x3ZCL2WxwFgC-ExjKkscdNGleTz9yL_p6_dXM',
      compliance: 'partially-compliant',
      skills: ['Construction Safety'],
      availability: '25 hours/week',
      documents: 'Visa ✅, YEL ❌, Insurance ✅',
      rating: 4.4,
      completedTasks: 10
    },
    {
      id: 5,
      name: 'Ava Morgan',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbVY2NXV96D1ixi0hARLRA3DLS-cLxKocRHP0nHrYPPNSq01A0FLP0BLjV-P7JTBlCW4tHapfd91s6xy6rUJQcagQ7ShLmTy9L3-rwKpTLIpxVHae1RkSQv8R8E2sE5ACTqM-jatzp10EEPFpRI7D44Kws69f0mJStLNoGseVBbhiBO6hs51qnfAuevNemS1Ny5PCbY-5Uu4kfuBN29KUu5mJrIHd7OPW-hAgVqrult2P_d9fCGZ1GLVn-M9rW9R8wjMfKqA9YEpU',
      compliance: 'compliant',
      skills: ['Forklift License', 'Hygiene Passport', 'Construction Safety'],
      availability: '40 hours/week',
      documents: 'Visa ✅, YEL ✅, Insurance ✅',
      rating: 4.9,
      completedTasks: 22
    },
    {
      id: 6,
      name: 'Noah Carter',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCo5xNPO_RiLkJECpvm0ZxIsP304ezYZK9HyE_75k6IWztFXfa-qyeinZxH-cTwMq0zRskRDrANLh4NnCIgIVKU-HB_vdeKhuDYAVqHUbX-IZzkw6W2o1NIWr__hAcpk-swNfxwT5LVaiIEec2m4vR4slzIucZtSRAiouci3c1Noey-bWdfiTUsBDYT6TS7OfGKIXKQauHeWsyE2hZYeVsxpYVFBXqHCgptiEULcfndO484kiDn-lEINlpMiGHvh_SedyDV3GIulTs',
      compliance: 'non-compliant',
      skills: ['Hygiene Passport'],
      availability: '10 hours/week',
      documents: 'Visa ❌, YEL ✅, Insurance ✅',
      rating: 3.8,
      completedTasks: 5
    }
  ];

  const getComplianceColor = (compliance: string) => {
    switch (compliance) {
      case 'compliant':
        return 'text-green-600';
      case 'partially-compliant':
        return 'text-amber-600';
      case 'non-compliant':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getComplianceIcon = (compliance: string) => {
    switch (compliance) {
      case 'compliant':
        return 'verified';
      case 'partially-compliant':
        return 'warning';
      case 'non-compliant':
        return 'cancel';
      default:
        return 'unknown';
    }
  };

  const getComplianceText = (compliance: string) => {
    switch (compliance) {
      case 'compliant':
        return 'Compliant';
      case 'non-compliant':
        return 'Non-Compliant';
      case 'partially-compliant':
        return 'Partially Compliant';
      default:
        return 'Unknown';
    }
  };

  const filteredFreelancers = freelancers.filter(freelancer => {
    const matchesSearch = freelancer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompliance = !selectedFilters.compliance || freelancer.compliance === selectedFilters.compliance;
    const matchesSkills = !selectedFilters.skills || freelancer.skills.some(skill => 
      skill.toLowerCase().includes(selectedFilters.skills.toLowerCase())
    );
    
    return matchesSearch && matchesCompliance && matchesSkills;
  });

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Talent Pool</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Browse and connect with qualified freelancers</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                placeholder="Search freelancers..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <select
                className="px-3 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                value={selectedFilters.compliance}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, compliance: e.target.value }))}
              >
                <option value="">Compliance Status</option>
                <option value="compliant">Compliant</option>
                <option value="partially-compliant">Partially Compliant</option>
                <option value="non-compliant">Non-Compliant</option>
              </select>
              <select
                className="px-3 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                value={selectedFilters.skills}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, skills: e.target.value }))}
              >
                <option value="">Skills</option>
                <option value="forklift">Forklift License</option>
                <option value="hygiene">Hygiene Passport</option>
                <option value="construction">Construction Safety</option>
              </select>
              <select
                className="px-3 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                value={selectedFilters.availability}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, availability: e.target.value }))}
              >
                <option value="">Availability</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Freelancers Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {filteredFreelancers.map((freelancer) => (
                <div key={freelancer.id} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <img
                      alt={freelancer.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                      src={freelancer.image}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm sm:text-base truncate">{freelancer.name}</p>
                      <div className={`flex items-center gap-1.5 text-xs sm:text-sm ${getComplianceColor(freelancer.compliance)}`}>
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 256 256">
                          {getComplianceIcon(freelancer.compliance) === 'verified' && (
                            <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.68l50.34-50.34A8,8,0,0,1,173.66,98.34Z" />
                          )}
                          {getComplianceIcon(freelancer.compliance) === 'cancel' && (
                            <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
                          )}
                          {getComplianceIcon(freelancer.compliance) === 'warning' && (
                            <path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z" />
                          )}
                        </svg>
                        <span className="truncate">{getComplianceText(freelancer.compliance)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs sm:text-sm space-y-2">
                    <p className="flex items-center gap-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h32A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z" />
                      </svg>
                      <span className="truncate">{freelancer.skills.join(', ')}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H128v40a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h24V80a8,8,0,0,1,16,0v40h40A8,8,0,0,1,176,128Z" />
                      </svg>
                      <span className="truncate">{freelancer.availability}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h32A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z" />
                      </svg>
                      <span className="text-green-600 truncate">{freelancer.documents}</span>
                    </p>
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
                      <span>⭐ {freelancer.rating}/5</span>
                      <span className="truncate">{freelancer.completedTasks} tasks</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                    <button className="flex-1 text-xs sm:text-sm text-center py-2 px-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                      View Profile
                    </button>
                    <button className="flex-1 text-xs sm:text-sm text-center py-2 px-3 rounded-lg bg-[#1d90c9] text-white hover:bg-[#1766b5] transition-colors">
                      Invite
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Freelancers</span>
                  <span className="font-medium">{freelancers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Compliant</span>
                  <span className="font-medium text-green-600">
                    {freelancers.filter(f => f.compliance === 'compliant').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Partially Compliant</span>
                  <span className="font-medium text-amber-600">
                    {freelancers.filter(f => f.compliance === 'partially-compliant').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Non-Compliant</span>
                  <span className="font-medium text-red-600">
                    {freelancers.filter(f => f.compliance === 'non-compliant').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentPoolPage;