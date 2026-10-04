// src/app/(app)/layout.tsx
import Navbar from "@/components/Navbar";
import { accountRequest } from "@/lib/api";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
    const user = await accountRequest("/auth/me");
	return (
		<>
			<Navbar type="app" user={user} />
			{children}
		</>
	);
}