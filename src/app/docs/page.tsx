import CodePanel from "@/components/CodePanel";
import { LIVE_API, RESOURCES_BASE } from "@/lib/api-data";

export default function Docs() {
    return (

        <main className="px-[clamp(20px,5vw,64px)] py-[clamp(40px,8vw,72px)] max-w-[1000px] mx-auto w-full">
            <div className="font-mono text-[13px] font-semibold tracking-[0.08em] uppercase text-accent mb-3.5">/ api reference</div>
            <h1 className="text-[clamp(30px,5vw,46px)] font-extrabold tracking-[0.02em] mb-3.5 text-fg">Endpoints</h1>
            <p className="text-base text-muted leading-[1.6] mb-6 max-w-[580px]">A predictable, resource-oriented REST API — JSON in, JSON out. Auth is a JWT bearer token.</p>
            <div className="inline-flex items-center gap-2.5 bg-[#14161c] text-[#dfe1e6] font-mono text-[13px] px-3.5 py-[9px] rounded-[7px] flex-wrap mb-12">
                <span>https://api.subledger.obtuse.in/api/v1</span>
                <span className="bg-accent text-white text-[10px] font-bold tracking-[0.04em] uppercase px-[7px] py-0.5 rounded-sm">early access</span>
            </div>
            <div className="bg-callout-bg border border-callout-border rounded-[10px] py-5 px-6 mb-14">
                <div className="text-sm font-bold text-fg mb-1.5;">{`Auth & idempotency`}</div>
                <div className="text-sm text-fg leading-[1.6]">
                    Every mutation requires <span className="font-mono text-[13px]">
                        {`Authorization: Bearer <jwt>`}
                    </span>. <span className="font-mono text-[13px]">
                        POST /api/v1/payments/record
                    </span> additionally requires an <span className="font-mono text-[13px]">
                        Idempotency-Key
                    </span> header (a UUID).
                </div>
            </div>
            <div className="sticky top-[70px] z-15 bg-bg border-b border-border mx-[-20px] mb-10 py-2.5 px-5 flex gap-2 overflow-x-auto whitespace-nowrap">
                {RESOURCES_BASE.map((res) => (
                    <a
                        href={`#${res.id}`} key={res.id}
                        className="font-mono text-[12.5px] text-muted bg-bg-alt border border-border py-1.5 px-3 rounded-[6px] shrink-0 hover:text-muted2"
                    >
                        {res.name}
                    </a>
                ))}
            </div>
            {RESOURCES_BASE.map((res) => (
                <div
                    key={res.id} id={res.id}
                    className="mb-14 lg:scroll-mt-[128px] scroll-mt-[140px]"
                >
                    <h2 className="text-[22px] font-bold mb-1.5 text-fg">{res.name}</h2>
                    <p className="text-sm text-muted leading-[1.55] mb-[18px] max-w-[600px]">{res.desc}</p>
                    {res.endpoints.map((ep, idx) => (
                        <div key={`${idx}-${ep.path}`} className="mb-3.5">
                            <div className="bg-bg flex flex-wrap items-baseline gap-y-1.5 gap-x-3.5 py-3 px-4 border border-border rounded-tl-[8px] rounded-tr-[8px] border-b-0">
                                <span className="font-mono text-[11.5px] font-bold tracking-[0.03em] px-2 py-[3px] rounded-[5px] bg-bg text-fg whitespace-nowrap">{ep.method}</span>
                                <span className="font-mono text-[13.5px] text-fg whitespace-nowrap">{ep.path}</span>
                                <div className="text-[13.5px] text-muted flex-1 min-w-[200px]">{ep.desc}</div>
                            </div>
                            <div className="border border-border rounded-bl-[8px] rounded-br-[8px] overflow-hidden">
                                <CodePanel
                                    title={ep.method + " " + ep.path}
                                    body={ep.body}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            <div className="border-t border-border pt-7 text-sm text-muted">
                Prefer exploring live? The running instance serves interactive OpenAPI docs at <a href={`${LIVE_API}/docs`} target="_blank" rel="noopener" className="font-mono text-[13px] text-accent hover:text-accent-hover">/docs</a> (early access).
            </div>
        </main>
    );
}