"use client"
import React from "react"
import Link from "next/link"
import { getLocalMatchResults } from "@/lib/localizer"
import MatchCard from "../scores/MatchCard"
import { ChevronRight } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"

const LiveScoresBar: React.FC = () => {
  const { t, lang } = useTranslation()
  const matchResults = getLocalMatchResults(lang)

  return (
    <div className="bg-neutral-100 border-y border-neutral-200 select-none py-3 shadow-inner">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between gap-4">
        
        {/* Horizontal scroll track */}
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar md:custom-scrollbar pb-2 w-full">
          {matchResults.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}

          {/* View All Card at the end */}
          <Link
            href={`/${lang}/soccer-results`}
            className="min-w-[150px] h-[110px] bg-white border border-neutral-200 rounded-xl hover:border-brand-red transition-colors flex flex-col items-center justify-center text-center p-3 text-brand-dark group shrink-0"
          >
            <span className="text-xs font-bold uppercase tracking-wider group-hover:text-brand-red">
              {lang === "it" ? "Vedi Tutti" : "View All Results"}
            </span>
            <ChevronRight className="h-5 w-5 text-neutral-400 mt-1 group-hover:translate-x-1 group-hover:text-brand-red transition-all" />
          </Link>
        </div>

      </div>
    </div>
  )
}

export default LiveScoresBar
