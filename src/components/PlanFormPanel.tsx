// @/components/PlanFormPanel
"use client";

import { useState } from "react";
import PlanForm from "./PlanForm";

export default function PlanFormPanel({ projectId }: { projectId: string }) {
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => {
        setIsOpen(false);
    };

    return (
        <>
        <button
            onClick={() => setIsOpen(true)}
            className="bg-fg text-bg text-sm font-semibold py-2.5 px-4 border-none rounded-[7px] whitespace-nowrap hover:bg-muted"
        >
            Create Plan
        </button>
        {isOpen && <PlanForm projectId={projectId} onClose={onClose} />}
        </>
    );
}