import Link from "next/link"

export default function NotImplementedYet ({ reference }: { reference?: string }) {
    return (
        <div className="bg-callout-bg border border-callout-border rounded-[10px] py-5 px-6 mb-14">
            <div className="text-sm font-bold text-fg mb-1.5">Not Implemented Yet</div>
            <div className="text-sm text-fg leading-[1.6]">
                This section exists as a navigation target. The API endpoints behind it are live today — see
                <Link href={`/docs#${reference}`} className="text-accent" target="_blank"> the reference</Link>.
            </div>
        </div>
    )
}