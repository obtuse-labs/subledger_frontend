// @/app/dashboard/[projectId]/plans/actions.ts
"use server";

import { projectRequest } from "@/lib/api";
import { ApiError, PlanCreate, PlanFormState } from "@/lib/types";
import { revalidatePath } from "next/cache";

export const createPlan = async (projectId: string, prevState: PlanFormState, formData: FormData): Promise<PlanFormState> => {
    const planBody: PlanCreate = {
        name: formData.get("name") as string,
        description: formData.get("description") ? formData.get("description") as string : null,
        price: formData.get("price") as string,
        currency: formData.get("currency") as string,
        billing_cycle: formData.get("billing_cycle") as "monthly" | "quarterly" | "yearly",
        payment_terms_days: formData.get("payment_terms_days") ? Number(formData.get("payment_terms_days") as string) : null,
        status: formData.get("status") ? formData.get("status") as "active" | "inactive" : null,
    }
    try {
        await projectRequest("/plans", {
            method: "POST",
            projectID: projectId,
            body: planBody,
        });
    } catch (err: unknown) {
        const error = err as ApiError;
        return { success: false, message: error.message || "Something went wrong" };
    }
    revalidatePath(`/dashboard/${projectId}/plans`, "page");
    return { success: true, message: "Plan created successfully" };
}

export const updatePlan = async (projectId: string, planId: string, prevState: PlanFormState, formData: FormData): Promise<PlanFormState> => {
    const planUpdateBody: PlanCreate = {
        name: formData.get("name") as string,
        description: formData.get("description") ? formData.get("description") as string : null,
        price: formData.get("price") as string,
        currency: formData.get("currency") as string,
        billing_cycle: formData.get("billing_cycle") as "monthly" | "quarterly" | "yearly",
        payment_terms_days: formData.get("payment_terms_days") ? Number(formData.get("payment_terms_days") as string) : null,
        status: formData.get("status") ? formData.get("status") as "active" | "inactive" : null,
    }
    try {
        await projectRequest(`/plans/${planId}`, {
            method: "PATCH",
            projectID: projectId,
            body: planUpdateBody,
        });
    } catch (err: unknown) {
        const error = err as ApiError;
        return { success: false, message: error.message || "Something went wrong" };
    }
    revalidatePath(`/dashboard/${projectId}/plans`, "page");
    return { success: true, message: "Plan updated successfully" };
}

export const changePlanStatus = async (projectId: string, planId: string, status: "active" | "inactive"): Promise<PlanFormState> => {
    const planStatusBody = { status };
    try {
        await projectRequest(`/plans/${planId}`, {
            method: "PATCH",
            projectID: projectId,
            body: planStatusBody,
        });
    } catch (err: unknown) {
        const error = err as ApiError;
        return { success: false, message: error.message || "Something went wrong" };
    }
    revalidatePath(`/dashboard/${projectId}/plans`, "page");
    return { success: true, message: `Plan ${status} successfully` };
}
