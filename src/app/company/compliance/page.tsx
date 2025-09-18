'use client';

import React, { useState } from 'react';

const CompanyCompliancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const complianceData = {
    overallStatus: 'compliant',
    totalFreelancers: 12,
    compliantFreelancers: 10,
    partiallyCompliant: 2,
    nonCompliant: 0,
    alerts: [
      {
        id: 1,
        type: 'warning',
        title: 'Expiring Visa',
        description: 'Sophia Clark\'s visa expires in 30 days. Please review.',
        freelancer: 'Sophia Clark',
        dueDate: '2024-09-15',
        priority: 'high'
      },
      {
        id: 2,
        type: 'info',
        title: 'Pending Insurance Verification',
        description: 'Awaiting insurance documents from Caleb Foster.',
        freelancer: 'Caleb Foster',
        dueDate: '2024-08-20',
        priority: 'medium'
      },
      {
        id: 3,
        type: 'success',
        title: 'Document Approved',
        description: 'Liam Harper\'s YEL certificate has been approved.',
        freelancer: 'Liam Harper',
        dueDate: '2024-08-10',
        priority: 'low'
      }
    ],
    freelancers: [
      {
        id: 1,
        name: 'Sophia Clark',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCo5xNPO_RiLkJECpvm0ZxIsP304ezYZK9HyE_75k6IWztFXfa-qyeinZxH-cTwMq0zRskRDrANLh4NnCIgIVKU-HB_vdeKhuDYAVqHUbX-IZzkw6W2o1NIWr__hAcpk-swNfxwT5LVaiIEec2m4vR4slzIucZtSRAiouci3c1Noey-bWdfiTUsBDYT6TS7OfGKIXKQauHeWsyE2hZYeVsxpYVFBXqHCgptiEULcfndO484kiDn-lEINlpMiGHvh_SedyDV3GIulTs',
        status: 'warning',
        documents: {
          visa: { status: 'expiring', expiryDate: '2024-09-15' },
          yTunnus: { status: 'valid', expiryDate: '2025-12-31' },
          yel: { status: 'valid', expiryDate: '2025-06-30' },
          insurance: { status: 'valid', expiryDate: '2025-03-15' },
          taxId: { status: 'valid', expiryDate: '2025-12-31' }
        }
      },
      {
        id: 2,
        name: 'Caleb Foster',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKbebVQcJ9hmHE3DRMs2r6Jas8N51CcTWpPoSDSU7VFuv2fIUJr-5pUTvr50fgp6nOfIyCSxmow-fM_jTaGwxTtoXXqD3TuSJf7nmP-K8Sbzj2fBHx24xfZrKz7E04GWLkjtwoCo9pdq-uY_QjTBZbCF4jNzNnaG6sEzKrS1-eqwhg8HDOQsfsVlNp0N0RXnrCr9MA_ocbI_KIAonfyXP8LiOvMo3iLZ3EsZzX7-24KUzwdns3DSj1_qbpqm7prbAw2OFd7avlKp4',
        status: 'pending',
        documents: {
          visa: { status: 'valid', expiryDate: '2025-08-20' },
          yTunnus: { status: 'valid', expiryDate: '2025-12-31' },
          yel: { status: 'valid', expiryDate: '2025-06-30' },
          insurance: { status: 'pending', expiryDate: null },
          taxId: { status: 'valid', expiryDate: '2025-12-31' }
        }
      },
      {
        id: 3,
        name: 'Liam Harper',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ_pG5uM1lEOF4WC22E-tuHRTWutN9SsQ8X-T5_tzk8cFDrHQDUYdlhv6t_cKFJzobN6GCYiNqtLPc9cezGdSOIHctOQxis-Or5NAjEuWqzhSNUfp4WmED-hdV9_iEDLyNnqBgv_HMF-THEcxcwKVTz0Ro0KN4AgW2qzLjX-f5nqxAbvYr0TRLshlux59UqE6FV_a1WuzIxn5ck1uNiSLhACizgfy30j1R7FOuH_x3ZCL2WxwFgC-ExjKkscdNGleTz9yL_p6_dXM',
        status: 'compliant',
        documents: {
          visa: { status: 'valid', expiryDate: '2025-10-15' },
          yTunnus: { status: 'valid', expiryDate: '2025-12-31' },
          yel: { status: 'valid', expiryDate: '2025-06-30' },
          insurance: { status: 'valid', expiryDate: '2025-03-15' },
          taxId: { status: 'valid', expiryDate: '2025-12-31' }
        }
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'non-compliant':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'Compliant';
      case 'warning':
        return 'Warning';
      case 'pending':
        return 'Pending';
      case 'non-compliant':
        return 'Non-Compliant';
      default:
        return status;
    }
  };

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
        return 'text-green-600';
      case 'expiring':
        return 'text-yellow-600';
      case 'expired':
        return 'text-red-600';
      case 'pending':
        return 'text-blue-600';
      case 'missing':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      default:
        return 'ℹ️';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Compliance Management</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Monitor and manage freelancer compliance status</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">Overall Status</h3>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">Compliant</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">All systems operational</p>
          </div>
          <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">Total Freelancers</h3>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">{complianceData.totalFreelancers}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Active freelancers</p>
          </div>
          <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">Compliant</h3>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">{complianceData.compliantFreelancers}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Fully compliant</p>
          </div>
          <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">Alerts</h3>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-600">{complianceData.alerts.length}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Require attention</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <div className="flex gap-4 sm:gap-8 overflow-x-auto">
              {[
                { key: 'overview', label: 'Overview' },
                { key: 'alerts', label: 'Alerts' },
                { key: 'freelancers', label: 'Freelancers' },
                { key: 'documents', label: 'Documents' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'border-b-[#0e161b] text-[#0e161b]'
                      : 'border-b-transparent text-[#507e95] hover:text-[#0e161b]'
                  }`}
                >
                  <p className={`text-sm font-bold leading-normal tracking-[0.015em] ${
                    activeTab === tab.key ? 'text-[#0e161b]' : 'text-[#507e95]'
                  }`}>
                    {tab.label}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Compliance Chart */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Compliance Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Compliant</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '83%' }} />
                    </div>
                    <span className="text-sm font-medium text-gray-800">83%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Partially Compliant</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '17%' }} />
                    </div>
                    <span className="text-sm font-medium text-gray-800">17%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Non-Compliant</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '0%' }} />
                    </div>
                    <span className="text-sm font-medium text-gray-800">0%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {complianceData.alerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert.type)}`}>
                    <div className="flex items-start gap-3">
                      <span className="text-lg">{getAlertIcon(alert.type)}</span>
                      <div>
                        <p className="font-semibold">{alert.title}</p>
                        <p className="text-sm mt-1">{alert.description}</p>
                        <p className="text-xs mt-2 opacity-75">{alert.dueDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-6">
            {complianceData.alerts.map((alert) => (
              <div key={alert.id} className={`p-6 rounded-lg border-l-4 ${getAlertColor(alert.type)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{getAlertIcon(alert.type)}</span>
                    <div>
                      <h3 className="text-lg font-semibold">{alert.title}</h3>
                      <p className="text-sm mt-1">{alert.description}</p>
                      <div className="flex items-center gap-4 mt-3 text-sm">
                        <span className="font-medium">Freelancer: {alert.freelancer}</span>
                        <span>Due: {alert.dueDate}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                          alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {alert.priority} priority
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-[#1d90c9] hover:text-[#1766b5] transition-colors">
                      View Details
                    </button>
                    <button className="px-4 py-2 text-sm font-medium bg-[#1d90c9] text-white rounded-lg hover:bg-[#1766b5] transition-colors">
                      Take Action
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'freelancers' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Freelancer Compliance Status</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-gray-600">Freelancer</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-600">Status</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-600">Visa</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-600">Y-tunnus</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-600">YEL</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-600">Insurance</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-600">Tax ID</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {complianceData.freelancers.map((freelancer) => (
                    <tr key={freelancer.id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={freelancer.image}
                            alt={freelancer.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <span className="font-medium text-gray-800">{freelancer.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(freelancer.status)}`}>
                          {getStatusText(freelancer.status)}
                        </span>
                      </td>
                      {Object.entries(freelancer.documents).map(([key, doc]) => (
                        <td key={key} className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className={`text-xs font-medium ${getDocumentStatusColor(doc.status)}`}>
                              {doc.status}
                            </span>
                            {doc.expiryDate && (
                              <span className="text-xs text-gray-500">
                                {doc.expiryDate}
                              </span>
                            )}
                          </div>
                        </td>
                      ))}
                      <td className="px-6 py-4">
                        <button className="text-[#1d90c9] hover:text-[#1766b5] text-sm font-medium">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Document Templates</h3>
              <div className="space-y-4">
                {[
                  { name: 'Visa Verification Form', type: 'PDF', size: '2.3 MB' },
                  { name: 'Y-tunnus Application', type: 'PDF', size: '1.8 MB' },
                  { name: 'YEL Registration Guide', type: 'PDF', size: '3.1 MB' },
                  { name: 'Insurance Requirements', type: 'PDF', size: '1.5 MB' },
                  { name: 'Tax ID Application', type: 'PDF', size: '2.0 MB' }
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                        <span className="text-red-600 text-sm font-bold">PDF</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{doc.name}</p>
                        <p className="text-sm text-gray-500">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <button className="text-[#1d90c9] hover:text-[#1766b5] text-sm font-medium">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Compliance Pack</h3>
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-800">Complete Compliance Pack</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Download all compliance documents and templates in one package.
                    </p>
                    <button className="mt-4 px-4 py-2 bg-[#1d90c9] text-white rounded-lg hover:bg-[#1766b5] transition-colors text-sm font-medium">
                      Download All Documents
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyCompliancePage;
