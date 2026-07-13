import React from "react";
import Link from "next/link";
import { Chapter } from "@/content/roadmap";
import { StatusChip } from "./StatusChip";
import { useProgress } from "./ProgressProvider";

interface ChapterCardProps {
  chapter: Chapter;
}

export function ChapterCard({ chapter }: ChapterCardProps) {
  const { getChapterCheckedCount, getChapterTotalCount, getChapterPercent } = useProgress();
  
  const checked = getChapterCheckedCount(chapter.slug);
  const total = getChapterTotalCount(chapter.slug);
  const percent = getChapterPercent(chapter.slug);
  
  return (
    <Link 
      href={`/${chapter.slug}`}
      className="group block w-full bg-[#FFFFFF] border border-[#0A0A0A] p-5 transition-transform duration-120 ease-out hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D5AFE]"
    >
      <div className="flex flex-col h-full">
        {/* Meta Row */}
        <div className="font-mono text-[11px] uppercase tracking-widest text-[#0A0A0A]/60 mb-2">
          CH. {chapter.number.toString().padStart(2, '0')} · BLOCK {chapter.block}
        </div>
        
        {/* Title */}
        <h3 className="font-display text-2xl md:text-[32px] leading-[0.9] text-[#0A0A0A] mb-3 uppercase tracking-[-0.01em]">
          {chapter.title}
        </h3>
        
        {/* Summary */}
        <p className="font-sans text-sm md:text-base text-[#0A0A0A]/80 leading-relaxed mb-6 flex-grow">
          {chapter.summary}
        </p>
        
        {/* Footer */}
        <div className="mt-auto flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <StatusChip status={chapter.status} publishDate={chapter.publishDate} />
            <div className="font-mono text-[11px] text-[#0A0A0A]">
              {checked}/{total}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="h-1 w-full bg-[#0A0A0A]/10 relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-[#C6FF3F] transition-all duration-250 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
