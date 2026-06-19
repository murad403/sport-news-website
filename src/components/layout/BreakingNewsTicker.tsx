"use client"

import React from "react"
import { useTranslation } from "@/lib/useTranslation"

const BreakingNewsTicker: React.FC = () => {
  const { t } = useTranslation()
  const headlines = t.common.headlines || []

  return (
    <div className="bg-brand-red h-10 w-full flex items-center overflow-hidden border-b border-black/10 select-none relative z-10 shadow-inner">
      {/* Label Box */}
      <div className="bg-brand-dark text-white font-headline text-sm font-extrabold uppercase px-4 md:px-6 h-full flex items-center gap-1.5 z-20 shadow-[4px_0_12px_rgba(0,0,0,0.3)] shrink-0">
        <span className="inline-block h-2 w-2 rounded-full bg-brand-red animate-pulse" />
        {t.common.breaking}
      </div>

      {/* Marquee Container */}
      <div className="relative w-full h-full flex items-center overflow-hidden">
        <div className="absolute flex whitespace-nowrap items-center gap-12 text-white text-xs md:text-sm font-semibold animate-ticker hover:[animation-play-state:paused] cursor-pointer duration-3000">
          {headlines.map((headline, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span>{headline}</span>
              <span className="text-brand-dark opacity-50 font-bold">•</span>
            </div>
          ))}
          {/* Duplicate for seamless scrolling loop */}
          {headlines.map((headline, idx) => (
            <div key={`dup-${idx}`} className="flex items-center gap-2">
              <span>{headline}</span>
              <span className="text-brand-dark opacity-50 font-bold">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BreakingNewsTicker
