"use client";

import { useState, useEffect } from "react";

export default function ToggleButton({ toggle, theme }: { toggle: () => void, theme: string }) {
    const [mounted, setMounted] = useState(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setMounted(true), []);
    const knobLeft = !mounted ? "left-[23px] bg-muted2" : theme === "dark" ? "left-[23px] bg-muted2" : "left-[2px] bg-accent";

    return (
        <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="relative w-11 h-6 rounded-xl border border-border bg-bg-alt p-0 cursor-pointer shrink-0"
        >
            <span
                title="Light"
                className={`absolute top-1.5 left-[5px] w-[9px] h-[9px] rounded-full bg-accent`}
            ></span>
            <span
                title="Dark"
                className={`absolute top-1.5 right-[5px] w-[9px] h-[9px] rounded-full bg-muted2 overflow-hidden`}
            >
                <span
                    className="absolute w-[7px] h-[7px] rounded-full bg-bg-alt top-[-2px] right-[-2px]"
                ></span>
            </span>
            <span
                className={`absolute top-0.5 ${knobLeft} w-[18px] h-[18px] rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.3)] transition-[left] duration-150 ease-in-out`}
            ></span>
        </button>
    );
}