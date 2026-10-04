// src/app/(app)/layout.tsx
import Navbar from "@/components/Navbar";
import { accountRequest } from "@/lib/api";
import { AccountResponse } from "@/lib/types";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
    const response = await accountRequest("/auth/me");
	const user = response.user
	const dummyAccount: AccountResponse = {
		id: "00000000-0000-0000-0000-00000000000a",
		name: "Obtuse Labs",
		account_type: "individual",
		status: "active",
		created_at: new Date().toISOString()
	};
	const account = response.accounts?.[0] ?? dummyAccount
	return (
		<>
			<Navbar type="app" user={user} account={account} />
			{children}
		</>
	);
}