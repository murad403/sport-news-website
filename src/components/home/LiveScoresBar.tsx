"use client"

import React, { useMemo } from "react"
import Link from "next/link"
import MatchCard from "../scores/MatchCard"
import { ChevronRight, Loader2 } from "lucide-react"
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

  // Fetch fixtures dynamically from backend (request a large page size to show all data)
  const { data: fixturesResponse, isLoading } = useGetFixturesQuery({ page_size: 100 })

  // Map fixture structures to frontend MatchResult expected by MatchCard
  const matchResults = useMemo(() => {
    if (!fixturesResponse?.results) return []
    return fixturesResponse.results.map(mapFixtureToMatchResult)
  }, [fixturesResponse])

  return (
    <div className="bg-neutral-100 border-y border-neutral-200 select-none py-3 shadow-inner min-h-[135px] flex items-center w-full">
      <div className="w-full px-4 flex items-center justify-between gap-4">
        
        {isLoading ? (
          <div className="flex items-center justify-center py-4 w-full gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-brand-red" />
            <span className="text-xs text-neutral-500 font-semibold">
              {lang === "it" ? "Caricamento partite live..." : "Loading live scores..."}
            </span>
          </div>
        ) : (
          /* Horizontal scroll track */
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
        )}

      </div>
    </div>
  )
}

export default LiveScoresBar
