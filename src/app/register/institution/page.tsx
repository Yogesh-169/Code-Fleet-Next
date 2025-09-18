import React from "react";

const InstitutionRegistration = () => {
    return (
        <div
            className="relative flex min-h-screen flex-col bg-white group/design-root"
            style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
        >
            <div className="layout-container flex h-full grow flex-col">
                {/* Header */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e8edf3] px-10 py-4">
                    <div className="flex items-center gap-3 text-slate-800">
                        <div className="size-8 text-[#1766b5]">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                        </div>
                        <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-[-0.015em]">
                            CodFleet
                        </h2>
                    </div>
                    <div className="flex flex-1 justify-end gap-6">
                        <nav className="flex items-center gap-6">
                            <a className="text-slate-900 text-sm font-medium leading-normal" href="#">
                                Home
                            </a>
                            <a className="text-slate-900 text-sm font-medium leading-normal" href="#">
                                About
                            </a>
                            <a className="text-sm font-medium leading-normal text-slate-900" href="#">
                                Services
                            </a>
                            <a className="text-sm font-medium leading-normal text-slate-900" href="#">
                                Contact
                            </a>
                        </nav>
                        <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-slate-900 text-white text-sm font-semibold leading-normal">
                            <span className="truncate">Login</span>
                        </button>
                    </div>
                </header>
                <main className="flex-1">
                    {/* Hero Section */}
                    <section className="relative bg-slate-50">
                        <div className="absolute inset-0">
                            <img
                                alt="Background image of a modern university campus"
                                className="h-full w-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcvAVnsIG8O7E2QdA0In6nQ3Y8Equk10TSgmw1WwxUV6pNZlr7Dt8Vn1AI4njnyzRtjNnF79VDjjk8wg1t6bG4GWN1302QGJvOo5lBu8IxweWheK_5SXLbikxQVDj5oNlQBKcYvV99hQPYDewpHk26Sxaj2GT39NVV0peHLtPTbr-p38MnJZujjnD5ezF6D4-c2uQU6twoW_z7n-ZM70UR-ucvWS_kXQPbcM9pHhhT_r0NW-bidmh3gdePF9eY_bPuTf-LYS0g-2w"
                            />
                            <div className="absolute inset-0 bg-slate-900/60"></div>
                        </div>
                        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
                            <div className="text-center">
                                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                    Partner with CodFleet as an Educational Institute
                                </h1>
                                <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-200">
                                    Empower freelancers. Bridge them into skilled jobs.
                                </p>
                                <div className="mt-10">
                                    <a
                                        className="rounded-md border border-transparent bg-[#1766b5] px-8 py-3 text-base font-medium text-white shadow-lg hover:bg-blue-700 sm:px-10"
                                        href="#registration-form"
                                    >
                                        Register Institute
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* How It Works Section */}
                    <section className="bg-white py-24 sm:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl lg:text-center">
                                <h2 className="text-base font-semibold leading-7 text-[#1766b5]">How It Works</h2>
                                <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                    A simple process for our partners
                                </p>
                            </div>
                            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                                    <div className="relative pl-16">
                                        <dt className="text-base font-semibold leading-7 text-slate-900">
                                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1766b5]">
                                                <span className="material-symbols-outlined text-white">how_to_reg</span>
                                            </div>
                                            Institute Registration
                                        </dt>
                                        <dd className="mt-2 text-base leading-7 text-slate-600">
                                            Register your institute on CodFleet.
                                        </dd>
                                    </div>
                                    <div className="relative pl-16">
                                        <dt className="text-base font-semibold leading-7 text-slate-900">
                                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1766b5]">
                                                <span className="material-symbols-outlined text-white">verified_user</span>
                                            </div>
                                            Profile Setup &amp; Verification
                                        </dt>
                                        <dd className="mt-2 text-base leading-7 text-slate-600">
                                            Complete your institute profile and get verified.
                                        </dd>
                                    </div>
                                    <div className="relative pl-16">
                                        <dt className="text-base font-semibold leading-7 text-slate-900">
                                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1766b5]">
                                                <span className="material-symbols-outlined text-white">link</span>
                                            </div>
                                            Program &amp; Course Linking
                                        </dt>
                                        <dd className="mt-2 text-base leading-7 text-slate-600">
                                            Link your programs and courses to CodFleet.
                                        </dd>
                                    </div>
                                    <div className="relative pl-16">
                                        <dt className="text-base font-semibold leading-7 text-slate-900">
                                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1766b5]">
                                                <span className="material-symbols-outlined text-white">gavel</span>
                                            </div>
                                            Compliance &amp; Partnership
                                        </dt>
                                        <dd className="mt-2 text-base leading-7 text-slate-600">
                                            Ensure compliance and finalize partnership.
                                        </dd>
                                    </div>
                                    <div className="relative pl-16">
                                        <dt className="text-base font-semibold leading-7 text-slate-900">
                                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1766b5]">
                                                <span className="material-symbols-outlined text-white">manage_accounts</span>
                                            </div>
                                            Account Setup
                                        </dt>
                                        <dd className="mt-2 text-base leading-7 text-slate-600">
                                            Set up your account credentials and user roles.
                                        </dd>
                                    </div>
                                    <div className="relative pl-16">
                                        <dt className="text-base font-semibold leading-7 text-slate-900">
                                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1766b5]">
                                                <span className="material-symbols-outlined text-white">visibility</span>
                                            </div>
                                            Gain Visibility
                                        </dt>
                                        <dd className="mt-2 text-base leading-7 text-slate-600">
                                            Your institute gains visibility among freelancers.
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </section>

                    {/* Registration Form Section */}
                    <section className="bg-slate-50 py-24 sm:py-32" id="registration-form">
                        <div className="mx-auto max-w-3xl px-6 lg:px-8">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-center">
                                Educational Institute Registration Form
                            </h2>
                            <form action="#" className="mt-16 space-y-12" method="POST">
                                <div className="space-y-8 border-b border-slate-900/10 pb-12">
                                    <h3 className="text-xl font-semibold leading-7 text-slate-900">Institute Information</h3>
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium leading-6 text-slate-900" htmlFor="institute-name">
                                                Institute Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    className="block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-[#1766b5] sm:text-sm sm:leading-6"
                                                    id="institute-name"
                                                    name="institute-name"
                                                    placeholder="Enter Institute Name"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium leading-6 text-slate-900" htmlFor="accreditation">
                                                Accreditation Number/Authority
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    className="block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-[#1766b5] sm:text-sm sm:leading-6"
                                                    id="accreditation"
                                                    name="accreditation"
                                                    placeholder="Enter Accreditation Number/Authority"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium leading-6 text-slate-900" htmlFor="institute-type">
                                                Type of Institute
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    className="block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-[#1766b5] sm:text-sm sm:leading-6"
                                                    id="institute-type"
                                                    name="institute-type"
                                                >
                                                    <option>University</option>
                                                    <option>College</option>
                                                    <option>Vocational School</option>
                                                    <option>Online Platform</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium leading-6 text-slate-900" htmlFor="website-url">
                                                Website URL
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    className="block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-[#1766b5] sm:text-sm sm:leading-6"
                                                    id="website-url"
                                                    name="website-url"
                                                    placeholder="https://www.example.com"
                                                    type="url"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium leading-6 text-slate-900" htmlFor="hq-address">
                                                Headquarters Address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    className="block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-[#1766b5] sm:text-sm sm:leading-6"
                                                    id="hq-address"
                                                    name="hq-address"
                                                    placeholder="Enter Headquarters Address"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-8 border-b border-slate-900/10 pb-12">
                                    <h3 className="text-xl font-semibold leading-7 text-slate-900">Contact Information</h3>
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium leading-6 text-slate-900" htmlFor="contact-person">
                                                Primary Contact Person
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    className="block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-[#1766b5] sm:text-sm sm:leading-6"
                                                    id="contact-person"
                                                    name="contact-person"
                                                    placeholder="Enter Primary Contact Person"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium leading-6 text-slate-900" htmlFor="designation">
                                                Designation
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    className="block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-[#1766b5] sm:text-sm sm:leading-6"
                                                    id="designation"
                                                    name="designation"
                                                    placeholder="e.g. Head of Partnerships"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium leading-6 text-slate-900" htmlFor="email">
                                                Email Address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    className="block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-[#1766b5] sm:text-sm sm:leading-6"
                                                    id="email"
                                                    name="email"
                                                    placeholder="you@example.com"
                                                    type="email"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium leading-6 text-slate-900" htmlFor="phone">
                                                Phone Number
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    className="block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-[#1766b5] sm:text-sm sm:leading-6"
                                                    id="phone"
                                                    name="phone"
                                                    placeholder="(123) 456-7890"
                                                    type="tel"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-8 border-b border-slate-900/10 pb-12">
                                    <h3 className="text-xl font-semibold leading-7 text-slate-900">Programs &amp; Course Linking</h3>
                                    <div className="space-y-8">
                                        <div>
                                            <label className="block text-sm font-medium leading-6 text-slate-900" htmlFor="programs-offered">
                                                List of Programs Offered
                                            </label>
                                            <div className="mt-2">
                                                <textarea
                                                    className="block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-[#1766b5] sm:text-sm sm:leading-6"
                                                    id="programs-offered"
                                                    name="programs-offered"
                                                    placeholder="List your programs, separated by commas."
                                                    rows={4}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium leading-6 text-slate-900" htmlFor="course-links">
                                                Course Link Uploads
                                            </label>
                                            <p className="mt-1 text-sm text-slate-500">Upload a CSV file with links to your courses.</p>
                                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-slate-900/25 px-6 py-10">
                                                <div className="text-center">
                                                    <span className="material-symbols-outlined text-4xl text-slate-300">upload_file</span>
                                                    <div className="mt-4 flex text-sm leading-6 text-slate-600">
                                                        <label
                                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-[#1766b5] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#1766b5] focus-within:ring-offset-2 hover:text-blue-700"
                                                            htmlFor="course-links"
                                                        >
                                                            <span>Upload a file</span>
                                                            <input className="sr-only" id="course-links" name="course-links" type="file" />
                                                        </label>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </div>
                                                    <p className="text-xs leading-5 text-slate-600">CSV up to 10MB</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-8 border-b border-slate-900/10 pb-12">
                                    <h3 className="text-xl font-semibold leading-7 text-slate-900">Compliance &amp; Partnership</h3>
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                        <div className="sm:col-span-2">
                                            <label
                                                className="block text-sm font-medium leading-6 text-slate-900"
                                                htmlFor="accreditation-cert"
                                            >
                                                Accreditation Certificate
                                            </label>
                                            <p className="mt-1 text-sm text-slate-500">Upload a PDF of your accreditation certificate.</p>
                                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-slate-900/25 px-6 py-10">
                                                <div className="text-center">
                                                    <span className="material-symbols-outlined text-4xl text-slate-300">cloud_upload</span>
                                                    <div className="mt-4 flex text-sm leading-6 text-slate-600">
                                                        <label
                                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-[#1766b5] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#1766b5] focus-within:ring-offset-2 hover:text-blue-700"
                                                            htmlFor="accreditation-cert"
                                                        >
                                                            <span>Upload a file</span>
                                                            <input
                                                                className="sr-only"
                                                                id="accreditation-cert"
                                                                name="accreditation-cert"
                                                                type="file"
                                                            />
                                                        </label>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </div>
                                                    <p className="text-xs leading-5 text-slate-600">PDF up to 5MB</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium leading-6 text-slate-900" htmlFor="insurance-docs">
                                                Insurance &amp; Liability Docs
                                            </label>
                                            <p className="mt-1 text-sm text-slate-500">
                                                Upload relevant insurance and liability documents.
                                            </p>
                                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-slate-900/25 px-6 py-10">
                                                <div className="text-center">
                                                    <span className="material-symbols-outlined text-4xl text-slate-300">cloud_upload</span>
                                                    <div className="mt-4 flex text-sm leading-6 text-slate-600">
                                                        <label
                                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-[#1766b5] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#1766b5] focus-within:ring-offset-2 hover:text-blue-700"
                                                            htmlFor="insurance-docs"
                                                        >
                                                            <span>Upload files</span>
                                                            <input
                                                                className="sr-only"
                                                                id="insurance-docs"
                                                                multiple
                                                                name="insurance-docs"
                                                                type="file"
                                                            />
                                                        </label>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </div>
                                                    <p className="text-xs leading-5 text-slate-600">PDFs up to 5MB each</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                className="h-4 w-4 rounded border-slate-300 text-[#1766b5] focus:ring-[#1766b5]"
                                                id="agreement"
                                                name="agreement"
                                                type="checkbox"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label className="font-medium text-slate-900" htmlFor="agreement">
                                                I agree to the{" "}
                                                <a className="font-semibold text-[#1766b5]" href="#">
                                                    Partnership Agreement
                                                </a>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-8">
                                    <h3 className="text-xl font-semibold leading-7 text-slate-900">Account Setup</h3>
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium leading-6 text-slate-900" htmlFor="password">
                                                Password
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    className="block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-[#1766b5] sm:text-sm sm:leading-6"
                                                    id="password"
                                                    name="password"
                                                    placeholder="Create a strong password"
                                                    type="password"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium leading-6 text-slate-900" htmlFor="confirm-password">
                                                Confirm Password
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    className="block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-[#1766b5] sm:text-sm sm:leading-6"
                                                    id="confirm-password"
                                                    name="confirm-password"
                                                    placeholder="Confirm your password"
                                                    type="password"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <fieldset>
                                                <legend className="text-sm font-semibold leading-6 text-gray-900">
                                                    Two-Factor Authentication
                                                </legend>
                                                <div className="mt-4 space-y-4">
                                                    <div className="flex items-center gap-x-3">
                                                        <input
                                                            className="h-4 w-4 border-gray-300 text-[#1766b5] focus:ring-[#1766b5]"
                                                            id="2fa-sms"
                                                            name="2fa-method"
                                                            type="radio"
                                                        />
                                                        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="2fa-sms">
                                                            SMS
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center gap-x-3">
                                                        <input
                                                            className="h-4 w-4 border-gray-300 text-[#1766b5] focus:ring-[#1766b5]"
                                                            id="2fa-app"
                                                            name="2fa-method"
                                                            type="radio"
                                                        />
                                                        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="2fa-app">
                                                            Authenticator App
                                                        </label>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10 flex items-center justify-end gap-x-6">
                                    <button className="text-sm font-semibold leading-6 text-slate-900" type="button">
                                        Save &amp; Finish Later
                                    </button>
                                    <button
                                        className="rounded-md bg-[#1766b5] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1766b5]"
                                        type="submit"
                                    >
                                        Register Institute
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>

                    {/* After Registration Section */}
                    <section className="bg-white py-16 sm:py-24">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">After Registration</h2>
                            <p className="mt-4 text-lg leading-8 text-slate-600">
                                Once registered, our team will review your application. Upon approval, you'll receive a confirmation
                                email with further instructions on how to set up your institute profile and start offering upskilling
                                opportunities to freelancers.
                            </p>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="bg-slate-800 text-white">
                    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                            <div className="space-y-8">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 text-white">
                                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-bold">CodFleet</h2>
                                </div>
                                <p className="text-sm leading-6 text-slate-300">
                                    Empowering freelancers through education and opportunity.
                                </p>
                            </div>
                            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                                <div className="md:grid md:grid-cols-2 md:gap-8">
                                    <div>
                                        <h3 className="text-sm font-semibold leading-6 text-white">Solutions</h3>
                                        <ul className="mt-6 space-y-4" role="list">
                                            <li>
                                                <a className="text-sm leading-6 text-slate-300 hover:text-white" href="#">
                                                    For Institutes
                                                </a>
                                            </li>
                                            <li>
                                                <a className="text-sm leading-6 text-slate-300 hover:text-white" href="#">
                                                    For Freelancers
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mt-10 md:mt-0">
                                        <h3 className="text-sm font-semibold leading-6 text-white">Support</h3>
                                        <ul className="mt-6 space-y-4" role="list">
                                            <li>
                                                <a className="text-sm leading-6 text-slate-300 hover:text-white" href="#">
                                                    Pricing
                                                </a>
                                            </li>
                                            <li>
                                                <a className="text-sm leading-6 text-slate-300 hover:text-white" href="#">
                                                    Documentation
                                                </a>
                                            </li>
                                            <li>
                                                <a className="text-sm leading-6 text-slate-300 hover:text-white" href="#">
                                                    Guides
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="md:grid md:grid-cols-2 md:gap-8">
                                    <div>
                                        <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                                        <ul className="mt-6 space-y-4" role="list">
                                            <li>
                                                <a className="text-sm leading-6 text-slate-300 hover:text-white" href="#">
                                                    About
                                                </a>
                                            </li>
                                            <li>
                                                <a className="text-sm leading-6 text-slate-300 hover:text-white" href="#">
                                                    Blog
                                                </a>
                                            </li>
                                            <li>
                                                <a className="text-sm leading-6 text-slate-300 hover:text-white" href="#">
                                                    Jobs
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mt-10 md:mt-0">
                                        <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                                        <ul className="mt-6 space-y-4" role="list">
                                            <li>
                                                <a className="text-sm leading-6 text-slate-300 hover:text-white" href="#">
                                                    Claim
                                                </a>
                                            </li>
                                            <li>
                                                <a className="text-sm leading-6 text-slate-300 hover:text-white" href="#">
                                                    Privacy
                                                </a>
                                            </li>
                                            <li>
                                                <a className="text-sm leading-6 text-slate-300 hover:text-white" href="#">
                                                    Terms
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
                            <p className="text-xs leading-5 text-slate-400">© 2024 CodFleet, Inc. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default InstitutionRegistration;