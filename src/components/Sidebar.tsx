// @/components/Sidebar.tsx
"use client";
import { usePathname } from "next/navigation";
import SidebarTab from "@/components/SidebarTab";
import { accountGroups } from "@/lib/api-data";

export default function Sidebar({ title } : { title: string }) {
    const pathname = usePathname();

    // const accountGroups: AccountGroupProps[] = [
    //     { 
    //         title: "Account",
    //         items: [
    //             { id: "", label: "Projects", exact: true, icon: FolderKanban },
    //         ] 
    //     },
    // ];

    const isActive = (pathname: string, href: string, exact: boolean) => {
        if (exact) {
            return pathname === href;
        }
        return pathname.startsWith(href + '/');
    };
    return (
        <div className="w-[clamp(200px,20vw,280px)] bg-bg px-[clamp(12px,1vw,24px)] py-[clamp(20px,1vw,32px)] hidden md:flex flex-col gap-0.5 border-r border-border">
            <div className="font-mono text-xs uppercase tracking-[0.06em] text-muted2 px-2.5 pt-1 pb-2.5 shrink-0">{title}</div>
            <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-0.5">
                {/* account nap groups map */}
                {accountGroups.map((group, key) => (
                    <div key={key} className="flex flex-col gap-0.5 mb-2.5">
                        <div className="font-mono text-xs uppercase tracking-[0.06em] text-muted2 px-2.5 pt-1.5 pb-1">{group.title}</div>
                        {group.items.map((tab) => (
                            <SidebarTab 
                                key={tab.id} 
                                href={`/dashboard${tab.id}`} 
                                label={tab.label} 
                                icon={tab.icon}
                                isActive={isActive(pathname, `/dashboard${tab.id}`, tab.exact)} 
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>  
    )
}