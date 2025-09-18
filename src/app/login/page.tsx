'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
        roles: string[];
    };
}

interface ErrorResponse {
    error: string;
    details?: any;
}

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [require2FA, setRequire2FA] = useState(false);
    const [activeTab, setActiveTab] = useState('Freelancer');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const tabs = [
        'Freelancer',
        'Company',
        'Education',
        'Field Master',
        'Support',
        'Accounting',
        'Admin',
        'Super Admin',
        'Government'
    ];

    // Clear messages when user starts typing
    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError('');
                setSuccess('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.trim(),
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Store token and user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            setSuccess('Login successful! Redirecting...');

            // Redirect to dashboard or home page
            setTimeout(() => {
                router.push('/');
            }, 1500);

        } catch (err: any) {
            setError(err.message || 'An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };

    const handleMagicLink = async () => {
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            // This would integrate with your magic link API when available
            setSuccess('Magic link sent to your email!');
        } catch (err: any) {
            setError('Failed to send magic link');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
            <div className="layout-container flex h-full grow flex-col">
                <div className="gap-1 px-6 flex flex-1 justify-center py-5">
                    {/* Left side with image and title */}
                    <div className="layout-content-container flex flex-col w-80">
                        <div className="@container">
                            <div className="@[480px]:px-4 @[480px]:py-3">
                                <div
                                    className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-white @[480px]:rounded-lg min-h-[218px] transition-all duration-300 hover:scale-105"
                                    style={{
                                        backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAOMk_iS0x9wSrEL9t_ySwHrCrSoIVqvAVjyB4H8kaIHNStbvJQvAFDv_x-E06ZOurw7UNGjHA1hxpzAzU_5fl0s7E0NGWi83LzEqJVetf9DL8PFMA8ZmrX78EVfZfq-VbTkAsNXA5VpU5fYunwyI-htjwNOwUqwmP04WVisMl5DRAPF6j1-xYSYhgHNZILI80lXtxvdKthULyKbsZz7NzsqqQyvw5BHsPejn2_M6-mFRf_BH3o2BA4LFy1hXhyLGka7cR_YumHO7Dw")'
                                    }}
                                ></div>
                            </div>
                        </div>
                        <h2 className="text-[#111618] tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5 animate-fade-in">
                            Compliance-secure workforce network
                        </h2>
                    </div>

                    {/* Right side with form */}
                    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                        {/* Error/Success Messages */}
                        {error && (
                            <div className="mx-4 mb-4 p-4 bg-red-50 border border-red-200 rounded-lg animate-slide-down">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-800">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {success && (
                            <div className="mx-4 mb-4 p-4 bg-green-50 border border-green-200 rounded-lg animate-slide-down">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-green-800">{success}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab navigation */}
                        <div className="pb-3">
                            <div className="flex border-b border-[#dbe2e6] px-4 gap-8 overflow-x-auto">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-all duration-200 whitespace-nowrap ${activeTab === tab
                                            ? 'border-b-[#111618] text-[#111618]'
                                            : 'border-b-transparent text-[#617c89] hover:text-[#111618]'
                                            }`}
                                    >
                                        <p className={`text-sm font-bold leading-normal tracking-[0.015em] ${activeTab === tab ? 'text-[#111618]' : 'text-[#617c89]'
                                            }`}>
                                            {tab}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Login form */}
                        <form onSubmit={handleSubmit}>
                            {/* Email input */}
                            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                                <label className="flex flex-col min-w-40 flex-1">
                                    <input
                                        type="email"
                                        placeholder="Email or Phone"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (error) setError('');
                                        }}
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-2 focus:ring-[#1193d4] focus:ring-opacity-20 border border-[#dbe2e6] bg-white focus:border-[#1193d4] h-14 placeholder:text-[#617c89] p-[15px] text-base font-normal leading-normal transition-all duration-200"
                                        required
                                        disabled={isLoading}
                                    />
                                </label>
                            </div>

                            {/* Password input */}
                            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                                <label className="flex flex-col min-w-40 flex-1 relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            if (error) setError('');
                                        }}
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-2 focus:ring-[#1193d4] focus:ring-opacity-20 border border-[#dbe2e6] bg-white focus:border-[#1193d4] h-14 placeholder:text-[#617c89] p-[15px] pr-12 text-base font-normal leading-normal transition-all duration-200"
                                        required
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#617c89] hover:text-[#111618] transition-colors"
                                        disabled={isLoading}
                                    >
                                        {showPassword ? (
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </label>
                            </div>

                            {/* 2FA toggle */}
                            <div className="flex items-center gap-4 bg-white px-4 min-h-14 justify-between">
                                <p className="text-[#111618] text-base font-normal leading-normal flex-1 truncate">
                                    Require 2FA
                                </p>
                                <div className="shrink-0">
                                    <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-[#f0f3f4] p-0.5 has-[:checked]:justify-end has-[:checked]:bg-[#1193d4] transition-all duration-200">
                                        <div
                                            className="h-full w-[27px] rounded-full bg-white transition-all duration-200"
                                            style={{
                                                boxShadow: 'rgba(0, 0, 0, 0.15) 0px 3px 8px, rgba(0, 0, 0, 0.06) 0px 3px 1px',
                                                transform: require2FA ? 'translateX(20px)' : 'translateX(0)'
                                            }}
                                        ></div>
                                        <input
                                            type="checkbox"
                                            className="invisible absolute"
                                            checked={require2FA}
                                            onChange={(e) => setRequire2FA(e.target.checked)}
                                            disabled={isLoading}
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Sign in button */}
                            <div className="flex px-4 py-3">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 flex-1 bg-[#1193d4] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#0f7bb8] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Signing in...
                                        </div>
                                    ) : (
                                        <span className="truncate">Sign in</span>
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Magic link button */}
                        <div className="flex px-4 py-3">
                            <button
                                onClick={handleMagicLink}
                                disabled={isLoading}
                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 flex-1 bg-[#f0f3f4] text-[#111618] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#e8ebed] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-[#111618]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </div>
                                ) : (
                                    <span className="truncate">Get magic link</span>
                                )}
                            </button>
                        </div>

                        {/* Links */}
                        <Link href="/forgot-password" className="text-[#617c89] text-sm font-normal leading-normal pb-3 pt-1 px-4 underline hover:text-[#4a5f6b] transition-colors">
                            Forgot password?
                        </Link>
                        <Link href="/register" className="text-[#617c89] text-sm font-normal leading-normal pb-3 pt-1 px-4 underline hover:text-[#4a5f6b] transition-colors">
                            Create an account
                        </Link>

                        {/* Continue with section */}
                        <h3 className="text-[#111618] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                            Or continue with
                        </h3>

                        {/* SSO buttons */}
                        <div className="flex px-4 py-3">
                            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 flex-1 bg-[#f0f3f4] text-[#111618] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#e8ebed] transition-all duration-200">
                                <span className="truncate">Company SSO</span>
                            </button>
                        </div>

                        <div className="flex px-4 py-3">
                            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 flex-1 bg-[#f0f3f4] text-[#111618] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#e8ebed] transition-all duration-200">
                                <span className="truncate">Suomi.fi</span>
                            </button>
                        </div>

                        {/* Footer */}
                        <p className="text-[#617c89] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
                            EN | FI
                        </p>
                        <p className="text-[#617c89] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
                            By continuing you accept our Terms, Privacy, and Cookie
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}