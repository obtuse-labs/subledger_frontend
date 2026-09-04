import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    const { email, password } = await request.json()
    console.log({email, password});

    let response: Response;
    try {
        response = await fetch(`${process.env.API_BASE_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
    } catch {
        return NextResponse.json({ message: "Server unreachable" }, { status: 503 })
    }
    console.log(response)
    const contentType = response.headers.get('content-type');
    const hasJson = contentType?.includes('application/json');
    const data = hasJson ? await response.json() : null;
    if (!response.ok) {
        return NextResponse.json(
            data ?? { message: "Login failed." },
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
    return NextResponse.json({ message: 'Login successful' }, { status: 200 })
}