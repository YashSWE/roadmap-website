"use client";

import React from "react";
import { useProgress } from "./ProgressProvider";
import { Topic } from "@/content/roadmap";
import { cn } from "@/lib/utils";

export function SyllabusList({ topics, chapterSlug }: { topics: Topic[], chapterSlug: string }) {
  const { checkedTopics, toggleTopic, mounted } = useProgress();

  return (
    <>
      {topics.map((topic) => {
        const isChecked = mounted ? checkedTopics.includes(topic.id) : false;

        return (
          <button
            key={topic.id}
            onClick={() => toggleTopic(topic.id)}
            className="w-full text-left flex items-start gap-4 p-4 border-b border-[#0A0A0A]/10 hover:bg-[#0A0A0A]/[0.02] transition-colors group focus:outline-none"
          >
            <div className="mt-1 flex-shrink-0 relative">
              <div 
                className={cn(
                  "w-[18px] h-[18px] border border-[#0A0A0A] transition-colors duration-150 group-focus-visible:ring-2 group-focus-visible:ring-[#3D5AFE] group-focus-visible:ring-offset-2",
                  isChecked ? "bg-[#C6FF3F]" : "bg-transparent"
                )}
              >
                {isChecked && (
                  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#0A0A0A]">
                    <path d="M3 7.5L5.5 10L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" className="animate-[draw_150ms_ease-out_forwards]" style={{ strokeDasharray: 20, strokeDashoffset: 20 }} />
                  </svg>
                )}
              </div>
            </div>
            <span 
              className={cn(
                "font-sans text-base md:text-lg leading-snug transition-colors duration-150",
                isChecked ? "text-[#0A0A0A]/45" : "text-[#0A0A0A]"
              )}
            >
              {topic.label}
            </span>
          </button>
        );
      })}
    </>
  );
}
