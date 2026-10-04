import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { RequestOptions, ApiError, Project } from './types';
import { cache } from 'react';

const base_url = process.env.API_BASE_URL

const apiRequest = async (path: string, { method = "GET", ...opts }: RequestOptions & { projectID?: string } = {}) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;
    const headers = new Headers();

    if (!token) {
        redirect('/login');
    }

    headers.set('Authorization', 'Bearer ' + token);
    headers.set('Content-Type', 'application/json');

    if (opts.projectID) {
        headers.set('X-Project-Id', opts.projectID);
    }

    let response: Response;
    try {
        response = await fetch(`${base_url}/api/v1${path}`, {
            method,
            headers,
            body: opts.body ? JSON.stringify(opts.body) : undefined,
        })
    } catch {
        const err: ApiError = {
            status: 503,
            message: 'Server unreachable',
        }
        throw err
    }

    if (response.status === 401) {
        cookieStore.delete("auth-token");
        redirect('/login');
    }
    const contentType = response.headers.get('content-type');
    const hasJson = contentType?.includes('application/json');
    const responseBody = hasJson ? await response.json() : null;
    if (!response.ok) {
        const err: ApiError = {
            status: response.status,
            message: responseBody?.message || 'An unknown error occurred.',
        }
        throw err
    }
    return responseBody
}

export const accountRequest = (path: string, opts: RequestOptions = {}) => {
    return apiRequest(path, opts)
}

export const projectRequest = (path: string, opts: RequestOptions & { projectID: string }) => {
    return apiRequest(path, opts)
}

export const getProjects: () => Promise<Project[]> = cache(async () => {
    return await accountRequest("/projects");
});

