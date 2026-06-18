import React from "react"
import { cn } from "@/lib/utils"

export interface LiveBadgeProps {
  className?: string
}

const LiveBadge: React.FC<LiveBadgeProps> = ({ className }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-brand-red text-white text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-sm",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
      </span>
      LIVE
    </span>
  )
}

export default LiveBadge
