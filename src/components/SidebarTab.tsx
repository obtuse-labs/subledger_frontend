// @/components/SidebarTab.tsx
import Link from "next/link";
import { SidebarTabProps } from "@/lib/types";

export default function SidebarTab({ href, label, count, icon, isActive, soon }: SidebarTabProps) {
    const inActiveStyle = "text-muted hover:text-fg hover:bg-bg-alt hover:rounded-[5px] p-2";
    const activeStyle = "text-fg bg-bg-alt rounded-[5px] p-2";
    const style = isActive ? activeStyle : inActiveStyle;
    const Icon = icon;
    return (
        <Link href={href} className={`${style} w-full flex items-center justify-between gap-2 text-left text-sm font-medium px-[clamp(8px,0.5vw,20px)]`}>
            <div className="flex flex-1 gap-2 items-center">
                <Icon className="w-4 h-4" />
                {label}
            </div>
            <div className="flex items-center">
                {count != null && <span className="flex items-center px-2">{count}</span>}
                {soon && <span className="font-mono text-[10px] text-muted2 tracking-wider bg-bg-alt border border-border rounded-md py-1 px-1 uppercase">Soon</span>}
            </div>
        </Link>
    );
}

