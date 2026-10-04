// src/app/(app)/dashboard/[projectId]/layout.tsx
import { getProjects } from "@/lib/api";
import { Project } from "@/lib/types";
import Sidebar from "@/components/Sidebar";
import { redirect } from "next/navigation";

export default async function ProjectScopeLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ projectId: string }>;
}) {
    const { projectId } = await params;
    const projects: Project[] = await getProjects();
    const project = projects.find((p) => p.id === projectId);
    if (!project) redirect("/dashboard");
    const projectName = project.name;
    return (
        <div className="flex-1 flex gap-3 h-full">
            {/* // TODO(sidebar-scroll): Pin back-button + project name while the nav list
                // scrolls internally (prototype behavior). The footer blocker is RESOLVED —
                // the (app) route group has no marketing footer. What remains: give the app
                // shell a bounded height (h-screen on the (app) layout or this row) so the
                // sidebar's flex-1 min-h-0 overflow-y-auto zone scrolls instead of the page,
                // and make the content column its own overflow-y-auto scroll region. The
                // h-full here is currently inert until that h-screen parent chain exists. */}
            <Sidebar title={projectName} projectId={projectId} groupType="project" />
            <div className="w-full flex flex-1 flex-col items-center">
                {children}
            </div>
        </div>
    );
}