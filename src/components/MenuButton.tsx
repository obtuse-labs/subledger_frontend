"use client";
import { useState, useRef, useEffect } from "react";
import { Bookmark, BookmarkOff, Ellipsis, PencilLine } from "lucide-react";
import PlanForm from "./PlanForm";
import { Plan } from "@/lib/types";
import { changePlanStatus } from "@/app/dashboard/[projectId]/plans/actions";
import { useRouter } from "next/navigation";

export default function MenuButton({ projectId, plan }: { projectId: string; plan: Plan }) {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
    const [isPending, setIsPending] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    const handleMenuOpen = () => {
        setMenuOpen(!menuOpen);
    }
    const onClose = () => {
        setIsPanelOpen(false);
    }
    const handlePlanStatus = async () => {
        // setMenuOpen(false);
        setIsPending(true);
        await changePlanStatus(projectId, plan.id, plan.status === "active" ? "inactive" : "active")
        router.refresh();
        setIsPending(false);
    }

    return (
        <>
        <div ref={menuRef} className="flex flex-col relative">
            <button
                onClick={handleMenuOpen}
                aria-label="Row actions"
                className="text-muted2 p-2 rounded-[5px] bg-inherit border border-inherit hover:bg-bg hover:border-border"
            >
                <Ellipsis className="w-4 h-4" />
            </button>
            <div
                className={`${menuOpen? "flex flex-col" : "hidden"} absolute right-0 top-full mt-1 bg-bg border border-border rounded-lg shadow-lg w-48 max-w-[220px] z-50 gap-1 p-1`}
            > 
                <button 
                    onClick={() => {setIsPanelOpen(true); setMenuOpen(false)}}
                    className="text-muted flex gap-2 text-sm py-1 px-2 text-left hover:bg-bg-alt hover:text-fg cursor-pointer"
                >
                    <PencilLine className="w-4 h-4" /> Edit plan
                </button>
                <button 
                    onClick={handlePlanStatus}
                    className="text-muted flex gap-2 text-sm py-1 px-2 text-left hover:bg-bg-alt hover:text-fg cursor-pointer"
                    disabled={isPending}
                >
                    {plan.status === "active" ? (<><BookmarkOff className="w-4 h-4" /> Deactivate</>) : (<><Bookmark className="w-4 h-4" /> Reactivate</>)}
                </button>
                {/* TODO for 2c, needs a backend endpoint for subscription count */}
            </div>
        </div>
        {isPanelOpen && <PlanForm projectId={projectId} onClose={onClose} plan={plan}/>}
        </>
    )
}