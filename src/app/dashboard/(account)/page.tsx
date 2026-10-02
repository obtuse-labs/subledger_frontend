// @/app/dashboard/page.tsx
import ProjectCard from "@/components/ProjectCard";
import { accountRequest, projectRequest } from "@/lib/api";
import { Project, ProjectCardProps } from "@/lib/types";

export default async function Dashboard() {
    const projects: Project[] = await accountRequest("/projects", {
        method: "GET",
    });
    const accountName = "Obtuse Labs Account"
    // TODO(2c/backend): N+1 — fetching plan count per project in a loop.
    // Replace with a single call once GET /projects returns plan_count per project.
    // Kept for demo only; does not scale past a handful of projects.
    const cardProps: ProjectCardProps[] = await Promise.all(projects.map(async (project: Project) => {
        const planCount: number = await projectRequest("/plans", {
            method: "GET",
            projectID: project.id,
        }).then(response => response.length);
        return {
            projectId: project.id,
            planCount: planCount,
            name: project.name,
            slug: project.slug? project.slug : "",
            createdAt: project.created_at,
        };
    }));
    return (
        // <section className="w-full max-w-[1200px] mx-auto flex flex-col px-[clamp(20px,5vw,64px)] py-[clamp(20px,4vw,40px)]">
        <section className="w-full max-w-[1200px] mx-auto flex flex-col px-[clamp(20px,5vw,64px)]">
            <div className="pt-[clamp(24px,4vw,36px)] pb-6 max-w-[1080px]">
                <div className="font-mono text-[13px] font-semibold text-accent tracking-[0.08em] uppercase mb-4">/ projects</div>
                <div className="flex items-end justify-between gap-5 flex-wrap mb-2">
                    <h1 className="font-extrabold text-[clamp(26px,3.6vw,34px)] tracking-[-0.02em] m-0 text-fg">{accountName}</h1>
                    {/* <button className="bg-fg text-bg text-sm font-semibold py-2.5 px-4 border-none rounded-[7px] whitespace-nowrap hover:bg-muted">New Project</button> */}
                </div>
                <p className="text-muted text-[15px] leading-[1.6] mb-6 max-w-[560px]">
                    A project is the tenant boundary. Plans, customers, subscriptions, invoices and ledger entries all belong to exactly one project.
                </p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(258px,1fr))] gap-4">
                {cardProps?.map((prop: ProjectCardProps) => (
                    <ProjectCard 
                        key={prop.projectId}
                        projectId={prop.projectId}
                        planCount={prop.planCount}
                        name={prop.name}
                        slug={prop.slug}
                        createdAt={prop.createdAt}
                    />
                ))}
            </div>
        </section>
    )
}


