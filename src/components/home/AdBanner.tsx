import React from "react"

export interface AdBannerProps {
  className?: string
}

const AdBanner: React.FC<AdBannerProps> = ({ className }) => {
  return (
    <div className="w-full my-8 bg-neutral-100 border border-neutral-200 rounded-xl p-4 flex flex-col items-center justify-center text-center h-[120px] select-none shadow-sm">
      <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider mb-2">
        Advertisement
      </span>
      <div className="w-[728px] max-w-full h-[90px] bg-neutral-200 border border-neutral-300 rounded flex items-center justify-center text-sm font-semibold text-neutral-500">
        728 x 90 Leaderboard Banner Place
      </div>
    </div>
  )
}

export default AdBanner
