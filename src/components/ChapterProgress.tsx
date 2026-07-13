"use client";

import React from "react";
import { useProgress } from "./ProgressProvider";

export function ChapterProgress({ chapterSlug }: { chapterSlug: string }) {
  const { getChapterPercent, getChapterCheckedCount, getChapterTotalCount, resetChapter, markChapterAsDone, mounted } = useProgress();

  if (!mounted) {
    return <div className="h-6" />; // placeholder
  }

  const percent = getChapterPercent(chapterSlug);
  const checked = getChapterCheckedCount(chapterSlug);
  const total = getChapterTotalCount(chapterSlug);

  if (total === 0) return null;

  return (
    <div className="flex flex-col gap-2 max-w-sm">
      <div className="w-full h-2 bg-[#0A0A0A]/10 relative border border-[#0A0A0A]">
        <div 
          className="absolute top-0 left-0 h-full bg-[#C6FF3F] transition-all duration-250 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="flex justify-between items-center font-mono text-[11px] uppercase tracking-widest">
        <span>{checked}/{total} TOPICS</span>
        <div className="flex gap-4">
          {checked < total && (
            <button 
              onClick={() => markChapterAsDone(chapterSlug)}
              className="text-[#0A0A0A]/60 hover:text-[#3D5AFE] transition-colors font-bold"
            >
              MARK AS DONE
            </button>
          )}
          {checked > 0 && (
            <button 
              onClick={() => resetChapter(chapterSlug)}
              className="text-[#0A0A0A]/60 hover:text-[#FF3D8A] transition-colors"
            >
              RESET CHAPTER
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
