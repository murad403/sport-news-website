"use client"

import React, { useState, useMemo } from "react"
import { mockMatchResults } from "@/lib/mockData"
import ScoreWidget from "@/components/scores/ScoreWidget"
import Button from "@/components/ui/Button"
import { Calendar, Filter, Award } from "lucide-react"

const leagues = [
  "All Leagues",
  "Premier League",
  "La Liga",
  "Serie A",
  "Bundesliga",
  "Champions League",
  "Ligue 1"
]

export default function SoccerResultsPage() {
  const [activeDateTab, setActiveDateTab] = useState<"today" | "yesterday" | "week">("today")
  const [selectedLeague, setSelectedLeague] = useState("All Leagues")
  const [visibleCount, setVisibleCount] = useState(6)

  // Filter match results based on tabs
  const filteredMatches = useMemo(() => {
    return mockMatchResults.filter((match) => {
      // 1. League Filter
      if (selectedLeague !== "All Leagues" && match.league !== selectedLeague) {
        return false
      }

      // 2. Date Filter (Mock logic based on status and dates in mockData)
      const date = new Date(match.matchDate)
      const day = date.getUTCDate()

      if (activeDateTab === "today") {
        // Today is June 18, 2026 (based on timestamp in mockData)
        return day === 18
      } else if (activeDateTab === "yesterday") {
        return day === 17
      } else {
        // This Week
        return true
      }
    })
  }, [activeDateTab, selectedLeague])

  // Group filtered results by league
  const groupedMatches = useMemo(() => {
    const groups: Record<string, typeof filteredMatches> = {}
    filteredMatches.forEach((match) => {
      if (!groups[match.league]) {
        groups[match.league] = []
      }
      groups[match.league].push(match)
    })
    return groups
  }, [filteredMatches])

  const hasMore = filteredMatches.length > visibleCount

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4)
  }

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      
      {/* Page Header */}
      <div>
        <h1 className="font-headline text-3xl md:text-5xl font-extrabold uppercase text-brand-dark flex items-center gap-2">
          ⚽ Soccer Match Center
        </h1>
        <p className="text-xs md:text-sm text-neutral-500 font-semibold">
          Real-time score updates, recent results, and upcoming match fixtures.
        </p>
      </div>

      {/* Date Filter Tabs */}
      <div className="flex bg-neutral-100 p-1 rounded-xl w-full max-w-md border border-neutral-200">
        <button
          onClick={() => {
            setActiveDateTab("today")
            setVisibleCount(6)
          }}
          className={`flex-1 py-2 text-center text-xs md:text-sm font-bold uppercase rounded-lg transition-all cursor-pointer ${
            activeDateTab === "today"
              ? "bg-white text-brand-dark shadow-sm"
              : "text-neutral-500 hover:text-brand-dark"
          }`}
        >
          Today (Jun 18)
        </button>
        <button
          onClick={() => {
            setActiveDateTab("yesterday")
            setVisibleCount(6)
          }}
          className={`flex-1 py-2 text-center text-xs md:text-sm font-bold uppercase rounded-lg transition-all cursor-pointer ${
            activeDateTab === "yesterday"
              ? "bg-white text-brand-dark shadow-sm"
              : "text-neutral-500 hover:text-brand-dark"
          }`}
        >
          Yesterday (Jun 17)
        </button>
        <button
          onClick={() => {
            setActiveDateTab("week")
            setVisibleCount(6)
          }}
          className={`flex-1 py-2 text-center text-xs md:text-sm font-bold uppercase rounded-lg transition-all cursor-pointer ${
            activeDateTab === "week"
              ? "bg-white text-brand-dark shadow-sm"
              : "text-neutral-500 hover:text-brand-dark"
          }`}
        >
          This Week
        </button>
      </div>

      {/* League Filters */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-neutral-200">
        <span className="text-neutral-400 shrink-0">
          <Filter className="h-4 w-4" />
        </span>
        {leagues.map((league) => (
          <button
            key={league}
            onClick={() => {
              setSelectedLeague(league)
              setVisibleCount(6)
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase whitespace-nowrap transition-colors cursor-pointer border ${
              selectedLeague === league
                ? "bg-brand-red text-white border-brand-red"
                : "bg-white text-neutral-600 border-neutral-250 hover:bg-neutral-50"
            }`}
          >
            {league}
          </button>
        ))}
      </div>

      {/* Grouped Match Results List */}
      {Object.keys(groupedMatches).length > 0 ? (
        <div className="flex flex-col gap-8">
          {Object.entries(groupedMatches).map(([leagueName, matches]) => (
            <div key={leagueName} className="flex flex-col gap-3">
              {/* League Header */}
              <div className="flex items-center gap-2 border-b border-neutral-200 pb-2 mb-1">
                <Award className="h-5 w-5 text-brand-red" />
                <h2 className="font-headline text-xl font-bold uppercase tracking-wide text-brand-dark">
                  {leagueName}
                </h2>
                <span className="text-[10px] text-neutral-400 font-bold bg-neutral-100 px-2 py-0.5 rounded">
                  {matches.length} {matches.length === 1 ? "Match" : "Matches"}
                </span>
              </div>

              {/* Match Score Rows */}
              <div className="flex flex-col gap-3">
                {matches.slice(0, visibleCount).map((match) => (
                  <ScoreWidget key={match.id} match={match} />
                ))}
              </div>
            </div>
          ))}

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center mt-4 select-none">
              <Button onClick={handleLoadMore} variant="outline" className="px-8 font-semibold">
                Load More Matches
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded-xl p-12 text-center text-neutral-500">
          No matches found for the selected filters.
        </div>
      )}

    </div>
  )
}
