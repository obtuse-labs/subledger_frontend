import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function Dashboard(request: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    const response = await fetch(`${process.env.API_BASE_URL}/api/v1/auth/me`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    
    return (
        <main className="w-full max-w-[1200px] mx-auto flex-1 flex items-center justify-center px-[clamp(20px,5vw,64px)] py-[clamp(20px,4vw,40px)]">
            Dashboard
        </main>
    )
}


