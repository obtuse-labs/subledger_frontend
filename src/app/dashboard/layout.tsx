// @/app/dashboard/layout.tsx

export default async function DashboardLayout({ children } : { children: React.ReactNode }) {
    return (
        <div className="flex-1 flex gap-3 h-screen">
            <div className="w-full">{children}</div>
        </div>
    )
}