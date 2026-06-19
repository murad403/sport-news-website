"use client"

import React, { useState, useMemo, useRef, useEffect } from "react"
import { getLocalMatchResults } from "@/lib/localizer"
import ScoreWidget from "@/components/scores/ScoreWidget"
import Button from "@/components/ui/Button"
import { Filter, Award, ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"

export default function SoccerResultsPage() {
  const { t, lang } = useTranslation()
  const isIt = lang === "it"

  const [activeDateTab, setActiveDateTab] = useState<"today" | "yesterday" | "week">("today")
  const [selectedLeague, setSelectedLeague] = useState("All Leagues")
  const [visibleCount, setVisibleCount] = useState(6)

  // References and state for horizontal scrolling
  const filterContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)

  // Memoized localized match results
  const matchesData = useMemo(() => getLocalMatchResults(lang), [lang])

  // Leagues filters list mapped dynamically
  const leagues = useMemo(() => [
    { value: "All Leagues", label: isIt ? "Tutti i Campionati" : "All Leagues" },
    { value: "Premier League", label: "Premier League" },
    { value: "La Liga", label: "La Liga" },
    { value: "Serie A", label: "Serie A" },
    { value: "Bundesliga", label: "Bundesliga" },
    { value: "Champions League", label: "Champions League" },
    { value: "Ligue 1", label: "Ligue 1" },
    { value: "Nations League", label: "Nations League" },
    { value: "Amichevole Internazionale", label: "Amichevole Internazionale" }
  ], [isIt])

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

  // Filter match results based on tabs and selected league
  const filteredMatches = useMemo(() => {
    return matchesData.filter((match) => {
      // 1. League Filter
      if (selectedLeague !== "All Leagues" && 
          match.league.toLowerCase() !== selectedLeague.toLowerCase() &&
          !(selectedLeague === "Amichevole Internazionale" && match.league === "Amichevole Internazionale")
      ) {
        return false
      }

      // 2. Date Filter (Mock logic based on June 18 / 17 dates in mockData)
      const date = new Date(match.matchDate)
      const day = date.getUTCDate()

      if (activeDateTab === "today") {
        return day === 18
      } else if (activeDateTab === "yesterday") {
        return day === 17
      } else {
        // This Week
        return true
      }
    })
  }, [matchesData, activeDateTab, selectedLeague])

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
          ⚽ {isIt ? "Centro Partite Calcio" : "Soccer Match Center"}
        </h1>
        <p className="text-xs md:text-sm text-neutral-500 font-semibold">
          {t.soccerResults.subtitle}
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
          {isIt ? "Oggi (18 Giu)" : "Today (Jun 18)"}
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
          {isIt ? "Ieri (17 Giu)" : "Yesterday (Jun 17)"}
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
          {isIt ? "Questa Settimana" : "This Week"}
        </button>
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
                setVisibleCount(6)
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
                  {matches.length} {isIt ? (matches.length === 1 ? "Partita" : "Partite") : (matches.length === 1 ? "Match" : "Matches")}
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
                {isIt ? "Carica Altre Partite" : "Load More Matches"}
              </Button>
            </div>
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
