'use client';

import React, { useState } from 'react';

interface ScheduleAssignmentModalProps {
  freelancerName: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (scheduleData: ScheduleData) => void;
}

interface ScheduleData {
  startDate: string;
  endDate: string;
  dailyStartTime: string;
  dailyEndTime: string;
  breakDuration: string;
  totalHoursPerWeek: string;
  notes: string;
}

const ScheduleAssignmentModal: React.FC<ScheduleAssignmentModalProps> = ({
  freelancerName,
  isOpen,
  onClose,
  onConfirm
}) => {
  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    startDate: '',
    endDate: '',
    dailyStartTime: '',
    dailyEndTime: '',
    breakDuration: '',
    totalHoursPerWeek: '',
    notes: ''
  });

  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const handleInputChange = (field: keyof ScheduleData, value: string) => {
    setScheduleData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDayToggle = (day: number) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(scheduleData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[#111618] tracking-light text-[32px] font-bold leading-tight">
              Assign Schedule to {freelancerName}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#111618] text-base font-medium leading-normal pb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={scheduleData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-0 border border-[#dbe2e6] bg-white focus:border-[#dbe2e6] h-14 placeholder:text-[#617c89] p-[15px] text-base font-normal leading-normal"
                />
              </div>
              <div>
                <label className="block text-[#111618] text-base font-medium leading-normal pb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={scheduleData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-0 border border-[#dbe2e6] bg-white focus:border-[#dbe2e6] h-14 placeholder:text-[#617c89] p-[15px] text-base font-normal leading-normal"
                />
              </div>
            </div>

            {/* Time Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#111618] text-base font-medium leading-normal pb-2">
                  Daily Start Time
                </label>
                <input
                  type="time"
                  value={scheduleData.dailyStartTime}
                  onChange={(e) => handleInputChange('dailyStartTime', e.target.value)}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-0 border border-[#dbe2e6] bg-white focus:border-[#dbe2e6] h-14 placeholder:text-[#617c89] p-[15px] text-base font-normal leading-normal"
                />
              </div>
              <div>
                <label className="block text-[#111618] text-base font-medium leading-normal pb-2">
                  Daily End Time
                </label>
                <input
                  type="time"
                  value={scheduleData.dailyEndTime}
                  onChange={(e) => handleInputChange('dailyEndTime', e.target.value)}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-0 border border-[#dbe2e6] bg-white focus:border-[#dbe2e6] h-14 placeholder:text-[#617c89] p-[15px] text-base font-normal leading-normal"
                />
              </div>
            </div>

            {/* Break Duration */}
            <div>
              <label className="block text-[#111618] text-base font-medium leading-normal pb-2">
                Break Duration
              </label>
              <input
                type="text"
                placeholder="e.g., 30 minutes"
                value={scheduleData.breakDuration}
                onChange={(e) => handleInputChange('breakDuration', e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-0 border border-[#dbe2e6] bg-white focus:border-[#dbe2e6] h-14 placeholder:text-[#617c89] p-[15px] text-base font-normal leading-normal"
              />
            </div>

            {/* Weekly Schedule */}
            <div>
              <h3 className="text-[#111618] text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
                Weekly Schedule
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-6 p-4">
                <div className="flex min-w-72 max-w-[336px] flex-1 flex-col gap-0.5">
                  <div className="flex items-center p-1 justify-between">
                    <button type="button">
                      <div className="text-[#111618] flex size-10 items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                          <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z" />
                        </svg>
                      </div>
                    </button>
                    <p className="text-[#111618] text-base font-bold leading-tight flex-1 text-center">July 2024</p>
                    <button type="button">
                      <div className="text-[#111618] flex size-10 items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                          <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
                        </svg>
                      </div>
                    </button>
                  </div>
                  <div className="grid grid-cols-7">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                      <p key={index} className="text-[#111618] text-[13px] font-bold leading-normal tracking-[0.015em] flex h-12 w-full items-center justify-center pb-0.5">
                        {day}
                      </p>
                    ))}
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleDayToggle(day)}
                        className={`h-12 w-full text-sm font-medium leading-normal ${
                          selectedDays.includes(day)
                            ? 'bg-[#1193d4] text-white rounded-full'
                            : 'text-[#111618] hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex size-full items-center justify-center rounded-full">
                          {day}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Total Hours */}
            <div>
              <label className="block text-[#111618] text-base font-medium leading-normal pb-2">
                Total Hours per Week
              </label>
              <input
                type="number"
                placeholder="e.g., 40"
                value={scheduleData.totalHoursPerWeek}
                onChange={(e) => handleInputChange('totalHoursPerWeek', e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-0 border border-[#dbe2e6] bg-white focus:border-[#dbe2e6] h-14 placeholder:text-[#617c89] p-[15px] text-base font-normal leading-normal"
              />
            </div>

            {/* Offered Rate */}
            <div>
              <h3 className="text-[#111618] text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
                Offered Rate
              </h3>
              <p className="text-[#111618] text-base font-normal leading-normal pb-3 pt-1">
                Rate per Hour/Task: $25
              </p>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-[#111618] text-base font-medium leading-normal pb-2">
                Notes/Special Instructions for {freelancerName}
              </label>
              <textarea
                placeholder="Add any specific instructions or notes for the freelancer"
                value={scheduleData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-0 border border-[#dbe2e6] bg-white focus:border-[#dbe2e6] min-h-36 placeholder:text-[#617c89] p-[15px] text-base font-normal leading-normal"
                rows={4}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#e8ebed] transition-colors"
              >
                <span className="truncate">Cancel</span>
              </button>
              <button
                type="submit"
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1193d4] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#0f7bb8] transition-colors"
              >
                <span className="truncate">Confirm Assignment</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleAssignmentModal;
