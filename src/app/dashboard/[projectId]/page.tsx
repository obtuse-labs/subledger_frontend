export default async function Project({ params }: { params: Promise<{ projectId: string }> }) {
    const { projectId } = await params;
    return (
        <div>
            Project Page - {projectId}
        </div>
    )
}