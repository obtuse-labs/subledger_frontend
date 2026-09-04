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

