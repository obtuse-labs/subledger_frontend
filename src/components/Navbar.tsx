// src/components/Navbar.tsx
"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import Link from "next/link";
import Image from "next/image";
import ToggleButton from "./ToggleButton";
import { useState } from "react";
import { UserResponse } from "@/lib/types";
import UserDropdown from "./UserDropdown";

export default function Navbar({ type, user }: { type?: "app" | "marketing" | "login" | "signup"; user?: UserResponse }) {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const pathname = usePathname();
    const { theme, toggle } = useTheme();
    const featuresColor = pathname === "/" ? "text-fg" : "text-muted hover:text-fg";
    const docsColor = pathname === "/docs" ? "text-fg" : "text-muted hover:text-fg";
    const homeRedirectPath = type === "app" ? "/dashboard" : "/";
    return (
        <>
            <nav className="sticky top-0 z-20 bg-bg border-b border-border flex items-center justify-between px-[clamp(20px,5vw,64px)] py-2 gap-2 relative">
                <Link href={homeRedirectPath} className="flex items-center gap-2 text-fg font-bold text-[17px] tracking-[-0.01em]">
                    <Image src="/subledger-2b.svg" alt="Subledger Logo" width={18} height={18} />
                    Subledger
                </Link>
                {/* Desktop Links */}
                <div className="min-h-12 hidden md:flex items-center flex-wrap gap-[clamp(10px,3vw,24px)]">
                    <ToggleButton toggle={toggle} theme={theme}/>
                    {type === "app" && !!user ? (
                        <UserDropdown user={user} />
                    ) : (
                        <>
                            <Link 
                                href={"/"}
                                className={`text-sm font-medium ${featuresColor}`}
                            >
                                Features
                            </Link>
                            <Link
                                href={"/docs"}
                                className={`text-sm font-medium ${docsColor}`}
                            >
                                Docs
                            </Link>
                        </>
                    )}
                    {type === "app" || type === "signup" ? (
                        <></>
                    ) : type === "login" ? (
                        <Link 
                            href="/signup"
                            className="bg-fg text-bg text-[13px] font-semibold py-[9px] px-4 rounded-[7px] whitespace-nowrap hover:bg-muted"
                        >
                            Signup
                        </Link>
                    ) : (
                        <Link 
                            href={"/signup"}
                            className="text-sm font-medium text-muted hover:text-fg"
                        >
                            Signup
                        </Link>
                    )}
                    {type === "app" || type === "login" ? (
                        <></>
                    ) : (
                        <Link 
                            href="/login"
                            className="bg-fg text-bg text-[13px] font-semibold py-[9px] px-4 rounded-[7px] whitespace-nowrap hover:bg-muted"
                        >
                            Login
                        </Link>
                    )}
                </div>
                {/* Mobile Menu */}
                <div className="flex md:hidden items-center gap-3">
                    <ToggleButton toggle={toggle} theme={theme}/>
                    <button
                        onClick={() => setMenuOpen(state => !state)}
                        className="bg-transparent text-fg hover:text-muted2 text-lg"
                        aria-label="Menu"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <>
                            ✕
                        </> : <>
                            ☰
                        </>}
                    </button>
                </div>
                {menuOpen && (
                    <div className="md:hidden bg-bg-alt text-fg border-b border-border flex flex-col justify-center items-center gap-4 px-10 py-8 w-full absolute top-full left-0 right-0 transition-[display] ease-in-out duration-1000">
                        <Link 
                            href={"/"}
                            className={`text-sm font-medium ${featuresColor}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            Features
                        </Link>
                        <Link
                            href={"/docs"}
                            className={`text-sm font-medium ${docsColor}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            Docs
                        </Link>
                        {type === "app" || type === "signup" ? (
                            <></>
                        ) : type === "login" ? (
                            <Link 
                                href="/signup"
                                className="bg-fg text-bg text-[13px] font-semibold py-[9px] px-4 rounded-[7px] whitespace-nowrap"
                                onClick={() => setMenuOpen(false)}
                            >
                                Signup
                            </Link>
                        ) : (
                        <Link 
                            href={"/signup"}
                            className="text-sm font-medium text-muted hover:text-fg"
                            onClick={() => setMenuOpen(false)}
                        >
                            Signup
                        </Link>
                        )}
                        {type === "app" || type === "login" ? (
                            <></>
                        ) : (
                            <Link 
                                href="/login"
                                className="bg-fg text-bg text-[13px] font-semibold py-[9px] px-4 rounded-[7px] whitespace-nowrap"
                                onClick={() => setMenuOpen(false)}
                            >
                                Login
                            </Link>
                        )}
                    </div>
                )}
            </nav>
        </>
    );
}