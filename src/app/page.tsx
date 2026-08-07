import CodePanel from "@/components/CodePanel";
import { HERO_BODY, STACK, PRIMITIVES, LEDGER_BODY, QUICKSTART_BODY } from "@/lib/api-data";
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
			<section className="py-[64px] px-[clamp(20px,5vw,64px)] max-w-[1200px] mx-auto">
				<div className="font-mono text-[13px] font-semibold text-accent tracking-[0.08em] uppercase mb-3.5">/ core primitives</div>
				<h2 className="text-[clamp(26px,4.5vw,38px)] font-extrabold tracking-[-0.01em] mb-10 text-fg">Six resources, nothing hidden.</h2>
				<div className="grid grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border border border-border">
					{PRIMITIVES.map((p) => (
						<div key={p.num} className="bg-bg px-6 py-7">
							<div className="font-mono text-xs text-muted2 mb-3.5">{p.num}</div>
							<div className="text-[17px] font-bold text-fg mb-2">{p.name}</div>
							<div className="text-muted text-sm leading-[1.55]">{p.desc}</div>
						</div>
					))}
				</div>
			</section>
			<section className="px-[clamp(20px,5vw,64px)] pt-6 pb-20 max-w-[1200px] mx-auto">
				<div className="font-mono text-[13px] font-semibold text-accent tracking-[0.08em] uppercase mb-3.5">/ integrity</div>
				<h2 className="text-[clamp(26px,4.5vw,38px)] font-extrabold tracking-[-0.01em] mb-10 max-w-[640px] text-pretty text-fg">{"Retries can't double-charge. History can't be rewritten."}</h2>
				<div className="grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-12 items-start">
					<div className="flex flex-col gap-7">
						<div>
							<div className="text-base font-bold mb-1.5 text-fg">1. Idempotency is a database constraint</div>
							<div className="text-[15px] text-muted leading-[1.6]">Every payment record carries an <span className="font-mono text-[13.5px] text-accent">Idempotency-Key</span>, enforced by a Postgres UNIQUE constraint on the attempt row — not a cache. A repeated key replays the original outcome; it never charges twice.</div>
						</div>
						<div>
							<div className="text-base font-bold mb-1.5 text-fg">2. The ledger is append-only</div>
							<div className="text-[15px] text-muted leading-[1.6]">Entries are insert-only. Nothing is ever mutated or deleted — corrections post as new entries, so the history stays intact.</div>
						</div>
						<div>
							<div className="text-base font-bold mb-1.5 text-fg">3. Balances are derived, not stored</div>
							<div className="text-[15px] text-muted leading-[1.6]">{"There's one source of truth. Anything you'd call a \"balance\" is computed by reading the ledger, not by trusting a mutable counter."}</div>
						</div>
					</div>
					<CodePanel 
						title="ledger_entries"
						body={LEDGER_BODY}
					/>
				</div>
			</section>
			<section className="max-w-[900px] mx-auto pt-6 px-[clamp(20px,5vw,64px)] pb-20">
				<div className="font-mono text-[13px] font-semibold text-accent tracking-[0.08em] uppercase mb-3.5">/ getting started</div>
				<h2 className="text-[clamp(26px,4.5vw,38px)] font-extrabold tracking-[-0.01em] mb-7 text-fg">Run it yourself.</h2>
				<CodePanel 
					title="terminal"
					body={QUICKSTART_BODY}
				/>
			</section>
			<section className="bg-bg-alt py-[72px] px-[clamp(20px,5vw,64px)] text-center">
				<h2 className="text-[clamp(26px,4.5vw,36px)] font-extrabold tracking-[-0.01em] mb-3.5 text-fg">Read the <span className="text-accent">code</span>, not the <span className="text-accent-muted">deck</span>.</h2>
				<p className="text-muted text-[15px] mb-7">Early access — built in public. No signup, no waitlist. Clone it and run it.</p>
				<a 
					href="https://github.com/utkarsh-vats/subledger_backend"
					target="_blank"
					rel="noopener"
					className="bg-fg text-bg text-sm font-semibold px-[22px] py-3 rounded-[8px] inline-block"
				>
					View on GitHub
				</a>
			</section>
		</>
	);
}
