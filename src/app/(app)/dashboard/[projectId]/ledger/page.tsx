import NotImplementedYet from "@/components/NotImplementedYet";

export default async function Ledger({ params }: { params: Promise<{ projectId: string }> }) {
    const { projectId } = await params;
    return (
        <section className="w-full max-w-[1200px] mx-auto flex flex-col px-[clamp(20px,5vw,64px)] py-[clamp(20px,4vw,40px)]">
            <div className="flex items-end justify-between gap-5 flex-wrap mb-1.5">
                <div>
                    <div className="font-mono text-[13px] font-semibold text-accent tracking-[0.08em] uppercase mb-4">/ ledger</div>
                    <h1 className="text-[clamp(24px,3.4vw,32px)] font-bold tracking-[-0.02em] mb-0">Append-only, insert-only, authoritative.</h1>
                </div>
            </div>
            <p className="text-sm text-muted leading-[1.6] mt-2 mb-6 max-w-[560px]">
                Every money-flow event as an immutable entry. Corrections post as new entries; balances are derived by reading the ledger, never stored.
            </p>
            <NotImplementedYet reference="ledger" />
        </section>
    );
}