'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const PostTaskPage: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    jobTitle: '',
    sector: '',
    location: '',
    description: '',
    
    // Step 2
    skills: [] as string[],
    allowUpskill: false,
    compliance: {
      visa: false,
      yTunnus: false,
      yel: false,
      insurance: false,
      taxId: false,
    },
    
    // Step 3
    coverageWindows: [] as string[],
    hoursPerWeek: '',
    duration: '',
    durationUnit: 'weeks',
    startDate: '',
    endDate: '',
    
    // Step 4
    payRate: '',
    payUnit: 'hour',
    budget: '',
    
    // Step 5
    additionalInfo: '',
    contactPerson: '',
    contactEmail: '',
  });

  const steps = [
    { number: 1, title: 'Basic Information', description: 'Let\'s start with the basics' },
    { number: 2, title: 'Requirements', description: 'Specify skills and compliance' },
    { number: 3, title: 'Schedule', description: 'Define work schedule and duration' },
    { number: 4, title: 'Compensation', description: 'Set pay rate and budget' },
    { number: 5, title: 'Review', description: 'Review and publish your task' },
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form
      console.log('Submitting task:', formData);
      router.push('/company/tasks');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push('/company/tasks');
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateNestedFormData = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="job-title">
            Job Title
          </label>
          <input
            className="form-input w-full rounded-lg border-gray-300 focus:border-[#1766b5] focus:ring focus:ring-[#1766b5] focus:ring-opacity-50 transition duration-200"
            id="job-title"
            placeholder="e.g., Senior Frontend Developer"
            type="text"
            value={formData.jobTitle}
            onChange={(e) => updateFormData('jobTitle', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="sector">
            Sector
          </label>
          <select
            className="form-select w-full rounded-lg border-gray-300 focus:border-[#1766b5] focus:ring focus:ring-[#1766b5] focus:ring-opacity-50 transition duration-200"
            id="sector"
            value={formData.sector}
            onChange={(e) => updateFormData('sector', e.target.value)}
          >
            <option value="">Select a sector</option>
            <option value="tech">Technology</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="construction">Construction</option>
            <option value="warehouse">Warehouse</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="location">
          Location
        </label>
        <input
          className="form-input w-full rounded-lg border-gray-300 focus:border-[#1766b5] focus:ring focus:ring-[#1766b5] focus:ring-opacity-50 transition duration-200"
          id="location"
          placeholder="Enter a full address"
          type="text"
          value={formData.location}
          onChange={(e) => updateFormData('location', e.target.value)}
        />
      </div>
      <div className="w-full h-64 rounded-lg bg-gray-200 overflow-hidden">
        <div
          className="w-full h-full bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBbVY2NXV96D1ixi0hARLRA3DLS-cLxKocRHP0nHrYPPNSq01A0FLP0BLjV-P7JTBlCW4tHapfd91s6xy6rUJQcagQ7ShLmTy9L3-rwKpTLIpxVHae1RkSQv8R8E2sE5ACTqM-jatzp10EEPFpRI7D44Kws69f0mJStLNoGseVBbhiBO6hs51qnfAuevNemS1Ny5PCbY-5Uu4kfuBN29KUu5mJrIHd7OPW-hAgVqrult2P_d9fCGZ1GLVn-M9rW9R8wjMfKqA9YEpU")'
          }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="description">
          Short Description
        </label>
        <textarea
          className="form-textarea w-full rounded-lg border-gray-300 focus:border-[#1766b5] focus:ring focus:ring-[#1766b5] focus:ring-opacity-50 transition duration-200"
          id="description"
          placeholder="Briefly describe the main responsibilities of the task."
          rows={4}
          value={formData.description}
          onChange={(e) => updateFormData('description', e.target.value)}
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="skills">
          Required Skills/Certifications
        </label>
        <div className="relative">
          <select
            className="form-multiselect block w-full rounded-lg border-gray-300 focus:border-[#1766b5] focus:ring focus:ring-[#1766b5] focus:ring-opacity-50 transition duration-200"
            id="skills"
            multiple
            value={formData.skills}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions, option => option.value);
              updateFormData('skills', selected);
            }}
          >
            <option value="forklift-license">Forklift License</option>
            <option value="hygiene-passport">Hygiene Passport</option>
            <option value="finnish-a2">Finnish A2</option>
            <option value="hot-work">Hot Work</option>
            <option value="first-aid">First Aid</option>
            <option value="construction-safety">Construction Safety</option>
            <option value="warehouse-operations">Warehouse Operations</option>
          </select>
        </div>
        <div className="mt-4 flex items-center">
          <input
            className="form-checkbox h-5 w-5 text-[#1766b5] rounded focus:ring-[#1766b5] transition duration-150 ease-in-out"
            id="allow-upskill"
            type="checkbox"
            checked={formData.allowUpskill}
            onChange={(e) => updateFormData('allowUpskill', e.target.checked)}
          />
          <label className="ml-3 text-sm text-gray-700" htmlFor="allow-upskill">
            Allow freelancers to upskill via CodFleet if missing skills
          </label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Compliance Required</label>
        <div className="space-y-3 mt-3">
          {[
            { key: 'visa', label: 'Visa' },
            { key: 'yTunnus', label: 'Y-tunnus (Finnish Business ID)' },
            { key: 'yel', label: 'YEL (Entrepreneur\'s Pension Insurance)' },
            { key: 'insurance', label: 'Liability Insurance' },
            { key: 'taxId', label: 'Tax ID' },
          ].map((item) => (
            <div key={item.key} className="flex items-center">
              <input
                className="form-checkbox h-5 w-5 text-[#1766b5] rounded focus:ring-[#1766b5] transition duration-150 ease-in-out"
                id={item.key}
                type="checkbox"
                checked={formData.compliance[item.key as keyof typeof formData.compliance]}
                onChange={(e) => updateNestedFormData('compliance', item.key, e.target.checked)}
              />
              <label className="ml-3 text-sm text-gray-700" htmlFor={item.key}>
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 bg-blue-50 border-l-4 border-[#1766b5] text-sm text-blue-800">
        <div className="flex items-start">
          <span className="text-blue-600 mr-3 mt-0.5">ℹ️</span>
          <p>CodFleet verifies all documents before freelancers can apply for tasks to ensure compliance and quality.</p>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Schedule & Hours</h3>
        <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 flex items-start gap-3 mb-6">
          <span className="text-xl">⚠️</span>
          <p className="text-sm text-yellow-800">Student freelancers are capped at 30 hours per week. CodFleet automatically enforces this limit.</p>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Coverage Windows</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {['morning', 'noon', 'evening', 'night', 'flexible'].map((window) => (
                <label
                  key={window}
                  className={`flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 ${
                    formData.coverageWindows.includes(window) ? 'bg-blue-50 border-blue-500' : ''
                  }`}
                  htmlFor={window}
                >
                  <input
                    className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    id={window}
                    type="checkbox"
                    checked={formData.coverageWindows.includes(window)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateFormData('coverageWindows', [...formData.coverageWindows, window]);
                      } else {
                        updateFormData('coverageWindows', formData.coverageWindows.filter(w => w !== window));
                      }
                    }}
                  />
                  <span className="ml-3 text-sm font-medium text-gray-800 capitalize">{window}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="hours-per-week">
                Hours per Week
              </label>
              <input
                className="form-input w-full rounded-lg border-gray-300 focus:border-[#1766b5] focus:ring focus:ring-[#1766b5] focus:ring-opacity-50 transition duration-200"
                id="hours-per-week"
                max="168"
                min="1"
                placeholder="e.g., 20"
                type="number"
                value={formData.hoursPerWeek}
                onChange={(e) => updateFormData('hoursPerWeek', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="duration">
                Duration
              </label>
              <div className="flex gap-2">
                <input
                  className="form-input w-1/2 rounded-lg border-gray-300 focus:border-[#1766b5] focus:ring focus:ring-[#1766b5] focus:ring-opacity-50 transition duration-200"
                  id="duration-value"
                  min="1"
                  placeholder="e.g., 6"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => updateFormData('duration', e.target.value)}
                />
                <select
                  className="form-select w-1/2 rounded-lg border-gray-300 focus:border-[#1766b5] focus:ring focus:ring-[#1766b5] focus:ring-opacity-50 transition duration-200"
                  id="duration-unit"
                  value={formData.durationUnit}
                  onChange={(e) => updateFormData('durationUnit', e.target.value)}
                >
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="start-date">
                Start Date
              </label>
              <input
                className="form-input w-full rounded-lg border-gray-300 focus:border-[#1766b5] focus:ring focus:ring-[#1766b5] focus:ring-opacity-50 transition duration-200"
                id="start-date"
                type="date"
                value={formData.startDate}
                onChange={(e) => updateFormData('startDate', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="end-date">
                End Date
              </label>
              <input
                className="form-input w-full rounded-lg border-gray-300 focus:border-[#1766b5] focus:ring focus:ring-[#1766b5] focus:ring-opacity-50 transition duration-200"
                id="end-date"
                type="date"
                value={formData.endDate}
                onChange={(e) => updateFormData('endDate', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Compensation</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="pay-rate">
                Pay Rate
              </label>
              <div className="flex gap-2">
                <input
                  className="form-input w-2/3 rounded-lg border-gray-300 focus:border-[#1766b5] focus:ring focus:ring-[#1766b5] focus:ring-opacity-50 transition duration-200"
                  id="pay-rate"
                  placeholder="e.g., 25"
                  type="number"
                  value={formData.payRate}
                  onChange={(e) => updateFormData('payRate', e.target.value)}
                />
                <select
                  className="form-select w-1/3 rounded-lg border-gray-300 focus:border-[#1766b5] focus:ring focus:ring-[#1766b5] focus:ring-opacity-50 transition duration-200"
                  value={formData.payUnit}
                  onChange={(e) => updateFormData('payUnit', e.target.value)}
                >
                  <option value="hour">€/hour</option>
                  <option value="day">€/day</option>
                  <option value="week">€/week</option>
                  <option value="month">€/month</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="budget">
                Total Budget (Optional)
              </label>
              <input
                className="form-input w-full rounded-lg border-gray-300 focus:border-[#1766b5] focus:ring focus:ring-[#1766b5] focus:ring-opacity-50 transition duration-200"
                id="budget"
                placeholder="e.g., 5000"
                type="number"
                value={formData.budget}
                onChange={(e) => updateFormData('budget', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="additional-info">
              Additional Information
            </label>
            <textarea
              className="form-textarea w-full rounded-lg border-gray-300 focus:border-[#1766b5] focus:ring focus:ring-[#1766b5] focus:ring-opacity-50 transition duration-200"
              id="additional-info"
              placeholder="Any additional information about the task..."
              rows={4}
              value={formData.additionalInfo}
              onChange={(e) => updateFormData('additionalInfo', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="contact-person">
                Contact Person
              </label>
              <input
                className="form-input w-full rounded-lg border-gray-300 focus:border-[#1766b5] focus:ring focus:ring-[#1766b5] focus:ring-opacity-50 transition duration-200"
                id="contact-person"
                placeholder="e.g., John Smith"
                type="text"
                value={formData.contactPerson}
                onChange={(e) => updateFormData('contactPerson', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="contact-email">
                Contact Email
              </label>
              <input
                className="form-input w-full rounded-lg border-gray-300 focus:border-[#1766b5] focus:ring focus:ring-[#1766b5] focus:ring-opacity-50 transition duration-200"
                id="contact-email"
                placeholder="e.g., john@company.com"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => updateFormData('contactEmail', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Review Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Task Summary</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Job Title:</span>
            <span className="font-medium">{formData.jobTitle || 'Not specified'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Sector:</span>
            <span className="font-medium">{formData.sector || 'Not specified'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Location:</span>
            <span className="font-medium">{formData.location || 'Not specified'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Hours per Week:</span>
            <span className="font-medium">{formData.hoursPerWeek || 'Not specified'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Duration:</span>
            <span className="font-medium">{formData.duration} {formData.durationUnit}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Pay Rate:</span>
            <span className="font-medium">€{formData.payRate}/{formData.payUnit}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      default: return renderStep1();
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <p className="text-sm text-gray-500">Step {currentStep} of 5</p>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#1766b5] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Post a new task</h2>
          <p className="text-gray-500 mt-2">{steps[currentStep - 1].description}</p>
        </div>

        {/* Form Content */}
        <div className="space-y-8">
          {renderCurrentStep()}
        </div>

        {/* Navigation */}
        <div className="mt-10 flex justify-between items-center">
          <button
            className="px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition duration-200"
            onClick={handleBack}
          >
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </button>
          <button
            className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#1766b5] hover:bg-blue-700 transition duration-200"
            onClick={handleNext}
          >
            {currentStep === 5 ? 'Publish Task' : `Next: ${steps[currentStep]?.title}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostTaskPage;
