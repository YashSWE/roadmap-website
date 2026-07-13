import React from "react";
import { cn } from "@/lib/utils";

type StickerType = 
  | "INTERVIEW-TESTED" 
  | "START HERE →" 
  | "COINED HERE" 
  | "100% FREE" 
  | "DONE ✓";

interface StickerProps {
  type: StickerType;
  className?: string;
  rotation?: number;
}

export function Sticker({ type, className, rotation }: StickerProps) {
  let bgColor = "bg-[#C6FF3F]"; // Acid default
  let rot = rotation ?? -4;

  switch (type) {
    case "INTERVIEW-TESTED":
      bgColor = "bg-[#FF3D8A]"; // Signal Pink
      rot = rotation ?? 6;
      break;
    case "START HERE →":
    case "COINED HERE":
    case "DONE ✓":
      bgColor = "bg-[#C6FF3F]"; // Acid
      break;
    case "100% FREE":
      bgColor = "bg-[#FF5C1F]"; // Safety Orange
      rot = rotation ?? -6;
      break;
  }

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center px-2 py-0.5 md:px-3 md:py-1 font-mono text-[9px] md:text-xs uppercase tracking-widest text-[#0A0A0A] border border-[#0A0A0A] shadow-[2px_2px_0_#0A0A0A] whitespace-nowrap",
        bgColor,
        className
      )}
      style={{ transform: `rotate(${rot}deg)` }}
    >
      {type}
    </div>
  );
}
