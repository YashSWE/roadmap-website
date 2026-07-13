"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { Sticker } from "@/components/Sticker";
import { Spine } from "@/components/Spine";
import { useProgress } from "@/components/ProgressProvider";
import { chapters, blocks } from "@/content/roadmap";
import { Minimap } from "@/components/Minimap";
function HeroContent() {
  const { mounted, currentChapterNode, overallPercent } = useProgress();

  let buttonText = "START CH. 01 →";
  let buttonHref = "/start";

  if (mounted) {
    if (overallPercent === 100) {
      buttonText = "ROADMAP COMPLETE ✓";
    } else if (currentChapterNode) {
      const currentChapter = chapters.find((c) => c.number === currentChapterNode);
      if (currentChapter) {
        buttonHref = `/${currentChapter.slug}`;
        if (overallPercent > 0) {
          buttonText = `RESUME CH. ${currentChapter.number.toString().padStart(2, "0")} →`;
        }
      }
    }
  }

  return (
    <div className="flex flex-col w-full min-h-full h-full relative z-20 pointer-events-none">
      <div className="pointer-events-auto w-full">
        <TopBar />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-16 pb-24 lg:pt-24 lg:pb-32 flex-grow relative z-10 w-full pointer-events-none">
        {/* Topline */}
        <div className="font-mono text-sm md:text-base uppercase tracking-widest text-[#FFFFFF]/70 mb-6">
          [BHM] — THE BEHUMOURY ROADMAP / AI ENGINEERING · 2026
        </div>

        {/* Headline */}
        <div className="relative inline-block mb-6">
          <h1 className="font-display text-[64px] leading-[0.85] md:text-[88px] lg:text-[112px] uppercase tracking-[-0.02em]">
            <span className="block text-[#FFFFFF]">12 CHAPTERS TO</span>
            <span
              className="block text-transparent"
              style={{ WebkitTextStroke: "1.5px #FFFFFF" }}
            >
              AI ENGINEER.
            </span>
          </h1>
          <div className="absolute -top-4 -right-4 lg:-top-6 lg:-right-8 pointer-events-auto">
            <Sticker type="INTERVIEW-TESTED" />
          </div>
        </div>

        {/* Subtitle */}
        <div className="mb-10 flex flex-col gap-1">

          <div className="font-mono text-sm uppercase tracking-widest text-[#FFFFFF]/70">
            By Yash Bhandari
          </div>
        </div>

        {/* Body */}
        <p className="font-sans text-lg md:text-xl text-[#FFFFFF]/80 max-w-[60ch] mb-10 leading-relaxed">
          The full application layer across 5 blocks. 12 chapters. Every chapter maps to a real interview question or something I use on the job. Videos drop periodically as the roadmap progresses. You can follow along or you can start now with the free resources online.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 font-mono text-sm uppercase tracking-widest pointer-events-auto">
          <Link
            href={buttonHref}
            className="inline-flex items-center justify-center bg-[#C6FF3F] text-[#0A0A0A] px-6 py-4 hover:brightness-110 transition-all border border-[#0A0A0A] shadow-[4px_4px_0_#0A0A0A] active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            {buttonText}
          </Link>
          <Link
            href="https://www.youtube.com/@behumoury"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-transparent text-[#FFFFFF] px-6 py-4 border border-[#FFFFFF] hover:bg-[#FFFFFF]/10 transition-colors"
          >
            WATCH ON YOUTUBE ↗
          </Link>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const el = heroRef.current;
    if (!el) return;

    let rafId: number;
    let targetX = window.innerWidth / 2;
    let targetY = 200;
    let currentX = targetX;
    let currentY = targetY;
    let lastMoveTime = Date.now();

    const onPointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      lastMoveTime = Date.now();
    };

    const animate = () => {
      const now = Date.now();
      // If idle for >2s, drift
      if (now - lastMoveTime > 2000) {
        const t = now * 0.0005; // speed
        const rect = el.getBoundingClientRect();
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = rect.width * 0.3;
        const ry = rect.height * 0.3;
        targetX = cx + Math.cos(t) * rx;
        targetY = cy + Math.sin(t * 0.8) * ry;
      }

      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      el.style.setProperty("--mx", `${currentX}px`);
      el.style.setProperty("--my", `${currentY}px`);

      rafId = requestAnimationFrame(animate);
    };

    el.addEventListener("pointermove", onPointerMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      el.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const bhmPatternDark = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Ctext x='15' y='50' font-family='Arial, sans-serif' font-weight='900' font-size='32' fill='rgba(255,255,255,0.05)'%3EBHM%3C/text%3E%3Ctext x='75' y='110' font-family='Arial, sans-serif' font-weight='900' font-size='32' fill='rgba(255,255,255,0.05)'%3EBHM%3C/text%3E%3C/svg%3E")`;

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden flex flex-col bg-[#0A0A0A]"
      style={{ backgroundImage: bhmPatternDark }}
    >
      {/* TOP LAYER: Ink background + Masked Hole */}
      <div
        className="hero-top-layer absolute inset-0 bg-[#0A0A0A] pointer-events-none transition-[mask-image] z-10"
        style={{
          "--reveal-radius": "240px",
          maskImage: mounted ? "radial-gradient(circle var(--reveal-radius) at var(--mx, 50%) var(--my, 50%), transparent 99%, black 100%)" : "none",
          WebkitMaskImage: mounted ? "radial-gradient(circle var(--reveal-radius) at var(--mx, 50%) var(--my, 50%), transparent 99%, black 100%)" : "none",
        } as React.CSSProperties}
      />

      {/* Decoupled Content Layer */}
      <HeroContent />

      {/* Marquee */}
      <div className="w-full border-t border-[#0A0A0A] py-3 overflow-hidden bg-[#C6FF3F] relative z-20">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="font-mono text-xs uppercase tracking-widest text-[#0A0A0A] mr-8 flex-shrink-0">
              LEARN THE JOB, NOT THE HYPE ·
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @media (max-width: 1024px) {
          .hero-top-layer {
            --reveal-radius: 160px !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-top-layer {
            --mx: 90% !important;
            --my: 10% !important;
          }
          .animate-marquee {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  );
}

function ProgressModule() {
  const { overallPercent, mounted, checkedTopics } = useProgress();

  if (!mounted) return null; // or a skeleton

  const totalTopics = chapters.reduce((sum, ch) => sum + ch.groups.reduce((gSum, g) => gSum + g.topics.length, 0), 0);
  const checkedCount = checkedTopics.length;
  const isComplete = overallPercent === 100;

  // Desktop Timeline Calculations
  const nodeProgress = blocks.map(block => {
    const blockChapters = chapters.filter(c => c.block === block.id);
    const blockTopics = blockChapters.flatMap(c => c.groups.flatMap(g => g.topics));
    const blockTotal = blockTopics.length;
    const blockChecked = blockTopics.filter(t => checkedTopics.includes(t.id)).length;
    const percent = blockTotal === 0 ? 0 : blockChecked / blockTotal;
    return { ...block, percent, isComplete: blockTotal > 0 && blockChecked === blockTotal };
  });

  let visualFillPercent = 0;
  const segmentWidth = 100 / blocks.length; // 20% for 5 blocks

  for (let i = 0; i < nodeProgress.length; i++) {
    const node = nodeProgress[i];
    if (node.isComplete) {
      visualFillPercent += segmentWidth;
    } else {
      visualFillPercent += node.percent * segmentWidth;
      break;
    }
  }

  const timelineNodes = [
    ...blocks.map(b => ({ ...b, isEndNode: false })),
    { id: 'done', title: "Job Ready", isEndNode: true }
  ];

  return (
    <section className="w-full bg-[#F3F1EA] py-16 lg:py-24 border-b border-[#0A0A0A]/10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center">

        {/* State specific label */}
        <div className="font-mono text-xs uppercase tracking-widest text-[#0A0A0A]/60 mb-6">
          {checkedCount === 0
            ? "NOTHING CHECKED YET — THAT'S THE POINT. START BELOW."
            : isComplete
              ? "ROADMAP COMPLETE — GO GET THE JOB."
              : "YOUR PROGRESS — SAVED IN THIS BROWSER"}
        </div>

        {/* Big Percentage */}
        <div className="font-display text-[80px] md:text-[120px] leading-[0.8] text-[#0A0A0A] tracking-[-0.02em] mb-4 relative z-10">
          {overallPercent}%
          {isComplete && (
            <div className="absolute -top-4 -right-16 md:-right-20">
              <Sticker type="DONE ✓" rotation={8} />
            </div>
          )}
        </div>

        {/* Count */}
        <div className="font-mono text-sm uppercase tracking-widest text-[#0A0A0A] mb-8 lg:mb-12">
          {checkedCount}/{totalTopics} TOPICS
        </div>

        {/* Mobile Progress Bar (hidden on md+) */}
        <div className="w-full max-w-2xl h-2 bg-[#0A0A0A] mb-6 relative md:hidden">
          <div
            className="absolute top-0 left-0 h-full bg-[#C6FF3F] transition-all duration-300 ease-out"
            style={{ width: `${overallPercent}%` }}
          />
          <div className="absolute inset-0 flex justify-between px-[20%] opacity-20 pointer-events-none">
            <div className="w-[1px] h-full bg-[#F3F1EA]" />
            <div className="w-[1px] h-full bg-[#F3F1EA]" />
            <div className="w-[1px] h-full bg-[#F3F1EA]" />
            <div className="w-[1px] h-full bg-[#F3F1EA]" />
          </div>
        </div>

        {/* Desktop Timeline (hidden on mobile) */}
        <div className="hidden md:block relative w-[calc(100%-120px)] max-w-4xl mx-auto h-[200px] mt-4">
          {/* Base line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#0A0A0A]/10 -translate-y-1/2" />

          {/* Fill line */}
          <div
            className="absolute top-1/2 left-0 h-[2px] bg-[#C6FF3F] -translate-y-1/2 transition-all duration-700 ease-out z-0"
            style={{ width: `${visualFillPercent}%` }}
          />

          {/* Nodes */}
          {timelineNodes.map((item, index) => {
            let isCircleFilled = false;

            if (item.isEndNode) {
              isCircleFilled = overallPercent === 100;
            } else {
              isCircleFilled = nodeProgress[index].isComplete;
            }

            const leftPos = `${index * segmentWidth}%`;
            const isTop = index % 2 === 0;

            return (
              <div
                key={item.id}
                className="absolute top-1/2 flex flex-col items-center z-10"
                style={{ left: leftPos, transform: 'translate(-50%, -50%)' }}
              >
                {/* The Dot */}
                <div
                  className={`relative w-4 h-4 rounded-full border-2 border-[#0A0A0A] transition-colors duration-500 delay-150 ${isCircleFilled ? 'bg-[#C6FF3F]' : 'bg-[#F3F1EA]'}`}
                />

                {/* Connecting Line & Text */}
                <div className={`absolute left-1/2 -translate-x-1/2 flex flex-col items-center ${isTop ? 'bottom-2' : 'top-2'}`}>
                  {isTop ? (
                    <>
                      <div className="flex flex-col items-center text-center w-[160px] pb-2">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#0A0A0A]/50 mb-1">
                          {item.isEndNode ? "FINISH" : `BLOCK ${item.id.toString().padStart(2, '0')}`}
                        </span>
                        <span className="font-sans text-sm font-medium text-[#0A0A0A] leading-snug">
                          {item.title}
                        </span>
                      </div>
                      <div className="w-[1px] h-6 bg-[#0A0A0A]/20" />
                    </>
                  ) : (
                    <>
                      <div className="w-[1px] h-6 bg-[#0A0A0A]/20" />
                      <div className="flex flex-col items-center text-center w-[160px] pt-2">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#0A0A0A]/50 mb-1">
                          {item.isEndNode ? "FINISH" : `BLOCK ${item.id.toString().padStart(2, '0')}`}
                        </span>
                        <span className="font-sans text-sm font-medium text-[#0A0A0A] leading-snug">
                          {item.title}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}



function CTABand() {
  return (
    <section className="w-full bg-[#0A0A0A] text-[#FFFFFF] py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10 flex flex-col items-center">
        <div className="relative inline-block mb-8">
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-[-0.01em] leading-[0.85]">
            THE VIDEOS DROP ON YOUTUBE.
          </h2>
          <div className="absolute -top-4 -left-4 md:-left-8">
            <Sticker type="100% FREE" rotation={-6} />
          </div>
        </div>

        <p className="font-sans text-lg md:text-xl text-[#FFFFFF]/80 max-w-[50ch] mb-10 leading-relaxed">
          The chapters are all here already. No email list; subscribing is the notification system.
        </p>

        <Link
          href="https://youtube.com/@behumoury?sub_confirmation=1"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-[#C6FF3F] text-[#0A0A0A] font-mono text-sm uppercase tracking-widest px-8 py-5 border border-[#0A0A0A] shadow-[4px_4px_0_#C6FF3F] hover:shadow-[2px_2px_0_#C6FF3F] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        >
          SUBSCRIBE ↗
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F3F1EA] w-full">
      <Hero />
      <ProgressModule />
      <Minimap />
      <Spine />
      <CTABand />
      <Footer />
    </main>
  );
}
