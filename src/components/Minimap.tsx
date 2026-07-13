"use client";

import React from "react";
import { blocks, chapters } from "@/content/roadmap";
import { useProgress } from "./ProgressProvider";

export function Minimap() {
  const { mounted } = useProgress();

  if (!mounted) return null;

  const scrollToSection = (id: string, blockId?: number) => {
    if (blockId !== undefined) {
      window.dispatchEvent(new CustomEvent('jump-to-section', { detail: { blockId, chapterId: id } }));
    } else {
      const el = document.getElementById(id);
      if (el) {
        // Offset for sticky headers if any, or just smooth scroll
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="w-full bg-[#F3F1EA] pt-8 pb-16 border-b border-[#0A0A0A]/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="font-mono text-xs uppercase tracking-widest text-[#0A0A0A]/60 mb-8 text-center">
          ROADMAP OVERVIEW — JUMP TO SECTION
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* Before You Start (Mobile: Top, Desktop: Side) */}
          <div className="w-full lg:w-1/3 order-1 lg:order-2">
            <h3 className="font-display text-2xl md:text-3xl text-[#0A0A0A] uppercase tracking-[-0.01em] mb-6">
              BEFORE YOU START
            </h3>
            <div className="bg-[#FFFFFF] border border-[#0A0A0A] p-6 shadow-[4px_4px_0_#0A0A0A]">
              <ul className="flex flex-col gap-4 font-mono text-xs uppercase tracking-widest text-[#0A0A0A]">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-[#C6FF3F] border border-[#0A0A0A]" />
                  Python (Intermediate)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-[#C6FF3F] border border-[#0A0A0A]" />
                  Basic frontend + backend fundamentals
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-[#C6FF3F] border border-[#0A0A0A]" />
                  General SDLC best practices
                </li>
              </ul>
              <p className="mt-6 font-sans text-sm text-[#0A0A0A]/70">
                Learn these simultaneously if you don't have them — they don't block the roadmap.
              </p>
            </div>
          </div>

          {/* Minimap Grid */}
          <div className="w-full lg:w-2/3 order-2 lg:order-1 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {blocks.map(block => {
              const blockChapters = chapters.filter(c => c.block === block.id);
              return (
                <div
                  key={block.id}
                  className="border border-[#0A0A0A] bg-[#FFFFFF] p-5 flex flex-col transition-all hover:border-[#0A0A0A]/50"
                >
                  <div
                    className="font-mono text-[10px] uppercase tracking-widest text-[#0A0A0A]/50 mb-2 cursor-pointer hover:text-[#0A0A0A] transition-colors"
                    onClick={() => scrollToSection(`block-${block.id}`, block.id)}
                  >
                    BLOCK {block.id.toString().padStart(2, '0')}
                  </div>
                  <div
                    className="font-display text-xl uppercase tracking-[-0.01em] mb-4 cursor-pointer hover:text-[#3D5AFE] transition-colors"
                    onClick={() => scrollToSection(`block-${block.id}`, block.id)}
                  >
                    {block.title}
                  </div>

                  <div className="flex flex-col gap-2.5 mt-auto pt-4 border-t border-[#0A0A0A]/10">
                    {blockChapters.map(ch => (
                      <div
                        key={ch.number}
                        onClick={() => scrollToSection(`chapter-${ch.number}`, block.id)}
                        className="text-xs font-sans text-[#0A0A0A]/70 hover:text-[#3D5AFE] cursor-pointer flex gap-3 items-start group"
                      >
                        <span className="font-mono opacity-50 shrink-0 group-hover:opacity-100 transition-opacity mt-0.5">
                          {ch.number.toString().padStart(2, '0')}
                        </span>
                        <span className="leading-snug">{ch.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
