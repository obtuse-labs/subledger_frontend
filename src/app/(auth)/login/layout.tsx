// src/app/(auth)/login/layout.tsx
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginLayout({ children }: { children: React.ReactNode }) {
    const token = (await cookies()).get("auth-token")?.value;
    if (token) {
        redirect("/dashboard");
    }
    return (
        <>
            <Navbar type="login" />
            {children}
        </>
    );
}