import { accountRequest } from "@/lib/api";
import { Project } from "@/lib/types";
import Link from "next/link";

export default async function Dashboard() {
    const projects: Project[] = await accountRequest("/projects", {
        method: "GET",
    });
    
    return (
        <main className="w-full max-w-[1200px] mx-auto flex-1 flex items-center justify-center px-[clamp(20px,5vw,64px)] py-[clamp(20px,4vw,40px)]">
            {projects.length === 0 && (
                <div className="text-muted text-center">
                    No projects found.
                </div>
            )}
            {projects?.map((project: Project) => (
                <Link key={project.id} href={`/dashboard/${project.id}/plans`}>
                    {project.id}: {project.name}
                </Link>
            ))}
        </main>
    )
}


