import { accountRequest } from "@/lib/api";
import { Project } from "@/lib/types";
import Sidebar from "@/components/Sidebar";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function ProjectScopeLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ projectId: string }>;
}) {
    const { projectId } = await params;
    const projects: Project[] = await accountRequest("/projects", {
        method: "GET",
    });
    const project = projects.find((p) => p.id === projectId);
    if (!project) redirect("/dashboard");
    const projectName = project.name;
    return (
        <div className="flex-1 flex gap-3 h-full">
            {/* // TODO(sidebar-scroll): Sidebar nav should scroll internally while back-button +
                // project name stay pinned (prototype behavior). Needs the dashboard shell to be
                // h-screen with independent scroll zones (sidebar nav + content), which requires
                // the authed app to have its OWN root layout WITHOUT the marketing footer —
                // h-screen currently pushes the shared marketing footer off-screen. Tie this to
                // the navbar/auth-shell work: app chrome ≠ marketing chrome. */}
            <Sidebar title={projectName} projectId={projectId} groupType="project" />
            <div className="w-full flex flex-1 flex-col items-center">
                {children}
            </div>
        </div>
    );
}