// @/app/dashboard/{projectId}/plans
import CopyButton from "@/components/CopyButton";
import MenuButton from "@/components/MenuButton";
import PlanFormPanel from "@/components/PlanFormPanel";
import { projectRequest } from "@/lib/api";
import { Plan } from "@/lib/types";

export default async function Plans({ params }: { params: Promise<{ projectId: string }> }) {
    const { projectId } = await params;
    const plans: Plan[] = await projectRequest("/plans", {
        method: "GET",
        projectID: projectId,
    });
    const planCountLabel = plans.length ? (plans.length == 1) ? "1 plan" : `${plans.length} plans` : `No plans found`;
    const gridColsTemplate = "grid-cols-[minmax(120px,2fr)minmax(74px,.9fr)minmax(64px,.8fr)minmax(80px,.9fr)minmax(48px,.5fr)84px]";
    return (
        <section className="w-full max-w-[1200px] mx-auto flex flex-col px-[clamp(20px,5vw,64px)] py-[clamp(20px,4vw,40px)]">
            <div className="flex items-end justify-between gap-5 flex-wrap mb-1.5">
                <div>
                    <div className="font-mono text-[13px] font-semibold text-accent tracking-[0.08em] uppercase mb-4">/ plans</div>
                    <h1 className="text-[clamp(24px,3.4vw,32px)] font-bold tracking-[-0.02em] mb-0">Plans</h1>
                </div>
                <PlanFormPanel projectId={projectId} />
            </div>
            <p className="text-sm text-muted leading-[1.6] mt-2 mb-6 max-w-[560px]">
                Price, currency and billing cycle a subscription snapshots from. Editing a plan never rewrites existing subscriptions.
            </p>
            <div className="flex items-center gap-3.5 mb-3.5 flex-wrap">
                <span className="font-mono text-xs text-muted bg-bg-alt border border-border rounded-md py-[5px] px-2.5">{planCountLabel}</span>
                {/* TODO(2c/backend): Add active plans count when endpoint is available */}
            </div>
            {plans.length > 0 ? (
                <>
                    <div className="border border-border rounded-[10px] bg-bg">
                        <div className={`rounded-tl-lg rounded-tr-lg grid ${gridColsTemplate} gap-2.5 items-center bg-bg border-b border-border py-2.5 px-4 font-mono text-xs uppercase tracking-[0.06em] text-muted2`}>
                            <div>Plan</div>
                            <div>Price</div>
                            <div>Cycle</div>
                            <div>Payment terms</div>
                            <div>Status</div>
                            <div></div>
                        </div>
                        {plans.map(plan => (
                            <div
                                key={plan.id}
                                className={`grid ${gridColsTemplate} gap-2.5 items-center py-2.5 px-4 border-b border-border last:border-0 hover:bg-bg-alt`}
                            >
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-fg">{plan.name}</span>
                                        <span className="font-mono text-xs text-muted2 line-clamp-1 text-pretty">{plan.id}</span>
                                    </div>
                                    <div className="text-sm text-muted leading-[1.45] mt-1 line-clamp-1 text-pretty">{plan.description}</div>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="font-mono text-sm font-semibold text-fg">{plan.price}</span>
                                    <span className="font-mono text-xs text-muted">{plan.currency}</span>
                                </div>
                                <div className="text-sm text-muted capitalize">{plan.billing_cycle}</div>
                                <div className="text-sm text-muted px-0.5">Net {plan.payment_terms_days}</div>
                                <div>
                                    <span className={`inline-flex items-center gap-1.5 rounded-[5px] px-2 py-1 text-xs font-semibold capitalize ${plan.status === 'active' ? 'bg-status-active text-status-active-text' : 'bg-bg-alt text-muted'}`}>{plan.status}</span>
                                </div>
                                <div className="relative flex justify-center items-center gap-2">
                                    <CopyButton target={plan.id} />
                                    <MenuButton
                                        projectId={projectId}
                                        plan={plan}
                                    />
                                    {/* TODO: add menu list with CRUD and endpoint for per plan total subscriptions in 2c */}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-xs text-muted2 mt-3.5 px-0.5 leading-[1.5]">Deactivating a plan closes it to new subscriptions. Existing subscriptions keep billing on their snapshot.</div>
                </>
            )
                : (
                    <div className="border-dashed border border-border rounded-[10px] py-14 px-8 flex flex-col items-center text-center">
                        <div className="bg-bg-alt w-8 h-8 rounded-lg border border-border mb-4"></div>
                        <div className="text-fg text-lg font-bold mb-2">No plans in {projectId} yet.</div>
                        <div className="text-muted text-sm leading-[1.6] max-w-[400px] mb-5 text-pretty">
                            A plan defines the price, currency and billing cycle a subscription snapshots from. Create one to start billing in this project.
                        </div>
                        <div className="flex gap-2.5 flex-wrap justify-center">
                            <PlanFormPanel projectId={projectId} />
                        </div>
                    </div>
                )}
        </section>
    )
}