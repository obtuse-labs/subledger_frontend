// @/components/PlanForm.tsx
"use client";

import { createPlan, updatePlan } from "@/app/dashboard/[projectId]/plans/actions";
import { Plan, PlanFormState } from "@/lib/types";
import { useActionState, useEffect } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PlanForm({ projectId, onClose, plan }: { projectId: string, onClose: () => void, plan?: Plan }) {
    const router = useRouter();
    const initialState: PlanFormState = {
        success: false,
        message: "",
    }
    const [state, formAction, isPending] = useActionState(
        plan ? updatePlan.bind(null, projectId, plan.id) : createPlan.bind(null, projectId), 
        initialState
    );
    useEffect(() => {
        if (state.success) {
            onClose();
            router.refresh();
        }
    }, [state, onClose, router]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);
    return (
        <div className="fixed inset-0 z-50 flex justify-end text-left">
            <div onClick={onClose} className="absolute inset-0 bg-disabled/50"></div>
            <form 
                action={formAction}
                className="relative w-[min(440px,100%)] h-full bg-bg border-l border-border shadow-elev flex flex-col"
            >
                <div className="py-5 px-6 border-b border-border flex items-start justify-between gap-4">
                    <div>
                        <div className="text-base font-bold tracking-[-0.01] text-fg">
                            {plan ? "Edit Plan" : "Create Plan"}
                        </div>
                        <div className="text-[13px] text-muted leading-[1.6] max-w-[320px] text-pretty mt-1">{plan ? "Update this plan" : "A subscription snapshots price, currency and cycle at creation."}</div>
                    </div>
                    <button 
                        onClick={onClose}
                        aria-label="Close"
                        className="transparent border border-border rounded-md w-7 h-7 text-muted text-[13px] leading-none shrink-0 hover:text-fg hover:border-muted2 flex items-center justify-center"
                    >
                        <X size={16} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto py-5 px-6 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label 
                            htmlFor="name"
                            className="text-[13px] font-semibold text-fg"
                        >
                            Name <span className="text-accent" aria-label="Required">*</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Team" 
                            id="name" 
                            name="name" 
                            defaultValue={plan ? plan.name : ""}
                            required
                            className="w-full py-2.5 px-3 text-sm text-fg bg-bg-alt border border-border rounded-lg outline-none focus:border-accent"
                            autoComplete="off"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label 
                            htmlFor="description"
                            className="text-[13px] font-semibold text-fg"
                        >
                            Description
                        </label>
                        <textarea 
                            placeholder="What this tier includes." 
                            id="description" 
                            name="description" 
                            rows={3}
                            defaultValue={plan ? plan.description || "" : ""}
                            className="w-full py-2.5 px-3 text-sm text-fg bg-bg-alt border border-border rounded-lg outline-none focus:border-accent resize-y"
                            autoComplete="off"
                        />
                    </div>
                    <div className="grid grid-cols-[1fr_116px] gap-3">
                        <div className="flex flex-col gap-2">
                            <label 
                                htmlFor="price"
                                className="text-[13px] font-semibold text-fg"
                            >
                                Price <span className="text-accent" aria-label="Required">*</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="1999.00" 
                                id="price" 
                                name="price" 
                                defaultValue={plan ? plan.price : ""}
                                required
                                className="w-full py-2.5 px-3 text-sm text-fg bg-bg-alt border border-border rounded-lg outline-none focus:border-accent"
                                autoComplete="off"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label 
                                htmlFor="currency"
                                className="text-[13px] font-semibold text-fg"
                            >
                                Currency
                            </label>
                            <select 
                                name="currency"
                                id="currency"
                                defaultValue={plan ? plan.currency : "INR"}
                                className="w-full py-2.5 px-3 text-sm text-fg bg-bg-alt border border-border rounded-lg outline-none focus:border-accent"
                            >
                                <option value="INR">INR</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label 
                            htmlFor="billing_cycle"
                            className="text-[13px] font-semibold text-fg"
                        >
                            Billing Cycle
                        </label>
                        <select 
                            name="billing_cycle"
                            id="billing_cycle"
                            defaultValue={plan ? plan.billing_cycle : "monthly"}
                            className="w-full py-2.5 px-3 text-sm text-fg bg-bg-alt border border-border rounded-lg outline-none focus:border-accent"
                        >
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label 
                            htmlFor="payment_terms_days"
                            className="text-[13px] font-semibold text-fg"
                        >
                            Payment terms (days)
                        </label>
                        <input 
                            type="number" 
                            placeholder="7" 
                            id="payment_terms_days" 
                            name="payment_terms_days"
                            defaultValue={plan ? plan.payment_terms_days : 7}
                            min={0}
                            max={999}
                            required
                            className="w-full py-2.5 px-3 text-sm text-fg bg-bg-alt border border-border rounded-lg outline-none focus:border-accent"
                            autoComplete="off"
                        />
                        <div className="text-xs text-muted2 leading-normal">Days after issue an invoice is due. 0 means due immediately.</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label 
                            htmlFor="status"
                            className="text-[13px] font-semibold text-fg"
                        >
                            Status
                        </label>
                        <select 
                            name="status"
                            id="status"
                            defaultValue={plan ? plan.status : "active"}
                            className="w-full py-2.5 px-3 text-sm text-fg bg-bg-alt border border-border rounded-lg outline-none focus:border-accent"
                        >
                            <option value="active">Active - open to new subscriptions</option>
                            <option value="inactive">Inactive - closed to new subscriptions</option>
                        </select>
                    </div>
                </div>
                <div className="py-4 px-6 border-t border-border flex items-center gap-2.5">
                    <button 
                        type="submit"
                        disabled={isPending}
                        aria-disabled={isPending}
                        aria-label="Create a new Plan"
                        className="bg-fg text-bg text-sm font-semibold py-2.5 px-4 border-none rounded-[7px] whitespace-nowrap hover:bg-muted"
                    >
                        {plan ? "Save Changes" : "Create Plan"}
                    </button>
                    <button
                        type="button"
                        disabled={isPending}
                        aria-disabled={isPending}
                        aria-label="Cancel"
                        onClick={onClose}
                        className="bg-bg text-fg text-sm font-semibold py-2.5 px-4 border border-border rounded-[7px] whitespace-nowrap hover:text-muted hover:border-muted"
                    >
                        Cancel
                    </button>
                    <span className="text-muted2 ml-auto text-xs font-mono">esc to close</span>
                </div>
            </form>
        </div>
    )

    
}