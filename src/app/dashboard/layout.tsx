// @/app/dashboard/layout.tsx
import Sidebar from "@/components/Sidebar";

export default async function DashboardLayout({ children } : { children: React.ReactNode }) {
    const title = "Obtuse Labs Account"
    return (
        <div className="flex-1 flex gap-3">
            <Sidebar title={title} />
            <div className="w-full flex flex-1 flex-col items-center">{children}</div>
        </div>
    )
}

