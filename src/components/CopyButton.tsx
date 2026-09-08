"use client";
import { useState, useRef } from "react";
import { Clipboard, ClipboardCheck } from "lucide-react";

export default function CopyButton({target}: {target: string}) {
    const [copied, setCopied] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const handleCopy = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        navigator.clipboard.writeText(target).catch(() => {});
        setCopied(true);
        timeoutRef.current = setTimeout(() => setCopied(false), 1500);
    }
    return (
        <button
            onClick={handleCopy}
            aria-label="Copy"
            className="text-muted2 p-2 rounded-[5px] bg-inherit border border-inherit hover:bg-bg hover:border-border"
        >
            {copied ? <ClipboardCheck className=" text-muted w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
        </button>
    )
}