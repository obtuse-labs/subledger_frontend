"use client";

import { useState, useRef } from "react";

export default function CodePanel({title, body}: {title: string, body: string}) {
    const [copied, setCopied] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleCopy = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        navigator.clipboard.writeText(body).catch(() => {});
        setCopied(true);
        timeoutRef.current = setTimeout(() => setCopied(false), 1500);
    }

    return (
        <div className="bg-[#14161c] border border-[#2b2e37] rounded-[10px] overflow-hidden font-mono">
            <div className="flex items-center justify-between px-[14px] py-[10px] border-b border-[#2b2e37]">
                <div className="flex items-center gap-2">
                    <span className="w-[7px] h-[7px] rounded-full bg-[#454955] opacity-[1]"></span>
                    <span className="w-[7px] h-[7px] rounded-full bg-[#454955] opacity-[0.7]"></span>
                    <span className="w-[7px] h-[7px] rounded-full bg-[#454955] opacity-[0.45]"></span>
                    <span className="ml-2 text-[#8a8f9c] font-mono text-xs">{title}</span>
                </div>
                <button 
                    className="px-3 py-1.5 rounded border border-[#3a3d47] text-[#dfe1e6] hover:bg-[#1e2129] text-[11px]"
                    onClick={handleCopy}
                >
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>
            <div className="px-[18px] py-[16px]">
                <pre className="text-[#dfe1e6] font-mono whitespace-pre leading-[1.65] overflow-x-auto text-xs">{body}</pre>
            </div>
        </div>
    );
}


