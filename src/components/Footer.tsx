import { github } from "@/lib/api-data";

export default function Footer() {
    return (
        <footer className="flex flex-col gap-2.5 w-full bg-bg border-t border-border py-10 px-[clamp(20px,5vw,64px)] ">
            <div className="text-sm font-semibold text-fg">
                Subledger — billing backend for the Obtuse Labs portfolio
            </div>
            <div className="text-[13px] text-muted">
                by Utkarsh Vats · <a href={github} target="_blank" rel="noopener" className="text-accent hover:text-muted">GitHub</a>
            </div>
            <div className="text-[12.5px] text-muted2">
                Also in the portfolio: LegalReader · Togglesync · UptimeMonitor
            </div>
        </footer>
    );
}