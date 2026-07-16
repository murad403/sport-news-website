"use client"

import React, { useState, useMemo, useRef, useEffect } from "react"
import ScoreWidget from "@/components/scores/ScoreWidget"
import { Filter, Award, ChevronLeft, ChevronRight, Search, Loader2 } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"
import { useGetLeaguesQuery, useGetFixturesQuery } from "@/redux/features/statistics/statistics.api"
import { MatchResult } from "@/lib/types"
import CustomPagination from "@/components/shared/CustomPagination"

const PAGE_SIZE = 20

const formatDate = (date: Date): string => {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

const mapFixtureToMatchResult = (fixture: any): MatchResult => {
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

export default function SoccerResultsPage() {
  const { t, lang } = useTranslation()
  const isIt = lang === "it"

  const [activeDateTab, setActiveDateTab] = useState<"today" | "yesterday" | "all" | "custom">("all")
  const [customDate, setCustomDate] = useState("")
  const [selectedLeague, setSelectedLeague] = useState("All Leagues")
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)

  // References and state for horizontal scrolling
  const filterContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)

  const dateParam = useMemo(() => {
    if (activeDateTab === "today") {
      return formatDate(new Date())
    }
    if (activeDateTab === "yesterday") {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      return formatDate(yesterday)
    }
    if (activeDateTab === "custom" && customDate) {
      return customDate
    }
    return undefined // "all"
  }, [activeDateTab, customDate])

  const { data: leaguesResponse } = useGetLeaguesQuery({ page_size: 100 })
  const { data: fixturesResponse, isLoading: isFixturesLoading, isFetching: isFixturesFetching } = useGetFixturesQuery({
    page,
    date: dateParam,
    league: selectedLeague === "All Leagues" ? undefined : selectedLeague,
    search: searchTerm || undefined
  })

  // Leagues filters list mapped dynamically
  const leagues = useMemo(() => {
    const defaultLeagues = [
      { value: "All Leagues", label: isIt ? "Tutti i Campionati" : "All Leagues" }
    ]
    if (!leaguesResponse?.results) return defaultLeagues

    return [
      ...defaultLeagues,
      ...leaguesResponse.results.map((league) => ({
        value: league.name,
        label: league.name
      }))
    ]
  }, [leaguesResponse, isIt])

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    const container = filterContainerRef.current
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container
      setShowLeftArrow(scrollLeft > 5)
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5)
    }
  }

  useEffect(() => {
    const container = filterContainerRef.current
    if (container) {
      checkScroll()
      container.addEventListener("scroll", checkScroll)
      window.addEventListener("resize", checkScroll)
      
      const timer = setTimeout(checkScroll, 100)
      return () => {
        container.removeEventListener("scroll", checkScroll)
        window.removeEventListener("resize", checkScroll)
        clearTimeout(timer)
      }
    }
  }, [leagues])

  const scrollContainer = (direction: "left" | "right") => {
    const container = filterContainerRef.current
    if (container) {
      const scrollAmount = 200
      container.scrollTo({
        left: container.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount),
        behavior: "smooth"
      })
    }
  }

  const mappedMatches = useMemo(() => {
    if (!fixturesResponse?.results) return []
    return fixturesResponse.results.map(mapFixtureToMatchResult)
  }, [fixturesResponse])

  // Group matches by league
  const groupedMatches = useMemo(() => {
    const groups: Record<string, typeof mappedMatches> = {}
    mappedMatches.forEach((match) => {
      if (!groups[match.league]) {
        groups[match.league] = []
      }
      groups[match.league].push(match)
    })
    return groups
  }, [mappedMatches])

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      
      {/* Page Header */}
      <div>
        <h1 className="font-headline text-3xl md:text-5xl font-extrabold uppercase text-brand-dark flex items-center gap-2">
          ⚽ {isIt ? "Centro Partite Calcio" : "Soccer Match Center"}
        </h1>
        <p className="text-xs md:text-sm text-neutral-500 font-semibold">
          {t.soccerResults.subtitle}
        </p>
      </div>

      {/* Date Filters & Search Control Bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
        {/* Date Selector Tabs */}
        <div className="flex bg-neutral-100 p-1 rounded-xl w-full xl:max-w-md border border-neutral-200">
          <button
            onClick={() => {
              setActiveDateTab("all")
              setCustomDate("")
              setPage(1)
            }}
            className={`flex-1 py-2 text-center text-xs md:text-sm font-bold uppercase rounded-lg transition-all cursor-pointer ${
              activeDateTab === "all"
                ? "bg-white text-brand-dark shadow-xs"
                : "text-neutral-500 hover:text-brand-dark"
            }`}
          >
            {isIt ? "Tutti" : "All"}
          </button>
          <button
            onClick={() => {
              setActiveDateTab("today")
              setCustomDate("")
              setPage(1)
            }}
            className={`flex-1 py-2 text-center text-xs md:text-sm font-bold uppercase rounded-lg transition-all cursor-pointer ${
              activeDateTab === "today"
                ? "bg-white text-brand-dark shadow-xs"
                : "text-neutral-500 hover:text-brand-dark"
            }`}
          >
            {isIt ? "Oggi" : "Today"}
          </button>
          <button
            onClick={() => {
              setActiveDateTab("yesterday")
              setCustomDate("")
              setPage(1)
            }}
            className={`flex-1 py-2 text-center text-xs md:text-sm font-bold uppercase rounded-lg transition-all cursor-pointer ${
              activeDateTab === "yesterday"
                ? "bg-white text-brand-dark shadow-xs"
                : "text-neutral-500 hover:text-brand-dark"
            }`}
          >
            {isIt ? "Ieri" : "Yesterday"}
          </button>
        </div>

        {/* Custom Date Input */}
        <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-250 rounded-xl px-3 py-1.5 shadow-xs w-full xl:max-w-xs shrink-0 justify-between">
          <span className="text-neutral-400 text-xs font-bold shrink-0">{isIt ? "Data Personalizzata:" : "Custom Date:"}</span>
          <input
            type="date"
            value={customDate}
            onChange={(e) => {
              setCustomDate(e.target.value)
              setActiveDateTab("custom")
              setPage(1)
            }}
            className="text-xs font-bold text-neutral-750 bg-transparent outline-hidden cursor-pointer"
          />
        </div>

        {/* Search Input */}
        <div className="relative w-full xl:max-w-xs">
          <input
            type="text"
            placeholder={isIt ? "Cerca squadre..." : "Search teams..."}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setPage(1)
            }}
            className="w-full bg-white border border-neutral-250 rounded-xl pl-10 pr-4 py-2 text-sm font-semibold outline-hidden focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
            <Search className="h-4.5 w-4.5" />
          </span>
        </div>
      </div>

      {/* League Filters */}
      <div className="relative w-full flex items-center">
        {showLeftArrow && (
          <div className="absolute left-0 top-0 bottom-2 flex items-center bg-linear-to-r from-[#f5f5f5] via-[#f5f5f5] to-transparent pr-8 z-10">
            <button
              onClick={() => scrollContainer("left")}
              className="p-1.5 bg-white border border-neutral-200 rounded-full shadow-md hover:bg-neutral-50 cursor-pointer text-brand-dark transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        )}
        
        <div 
          ref={filterContainerRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar md:custom-scrollbar pb-2 border-b border-neutral-200 w-full flex-nowrap scroll-smooth"
        >
          <span className="text-neutral-400 shrink-0">
            <Filter className="h-4 w-4" />
          </span>
          {leagues.map((league) => (
            <button
              key={league.value}
              onClick={() => {
                setSelectedLeague(league.value)
                setPage(1)
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase whitespace-nowrap shrink-0 transition-colors cursor-pointer border ${
                selectedLeague === league.value
                  ? "bg-brand-red text-white border-brand-red"
                  : "bg-white text-neutral-600 border-neutral-250 hover:bg-neutral-50"
              }`}
            >
              {league.label}
            </button>
          ))}
        </div>

        {showRightArrow && (
          <div className="absolute right-0 top-0 bottom-2 flex items-center bg-linear-to-l from-[#f5f5f5] via-[#f5f5f5] to-transparent pl-8 z-10">
            <button
              onClick={() => scrollContainer("right")}
              className="p-1.5 bg-white border border-neutral-200 rounded-full shadow-md hover:bg-neutral-50 cursor-pointer text-brand-dark transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {isFixturesLoading || isFixturesFetching ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
          <p className="text-xs text-neutral-500 font-semibold">
            {isIt ? "Caricamento partite..." : "Loading matches..."}
          </p>
        </div>
      ) : Object.keys(groupedMatches).length > 0 ? (
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
                  {matches.length} {isIt ? (matches.length === 1 ? "Partita" : "Partite") : (matches.length === 1 ? "Match" : "Matches")}
                </span>
              </div>

              {/* Match Score Rows */}
              <div className="flex flex-col gap-3">
                {matches.map((match) => (
                  <ScoreWidget key={match.id} match={match} />
                ))}
              </div>
            </div>
          ))}

          {/* Pagination Controls */}
          {fixturesResponse && fixturesResponse.count > PAGE_SIZE && (
            <CustomPagination
              currentPage={page}
              count={fixturesResponse.count}
              pageSize={PAGE_SIZE}
              onPageChange={(p) => {
                setPage(p)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
            />
          )}
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded-xl p-12 text-center text-neutral-500">
          {isIt ? "Nessuna partita trovata per i filtri selezionati." : "No matches found for the selected filters."}
        </div>
      )}

    </div>
  )
}
