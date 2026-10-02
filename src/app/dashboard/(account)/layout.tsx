// @/app/dashboard/(account)/layout.tsx
import Sidebar from "@/components/Sidebar";

export default async function AccountLayout({ children } : { children: React.ReactNode }) {
    const title = "Obtuse Labs Account"
    return (
        <div className="flex-1 flex gap-3 h-full">
            <Sidebar title={title} />
            <div className="w-full flex flex-1 flex-col items-center">{children}</div>
        </div>
    )
}

