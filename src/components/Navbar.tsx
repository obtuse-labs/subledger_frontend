"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import Link from "next/link";
import { github, LIVE_API } from "@/lib/api-data";
import ToggleButton from "./ToggleButton";
import { useState } from "react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const pathname = usePathname();
    const { theme, toggle } = useTheme();
    const featuresColor = pathname === "/" ? "text-fg" : "text-muted hover:text-fg";
    const docsColor = pathname === "/docs" ? "text-fg" : "text-muted hover:text-fg";
    return (
        <>
            <nav className="sticky top-0 z-20 bg-bg border-b border-border flex items-center justify-between px-[clamp(20px,5vw,64px)] py-4 gap-4 relative">
                <Link href="/" className="flex items-center gap-2 text-fg font-bold text-[17px] tracking-[-0.01em]">
                    <div className="w-[9px] h-[9px] rounded-[2px] bg-accent"></div> Subledger
                </Link>
                {/* Desktop Links */}
                <div className="hidden md:flex items-center flex-wrap gap-[clamp(10px,3vw,24px)]">
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
                    <a 
                        href={`${LIVE_API}/docs`}
                        target="_blank"
                        rel="noopener"
                        className="text-sm font-medium text-muted hover:text-fg"
                    >
                        Swagger docs
                    </a>
                    <ToggleButton toggle={toggle} theme={theme}/>
                    <a 
                        href="https://github.com/utkarsh-vats/subledger_backend"
                        target="_blank"
                        rel="noopener"
                        className="bg-fg text-bg text-[13px] font-semibold py-[9px] px-4 rounded-[7px] whitespace-nowrap"
                    >
                        View on GitHub
                    </a>
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
                        <a 
                            href={`${LIVE_API}/docs`}
                            target="_blank"
                            rel="noopener"
                            className="text-sm font-medium text-muted hover:text-fg"
                            onClick={() => setMenuOpen(false)}
                        >
                            Swagger docs
                        </a>
                        <a 
                            href="https://github.com/utkarsh-vats/subledger_backend"
                            target="_blank"
                            rel="noopener"
                            className="bg-fg text-bg text-[13px] font-semibold py-[9px] px-4 rounded-[7px] whitespace-nowrap"
                            onClick={() => setMenuOpen(false)}
                        >
                            View on GitHub
                        </a>
                    </div>
                )}
            </nav>
        </>
    );
}