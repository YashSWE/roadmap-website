import React from "react";
import { Status } from "@/content/roadmap";
import { cn } from "@/lib/utils";

interface StatusChipProps {
  status: Status;
  publishDate?: string;
  className?: string;
}

export function StatusChip({ status, publishDate, className }: StatusChipProps) {
  if (status !== "published") {
    return null;
  }

  let label = "VIDEO OUT";
  let colorClass = "bg-[#C6FF3F] text-[#0A0A0A] border-[#0A0A0A]"; // Acid fill, Ink text, 1px border

  return (
    <div
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.06em] leading-none py-[4px] px-2 border whitespace-nowrap inline-flex items-center justify-center",
        colorClass,
        className
      )}
    >
      {label}
    </div>
  );
}
