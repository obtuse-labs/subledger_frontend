"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import CodePanel from "./CodePanel";
import Link from "next/link";

export default function ErrorState({ defaultStatus }: { defaultStatus: "404" | "400" }) {
    const pathname = usePathname();
    const [status, setStatus] = useState<"404" | "400">(defaultStatus);
    const is404 = status === "404";
    const errorHeadline = is404 ? "This entry isn't in the ledger." : "This request didn't balance.";
    const errorSub = is404
        ? "The page you're looking for doesn't exist, moved, or was never appended."
        : "The request body was malformed or failed validation before it ever reached the ledger.";
    const errorBody = is404
        ? `GET ${pathname || "/pricing-tiers"}\n\n→ 404\n{\n  "error": "not_found",\n  "status": 404\n}`
        : 'POST /api/v1/subscriptions\n\n→ 400\n{\n  "error": "bad_request",\n  "status": 400\n}';

    return (
        <main className="flex-1 flex items-center justify-center px-[clamp(20px,5vw,64px)] py-[clamp(40px,8vw,80px)]">
            <div className="max-w-[560px] w-full text-center">
                {/* <div className="inline-flex gap-2 bg-bg-alt border border-border p-[5px] rounded-[8px] mb-8">
                    <button
                        onClick={() => setStatus("404")}
                        className="border-none bg-accent hover:bg-accent-muted text-[#fafaf8] font-mono text-[12.5px] font-semibold px-3.5 py-[7px] rounded-md cursor-pointer"
                    >
                        404
                    </button>
                    <button
                        onClick={() => setStatus("400")}
                        className="border-none bg-accent hover:bg-accent-muted text-[#fafaf8] font-mono text-[12.5px] font-semibold px-3.5 py-[7px] rounded-md cursor-pointer"
                    >
                        400
                    </button>
                </div> */}
                <div className="font-mono text-[13px] font-semibold tracking-[0.08em] uppercase text-accent mb-4">/ {status}</div>
                <h1 className="text-[clamp(28px,5vw,40px)] font-extrabold tracking-[-0.01em] mb-3.5 text-fg text-pretty">{errorHeadline}</h1>
                <p className="text-base text-muted leading-[1.6] mb-8">{errorSub}</p>
                <div className="mb-8 text-left">
                    <CodePanel 
                        title="response"
                        body={errorBody}
                    />
                </div>
                <div className="flex gap-3 justify-center flex-wrap">
                    <Link 
                        href="/"
                        className="bg-fg text-bg text-sm font-semibold px-5 py-[11px] rounded-[8px]"
                    >
                        Back to Home
                    </Link>
                    <Link 
                        href="/docs"
                        className="bg-transparent text-fg text-sm font-semibold px-5 py-[11px] rounded-[8px] border border-border"
                    >
                        Read the docs
                    </Link>
                </div>
            </div>
        </main>
    );
}