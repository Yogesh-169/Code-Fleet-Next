import React from "react";

const RegisterPage = () => {
    return (
        <div
            className="relative flex min-h-screen flex-col bg-gray-50 text-gray-800 overflow-x-hidden"
            style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
        >
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-3xl text-[#1766b5]">
                            webhook
                        </span>
                        <h1 className="text-2xl font-bold text-gray-900">CodFleet</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-gray-600 hover:text-gray-900">EN</button>
                        <span className="text-gray-300">|</span>
                        <button className="text-gray-400 hover:text-gray-900">FI</button>
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="flex-grow">
                {/* Hero */}
                <section className="py-16 md:py-24 text-center">
                    <div className="container mx-auto px-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                            Join the CodFleet Network
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                            Connect with top talent, innovative companies, and leading
                            educational institutions in the tech industry.
                        </p>
                    </div>
                </section>

                {/* Roles */}
                <section className="pb-16 md:pb-24">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Freelancer */}
                            <div className="bg-white rounded-lg shadow-lg p-8 text-center flex flex-col items-center transform hover:-translate-y-2 transition-transform duration-300">
                                <span className="material-symbols-outlined text-6xl text-[#1766b5] mb-4">
                                    person
                                </span>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    Freelancer
                                </h3>
                                <p className="text-gray-600 mb-6 flex-grow">
                                    Join our network of skilled professionals and find exciting
                                    projects that match your expertise.
                                </p>
                                <a
                                    href="/register/freelancer"
                                    className="w-full mt-auto rounded-lg h-12 px-5 bg-[#1766b5] text-white text-base font-bold leading-normal tracking-wide hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1766b5] transition-colors duration-300 inline-flex items-center justify-center"
                                >
                                    Register as Freelancer
                                </a>
                            </div>

                            {/* Company */}
                            <div className="bg-white rounded-lg shadow-lg p-8 text-center flex flex-col items-center transform hover:-translate-y-2 transition-transform duration-300">
                                <span className="material-symbols-outlined text-6xl text-[#1766b5] mb-4">
                                    apartment
                                </span>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    Company
                                </h3>
                                <p className="text-gray-600 mb-6 flex-grow">
                                    Access a pool of talented freelancers and build your team with
                                    the right skills for your projects.
                                </p>
                                <a
                                    href="/register/company"
                                    className="w-full mt-auto rounded-lg h-12 px-5 bg-[#1766b5] text-white text-base font-bold leading-normal tracking-wide hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1766b5] transition-colors duration-300 inline-flex items-center justify-center"
                                >
                                    Register as Company
                                </a>
                            </div>

                            {/* Institute */}
                            <div className="bg-white rounded-lg shadow-lg p-8 text-center flex flex-col items-center transform hover:-translate-y-2 transition-transform duration-300">
                                <span className="material-symbols-outlined text-6xl text-[#1766b5] mb-4">
                                    school
                                </span>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    Education Institute
                                </h3>
                                <p className="text-gray-600 mb-6 flex-grow">
                                    Partner with us to connect your students with industry
                                    opportunities and enhance their learning experience.
                                </p>
                                <a
                                    href="/register/institution"
                                    className="w-full mt-auto rounded-lg h-12 px-5 bg-[#1766b5] text-white text-base font-bold leading-normal tracking-wide hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1766b5] transition-colors duration-300 inline-flex items-center justify-center"
                                >
                                    Register as Institute
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="bg-white py-16 md:py-24">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            How It Works
                        </h2>
                        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div className="flex flex-col items-center">
                                <div className="flex items-center justify-center size-16 rounded-full bg-[#1766b5] text-white mb-4">
                                    <span className="material-symbols-outlined text-3xl">
                                        edit_square
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    1. Create Profile
                                </h3>
                                <p className="text-gray-600">Showcase your skills and experience.</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="flex items-center justify-center size-16 rounded-full bg-[#1766b5] text-white mb-4">
                                    <span className="material-symbols-outlined text-3xl">
                                        search
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    2. Browse Opportunities
                                </h3>
                                <p className="text-gray-600">Explore projects or find talent.</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="flex items-center justify-center size-16 rounded-full bg-[#1766b5] text-white mb-4">
                                    <span className="material-symbols-outlined text-3xl">
                                        groups
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    3. Connect & Collaborate
                                </h3>
                                <p className="text-gray-600">Work together on exciting ventures.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-100 py-8">
                <div className="container mx-auto px-6 text-center text-gray-600">
                    <div className="mb-4">
                        <a className="text-gray-600 hover:text-gray-900 mx-3" href="/login">
                            Already have an account? Login
                        </a>
                    </div>
                    <div className="flex justify-center gap-6 mb-4">
                        <a className="hover:text-gray-900" href="#">
                            Terms of Service
                        </a>
                        <a className="hover:text-gray-900" href="#">
                            Privacy Policy
                        </a>
                    </div>
                    <p>© 2024 CodFleet. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default RegisterPage;
