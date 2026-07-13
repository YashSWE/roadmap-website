import React from "react";
import { Status } from "@/content/roadmap";
import { cn } from "@/lib/utils";

interface StatusChipProps {
  status: Status;
  publishDate?: string;
  className?: string;
}

export function StatusChip({ status, publishDate, className }: StatusChipProps) {
  let label = "VIDEO SOON";
  let colorClass = "text-ink/40 border-transparent"; // Grid-Line gray equivalent

  if (status === "published") {
    label = "VIDEO OUT";
    colorClass = "bg-[#C6FF3F] text-[#0A0A0A] border-[#0A0A0A]"; // Acid fill, Ink text, 1px border
  } else if (status === "coming-soon") {
    if (publishDate) {
      const d = new Date(publishDate);
      const month = d.toLocaleString("default", { month: "short" }).toUpperCase();
      const day = d.getDate();
      label = `VIDEO ${month} ${day}`;
    }
    colorClass = "bg-transparent text-[#0A0A0A] border-[#0A0A0A]"; // Ink outline on Bone
  }

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
