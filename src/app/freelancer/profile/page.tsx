'use client';

import React, { useState } from 'react';

const FreelancerProfilePage: React.FC = () => {
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+358 40 123 4567',
    location: 'Helsinki, Finland',
    bio: 'Experienced compliance specialist with 5+ years in regulatory affairs and risk management.',
    skills: ['Compliance', 'Risk Management', 'Regulatory Affairs', 'Data Analysis'],
    hourlyRate: 60,
    availability: 'Available',
    experience: '5+ years'
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkillAdd = (skill: string) => {
    if (skill && !profileData.skills.includes(skill)) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <div className="w-full">
      <h2 className="text-[#111618] tracking-light text-2xl sm:text-3xl lg:text-[28px] font-bold leading-tight px-4 sm:px-6 text-left pb-3 pt-5">
        My Profile
      </h2>

      <div className="p-4 sm:p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <form className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div
                className="w-24 h-24 bg-center bg-no-repeat bg-cover rounded-full flex-shrink-0"
                style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCT--61-yK57Yg-p7OIMILzjh9sql94r6186FcmTDABkrjq8XG1PLJT9F8WnYl81HL7SejGX35W-yekIn8N9bGgn7Jsr7JO3umShCm9YLEqiMOhUX6maDXRpIEkjopF9VHS6SXHBLoYUjYN8TNkb7xmO7UNLoNj3nxsTiCaQg02dri9jDzqLg86R-LEDmj5I-XER8s8v2dsK5XjuLFdPou8Rh8wdHOmrI87RC_A9tuFZaG_bJ-UtZxdpuZjl0PlK9MNA0NsrwuH5sth")'
                }}
              />
              <div className="w-full sm:w-auto">
                <button className="flex w-full sm:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#e8ebed] transition-colors">
                  <span className="truncate">Change Photo</span>
                </button>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#111618] text-base font-medium leading-normal pb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-2 focus:ring-[#1193d4] focus:ring-opacity-20 border border-[#dbe2e6] bg-white focus:border-[#1193d4] h-14 placeholder:text-[#617c89] p-[15px] text-base font-normal leading-normal"
                />
              </div>
              <div>
                <label className="block text-[#111618] text-base font-medium leading-normal pb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-2 focus:ring-[#1193d4] focus:ring-opacity-20 border border-[#dbe2e6] bg-white focus:border-[#1193d4] h-14 placeholder:text-[#617c89] p-[15px] text-base font-normal leading-normal"
                />
              </div>
              <div>
                <label className="block text-[#111618] text-base font-medium leading-normal pb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-2 focus:ring-[#1193d4] focus:ring-opacity-20 border border-[#dbe2e6] bg-white focus:border-[#1193d4] h-14 placeholder:text-[#617c89] p-[15px] text-base font-normal leading-normal"
                />
              </div>
              <div>
                <label className="block text-[#111618] text-base font-medium leading-normal pb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-2 focus:ring-[#1193d4] focus:ring-opacity-20 border border-[#dbe2e6] bg-white focus:border-[#1193d4] h-14 placeholder:text-[#617c89] p-[15px] text-base font-normal leading-normal"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-[#111618] text-base font-medium leading-normal pb-2">
                Bio
              </label>
              <textarea
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-2 focus:ring-[#1193d4] focus:ring-opacity-20 border border-[#dbe2e6] bg-white focus:border-[#1193d4] placeholder:text-[#617c89] p-[15px] text-base font-normal leading-normal"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-[#111618] text-base font-medium leading-normal pb-2">
                Skills
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {profileData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-[#f0f3f4] text-[#111618] text-sm rounded-full"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleSkillRemove(skill)}
                      className="text-[#617c89] hover:text-[#111618]"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a skill"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-2 focus:ring-[#1193d4] focus:ring-opacity-20 border border-[#dbe2e6] bg-white focus:border-[#1193d4] h-10 placeholder:text-[#617c89] p-3 text-sm font-normal leading-normal"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSkillAdd((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <button
                  type="button"
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1193d4] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#0f7bb8] transition-colors"
                >
                  <span className="truncate">Add</span>
                </button>
              </div>
            </div>

            {/* Professional Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[#111618] text-base font-medium leading-normal pb-2">
                  Hourly Rate (€)
                </label>
                <input
                  type="number"
                  value={profileData.hourlyRate}
                  onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-2 focus:ring-[#1193d4] focus:ring-opacity-20 border border-[#dbe2e6] bg-white focus:border-[#1193d4] h-14 placeholder:text-[#617c89] p-[15px] text-base font-normal leading-normal"
                />
              </div>
              <div>
                <label className="block text-[#111618] text-base font-medium leading-normal pb-2">
                  Availability
                </label>
                <select
                  value={profileData.availability}
                  onChange={(e) => handleInputChange('availability', e.target.value)}
                  className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-2 focus:ring-[#1193d4] focus:ring-opacity-20 border border-[#dbe2e6] bg-white focus:border-[#1193d4] h-14 placeholder:text-[#617c89] p-[15px] text-base font-normal leading-normal"
                >
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>
              <div>
                <label className="block text-[#111618] text-base font-medium leading-normal pb-2">
                  Experience
                </label>
                <input
                  type="text"
                  value={profileData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-2 focus:ring-[#1193d4] focus:ring-opacity-20 border border-[#dbe2e6] bg-white focus:border-[#1193d4] h-14 placeholder:text-[#617c89] p-[15px] text-base font-normal leading-normal"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                className="flex w-full sm:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-[#1193d4] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#0f7bb8] transition-colors"
              >
                <span className="truncate">Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfilePage;
