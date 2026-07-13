"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { chapters, blocks } from "@/content/roadmap";
import { useProgress } from "./ProgressProvider";
import { ChapterCard } from "./ChapterCard";
import { Sticker } from "./Sticker";
import { cn } from "@/lib/utils";

function CurrentChapterNode() {
  return (
    <div className="relative flex items-center justify-center w-3 h-3">
      {/* Glow Blue 2px ring */}
      <div className="absolute inset-[-4px] rounded-full border-2 border-[#3D5AFE]" />
      {/* Actual Dot */}
      <div className="relative w-3 h-3 rounded-full bg-[#F3F1EA] border-2 border-[#0A0A0A] z-10" />
      {/* YOU ARE HERE chip */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-widest text-[#0A0A0A] whitespace-nowrap bg-[#F3F1EA] border border-[#0A0A0A] px-1.5 py-0.5 shadow-[2px_2px_0_#0A0A0A] z-20">
        YOU ARE HERE
      </div>
    </div>
  );
}

function SpineNode({ chapterNumber }: { chapterNumber: number }) {
  const { currentChapterNode, getChapterPercent, mounted } = useProgress();
  
  // Need to wait for mounted to avoid hydration mismatch on progress values
  if (!mounted) {
    return <div className="w-3 h-3 rounded-full bg-[#F3F1EA] border-2 border-[#0A0A0A] z-10 relative" />;
  }

  const isCurrent = currentChapterNode === chapterNumber;
  
  // In the real prompt, slug is needed to get percent.
  const chapter = chapters.find(c => c.number === chapterNumber);
  const percent = chapter ? getChapterPercent(chapter.slug) : 0;
  const isComplete = percent === 100;

  if (isCurrent) {
    return <CurrentChapterNode />;
  }

  return (
    <div 
      className={cn(
        "w-3 h-3 rounded-full border-2 border-[#0A0A0A] z-10 relative transition-colors duration-300",
        isComplete ? "bg-[#C6FF3F]" : "bg-[#F3F1EA]"
      )} 
    />
  );
}

export function Spine() {
  const { overallPercent, mounted, currentChapterNode } = useProgress();
  const shouldReduceMotion = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [fillHeight, setFillHeight] = useState(0);
  const [expandedBlocks, setExpandedBlocks] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const updateLine = () => {
      if (!containerRef.current) return;
      if (overallPercent === 100) {
        setFillHeight(containerRef.current.scrollHeight);
      } else if (overallPercent === 0 || !currentChapterNode) {
        setFillHeight(0);
      } else {
        let targetEl = document.getElementById(`spine-node-${currentChapterNode}`);
        if (!targetEl) {
          const chapter = chapters.find((c) => c.number === currentChapterNode);
          if (chapter) {
            targetEl = document.getElementById(`spine-block-${chapter.block}`);
          }
        }
        if (targetEl) {
          const containerRect = containerRef.current.getBoundingClientRect();
          const targetRect = targetEl.getBoundingClientRect();
          // We want the line to end at the center of the target element
          setFillHeight(targetRect.top - containerRect.top + targetRect.height / 2);
        }
      }
    };

    const ro = new ResizeObserver(updateLine);
    ro.observe(containerRef.current);
    window.addEventListener("resize", updateLine);
    updateLine();

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateLine);
    };
  }, [mounted, overallPercent, currentChapterNode, expandedBlocks]);

  useEffect(() => {
    const handleJump = (e: CustomEvent) => {
      const { blockId, chapterId } = e.detail;
      if (blockId) {
        setExpandedBlocks(prev => ({ ...prev, [blockId]: true }));
        setTimeout(() => {
          const el = document.getElementById(chapterId || `block-${blockId}`);
          if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 100);
      }
    };
    window.addEventListener('jump-to-section', handleJump as EventListener);
    return () => window.removeEventListener('jump-to-section', handleJump as EventListener);
  }, []);

  const toggleBlock = (id: number) => {
    setExpandedBlocks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const showStartHere = mounted && overallPercent === 0;

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 relative pb-24" ref={containerRef}>
      {/* The Rail */}
      <div className="absolute left-[48px] lg:left-[72px] top-0 bottom-0 w-[2px] bg-[#0A0A0A]" />
      
      {/* The Fill */}
      <div className="absolute left-[48px] lg:left-[72px] top-0 bottom-0 w-[2px] flex flex-col justify-start overflow-hidden">
        <motion.div 
          className="w-full bg-[#C6FF3F] origin-top"
          initial={{ height: 0 }}
          animate={{ height: fillHeight }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-20 pt-12">
        {/* Blocks 0 to 5 */}
        {blocks.map((block) => {
          const blockChapters = chapters.filter((c) => c.block === block.id);
          const isExpanded = expandedBlocks[block.id];

          return (
            <div key={block.id} className="mb-24 lg:mb-32" id={`block-${block.id}`}>
              {/* Block Header */}
              <div 
                className="flex flex-row items-start mb-12 cursor-pointer group"
                onClick={() => toggleBlock(block.id)}
                id={`spine-block-${block.id}`}
              >
                <div className="w-12 shrink-0 flex items-center justify-center pt-2 lg:pt-3">
                  <div className="w-6 h-6 border-2 border-[#0A0A0A] flex items-center justify-center bg-[#FFFFFF] group-hover:bg-[#C6FF3F] group-hover:-translate-y-0.5 transition-all shadow-[2px_2px_0_#0A0A0A]">
                    <span className="font-mono text-base leading-none relative top-[1px]">{isExpanded ? '-' : '+'}</span>
                  </div>
                </div>
                <div className="flex-grow pl-4 lg:pl-12 relative">
                  <div className="font-mono text-xs uppercase tracking-widest text-[#0A0A0A] mb-2 group-hover:text-[#3D5AFE] transition-colors">
                    BLOCK {block.id.toString().padStart(2, '0')}
                  </div>
                  <h2 className="font-display text-4xl lg:text-6xl text-[#0A0A0A] uppercase tracking-[-0.01em] leading-[0.85] mb-4 group-hover:text-[#3D5AFE] transition-colors">
                    {block.title}
                  </h2>
                  <p className="font-sans text-base lg:text-lg text-[#0A0A0A] max-w-[70ch]">
                    {block.goal}
                  </p>
                </div>
              </div>

              {/* Block Chapters */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div 
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto", marginTop: 64 },
                      collapsed: { opacity: 0, height: 0, marginTop: 0 }
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-12 lg:gap-16 pb-4">
                      {blockChapters.map((ch) => (
                        <div key={ch.number} className="flex flex-row items-start" id={`chapter-${ch.number}`}>
                          {/* Node Column */}
                          <div className="w-12 shrink-0 flex flex-col items-center pt-8" id={`spine-node-${ch.number}`}>
                            <SpineNode chapterNumber={ch.number} />
                          </div>
                          
                          {/* Content Column */}
                          <div className="flex-grow pl-4 lg:pl-12 lg:w-10/12">
                            <div className="relative w-full max-w-md lg:max-w-none lg:w-2/3">
                              <ChapterCard chapter={ch} />
                              {ch.number === 1 && showStartHere && (
                                <div className="absolute -right-4 -bottom-4 lg:-right-8 lg:-bottom-6 z-30">
                                  <Sticker type="START HERE →" />
                                </div>
                              )}
                              
                              {ch.number === 1 && (
                                <div className="mt-12 flex flex-col gap-12">
                                  {/* How to Use */}
                                  <div>
                                    <h3 className="font-display text-2xl md:text-3xl text-[#0A0A0A] uppercase tracking-[-0.01em] mb-6">
                                      HOW TO USE
                                    </h3>
                                    <div className="flex flex-col gap-6 font-sans text-sm md:text-base text-[#0A0A0A]/80">
                                      <div className="flex gap-4 items-start">
                                        <div className="font-mono text-sm mt-1 shrink-0">[01]</div>
                                        <div><strong className="text-[#0A0A0A] font-medium">READ</strong> — every chapter is live in full right now; the video companion lands periodically as the roadmap progresses.</div>
                                      </div>
                                      <div className="flex gap-4 items-start">
                                        <div className="font-mono text-sm mt-1 shrink-0">[02]</div>
                                        <div><strong className="text-[#0A0A0A] font-medium">BUILD</strong> — every chapter ends in an on-screen build; do it, don't just read it.</div>
                                      </div>
                                      <div className="flex gap-4 items-start">
                                        <div className="font-mono text-sm mt-1 shrink-0">[03]</div>
                                        <div><strong className="text-[#0A0A0A] font-medium">CHECK IT OFF</strong> — tick a topic when you can explain it out loud; progress saves in this browser.</div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Already on channel */}
                                  <div>
                                    <h3 className="font-display text-2xl md:text-3xl text-[#0A0A0A] uppercase tracking-[-0.01em] mb-6">
                                      ALREADY ON THE CHANNEL
                                    </h3>
                                    <div className="flex flex-col gap-3 font-mono text-xs uppercase tracking-widest text-[#0A0A0A]">
                                      {[
                                        { title: "What is an AI Engineer — roles & responsibilities", url: "#" },
                                        { title: "AI Engineer vs ML Engineer", url: "#" },
                                        { title: "Interview experience — what companies actually ask", url: "#" }
                                      ].map((vid, i) => (
                                        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 bg-[#FFFFFF] border border-[#0A0A0A]">
                                          <span className="truncate">{vid.title}</span>
                                          <a href={vid.url} className="shrink-0 text-[#3D5AFE] hover:underline">WATCH ↗</a>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="mt-4 font-mono text-[10px] uppercase text-[#0A0A0A]/50 tracking-widest">
                                      REFERENCED THROUGHOUT THE ROADMAP — NOT REPEATED IN IT.
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
