'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
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
        <main className="w-full max-w-[1200px] mx-auto flex-1 flex items-center justify-center px-[clamp(20px,5vw,64px)] py-[clamp(40px,8vw,80px)]">
                <div className="w-full max-w-[480px]">
                    <div className="font-mono text-[13px] font-semibold text-accent tracking-[0.08em] uppercase mb-3.5">/ sign in</div>
                    <h1 className="text-[clamp(26px,4.5vw,38px)] font-extrabold tracking-[-0.01em] mb-3.5 text-fg text-pretty">Sign in to Subledger.</h1>
                    <p className="text-[15px] text-muted leading-[1.6] mb-5">
                        Your projects, plans and ledger — where you left them.
                    </p>	
                    <div className="bg-bg-alt border border-border rounded-[10px] p-6">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                            {error && <p className="text-accent text-sm">{error}</p>}
                            <button 
                                disabled={isLoading}
                                type="submit" 
                                className="w-full bg-fg text-bg font-semibold py-2 rounded-[7px] transition-colors hover:bg-accent-hover hover:text-fg"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                    <p className="mt-4 text-[13px] text-muted text-center">No account yet? <a href="/signup" className="text-accent hover:text-accent-hover">Create one</a></p>
                </div>
        </main>
    )
}

