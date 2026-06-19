"use client"

import React, { useState, useMemo } from "react"
import { getLocalArticles, getLocalMatchResults } from "@/lib/localizer"
import ArticleCardHorizontal from "@/components/articles/ArticleCardHorizontal"
import Sidebar from "@/components/layout/Sidebar"
import { Calendar, Filter, Newspaper, Trophy } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"

export default function MatchNewsPage() {
  const { t, lang } = useTranslation()
  const isIt = lang === "it"

  const [selectedSport, setSelectedSport] = useState("All Sports")

  // Sport filters mapped dynamically
  const sportFilters = useMemo(() => [
    { value: "All Sports", label: isIt ? "Tutti gli Sport" : "All Sports" },
    { value: "Football", label: t.navigation.football },
    { value: "F1", label: t.navigation.f1 },
    { value: "Tennis", label: t.navigation.tennis },
    { value: "Basketball", label: t.navigation.basketball }
  ], [isIt, t])

  // Filter articles for news list
  const filteredArticles = useMemo(() => {
    const articles = getLocalArticles(lang)
    return articles.filter((article) => {
      if (selectedSport === "All Sports") return true
      return article.category.toLowerCase() === selectedSport.toLowerCase() ||
        (selectedSport === "Football" && article.category.toLowerCase() === "calcio") ||
        (selectedSport === "Basketball" && article.category.toLowerCase() === "basket")
    })
  }, [selectedSport, lang])

  // Get upcoming fixtures for fixtures list in sidebar
  const upcomingFixtures = useMemo(() => {
    const matches = getLocalMatchResults(lang)
    return matches.filter((match) => match.status === "upcoming").slice(0, 3)
  }, [lang])

  const getTeamIcon = (teamName: string) => {
    const icons: Record<string, string> = {
      Italy: "🇮🇹", Italia: "🇮🇹", Spain: "🇪🇸", Spagna: "🇪🇸",
      Juventus: "⚪⚫", Napoli: "🔵", Liverpool: "🔴", "Manchester Utd": "🔴", "Man City": "🔵", "Real Madrid": "⚪"
    }
    return icons[teamName] || "⚽"
  }

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      
      {/* Page Header */}
      <div>
        <h1 className="font-headline text-3xl md:text-5xl font-extrabold uppercase text-brand-dark flex items-center gap-2">
          <Newspaper className="h-8 w-8 text-brand-red" />
          {isIt ? "Resoconti e Analisi Partite" : "Match Reports & Analysis"}
        </h1>
        <p className="text-xs md:text-sm text-neutral-500 font-semibold">
          {isIt 
            ? "Analisi post-partita approfondite, resoconti tattici e rubriche sportive."
            : "In-depth post-match analysis, tactical reports, and sports columns."}
        </p>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        
        {/* Main Content (Left, 70% = 7 cols of 10) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Sport Filters */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-neutral-200">
            <span className="text-neutral-450 shrink-0">
              <Filter className="h-4 w-4" />
            </span>
            {sportFilters.map((sport) => (
              <button
                key={sport.value}
                onClick={() => setSelectedSport(sport.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase transition-colors cursor-pointer border ${
                  selectedSport === sport.value
                    ? "bg-brand-red text-white border-brand-red"
                    : "bg-white text-neutral-600 border-neutral-250 hover:bg-neutral-50"
                }`}
              >
                {sport.label}
              </button>
            ))}
          </div>

          {/* Articles List */}
          {filteredArticles.length > 0 ? (
            <div className="flex flex-col gap-5">
              {filteredArticles.map((article) => (
                <ArticleCardHorizontal key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-neutral-200 rounded-xl p-10 text-center text-neutral-500">
              {isIt ? "Nessuna notizia trovata per la categoria selezionata." : "No news found for the selected category."}
            </div>
          )}
        </div>

        {/* Sidebar (Right, 30% = 3 cols of 10) */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          
          {/* Upcoming Fixtures Mini Box */}
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-headline text-2xl font-bold uppercase text-brand-dark border-b-2 border-brand-red pb-2 mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-brand-red" />
              {isIt ? "Partite Chiave" : "Key Fixtures"}
            </h3>
            <div className="flex flex-col gap-3.5">
              {upcomingFixtures.map((fixture) => (
                <div key={fixture.id} className="flex items-center justify-between border-b border-neutral-50 pb-3 last:border-0 last:pb-0 text-xs font-semibold">
                  <div className="flex flex-col gap-1 text-neutral-700 min-w-0 grow pr-2">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{fixture.league}</span>
                    <span className="truncate flex items-center gap-1">
                      <span>{getTeamIcon(fixture.homeTeam)}</span> {fixture.homeTeam}
                    </span>
                    <span className="truncate flex items-center gap-1">
                      <span>{getTeamIcon(fixture.awayTeam)}</span> {fixture.awayTeam}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-bold uppercase block bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded text-center">
                      {new Date(fixture.matchDate).toLocaleTimeString(isIt ? "it-IT" : "en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}
                    </span>
                    <span className="text-[9px] font-semibold text-neutral-400 block mt-1">
                      {new Date(fixture.matchDate).toLocaleDateString(isIt ? "it-IT" : "en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Standard layout Sidebar (Trending, Newsletter, Ads) */}
          <Sidebar />
        </div>

      </div>

    </div>
  )
}
