// src/app/(app)/layout.tsx
import Navbar from "@/components/Navbar";
import { accountRequest, getProjects } from "@/lib/api";
import { AccountResponse, MeResponse, UserResponse } from "@/lib/types";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
    const response: MeResponse = await accountRequest("/auth/me");
	const user: UserResponse = response.user;
	const account: AccountResponse = response.accounts?.[0];
	const projects = await getProjects();
	return (
		<main className="h-screen">
			<Navbar type="app" user={user} account={account} projects={projects} />
			{children}
		</main>
	);
}