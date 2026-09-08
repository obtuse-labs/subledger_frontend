import { projectRequest } from "@/lib/api";
import { Project } from "@/lib/types";
import { redirect } from "next/navigation";

export default async function ProjectScopeLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ projectId: string }>;
}) {
    const { projectId } = await params;
    const projects: Project[] = await projectRequest("/projects", {
        method: "GET",
        projectID: projectId,
    });
    if (!projects.find((p) => p.id === projectId)) {
        return redirect("/dashboard");
    }
    return (
        <div className="w-full flex flex-1 flex-col items-center">{children}</div>
    );
}