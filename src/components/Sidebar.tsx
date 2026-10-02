// @/components/Sidebar.tsx
"use client";
import { usePathname } from "next/navigation";
import SidebarTab from "@/components/SidebarTab";
import { AccountGroupProps } from "@/lib/types";
import { accountGroups, projectGroups } from "@/lib/api-data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Sidebar({ title, projectId, groupType = "account" } : { title: string, projectId?: string, groupType?: "account" | "project" }) {
    const pathname = usePathname();

    const isActive = (pathname: string, href: string, exact: boolean) => {
        if (exact) {
            return pathname === href;
        }
        return pathname.startsWith(href + '/');
    };
    const groups: AccountGroupProps[] = groupType == "project" ? projectGroups : accountGroups;
    const prefix = groupType == "project" && projectId ? "/" + projectId : "";
    return (
        <div className="w-[clamp(200px,20vw,280px)] h-full bg-bg px-[clamp(12px,1vw,24px)] py-[clamp(20px,1vw,32px)] hidden md:flex flex-col gap-0.5 border-r border-border">
            {/* // TODO(sidebar-scroll): Sidebar nav should scroll internally while back-button +
            // project name stay pinned (prototype behavior). Needs the dashboard shell to be
            // h-screen with independent scroll zones (sidebar nav + content), which requires
            // the authed app to have its OWN root layout WITHOUT the marketing footer —
            // h-screen currently pushes the shared marketing footer off-screen. Tie this to
            // the navbar/auth-shell work: app chrome ≠ marketing chrome. */}
            {/* Zone 1: pinned top */}
            <div className="shrink-0">
                {groupType == "account" ? (
                    null
                ) : (
                    <Link 
                        href="/dashboard"
                        className="w-full inline-flex items-center gap-1.5 text-sm text-muted2 hover:text-fg px-2.5 pb-3.5 border-b border-border"
                    >
                        <ArrowLeft className="w-4 h-4" /> All projects
                    </Link>
                )}
                <div className="font-mono text-xs uppercase tracking-[0.06em] text-muted2 px-2.5 pt-2.5 pb-1.5">{title}</div>
            </div>
            {/* Zone 2 */}
            <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-0.5">
                {/* account nap groups map */}
                {groups.map((group, key) => (
                    <div key={key} className="flex flex-col gap-0.5 mb-2.5">
                        <div className="font-mono text-xs uppercase tracking-[0.06em] text-muted2 px-2.5 pt-1.5 pb-1">{group.title}</div>
                        {group.items.map((tab) => (
                            <SidebarTab 
                                key={tab.id} 
                                href={`/dashboard${prefix}${tab.id}`} 
                                label={tab.label} 
                                icon={tab.icon}
                                isActive={isActive(pathname, `/dashboard${prefix}${tab.id}`, tab.exact)} 
                                soon={tab.soon}
                            />
                        ))}
                    </div>
                ))}
            </div>
            {/* Zone 3: pinned bottom (the Live/Test toggle, later) & settings */}
        </div>  
    )
}