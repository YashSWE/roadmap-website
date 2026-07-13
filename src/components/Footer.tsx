"use client";
import React from "react";
import Link from "next/link";
import { useProgress } from "./ProgressProvider";

export function Footer() {
  const { resetGlobal } = useProgress();

  return (
    <footer className="w-full bg-[#0A0A0A] text-[#FFFFFF] py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between gap-12">
        
        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 font-mono text-xs uppercase tracking-widest">
          <Link href="https://youtube.com/@behumoury" target="_blank" rel="noopener noreferrer" className="hover:text-[#3D5AFE] hover:drop-shadow-[0_0_8px_#3D5AFE] transition-all">
            YOUTUBE ↗
          </Link>
          <Link href="https://instagram.com/behumoury" target="_blank" rel="noopener noreferrer" className="hover:text-[#3D5AFE] hover:drop-shadow-[0_0_8px_#3D5AFE] transition-all">
            INSTAGRAM ↗
          </Link>
          <Link href="https://github.com/YashSWE" target="_blank" rel="noopener noreferrer" className="hover:text-[#3D5AFE] hover:drop-shadow-[0_0_8px_#3D5AFE] transition-all">
            GITHUB ↗
          </Link>
          <Link href="https://behumoury.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#3D5AFE] hover:drop-shadow-[0_0_8px_#3D5AFE] transition-all">
            PORTFOLIO ↗
          </Link>
        </div>

        {/* Fine Print */}
        <div className="flex flex-col items-start md:items-end gap-4 max-w-sm">
          <div className="font-mono text-xs uppercase tracking-widest text-[#FFFFFF]/50">
            BHM © '26 · MADE IN PUNE, IN
          </div>
          <p className="font-sans text-sm text-[#FFFFFF]/70 md:text-right">
            No email walls. No course upsell. If this helped, subscribing is the thank-you.
          </p>
          <button 
            onClick={resetGlobal}
            className="font-mono text-[11px] uppercase tracking-widest text-[#FF3D8A] hover:text-[#FFFFFF] transition-colors mt-2"
          >
            RESET PROGRESS
          </button>
        </div>
      </div>
    </footer>
  );
}
