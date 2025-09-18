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

type LoginScreen = 'login' | 'magic-link' | '2fa' | 'role-mismatch';

export default function LoginPage() {
    const router = useRouter();
    const [currentScreen, setCurrentScreen] = useState<LoginScreen>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [require2FA, setRequire2FA] = useState(false);
    const [activeTab, setActiveTab] = useState('Freelancer');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [twoFACode, setTwoFACode] = useState(['', '', '', '', '', '']);
    const [trustDevice, setTrustDevice] = useState(false);

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

            // Redirect based on user role
            setTimeout(() => {
                const userRoles = data.user.roles || [];
                
                if (userRoles.includes('company_org_admin') || userRoles.includes('company')) {
                    router.push('/company');
                } else if (userRoles.includes('freelancer')) {
                    router.push('/freelancer');
                } else if (userRoles.includes('admin')) {
                    router.push('/admin');
                } else {
                    router.push('/');
                }
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
            setCurrentScreen('magic-link');
        } catch (err: any) {
            setError('Failed to send magic link');
        } finally {
            setIsLoading(false);
        }
    };

    const handle2FA = () => {
        setCurrentScreen('2fa');
    };

    const handleRoleMismatch = () => {
        setCurrentScreen('role-mismatch');
    };

    const handleBackToLogin = () => {
        setCurrentScreen('login');
        setError('');
        setSuccess('');
    };

    const handleTwoFAChange = (index: number, value: string) => {
        if (value.length > 1) {
            // Handle paste
            const pastedValues = value.split('').slice(0, 6);
            const newCode = [...twoFACode];
            pastedValues.forEach((val, i) => {
                if (i < 6) newCode[i] = val;
            });
            setTwoFACode(newCode);
        } else {
            const newCode = [...twoFACode];
            newCode[index] = value;
            setTwoFACode(newCode);
        }
    };

    const handleTwoFAKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && twoFACode[index] === '' && index > 0) {
            const newCode = [...twoFACode];
            newCode[index - 1] = '';
            setTwoFACode(newCode);
        } else if (e.key === 'ArrowLeft' && index > 0) {
            // Focus previous input
        } else if (e.key === 'ArrowRight' && index < 5) {
            // Focus next input
        }
    };

    // Magic Link Confirmation Screen (S2)
    const renderMagicLinkScreen = () => (
        <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
            <div className="layout-container flex h-full grow flex-col">
                <div className="px-40 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
                        <div className="w-full" style={{ height: '80px' }}></div>
                        <div className="@container">
                            <div className="@[480px]:px-4 @[480px]:py-3">
                                <div
                                    className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-white @[480px]:rounded-lg min-h-[218px]"
                                    style={{
                                        backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCHdpo3wF7ppCJlrWyoUp72QrW5ZksbiJkUp3mKJWEm9MV38tfv6ccrAmpsnkJV6wyZLGDhrXUNvi-g-Y58M-MkaPBua4meitvMcROHSWfj9FWQGX4Sz63215jF60EbPwFrfF5zk0yXpUD3992kNG4KDE9wFMgUFtfvmAcJbz_rL0UMVfUDBN8pnzNinplVHdUBqmkeptSL1_e7OTODjAmEjHCCN6tKxyc3IL1It2gHM5bFy5FAbizy_wfXSKv47G0fIrHpS_Qn6HP_")'
                                    }}
                                ></div>
                            </div>
                        </div>
                        <div className="w-full" style={{ height: '20px' }}></div>
                        <h2 className="text-[#111618] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">Check your inbox</h2>
                        <p className="text-[#111618] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
                            We emailed a secure sign-in link to {email}. The link expires in 15 minutes.
                        </p>
                        <div className="flex justify-center">
                            <div className="flex flex-1 gap-3 max-w-[480px] flex-col items-stretch px-4 py-3">
                                <button
                                    onClick={handleMagicLink}
                                    disabled={isLoading}
                                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-bold leading-normal tracking-[0.015em] w-full hover:bg-[#e8ebed] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="truncate">Resend link</span>
                                </button>
                                <button
                                    onClick={handleBackToLogin}
                                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-transparent text-[#111618] text-sm font-bold leading-normal tracking-[0.015em] w-full hover:bg-[#f0f3f4] transition-all duration-200"
                                >
                                    <span className="truncate">Back to login</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // 2FA Challenge Screen (S3)
    const render2FAScreen = () => (
        <div
            className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
            style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
        >
            <div className="layout-container flex h-full grow flex-col">
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f3f4] px-10 py-3">
                    <div className="flex items-center gap-4 text-[#111618]">
                        <div className="size-4">
                            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                        </div>
                        <h2 className="text-[#111618] text-lg font-bold leading-tight tracking-[-0.015em]">CodFleet</h2>
                    </div>
                    <div className="flex flex-1 justify-end gap-8">
                        <div className="flex items-center gap-9">
                            <a className="text-[#111618] text-sm font-medium leading-normal" href="#">Dashboard</a>
                            <a className="text-[#111618] text-sm font-medium leading-normal" href="#">Fleet</a>
                            <a className="text-[#111618] text-sm font-medium leading-normal" href="#">Settings</a>
                        </div>
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                            style={{
                                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDIMxh5Kf8ZdPmnVFb-HQ_i-uY_egy52vrXNIzEjuodlrLu29xXrUsXywn_ke-40zUsqKnlJEcwo9nnbchtHCj3B4EtsLEXiWBu-27koPHwKvIK8rWoNHYFIKK3_dQ0LaUmanMXkz4m_1chtjf3LyzeRG1VPVOoBr7bo7wGMHry3DDUw45Mq7Wv6gJHy_i7lwPjcVJCMXk4850oTmiA8FRtKn8FIPSl2zOv5XsT4-SMjcCGIh6BoKnUAY_mUr8gVngVBiHcTa3eAPJJ")'
                            }}
                        ></div>
                    </div>
                </header>
                <div className="px-40 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
                        <h2 className="text-[#111618] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">Two-Factor Authentication</h2>
                        <p className="text-[#111618] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">Enter the 6-digit code from your authenticator app.</p>
                        <div className="flex justify-center px-4 py-3">
                            <fieldset className="relative flex gap-4">
                                {twoFACode.map((digit, index) => (
                                    <input
                                        key={index}
                                        className="flex h-14 w-12 text-center [appearance:textfield] focus:outline-0 focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border-0 border-b border-[#dbe2e6] focus:border-0 focus:border-b focus:border-[#dbe2e6] text-base font-normal leading-normal"
                                        type="number"
                                        maxLength={1}
                                        max={9}
                                        min={0}
                                        value={digit}
                                        onChange={(e) => handleTwoFAChange(index, e.target.value)}
                                        onKeyDown={(e) => handleTwoFAKeyDown(index, e)}
                                    />
                                ))}
                            </fieldset>
                        </div>
                        <div className="px-4">
                            <label className="flex gap-x-3 py-3 flex-row">
                                <input
                                    type="checkbox"
                                    checked={trustDevice}
                                    onChange={(e) => setTrustDevice(e.target.checked)}
                                    className="h-5 w-5 rounded border-[#dbe2e6] border-2 bg-transparent text-[#1193d4] checked:bg-[#1193d4] checked:border-[#1193d4] focus:ring-0 focus:ring-offset-0 focus:border-[#dbe2e6] focus:outline-none"
                                />
                                <p className="text-[#111618] text-base font-normal leading-normal">Trust this device for 30 days</p>
                            </label>
                        </div>
                        <div className="flex px-4 py-3">
                            <button
                                onClick={() => {
                                    // Handle 2FA verification
                                    const code = twoFACode.join('');
                                    if (code.length === 6) {
                                        // Verify 2FA code
                                        router.push('/');
                                    }
                                }}
                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 flex-1 bg-[#1193d4] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#0f7bb8] transition-all duration-200"
                            >
                                <span className="truncate">Verify</span>
                            </button>
                        </div>
                        <div className="flex justify-stretch">
                            <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-between">
                                <button 
                                    onClick={handleBackToLogin}
                                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f3f4] text-[#111618] hover:bg-[#e8ebed] transition-all duration-200"
                                >
                                    <span className="truncate">Cancel</span>
                                </button>
                                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-transparent text-[#111618] hover:bg-[#f0f3f4] transition-all duration-200">
                                    <span className="truncate">Use backup code</span>
                                </button>
                            </div>
                        </div>
                        <p className="text-[#617c89] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline">Can't access 2FA?</p>
                    </div>
                </div>
            </div>
        </div>
    );

    // Role Mismatch Warning Screen (S4)
    const renderRoleMismatchScreen = () => (
        <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
            <div className="layout-container flex h-full grow flex-col">
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f3f4] px-10 py-3">
                    <div className="flex items-center gap-4 text-[#111618]">
                        <div className="size-4">
                            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                        </div>
                        <h2 className="text-[#111618] text-lg font-bold leading-tight tracking-[-0.015em]">CodFleet</h2>
                    </div>
                </header>
                <div className="px-40 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
                        <h2 className="text-[#111618] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">Access not enabled for this role.</h2>
                        <p className="text-[#111618] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">Your account is registered as {activeTab}. Switch role or contact support.</p>
                        <div className="flex justify-center">
                            <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 max-w-[480px] justify-center">
                                <button
                                    onClick={() => {
                                        // Handle role switching
                                        setCurrentScreen('login');
                                    }}
                                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-bold leading-normal tracking-[0.015em] grow hover:bg-[#e8ebed] transition-all duration-200"
                                >
                                    <span className="truncate">Switch role</span>
                                </button>
                                <button
                                    onClick={() => {
                                        // Handle contact support
                                        window.open('mailto:support@codfleet.com', '_blank');
                                    }}
                                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1193d4] text-white text-sm font-bold leading-normal tracking-[0.015em] grow hover:bg-[#0f7bb8] transition-all duration-200"
                                >
                                    <span className="truncate">Contact support</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Conditional rendering based on current screen
    switch (currentScreen) {
        case 'magic-link':
            return renderMagicLinkScreen();
        case '2fa':
            return render2FAScreen();
        case 'role-mismatch':
            return renderRoleMismatchScreen();
        default:
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

                        {/* Demo buttons for testing different screens */}
                        <div className="flex flex-col gap-2 px-4 py-3">
                            <button
                                onClick={handle2FA}
                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#ff6b6b] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#ff5252] transition-all duration-200"
                            >
                                <span className="truncate">Demo: 2FA Screen</span>
                            </button>
                            <button
                                onClick={handleRoleMismatch}
                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#ffa726] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#ff9800] transition-all duration-200"
                            >
                                <span className="truncate">Demo: Role Mismatch</span>
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
}