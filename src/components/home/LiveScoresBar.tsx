"use client"

import React, { useMemo, useRef } from "react"
import Link from "next/link"
import MatchCard from "../scores/MatchCard"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"
import { useGetFixturesQuery } from "@/redux/features/statistics/statistics.api"

const mapFixtureToMatchResult = (fixture: any) => {
  const statusLower = fixture.status?.toLowerCase() || ""
  let mappedStatus: "live" | "ft" | "upcoming" = "upcoming"
  if (["ft", "aet", "pen"].includes(statusLower)) {
    mappedStatus = "ft"
  } else if (["live", "inplay", "ht", "1h", "2h", "et"].includes(statusLower)) {
    mappedStatus = "live"
  }

  return {
    id: String(fixture.id),
    homeTeam: fixture.home_team,
    awayTeam: fixture.away_team,
    homeScore: fixture.home_score,
    awayScore: fixture.away_score,
    status: mappedStatus,
    minute: mappedStatus === "live" ? 45 : undefined,
    league: fixture.league,
    matchDate: fixture.starting_at,
    homeTeamLogo: fixture.home_team_logo,
    awayTeamLogo: fixture.away_team_logo
  }
}

const LiveScoresBar: React.FC = () => {
  const { lang } = useTranslation()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Fetch fixtures dynamically from backend
  const { data: fixturesResponse, isLoading } = useGetFixturesQuery({ page_size: 100 })

  const matchResults = useMemo(() => {
    if (!fixturesResponse?.results) return []
    return fixturesResponse.results.map(mapFixtureToMatchResult)
  }, [fixturesResponse])

  // Scroll function for left/right buttons
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      })
    }
  }

  // Click card to scroll to center
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    })
  }

  return (
    <div className="bg-neutral-100 border-y border-neutral-200 select-none py-3 shadow-inner min-h-[135px] w-full relative group overflow-hidden">
      <div className="w-full relative px-4">
        
        {isLoading ? (
          <div className="flex items-center justify-center py-4 w-full gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-brand-red" />
            <span className="text-xs text-neutral-500 font-semibold">
              {lang === "it" ? "Caricamento partite live..." : "Loading live scores..."}
            </span>
          </div>
        ) : (
          <>
            {/* Left Scroll Button */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-neutral-50 text-neutral-700 hover:text-brand-red border border-neutral-200 rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer hidden md:flex items-center justify-center"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Horizontal scroll track */}
            <div
              ref={scrollContainerRef}
              className="flex items-center gap-4 overflow-x-auto custom-scrollbar pb-2 w-full flex-nowrap scroll-smooth px-6 md:px-8"
            >
              {matchResults.map((match) => (
                <div
                  key={match.id}
                  onClick={handleCardClick}
                  className="cursor-pointer transition-transform duration-200 hover:scale-[1.02] shrink-0"
                >
                  <MatchCard match={match} />
                </div>
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

            {/* Right Scroll Button */}
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-neutral-50 text-neutral-700 hover:text-brand-red border border-neutral-200 rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer hidden md:flex items-center justify-center"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

      </div>
    </div>
  )
}

export default LiveScoresBar
