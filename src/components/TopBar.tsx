import React from "react";
import Link from "next/link";
import Image from "next/image";

interface TopBarProps {
  variant?: "default" | "chapter";
}

export function TopBar({ variant = "default" }: TopBarProps) {
  return (
    <div className="w-full bg-[#0A0A0A] text-[#FFFFFF]">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-3">
          <div className="bg-[#FFFFFF] text-[#0A0A0A] font-bold font-sans px-2 py-1 text-[13px] rounded-sm tracking-tight leading-none flex items-center justify-center">
            BHM
          </div>
          <span className="font-sans text-[11px] font-bold tracking-widest text-[#FFFFFF]/40 uppercase">
            A BEHUMOURY PRODUCT
          </span>
        </Link>

        <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-[#FFFFFF]">
          {variant === "chapter" ? (
            <Link href="/" className="hover:text-[#3D5AFE] transition-colors">
              ALL CHAPTERS
            </Link>
          ) : (
            <>
              <Link href="https://www.youtube.com/@behumoury" target="_blank" rel="noopener noreferrer" className="hover:text-[#3D5AFE] transition-colors">
                YOUTUBE ↗
              </Link>
              <span className="text-[#FFFFFF]/30">·</span>
              <Link href="https://behumoury.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#3D5AFE] transition-colors">
                MORE ABOUT BHM ↗
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
