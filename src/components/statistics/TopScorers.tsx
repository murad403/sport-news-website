"use client"

import React, { useState, useEffect } from "react"
import { Award, Loader2, User, Search } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"
import { useGetTopScorersQuery } from "@/redux/features/statistics/statistics.api"
import CustomPagination from "../shared/CustomPagination"
import Input from "../ui/Input"

const PAGE_SIZE = 20

const TopScorers: React.FC = () => {
  const { t, lang } = useTranslation()
  const isIt = lang === "it"

  // Search & Pagination States
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText)
      setCurrentPage(1)
    }, 400)
    return () => clearTimeout(timer)
  }, [searchText])

  // Query live top scorers API
  const { data, isLoading, isFetching, error } = useGetTopScorersQuery({
    page: currentPage,
    search: debouncedSearch || undefined
  })

  const scorers = data?.results || []
  const totalCount = data?.count || 0

  return (
    <div className="w-full bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm select-none">

      {/* Table Title */}
      <div className="bg-brand-dark text-white px-5 py-4 flex items-center justify-between">
        <h3 className="font-headline text-xl font-bold uppercase tracking-wider flex items-center gap-2">
          <Award className="h-5 w-5 text-brand-red" />
          {isIt ? "Classifica Marcatori" : "Top Scorers"}
        </h3>
        <span className="text-xs font-bold text-neutral-400">{isIt ? "Tutti i Campionati" : "All Leagues"}</span>
      </div>

      {/* Search Bar Row */}
      <div className="p-4 border-b border-neutral-100 bg-neutral-50/30">
        <div className="relative w-full max-w-md">
          <Input
            type="text"
            placeholder={isIt ? "Cerca per nome (es. Franculino, Tonni)..." : "Search by player name (e.g. Franculino, Tonni)..."}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-10 h-10 text-sm rounded-lg border-neutral-300 focus-visible:ring-brand-red bg-white"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
        </div>
      </div>

      {/* Loading state */}
      {isLoading || isFetching ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 border-t border-neutral-150">
          <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
          <p className="text-xs text-neutral-500 font-semibold">
            {isIt ? "Caricamento marcatori..." : "Loading top scorers..."}
          </p>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-brand-red font-semibold text-xs border-t border-neutral-150">
          ⚠️ {isIt ? "Impossibile caricare la classifica marcatori." : "Failed to load top scorers leaderboard."}
        </div>
      ) : scorers.length > 0 ? (
        <div className="flex flex-col">
          {/* Table Grid */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50 text-neutral-500 font-bold border-b border-neutral-200 text-xs md:text-sm select-none">
                  <th className="px-4 py-3 text-center w-12">{isIt ? "Pos" : "Rank"}</th>
                  <th className="px-4 py-3">{isIt ? "Giocatore" : "Player Name"}</th>
                  <th className="px-4 py-3">{isIt ? "Squadra" : "Club"}</th>
                  <th className="px-3 py-3 text-center">{isIt ? "Gol" : "Goals"}</th>
                  <th className="px-3 py-3 text-center">Assist</th>
                  <th className="px-3 py-3 text-center">{isIt ? "Partite" : "Matches"}</th>
                </tr>
              </thead>
              <tbody>
                {scorers.map((scorer, idx) => (
                  <tr
                    key={`${scorer.player_name}-${idx}`}
                    className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors font-semibold text-neutral-700"
                  >
                    {/* Rank */}
                    <td className="px-4 py-3 text-center font-bold">
                      {scorer.rank === 1 ? (
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded bg-yellow-500 text-white font-bold">
                          1
                        </span>
                      ) : scorer.rank === 2 ? (
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded bg-neutral-300 text-neutral-800 font-bold">
                          2
                        </span>
                      ) : scorer.rank === 3 ? (
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded bg-amber-600 text-white font-bold">
                          3
                        </span>
                      ) : (
                        <span>{scorer.rank}</span>
                      )}
                    </td>

                    {/* Player Image & Name */}
                    <td className="px-4 py-3 flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full border border-neutral-200 overflow-hidden shrink-0 flex items-center justify-center bg-neutral-100">
                        {scorer.player_photo && !scorer.player_photo.includes("placeholder") ? (
                          <img
                            src={scorer.player_photo}
                            alt={scorer.player_name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none"
                            }}
                          />
                        ) : (
                          <User className="h-4.5 w-4.5 text-neutral-400" />
                        )}
                      </div>
                      <span className="text-brand-dark font-extrabold text-xs md:text-sm truncate">
                        {scorer.player_name}
                      </span>
                    </td>

                    {/* Club */}
                    <td className="px-4 py-3 text-xs md:text-sm text-neutral-600">
                      {scorer.team_name || "—"}
                    </td>

                    {/* Goals */}
                    <td className="px-3 py-3 text-center font-black text-brand-red text-base">
                      {scorer.goals}
                    </td>

                    {/* Assists */}
                    <td className="px-3 py-3 text-center">{scorer.assists}</td>

                    {/* Matches */}
                    <td className="px-3 py-3 text-center">{scorer.matches}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Pagination */}
          <div className="p-4 border-t border-neutral-100 flex justify-center">
            <CustomPagination
              currentPage={currentPage}
              count={totalCount}
              pageSize={PAGE_SIZE}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 text-center text-neutral-500 font-semibold text-xs border-t border-neutral-150">
          {isIt ? "Nessun marcatore trovato." : "No top scorers found."}
        </div>
      )}
    </div>
  )
}

export default TopScorers
