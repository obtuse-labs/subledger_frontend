import CodePanel from "@/components/CodePanel";
import { HERO_BODY, STACK } from "@/lib/api-data";
import Link from "next/link";

export default function Home() {
	return (
		<>
			<section className="max-w-[1200px] mx-auto px-[clamp(20px,5vw,64px)] pt-[clamp(48px,10vw,96px)] pb-[64px]">
				<div className="grid gap-12 items-center grid-cols-[repeat(auto-fit,minmax(360px,1fr))]">
					{/* left section */}
					<div>
						<div className="font-mono text-[13px] font-semibold text-accent tracking-[0.08em] uppercase mb-4">/ billing infra for the obtuse labs portfolio</div>
						<h1 className="text-[clamp(34px,6vw,58px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-fg text-pretty mb-5">Subscription billing, modelled correctly.</h1>
						<p className="text-muted max-w-[520px] text-[17px] leading-[1.6] mb-7">
							Plans, customers, subscriptions and invoices, backed by idempotent payment recording and an append-only ledger. A REST API that records money movement — it never touches the money itself.
						</p>
						<div className="flex gap-3 flex-wrap mb-9">
							<a 
								href="https://github.com/utkarsh-vats/subledger_backend"
								target="_blank"
								rel="noopener"
								className="bg-fg text-bg text-sm font-semibold px-5 py-3 rounded-lg"
							>
								View on GitHub
							</a>
							<Link 
								href="/docs"
								className="bg-bg text-fg text-sm font-semibold px-5 py-3 rounded-lg border border-border"
							>
								Read the docs
							</Link>
						</div>
						<div className="flex gap-2 flex-wrap">
							{STACK.map((tech) => (
								<span key={tech} className="font-mono text-xs text-muted bg-bg-alt border border-border px-[10px] py-[5px] rounded-md">{tech}</span>	
							))}
						</div>
					</div>
					{/* right section */}
					<CodePanel 
						title = "POST /api/v1/payments/record"
						body = {HERO_BODY}
					/>
				</div>
			</section>
			<section className="bg-band-bg px-[clamp(20px,5vw,64px)] py-14">
				<div className="max-w-[900px] mx-auto text-left">
					<h2 className="text-[#fafaf8] text-[clamp(24px,4vw,34px)] font-extrabold tracking-[-0.01em] mb-3.5 text-pretty">Subledger is the <span className="text-accent">brain</span>, not the <span className="text-[#a0a4ad]">wallet</span>.</h2>
					<p className="text-[#a9adb8] max-w-[640px] text-[16px] leading-[1.6]">
						It orchestrates charges on <span className="text-[#dfe1e6]">your own</span> payment gateway and records every attempt, success and failure. Money moves customer → your gateway → your bank. Subledger never holds, pools, escrows, routes, or settles a rupee of it.
					</p>
				</div>
			</section>
			<section className="py-[64px] px-[clamp(20px,5vw,64px)] max-w-[1200px] mx-auto;">
				{/* <div className="font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#e8551a;margin-bottom:14px;">/ core primitives</div>
				<h2 className="font-size:clamp(26px,4.5vw,38px);font-weight:800;letter-spacing:-0.01em;margin:0 0 40px;color:{{ t.fg }};">Six resources, nothing hidden.</h2>
				<div className="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1px;background:{{ t.border }};border:1px solid {{ t.border }};">
					<sc-for list="{{ primitives }}" as="p" hint-placeholder-count="6">
					<div className="background:{{ t.bg }};padding:28px 24px;">
						<div className="font-family:'JetBrains Mono',monospace;font-size:13px;color:{{ t.muted2 }};margin-bottom:14px;">{{ p.num }}</div>
						<div className="font-size:17px;font-weight:700;margin-bottom:8px;color:{{ t.fg }};">{{ p.name }}</div>
						<div className="font-size:14px;color:{{ t.muted }};line-height:1.55;">{{ p.desc }}</div>
					</div>
					</sc-for>
				</div> */}
			</section>
		</>
	);
}
