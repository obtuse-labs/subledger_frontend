// src/components/projectDropdown.tsx
"use client";

import { Project } from "@/lib/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface ProjectDropDownProps {
    projects: Project[],
    currentProjectId: string,
    currentProjectTab?: string,
}

export default function ProjectDropdown({ projects, currentProjectId, currentProjectTab }: ProjectDropDownProps) {
    const [projectDropdownOpen, setProjectDropdownOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const project = projects.find(p => p.id === currentProjectId);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setProjectDropdownOpen(false);
            }
        };
        if (projectDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [projectDropdownOpen]);

    return (
        <div 
            ref={menuRef}
            className="text-xs font-bold relative"
        >
            <button
                className="flex items-center gap-2 bg-bg-alt border border-border rounded-lg py-1 px-2 hover:border-muted2"
                onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
            >
                <span className="text-fg text-sm font-semibold">{project?.name}</span>
                {projectDropdownOpen ? (
                    <ChevronUp className="w-3 h-3"/>
                ) : (
                    <ChevronDown className="w-3 h-3"/>
                )}
            </button>
            {projectDropdownOpen && (
                <div className="absolute min-w-56 top-full left-0 mt-2 bg-bg border border-border rounded-[7px] p-2 shadow-elev z-40 flex flex-col">
                    <div className="font-mono text-xs uppercase tracking-[0.06em] text-muted2 pt-2 px-2.5 pb-1.5">Projects</div>
                    {projects.map((project) => {
                        return (
                            <Link
                                href={`/dashboard/${project.id}${!!currentProjectTab ? '/' + currentProjectTab : ''}`}
                                onClick={() => setProjectDropdownOpen(false)}
                                key={project.id}
                                className="w-full flex items-center justify-between gap-2.5 text-left bg-transparent hover:bg-bg-alt rounded-lg py-2 px-2.5"
                            >
                                <div className="flex flex-col gap-0.5 min-w-0">
                                    <span className="text-fg text-sm font-semibold">{project.name}</span>
                                    <span className="font-mono text-muted2 text-xs">{project.slug}</span>
                                </div>
                                {project.id === currentProjectId && (
                                    <span className="w-2 h-2 rounded-[50%] bg-accent shrink-0"/>
                                )}
                            </Link>
                        )
                    })}
                    <div className="h-px bg-border my-1.5 mx-0"></div>
                    <Link
                        href={"/dashboard"}
                        onClick={() => setProjectDropdownOpen(false)}
                        className="w-full text-left bg-transparent hover:bg-bg-alt rounded-lg py-2 px-2.5 text-[13px] font-medium text-muted hover:text-fg"
                    >
                        All Projects
                    </Link>
                </div>
            )}
        </div>
    )
}