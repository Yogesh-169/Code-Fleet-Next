import React from 'react';

const CompanyRegistration = () => {
    return (
        <div
            className="bg-gray-50 text-gray-900"
            style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
        >
            <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden">
                {/* Header */}
                <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 bg-white/80 px-10 py-3 backdrop-blur-sm">
                    <div className="flex items-center gap-4 text-gray-900">
                        <svg
                            className="h-8 w-8 text-[#1766b5]"
                            fill="none"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] text-gray-900">
                            CodFleet
                        </h2>
                    </div>
                    <nav className="hidden items-center gap-9 md:flex">
                        <a className="text-sm font-medium leading-normal text-gray-700 hover:text-[#1766b5]" href="#">
                            For Freelancers
                        </a>
                        <a className="text-sm font-medium leading-normal text-gray-700 hover:text-[#1766b5]" href="#">
                            For Companies
                        </a>
                        <a className="text-sm font-medium leading-normal text-gray-700 hover:text-[#1766b5]" href="#">
                            Pricing
                        </a>
                        <a className="text-sm font-medium leading-normal text-gray-700 hover:text-[#1766b5]" href="#">
                            Resources
                        </a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <button
                            className="hidden min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold leading-normal tracking-[0.015em] text-gray-900 transition-colors hover:bg-gray-200 md:flex"
                        >
                            <span className="truncate">Log In</span>
                        </button>
                        <button
                            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#1766b5] px-4 py-2 text-sm font-semibold leading-normal tracking-[0.015em] text-white transition-colors hover:bg-[#1766b5]/90"
                        >
                            <span className="truncate">Get Started</span>
                        </button>
                    </div>
                </header>

                {/* Main */}
                <main className="flex flex-1 justify-center py-12 lg:py-16">
                    <div className="w-full max-w-7xl px-4 md:px-8">
                        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
                            <div className="lg:col-span-1">
                                <div className="sticky top-28">
                                    <div
                                        className="flex h-[480px] flex-col items-start justify-end rounded-2xl bg-cover bg-center bg-no-repeat p-8 shadow-lg"
                                        style={{
                                            backgroundImage:
                                                'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuARnZhMnaxIqgKGXNZEHG5yyIQnYBNm3MuZHRkfs_HIjas-bP-3pLQgpey7CpbIxxk_rBbq3f_O-4BOXaYMhxWEYQloe8ZmzmRvFkD-lWdo8UHT2pYl0OkfA_DgC__J2GtrpIG0WuihMqeoFwDkwjdxyIcd4X7WVDhY7qL7b07y47l2EHa4zT2h041NVVkXnEORZUZQG6ShcY4ERBcaG0USo95XS9qUB7QnBIqMhljEGgEvCEEff202ie9Frt9_Spvo4fYpr5pKcgM")',
                                        }}
                                    >
                                        <div className="flex flex-col gap-4">
                                            <h1 className="text-4xl font-bold leading-tight tracking-tighter text-white">
                                                Join CodFleet as a Partner Company
                                            </h1>
                                            <p className="text-lg font-normal leading-normal text-white/90">
                                                Access a verified freelancer network. Hire with zero liability. One invoice, full compliance.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <h2 className="mb-6 text-2xl font-bold leading-tight tracking-tight text-gray-900">How It Works</h2>
                                        <div className="space-y-6">
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#1766b5] text-white">
                                                    <span className="material-symbols-outlined"> business </span>
                                                </div>
                                                <div>
                                                    <p className="text-base font-semibold leading-normal text-gray-900">1. Business Registration</p>
                                                    <p className="text-sm text-gray-600">Fill in your company's legal information.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#1766b5] text-white">
                                                    <span className="material-symbols-outlined"> person </span>
                                                </div>
                                                <div>
                                                    <p className="text-base font-semibold leading-normal text-gray-900">2. Contact Details</p>
                                                    <p className="text-sm text-gray-600">Provide contact information for your team.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#1766b5] text-white">
                                                    <span className="material-symbols-outlined"> description </span>
                                                </div>
                                                <div>
                                                    <p className="text-base font-semibold leading-normal text-gray-900">3. Compliance & Billing</p>
                                                    <p className="text-sm text-gray-600">Set up your billing and upload required documents.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#1766b5] text-white">
                                                    <span className="material-symbols-outlined"> settings </span>
                                                </div>
                                                <div>
                                                    <p className="text-base font-semibold leading-normal text-gray-900">4. Account Setup</p>
                                                    <p className="text-sm text-gray-600">Create your account credentials and roles.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#1766b5] text-white">
                                                    <span className="material-symbols-outlined"> verified </span>
                                                </div>
                                                <div>
                                                    <p className="text-base font-semibold leading-normal text-gray-900">5. Compliance Declarations</p>
                                                    <p className="text-sm text-gray-600">Agree to our terms and conditions.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-900 text-white">
                                                    <span className="material-symbols-outlined"> rocket_launch </span>
                                                </div>
                                                <div>
                                                    <p className="text-base font-semibold leading-normal text-gray-900">6. Launch!</p>
                                                    <p className="text-sm text-gray-600">Start hiring and scaling on demand.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-2">
                                <form className="space-y-10">
                                    <div className="space-y-6 rounded-2xl bg-white p-8 shadow-lg">
                                        <h3 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">Company Information</h3>
                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            <label className="flex flex-col">
                                                <p className="pb-2 text-sm font-medium leading-normal text-gray-700">Legal Business Name</p>
                                                <input
                                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-gray-300 bg-gray-50 p-3 text-base text-gray-900 placeholder:text-gray-500 focus:border-[#1766b5] focus:ring-[#1766b5]"
                                                    placeholder="Enter legal business name"
                                                />
                                            </label>
                                            <label className="flex flex-col">
                                                <p className="pb-2 text-sm font-medium leading-normal text-gray-700">Company Registration Number</p>
                                                <input
                                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-gray-300 bg-gray-50 p-3 text-base text-gray-900 placeholder:text-gray-500 focus:border-[#1766b5] focus:ring-[#1766b5]"
                                                    placeholder="Enter registration number"
                                                />
                                            </label>
                                            <label className="flex flex-col">
                                                <p className="pb-2 text-sm font-medium leading-normal text-gray-700">VAT Number</p>
                                                <input
                                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-gray-300 bg-gray-50 p-3 text-base text-gray-900 placeholder:text-gray-500 focus:border-[#1766b5] focus:ring-[#1766b5]"
                                                    placeholder="Enter VAT number"
                                                />
                                            </label>
                                            <label className="flex flex-col">
                                                <p className="pb-2 text-sm font-medium leading-normal text-gray-700">Industry/Sector</p>
                                                <select
                                                    className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-gray-300 bg-gray-50 p-3 text-base text-gray-900 placeholder:text-gray-500 focus:border-[#1766b5] focus:ring-[#1766b5]"
                                                >
                                                    <option>Select industry/sector</option>
                                                    <option>Technology</option>
                                                    <option>Healthcare</option>
                                                    <option>Finance</option>
                                                </select>
                                            </label>
                                            <label className="flex flex-col">
                                                <p className="pb-2 text-sm font-medium leading-normal text-gray-700">Number of Employees</p>
                                                <input
                                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-gray-300 bg-gray-50 p-3 text-base text-gray-900 placeholder:text-gray-500 focus:border-[#1766b5] focus:ring-[#1766b5]"
                                                    placeholder="e.g., 50-100"
                                                />
                                            </label>
                                            <label className="col-span-1 flex flex-col sm:col-span-2">
                                                <p className="pb-2 text-sm font-medium leading-normal text-gray-700">Headquarters Address</p>
                                                <input
                                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-gray-300 bg-gray-50 p-3 text-base text-gray-900 placeholder:text-gray-500 focus:border-[#1766b5] focus:ring-[#1766b5]"
                                                    placeholder="Enter headquarters address"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="space-y-6 rounded-2xl bg-white p-8 shadow-lg">
                                        <h3 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">Contact Information</h3>
                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            <label className="flex flex-col">
                                                <p className="pb-2 text-sm font-medium leading-normal text-gray-700">Primary Contact Person</p>
                                                <input
                                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-gray-300 bg-gray-50 p-3 text-base text-gray-900 placeholder:text-gray-500 focus:border-[#1766b5] focus:ring-[#1766b5]"
                                                    placeholder="Enter full name"
                                                />
                                            </label>
                                            <label className="flex flex-col">
                                                <p className="pb-2 text-sm font-medium leading-normal text-gray-700">Designation</p>
                                                <input
                                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-gray-300 bg-gray-50 p-3 text-base text-gray-900 placeholder:text-gray-500 focus:border-[#1766b5] focus:ring-[#1766b5]"
                                                    placeholder="e.g., CEO, CTO"
                                                />
                                            </label>
                                            <label className="flex flex-col">
                                                <p className="pb-2 text-sm font-medium leading-normal text-gray-700">Email Address</p>
                                                <input
                                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-gray-300 bg-gray-50 p-3 text-base text-gray-900 placeholder:text-gray-500 focus:border-[#1766b5] focus:ring-[#1766b5]"
                                                    placeholder="Enter email address"
                                                    type="email"
                                                />
                                            </label>
                                            <label className="flex flex-col">
                                                <p className="pb-2 text-sm font-medium leading-normal text-gray-700">Phone Number</p>
                                                <input
                                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-gray-300 bg-gray-50 p-3 text-base text-gray-900 placeholder:text-gray-500 focus:border-[#1766b5] focus:ring-[#1766b5]"
                                                    placeholder="Enter phone number"
                                                    type="tel"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="space-y-6 rounded-2xl bg-white p-8 shadow-lg">
                                        <h3 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">Compliance & Billing</h3>
                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            <label className="col-span-1 flex flex-col sm:col-span-2">
                                                <p className="pb-2 text-sm font-medium leading-normal text-gray-700">Billing Address</p>
                                                <input
                                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-gray-300 bg-gray-50 p-3 text-base text-gray-900 placeholder:text-gray-500 focus:border-[#1766b5] focus:ring-[#1766b5]"
                                                    placeholder="Enter billing address"
                                                />
                                            </label>
                                            <label className="col-span-1 flex flex-col sm:col-span-2">
                                                <p className="pb-2 text-sm font-medium leading-normal text-gray-700">IBAN</p>
                                                <input
                                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-gray-300 bg-gray-50 p-3 text-base text-gray-900 placeholder:text-gray-500 focus:border-[#1766b5] focus:ring-[#1766b5]"
                                                    placeholder="Enter IBAN"
                                                />
                                            </label>
                                            <div className="col-span-1 sm:col-span-2">
                                                <p className="pb-2 text-sm font-medium leading-normal text-gray-700">Document Uploads</p>
                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                                    <div
                                                        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 text-center hover:border-[#1766b5] hover:bg-blue-50"
                                                    >
                                                        <span className="material-symbols-outlined text-4xl text-gray-400"> upload_file </span>
                                                        <p className="mt-1 text-sm text-gray-600">Business Extract</p>
                                                    </div>
                                                    <div
                                                        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 text-center hover:border-[#1766b5] hover:bg-blue-50"
                                                    >
                                                        <span className="material-symbols-outlined text-4xl text-gray-400"> upload_file </span>
                                                        <p className="mt-1 text-sm text-gray-600">VAT Certificate</p>
                                                    </div>
                                                    <div
                                                        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 text-center hover:border-[#1766b5] hover:bg-blue-50"
                                                    >
                                                        <span className="material-symbols-outlined text-4xl text-gray-400"> upload_file </span>
                                                        <p className="mt-1 text-sm text-gray-600">Contractor's Obligations Proof</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-6 rounded-2xl bg-white p-8 shadow-lg">
                                        <h3 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">Account Setup</h3>
                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            <label className="flex flex-col">
                                                <p className="pb-2 text-sm font-medium leading-normal text-gray-700">Password</p>
                                                <input
                                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-gray-300 bg-gray-50 p-3 text-base text-gray-900 placeholder:text-gray-500 focus:border-[#1766b5] focus:ring-[#1766b5]"
                                                    placeholder="Create a strong password"
                                                    type="password"
                                                />
                                            </label>
                                            <label className="flex flex-col">
                                                <p className="pb-2 text-sm font-medium leading-normal text-gray-700">Confirm Password</p>
                                                <input
                                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-gray-300 bg-gray-50 p-3 text-base text-gray-900 placeholder:text-gray-500 focus:border-[#1766b5] focus:ring-[#1766b5]"
                                                    placeholder="Confirm your password"
                                                    type="password"
                                                />
                                            </label>
                                            <label className="col-span-1 flex flex-col sm:col-span-2">
                                                <p className="pb-2 text-sm font-medium leading-normal text-gray-700">User Roles Setup</p>
                                                <input
                                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-gray-300 bg-gray-50 p-3 text-base text-gray-900 placeholder:text-gray-500 focus:border-[#1766b5] focus:ring-[#1766b5]"
                                                    placeholder="e.g., Admin, Hiring Manager"
                                                />
                                            </label>
                                            <div className="col-span-1 flex items-center gap-4 sm:col-span-2">
                                                <p className="text-sm font-medium leading-normal text-gray-700">Enable 2-Factor Authentication (2FA)</p>
                                                <label className="relative inline-flex cursor-pointer items-center">
                                                    <input className="peer sr-only" type="checkbox" value="" />
                                                    <div
                                                        className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#1766b5] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"
                                                    ></div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-6 rounded-2xl bg-white p-8 shadow-lg">
                                        <h3 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">Compliance Declarations</h3>
                                        <div className="space-y-4">
                                            <label className="flex items-start gap-3">
                                                <input
                                                    className="form-checkbox mt-1 h-5 w-5 rounded border-gray-300 text-[#1766b5] focus:ring-[#1766b5]"
                                                    type="checkbox"
                                                />
                                                <p className="text-base font-normal leading-normal text-gray-700">
                                                    I confirm that all information provided is accurate and complete.
                                                </p>
                                            </label>
                                            <label className="flex items-start gap-3">
                                                <input
                                                    className="form-checkbox mt-1 h-5 w-5 rounded border-gray-300 text-[#1766b5] focus:ring-[#1766b5]"
                                                    type="checkbox"
                                                />
                                                <p className="text-base font-normal leading-normal text-gray-700">
                                                    I agree to comply with CodFleet's terms and conditions.
                                                </p>
                                            </label>
                                            <label className="flex items-start gap-3">
                                                <input
                                                    className="form-checkbox mt-1 h-5 w-5 rounded border-gray-300 text-[#1766b5] focus:ring-[#1766b5]"
                                                    type="checkbox"
                                                />
                                                <p className="text-base font-normal leading-normal text-gray-700">
                                                    I understand the responsibilities and obligations of a partner company.
                                                </p>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                                        <button
                                            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#1766b5] px-6 py-3 text-base font-semibold leading-normal text-white transition-colors hover:bg-[#1766b5]/90 sm:w-auto"
                                            type="submit"
                                        >
                                            Register Company
                                        </button>
                                        <button
                                            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray-100 px-6 py-3 text-base font-semibold leading-normal text-gray-900 transition-colors hover:bg-gray-200 sm:w-auto"
                                            type="button"
                                        >
                                            Save & Finish Later
                                        </button>
                                    </div>
                                    <div className="rounded-2xl bg-blue-50 p-6">
                                        <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900">After Registration</h3>
                                        <p className="mt-2 text-base font-normal leading-normal text-gray-700">
                                            Once you submit your registration, our team will review your information. You will receive a
                                            confirmation email upon successful registration, followed by onboarding
                                            instructions to start hiring freelancers.
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                            <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 md:order-2">
                                <a className="text-sm text-gray-600 hover:text-gray-900" href="#">
                                    Terms of Service
                                </a>
                                <a className="text-sm text-gray-600 hover:text-gray-900" href="#">
                                    Privacy Policy
                                </a>
                                <a className="text-sm text-gray-600 hover:text-gray-900" href="#">
                                    Contact Us
                                </a>
                            </div>
                            <div className="flex justify-center space-x-6 md:order-3">
                                <a className="text-gray-500 hover:text-gray-600" href="#">
                                    <span className="sr-only">Twitter</span>
                                    <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                                        ></path>
                                    </svg>
                                </a>
                                <a className="text-gray-500 hover:text-gray-600" href="#">
                                    <span className="sr-only">LinkedIn</span>
                                    <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            clipRule="evenodd"
                                            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                                            fillRule="evenodd"
                                        ></path>
                                    </svg>
                                </a>
                            </div>
                            <p className="text-center text-sm text-gray-500 md:order-1 md:mt-0">© 2023 CodFleet. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default CompanyRegistration;