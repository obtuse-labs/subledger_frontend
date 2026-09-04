import { projectRequest } from "@/lib/api";
import { Plan } from "@/lib/types";
import Link from "next/link";

export default async function Plans({ params }: { params: Promise<{ projectId: string }> }) {
    const { projectId } = await params;
    const plans: Plan[] = await projectRequest("/plans", {
        method: "GET",
        projectID: projectId,
    });
    return (
        <main className="w-full max-w-[1200px] mx-auto flex-1 flex items-center justify-center px-[clamp(20px,5vw,64px)] py-[clamp(20px,4vw,40px)]">
            {plans.length === 0 && (
                <div className="text-muted text-center">
                    No plans found.
                </div>
            )}
            {plans?.map((plan: Plan) => (
                <p key={plan.id}>{plan.id}: {plan.name}</p>
            ))}
        </main>
    )
}