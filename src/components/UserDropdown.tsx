// src/components/UserDropdown.tsx
"use client";

import { UserResponse } from "@/lib/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function UserDropdown({ user }: { user: UserResponse }) {
    const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const handleLogout = async () => {
        await fetch("/api/auth/signout", {
            method: "POST"
        });
        router.push("/login");
        router.refresh();
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setUserDropdownOpen(false);
            }
        };
        if (userDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [userDropdownOpen]);

    return (
        <div 
            ref={menuRef}
            className="text-xs font-bold relative"
        >
            <button
                className="bg-bg-alt text-fg flex items-center gap-1 border border-border rounded-[7px] p-1.5 cursor-pointer hover:border-muted2"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            >
                <span className="rounded-sm bg-accent text-[rgb(250,250,248)] p-1 uppercase">{user.name.split(" ").filter((_, i, a) => i === 0 || i === a.length - 1).map(n => n[0]).join("")}</span>
                {userDropdownOpen ? (
                    <ChevronUp className="w-3 h-3"/>
                ) : (
                    <ChevronDown className="w-3 h-3"/>
                )}
            </button>
            {userDropdownOpen && (
                <div className="absolute min-w-56 top-full right-0 mt-2 bg-bg border border-border rounded-[7px] p-2 shadow-elev z-40 flex flex-col">
                    <div className="pt-2 px-2.5 pb-2.5 border-b border-border mb-1.5">
                        <h2 className="text-sm font-semibold text-fg">{user.name}</h2>
                        <p className="font-mono text-xs text-muted2">{user.email}</p>
                    </div>
                    <Link 
                        href={"/dashboard/settings"}
                        className="w-full text-left bg-bg hover:bg-bg-alt text-[13px] text-muted hover:text-fg py-2 px-2.5 rounded-lg"
                        onClick={() => setUserDropdownOpen(false)}
                    >
                        Account Settings
                    </Link>
                    <Link 
                        href={"/dashboard/members"}
                        className="w-full text-left bg-bg hover:bg-bg-alt text-[13px] text-muted hover:text-fg py-2 px-2.5 rounded-lg"
                        onClick={() => setUserDropdownOpen(false)}
                    >
                        Members
                    </Link>
                    <button 
                        className="w-full text-left bg-bg hover:bg-bg-alt text-[13px] text-muted hover:text-fg py-2 px-2.5 rounded-lg"
                        onClick={handleLogout}
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    )
}