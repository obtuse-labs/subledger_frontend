// @/components/ProjectCard.tsx
import { ProjectCardProps } from "@/lib/types";
import { formatDateFromISOFormat } from "@/lib/utils";
import Link from "next/link";

export default function ProjectCard ({ projectId, planCount, name, slug, createdAt }: ProjectCardProps) {
    const plans = `${planCount} plan${planCount === 1 ? "" : "s"}`;
    return (
        <Link 
            href={`/dashboard/${projectId}/plans`}
            className="text-left bg-bg-alt border border-border rounded-[10px] p-5 flex flex-col gap-0 min-h-[150px] hover:border-accent-hover"
        >
            <div className="flex items-center justify-between gap-2.5 mb-3">
                <span 
                    className="w-7 h-7 rounded-md bg-band-bg border border-border flex items-center justify-center font-mono text-xs font-bold text-muted2"
                >
                    {name.slice(0, 2).toUpperCase()}
                </span>
                <span
                    className="font-mono text-xs text-muted"
                >
                    {plans}
                </span>
            </div>
            <div className="font-mono text-base font-bold text-fg tracking-[-0.01em] mb-1">{name}</div>
            <div className="font-mono text-xs text-muted mb-auto">{slug}</div>
            <div className="flex items-center gap-2 mt-4 pt-3.5 border-t border-border w-full">
                <span className="font-mono text-xs text-muted2">Created {formatDateFromISOFormat(createdAt)}</span>
            </div>
        </Link>
    )
}