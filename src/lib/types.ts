export interface RequestOptions {
    method?: string;
    body?: unknown;
}

export interface ApiError { 
    status: number;
    message: string;
}

export interface SignupRequest {
    email: string;
    name: string;
    password: string;
    user_type?: "student" | "professional" | "other";
    account_name?: string;
    account_type?: string;
}

export interface UserResponse {
    id: string;
    email: string;
    name: string;
    status: "active" | "inactive";
    user_type?: "student" | "professional" | "other" | null;
}

export interface AccountResponse {
    id: string;
    name: string;
    account_type: "individual" | "organization";
    status: "active" | "inactive";
    created_at: string;
}

export interface MeResponse {
    user: UserResponse;
    accounts: AccountResponse[];
}

export interface SidebarTabProps {
    href: string;
    label: string;
    count?: number;
    icon: React.ComponentType<{ className?: string }>;
    isActive: boolean;
    soon?: boolean;
}

export interface SidebarTabInputProps {
    id: string;
    label: string;
    exact: boolean;
    icon: React.ComponentType<{ className?: string }>;
    soon?: boolean;
}

export interface AccountGroupProps {
    title: string;
    items: SidebarTabInputProps[];
}

export interface ProjectCardProps {
    projectId: string;
    planCount: number;
    name: string;
    slug: string;
    createdAt: string;
}

export interface Project {
    id: string;
    account_id: string;
    name: string;
    slug: string | null;
    status: "active" | "inactive";
    created_at: string;
}

export interface Plan {
    id: string;
    project_id: string;
    name: string;
    description: string | null;
    billing_cycle: "monthly" | "quarterly" | "yearly";
    price: string;
    currency: string;
    status: "active" | "inactive";
    payment_terms_days: number;
    created_at: string;
    updated_at: string;
}

export interface PlanCreate {
    name: string;
    description?: string | null;
    price: string;
    currency: string;
    billing_cycle: "monthly" | "quarterly" | "yearly";
    payment_terms_days?: number | null;
    status?: "active" | "inactive" | null;
}

export type PlanFormState = {
    success: boolean;
    message: string;
}
