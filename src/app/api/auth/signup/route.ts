import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SignupRequest } from "@/lib/types";

export async function POST(request: NextRequest) {
    const { email, name, password, user_type, account_name, account_type }: SignupRequest = await request.json()

    let response: Response;
    try {
        response = await fetch(`${process.env.API_BASE_URL}/api/v1/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    email,
                    name,
                    password,
                    user_type,
                    account_name: account_name || name,
                    account_type: account_type || "individual",
                }
            ),
        })
    } catch {
        return NextResponse.json({ message: "Server unreachable" }, { status: 503 })
    }
    const contentType = response.headers.get('content-type');
    const hasJson = contentType?.includes('application/json');
    const data = hasJson ? await response.json() : null;
    if (!response.ok) {
        return NextResponse.json(
            data ?? { message: "Signup failed." },
            { status: response.status }
        )
    }
    const cookieStore = await cookies();
    cookieStore.set('auth-token', data.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60,
    });
    return NextResponse.json({ message: 'Signup successful' }, { status: 200 })
}