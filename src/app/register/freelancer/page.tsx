"use client";

import React, { useState } from "react";

const FreelancerRegistration = () => {
    const [formData, setFormData] = useState({
        // Account
        email: "",
        mobileNumber: "",
        password: "",

        // Identity & Right to Work
        fullName: "",
        dateOfBirth: "",
        countryOfCitizenship: "",
        finnishIdentityCode: "",
        primaryAddress: "",

        // Business & Tax
        businessId: "",
        iban: "",
        taxRegistrationStatus: "",
        vatStatus: "",

        // Compliance
        informationAccurate: false,
        termsAgreed: false,
        falseInformationWarning: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            console.log(`File selected: ${file.name}`);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted with data:", formData);
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <div className="relative flex flex-col min-h-screen bg-[#f8fafb] overflow-x-hidden">
                <div className="px-4 lg:px-40 flex flex-1 justify-center py-5">
                    <div className="flex flex-col max-w-[960px] flex-1">
                        {/* Hero Section */}
                        <div className="p-0 sm:p-4">
                            <div
                                className="flex min-h-[380px] sm:min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-none sm:rounded-xl items-center justify-center p-4 text-center"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCt5sf83Nw2MpN2M3kIhcE1Ss7iqHemgXm7dH58H8kTVyEt8_dmUVSiN3QvGDqmeBIgYAYzCVPWKItPzhkH2ZaO7rqs8Gh6f0JZuMGs7xWw6ff8GeUDnP8VrENx9581XHLnrf0BDO1-6qGdyzDbDKHQJ1WmvmEEAezRgo56Pxd4p5zP_Y5gn-d-QiHgGj_sbNRUwfHHh7uLD2sGdlv1xXEJrilxCDZHaO5vQNyFNddCXbvDK59QY0qF9yrseRM0367Zkyb0xBRA4_A')",
                                }}
                            >
                                <div className="flex flex-col gap-2 text-center">
                                    <h1 className="text-white text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                                        Join the CodFleet Network
                                    </h1>
                                    <p className="text-white/90 text-lg font-normal leading-normal max-w-2xl">
                                        Work legally. Get paid securely. Grow your career.
                                    </p>
                                </div>
                                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#1766b5] text-[#f8fafb] text-base font-bold leading-normal tracking-wide shadow-lg hover:bg-blue-700 transition-colors">
                                    <span className="truncate">Get Started</span>
                                </button>
                            </div>
                        </div>

                        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Sidebar Links */}
                            <aside className="md:col-span-1">
                                <div className="sticky top-6">
                                    <div className="mb-6">
                                        <a
                                            href="/register"
                                            className="inline-flex items-center text-[#1766b5] hover:text-blue-700 font-medium"
                                        >
                                            ← Back to Register
                                        </a>
                                    </div>
                                    <h2 className="text-slate-900 text-2xl font-bold leading-tight tracking-tight mb-4">
                                        Quick Links
                                    </h2>
                                    <ul className="space-y-3">
                                        <li>
                                            <a
                                                href="#who-can-register"
                                                className="text-slate-600 hover:text-blue-600 font-medium"
                                            >
                                                Who can register?
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#how-it-works"
                                                className="text-slate-600 hover:text-blue-600 font-medium"
                                            >
                                                How It Works
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#registration-form"
                                                className="text-slate-600 hover:text-blue-600 font-medium"
                                            >
                                                Registration Form
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#after-you-submit"
                                                className="text-slate-600 hover:text-blue-600 font-medium"
                                            >
                                                After You Submit
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#faq"
                                                className="text-slate-600 hover:text-blue-600 font-medium"
                                            >
                                                FAQ
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </aside>

                            {/* Main Content */}
                            <main className="md:col-span-2 space-y-12">
                                {/* Who can register section */}
                                <section id="who-can-register" className="space-y-4">
                                    <h2 className="text-slate-900 text-3xl font-bold leading-tight tracking-tight">
                                        Who can register?
                                    </h2>
                                    <p className="text-slate-600 text-base font-normal leading-relaxed">
                                        To register as a freelancer on CodFleet, you must be a resident of Finland with a valid Finnish
                                        personal identity code. You should also have the right to work in
                                        Finland, either as a citizen or with a valid visa or permit. If you are a student, there may be
                                        limitations on the number of hours you can work per week. Please
                                        ensure you meet all eligibility requirements before proceeding with registration.
                                    </p>
                                </section>

                                {/* How it works section */}
                                <section id="how-it-works" className="space-y-6">
                                    <h2 className="text-slate-900 text-3xl font-bold leading-tight tracking-tight">
                                        How It Works (Freelancers)
                                    </h2>
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 size-10 bg-blue-600/10 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
                                                1
                                            </div>
                                            <div>
                                                <h3 className="text-slate-800 text-lg font-semibold leading-normal">Create Your Account</h3>
                                                <p className="text-slate-500 text-base font-normal leading-relaxed">
                                                    Provide your basic information to get started.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 size-10 bg-blue-600/10 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
                                                2
                                            </div>
                                            <div>
                                                <h3 className="text-slate-800 text-lg font-semibold leading-normal">Complete Your Profile</h3>
                                                <p className="text-slate-500 text-base font-normal leading-relaxed">
                                                    Fill in your professional details, skills, and availability.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 size-10 bg-blue-600/10 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
                                                3
                                            </div>
                                            <div>
                                                <h3 className="text-slate-800 text-lg font-semibold leading-normal">Submit Required Documents</h3>
                                                <p className="text-slate-500 text-base font-normal leading-relaxed">
                                                    Upload necessary documents for verification.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 size-10 bg-blue-600/10 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
                                                4
                                            </div>
                                            <div>
                                                <h3 className="text-slate-800 text-lg font-semibold leading-normal">Get Approved</h3>
                                                <p className="text-slate-500 text-base font-normal leading-relaxed">
                                                    Our team will review your application and notify you of the approval status.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 size-10 bg-blue-600/10 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
                                                5
                                            </div>
                                            <div>
                                                <h3 className="text-slate-800 text-lg font-semibold leading-normal">Receive Payments via Escrow</h3>
                                                <p className="text-slate-500 text-base font-normal leading-relaxed">
                                                    Once your work is completed and approved by the client, payments are securely released from
                                                    escrow.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Registration Form */}
                                <section id="registration-form" className="space-y-8 bg-white p-6 sm:p-8 rounded-xl border border-slate-200/80">
                                    <h2 className="text-slate-900 text-3xl font-bold leading-tight tracking-tight">Registration Form</h2>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Account Section */}
                                        <div className="space-y-6">
                                            <h3 className="text-slate-800 text-xl font-bold leading-tight tracking-tight border-b pb-3">Account</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <label className="flex flex-col gap-2">
                                                    <p className="text-slate-700 text-sm font-medium">Email</p>
                                                    <input
                                                        name="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-300 bg-slate-50 h-12 placeholder:text-slate-400 p-3 text-base"
                                                        placeholder="Enter your email"
                                                    />
                                                </label>
                                                <label className="flex flex-col gap-2">
                                                    <p className="text-slate-700 text-sm font-medium">Mobile Number</p>
                                                    <input
                                                        name="mobileNumber"
                                                        type="tel"
                                                        value={formData.mobileNumber}
                                                        onChange={handleInputChange}
                                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-300 bg-slate-50 h-12 placeholder:text-slate-400 p-3 text-base"
                                                        placeholder="Enter your mobile number"
                                                    />
                                                </label>
                                                <label className="flex flex-col gap-2">
                                                    <p className="text-slate-700 text-sm font-medium">Password</p>
                                                    <input
                                                        name="password"
                                                        type="password"
                                                        value={formData.password}
                                                        onChange={handleInputChange}
                                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-300 bg-slate-50 h-12 placeholder:text-slate-400 p-3 text-base"
                                                        placeholder="Create a password"
                                                    />
                                                </label>
                                                <label className="flex flex-col gap-2">
                                                    <p className="text-slate-700 text-sm font-medium">Two-Factor Authentication (2FA)</p>
                                                    <button
                                                        type="button"
                                                        className="flex items-center justify-center gap-2 w-full h-12 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors text-slate-700 font-medium"
                                                    >
                                                        <span className="material-symbols-outlined text-xl">security</span> Enable 2FA
                                                    </button>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Identity & Right to Work Section */}
                                        <div className="space-y-6">
                                            <h3 className="text-slate-800 text-xl font-bold leading-tight tracking-tight border-b pb-3">
                                                Identity & Right to Work
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <label className="flex flex-col gap-2">
                                                    <p className="text-slate-700 text-sm font-medium">Full Name</p>
                                                    <input
                                                        name="fullName"
                                                        type="text"
                                                        value={formData.fullName}
                                                        onChange={handleInputChange}
                                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-300 bg-slate-50 h-12 placeholder:text-slate-400 p-3 text-base"
                                                        placeholder="Enter your full name"
                                                    />
                                                </label>
                                                <label className="flex flex-col gap-2">
                                                    <p className="text-slate-700 text-sm font-medium">Date of Birth</p>
                                                    <input
                                                        name="dateOfBirth"
                                                        type="date"
                                                        value={formData.dateOfBirth}
                                                        onChange={handleInputChange}
                                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-300 bg-slate-50 h-12 placeholder:text-slate-400 p-3 text-base"
                                                    />
                                                </label>
                                                <label className="flex flex-col gap-2">
                                                    <p className="text-slate-700 text-sm font-medium">Country of Citizenship</p>
                                                    <select
                                                        name="countryOfCitizenship"
                                                        value={formData.countryOfCitizenship}
                                                        onChange={handleInputChange}
                                                        className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-300 bg-slate-50 h-12 placeholder:text-slate-400 p-3 text-base"
                                                    >
                                                        <option value="">Select Country</option>
                                                        <option value="Finland">Finland</option>
                                                    </select>
                                                </label>
                                                <label className="flex flex-col gap-2">
                                                    <p className="text-slate-700 text-sm font-medium">Finnish Personal Identity Code</p>
                                                    <input
                                                        name="finnishIdentityCode"
                                                        type="text"
                                                        value={formData.finnishIdentityCode}
                                                        onChange={handleInputChange}
                                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-300 bg-slate-50 h-12 placeholder:text-slate-400 p-3 text-base"
                                                        placeholder="Enter your identity code"
                                                    />
                                                </label>
                                                <label className="flex flex-col gap-2 sm:col-span-2">
                                                    <p className="text-slate-700 text-sm font-medium">Primary Address</p>
                                                    <input
                                                        name="primaryAddress"
                                                        type="text"
                                                        value={formData.primaryAddress}
                                                        onChange={handleInputChange}
                                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-300 bg-slate-50 h-12 placeholder:text-slate-400 p-3 text-base"
                                                        placeholder="Enter your primary address"
                                                    />
                                                </label>
                                                <label className="flex flex-col gap-2">
                                                    <p className="text-slate-700 text-sm font-medium">Upload Passport/ID</p>
                                                    <div className="flex items-center justify-center w-full h-12 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors text-slate-700 font-medium cursor-pointer">
                                                        <span className="material-symbols-outlined text-xl mr-2">upload_file</span> Choose File
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            onChange={handleFileUpload}
                                                        />
                                                    </div>
                                                </label>
                                                <label className="flex flex-col gap-2">
                                                    <p className="text-slate-700 text-sm font-medium">Upload Residence Permit</p>
                                                    <div className="flex items-center justify-center w-full h-12 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors text-slate-700 font-medium cursor-pointer">
                                                        <span className="material-symbols-outlined text-xl mr-2">upload_file</span> Choose File
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            onChange={handleFileUpload}
                                                        />
                                                    </div>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Business & Tax Section */}
                                        <div className="space-y-6">
                                            <h3 className="text-slate-800 text-xl font-bold leading-tight tracking-tight border-b pb-3">
                                                Business & Tax
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <label className="flex flex-col gap-2">
                                                    <p className="text-slate-700 text-sm font-medium">Business ID (if applicable)</p>
                                                    <input
                                                        name="businessId"
                                                        type="text"
                                                        value={formData.businessId}
                                                        onChange={handleInputChange}
                                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-300 bg-slate-50 h-12 placeholder:text-slate-400 p-3 text-base"
                                                        placeholder="Enter Business ID"
                                                    />
                                                </label>
                                                <label className="flex flex-col gap-2">
                                                    <p className="text-slate-700 text-sm font-medium">IBAN</p>
                                                    <input
                                                        name="iban"
                                                        type="text"
                                                        value={formData.iban}
                                                        onChange={handleInputChange}
                                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-300 bg-slate-50 h-12 placeholder:text-slate-400 p-3 text-base"
                                                        placeholder="Enter your IBAN"
                                                    />
                                                </label>
                                                <label className="flex flex-col gap-2">
                                                    <p className="text-slate-700 text-sm font-medium">Tax Registration Status</p>
                                                    <select
                                                        name="taxRegistrationStatus"
                                                        value={formData.taxRegistrationStatus}
                                                        onChange={handleInputChange}
                                                        className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-300 bg-slate-50 h-12 placeholder:text-slate-400 p-3 text-base"
                                                    >
                                                        <option value="">Select status</option>
                                                        <option value="Registered">Registered</option>
                                                        <option value="Not Registered">Not Registered</option>
                                                    </select>
                                                </label>
                                                <label className="flex flex-col gap-2">
                                                    <p className="text-slate-700 text-sm font-medium">VAT Status</p>
                                                    <select
                                                        name="vatStatus"
                                                        value={formData.vatStatus}
                                                        onChange={handleInputChange}
                                                        className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-300 bg-slate-50 h-12 placeholder:text-slate-400 p-3 text-base"
                                                    >
                                                        <option value="">Select status</option>
                                                        <option value="VAT Registered">VAT Registered</option>
                                                        <option value="Not VAT Registered">Not VAT Registered</option>
                                                    </select>
                                                </label>
                                                <label className="flex flex-col gap-2 sm:col-span-2">
                                                    <p className="text-slate-700 text-sm font-medium">Upload Tax Card</p>
                                                    <div className="flex items-center justify-center w-full h-12 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors text-slate-700 font-medium cursor-pointer">
                                                        <span className="material-symbols-outlined text-xl mr-2">upload_file</span> Choose File
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            onChange={handleFileUpload}
                                                        />
                                                    </div>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Compliance Declarations */}
                                        <div className="space-y-6">
                                            <h3 className="text-slate-800 text-xl font-bold leading-tight tracking-tight border-b pb-3">
                                                Compliance Declarations
                                            </h3>
                                            <div className="space-y-4">
                                                <label className="flex items-start gap-3">
                                                    <input
                                                        name="informationAccurate"
                                                        type="checkbox"
                                                        checked={formData.informationAccurate}
                                                        onChange={handleInputChange}
                                                        className="h-5 w-5 mt-0.5 rounded border-slate-300 bg-slate-100 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                                                    />
                                                    <p className="text-slate-600 text-base">I confirm that all information provided is accurate and complete.</p>
                                                </label>
                                                <label className="flex items-start gap-3">
                                                    <input
                                                        name="termsAgreed"
                                                        type="checkbox"
                                                        checked={formData.termsAgreed}
                                                        onChange={handleInputChange}
                                                        className="h-5 w-5 mt-0.5 rounded border-slate-300 bg-slate-100 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                                                    />
                                                    <p className="text-slate-600 text-base">I agree to comply with CodFleet's terms and conditions.</p>
                                                </label>
                                                <label className="flex items-start gap-3">
                                                    <input
                                                        name="falseInformationWarning"
                                                        type="checkbox"
                                                        checked={formData.falseInformationWarning}
                                                        onChange={handleInputChange}
                                                        className="h-5 w-5 mt-0.5 rounded border-slate-300 bg-slate-100 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                                                    />
                                                    <p className="text-slate-600 text-base">I understand that providing false information may result in account termination.</p>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Form Buttons */}
                                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t">
                                            <button
                                                type="button"
                                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-slate-200 text-slate-800 text-base font-bold leading-normal tracking-wide hover:bg-slate-300 transition-colors"
                                            >
                                                <span className="truncate">Save & Finish Later</span>
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-blue-600 text-white text-base font-bold leading-normal tracking-wide shadow-lg hover:bg-blue-700 transition-colors"
                                            >
                                                <span className="truncate">Create Account</span>
                                            </button>
                                        </div>
                                    </form>
                                </section>

                                {/* After You Submit Section */}
                                <section id="after-you-submit" className="space-y-4">
                                    <h2 className="text-slate-900 text-3xl font-bold leading-tight tracking-tight">After You Submit</h2>
                                    <p className="text-slate-600 text-base font-normal leading-relaxed">
                                        Once you submit your registration, our team will review your application and documents. You will
                                        receive notifications regarding the status of your application. If
                                        approved, you can start applying for projects and working with clients on CodFleet.
                                    </p>
                                </section>

                                {/* FAQ Section */}
                                <section id="faq" className="space-y-4">
                                    <h2 className="text-slate-900 text-3xl font-bold leading-tight tracking-tight">Quick FAQ</h2>
                                    <div className="space-y-3">
                                        <details className="group p-4 rounded-lg bg-white border border-slate-200/80">
                                            <summary className="flex cursor-pointer items-center justify-between gap-6 text-slate-800 font-semibold">
                                                What documents do I need to upload?
                                                <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">expand_more</span>
                                            </summary>
                                            <p className="text-slate-600 mt-3">You will need to upload a copy of your passport or national ID card,
                                                and a residence permit if applicable. For business and tax purposes, a copy of your tax card is
                                                required.</p>
                                        </details>
                                        <details className="group p-4 rounded-lg bg-white border border-slate-200/80">
                                            <summary className="flex cursor-pointer items-center justify-between gap-6 text-slate-800 font-semibold">
                                                How long does the approval process take?
                                                <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">expand_more</span>
                                            </summary>
                                            <p className="text-slate-600 mt-3">The approval process typically takes 3-5 business days. We will
                                                notify you via email as soon as your application has been reviewed.</p>
                                        </details>
                                        <details className="group p-4 rounded-lg bg-white border border-slate-200/80">
                                            <summary className="flex cursor-pointer items-center justify-between gap-6 text-slate-800 font-semibold">
                                                What are the payment terms?
                                                <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">expand_more</span>
                                            </summary>
                                            <p className="text-slate-600 mt-3">Payments are processed through our secure escrow system. Once a
                                                client approves your work, the funds are released to your registered IBAN within 2 business days.
                                            </p>
                                        </details>
                                    </div>
                                </section>
                            </main>
                        </div>

                        {/* Footer */}
                        <footer className="flex flex-col gap-6 px-5 py-10 text-center border-t mt-12">
                            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                                <a href="#" className="text-slate-500 hover:text-blue-600 text-base font-normal leading-normal">
                                    Terms of Service
                                </a>
                                <a href="#" className="text-slate-500 hover:text-blue-600 text-base font-normal leading-normal">
                                    Privacy Policy
                                </a>
                                <a href="#" className="text-slate-500 hover:text-blue-600 text-base font-normal leading-normal">
                                    Contact Us
                                </a>
                            </div>
                            <p className="text-slate-500 text-sm font-normal leading-normal">
                                © 2024 CodFleet. All rights reserved.
                            </p>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreelancerRegistration;
