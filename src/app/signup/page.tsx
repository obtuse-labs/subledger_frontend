'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignupRequest } from "@/lib/types";

export default function Signup() {
    const router = useRouter();
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [userType, setUserType] = useState<string>("");
    const [accountName, setAccountName] = useState<string>("");
    const [accountType, setAccountType] = useState<string>("individual");
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setError("");
        setIsLoading(true);
        try {
            const payload: SignupRequest = {
                name: `${firstName.trim()} ${lastName.trim()}`.trim(),
                email: email.trim(),
                password: password,
                user_type: userType.trim() === "" ? undefined : userType,
                account_name: accountName.trim(),
                account_type: accountType,
            }
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const data = await res.json()
            if (res.ok) {
                router.push("/dashboard");
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="w-full max-w-[1200px] mx-auto flex-1 flex items-center justify-center px-[clamp(20px,5vw,64px)] py-[clamp(20px,4vw,40px)]">
                <div className="w-full max-w-[480px]">
                    <div className="font-mono text-[13px] font-semibold text-accent tracking-[0.08em] uppercase mb-3.5">/ create account</div>
                    <h1 className="text-[clamp(26px,4.5vw,38px)] font-extrabold tracking-[-0.01em] mb-3.5 text-fg text-pretty">Create your account.</h1>
                    <p className="text-[15px] text-muted leading-[1.6] mb-5">
                        An account owns projects. Each project is its own billing tenant.
                    </p>	
                    <div className="bg-bg-alt border border-border rounded-[10px] p-6">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex flex-col gap-2 flex-1">
                                    <label htmlFor="firstName" className="text-[13px] font-semibold text-fg">First Name</label>
                                    <input 
                                        type="text" 
                                        id="firstName" 
                                        value={firstName} 
                                        onChange={(e) => setFirstName(e.target.value)} 
                                        placeholder="John" 
                                        className="w-full px-4 py-2 text-[14px] text-fg bg-bg border border-border rounded-[7px] focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 flex-1">
                                    <label htmlFor="lastName" className="text-[13px] font-semibold text-fg">Last Name</label>
                                    <input 
                                        type="text" 
                                        id="lastName" 
                                        value={lastName} 
                                        onChange={(e) => setLastName(e.target.value)} 
                                        placeholder="Doe" 
                                        className="w-full px-4 py-2 text-[14px] text-fg bg-bg border border-border rounded-[7px] focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-[13px] font-semibold text-fg">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    placeholder="you@company.com" 
                                    className="w-full px-4 py-2 text-[14px] text-fg bg-bg border border-border rounded-[7px] focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="accountName" className="text-[13px] font-semibold text-fg">Account Name</label>
                                <input 
                                    type="text" 
                                    id="accountName" 
                                    value={accountName} 
                                    onChange={(e) => setAccountName(e.target.value)} 
                                    placeholder="your-company-name" 
                                    className="w-full px-4 py-2 text-[14px] text-fg bg-bg border border-border rounded-[7px] focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                                />
                            </div>
                            
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex flex-col gap-2 flex-1">
                                    <label htmlFor="userType" className="text-[13px] font-semibold text-fg">User Type</label>
                                    <select 
                                        id="userType" 
                                        value={userType} 
                                        onChange={(e) => setUserType(e.target.value)} 
                                        className="w-full px-4 py-2 text-[14px] text-fg bg-bg border border-border rounded-[7px] focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                                    >
                                        <option value="">Select</option>
                                        <option value="student">Student</option>
                                        <option value="professional">Professional</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2 flex-1">
                                    <label htmlFor="accountType" className="text-[13px] font-semibold text-fg">Account Type</label>
                                    <select 
                                        id="accountType" 
                                        value={accountType} 
                                        onChange={(e) => setAccountType(e.target.value)} 
                                        className="w-full px-4 py-2 text-[14px] text-fg bg-bg border border-border rounded-[7px] focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent"
                                    >
                                        <option value="individual">Individual</option>
                                        <option value="organization">Organization</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="password" className="text-[13px] font-semibold text-fg">Password</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    placeholder="••••••••••" 
                                    className="w-full px-4 py-2 text-[14px] text-fg bg-bg border border-border rounded-[7px] focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="confirmPassword" className="text-[13px] font-semibold text-fg">Confirm Password</label>
                                <input 
                                    type="password" 
                                    id="confirmPassword" 
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                    placeholder="••••••••••" 
                                    className="w-full px-4 py-2 text-[14px] text-fg bg-bg border border-border rounded-[7px] focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                                />
                            </div>
                            {error && <p className="text-accent text-sm">{error}</p>}
                            <button 
                                disabled={isLoading}
                                type="submit" 
                                className="w-full bg-fg text-bg font-semibold py-2 rounded-[7px] transition-colors hover:bg-accent-hover hover:text-fg"
                            >
                                Create account
                            </button>
                        </form>
                    </div>
                    <p className="mt-4 text-[13px] text-muted text-center">Already have an account? <a href="/login" className="text-accent hover:text-accent-hover">Sign in</a></p>
                </div>
        </main>
    )
}

