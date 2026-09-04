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
    user_type?: string;
    account_name?: string;
    account_type?: string;
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
