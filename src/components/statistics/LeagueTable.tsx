"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/lib/useTranslation"
import { useGetStandingsQuery } from "@/redux/features/statistics/statistics.api"
import { Loader2 } from "lucide-react"
import CustomPagination from "../shared/CustomPagination"

const PAGE_SIZE = 20

const LeagueTable: React.FC = () => {
  const { t, lang } = useTranslation()
  const isIt = lang === "it"

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)

  // Fetch live standings data from statistics API
  const { data, isLoading, error } = useGetStandingsQuery({
    page: currentPage
  })

  const standings = data?.results || []

  // Helper to determine the border highlight based on position
  const getPositionHighlight = (pos: number) => {
    if (pos <= 4) return "border-l-4 border-l-green-500 bg-green-500/5" // Champions League
    if (pos === 5 || pos === 6) return "border-l-4 border-l-orange-500 bg-orange-500/5" // Europa League
    if (pos >= 11) return "border-l-4 border-l-red-500 bg-red-500/5" // Relegation
    return ""
  }

  const getBadgeColor = (pos: number) => {
    if (pos <= 4) return "bg-green-600 text-white font-bold"
    if (pos === 5 || pos === 6) return "bg-orange-600 text-white font-bold"
    if (pos >= 11) return "bg-red-600 text-white font-bold"
    return "bg-neutral-100 text-neutral-600 font-semibold"
  }

  return (
    <div className="w-full bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm select-none">
      
      {/* Table Title */}
      <div className="bg-brand-dark text-white px-5 py-4 flex items-center justify-between">
        <h3 className="font-headline text-xl font-bold uppercase tracking-wider">
          {isIt ? "Classifica Campionato" : "League Standings"}
        </h3>
        <span className="text-xs font-bold text-neutral-400">
          {isIt ? "Stagione 2025/2026" : "Season 2025/2026"}
        </span>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
          <p className="text-xs text-neutral-500 font-semibold">
            {isIt ? "Caricamento classifica..." : "Loading standings..."}
          </p>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-brand-red font-semibold text-xs border-b border-neutral-150">
          ⚠️ {isIt ? "Impossibile caricare la classifica." : "Failed to load standings leaderboard."}
        </div>
      ) : standings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 text-neutral-500 font-bold border-b border-neutral-200 text-xs md:text-sm select-none">
                <th className="px-4 py-3 text-center w-12">{t.statistics.tableHeaders.pos}</th>
                <th className="px-4 py-3">{t.statistics.tableHeaders.club}</th>
                <th className="px-3 py-3 text-center">{t.statistics.tableHeaders.p}</th>
                <th className="px-3 py-3 text-center">{t.statistics.tableHeaders.w}</th>
                <th className="px-3 py-3 text-center">{t.statistics.tableHeaders.d}</th>
                <th className="px-3 py-3 text-center">{t.statistics.tableHeaders.l}</th>
                <th className="px-3 py-3 text-center hidden md:table-cell">GF</th>
                <th className="px-3 py-3 text-center hidden md:table-cell">GA</th>
                <th className="px-3 py-3 text-center hidden md:table-cell">{t.statistics.tableHeaders.gd}</th>
                <th className="px-4 py-3 text-center font-bold text-brand-dark">{t.statistics.tableHeaders.pts}</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((entry) => (
                <tr
                  key={entry.team_name}
                  className={cn(
                    "border-b border-neutral-100 hover:bg-neutral-50 transition-colors font-semibold text-neutral-700",
                    getPositionHighlight(entry.position)
                  )}
                >
                  {/* Position Badge */}
                  <td className="px-4 py-3 text-center">
                    <span className={cn("inline-flex items-center justify-center h-6 w-6 rounded text-xs", getBadgeColor(entry.position))}>
                      {entry.position}
                    </span>
                  </td>
                  
                  {/* Team Logo & Club Name */}
                  <td className="px-4 py-3 flex items-center gap-3">
                    <div className="h-6 w-6 rounded-md overflow-hidden shrink-0 flex items-center justify-center bg-white p-0.5 border border-neutral-100">
                      {entry.team_logo ? (
                        <img
                          src={entry.team_logo}
                          alt={entry.team_name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="h-4 w-4 bg-neutral-200 rounded-full" />
                      )}
                    </div>
                    <span className="text-brand-dark font-extrabold text-xs md:text-sm">
                      {entry.team_name}
                    </span>
                  </td>
                  
                  {/* Play Counts */}
                  <td className="px-3 py-3 text-center">{entry.played}</td>
                  <td className="px-3 py-3 text-center">{entry.won}</td>
                  <td className="px-3 py-3 text-center">{entry.drawn}</td>
                  <td className="px-3 py-3 text-center">{entry.lost}</td>
                  <td className="px-3 py-3 text-center hidden md:table-cell">{entry.goals_for}</td>
                  <td className="px-3 py-3 text-center hidden md:table-cell">{entry.goals_against}</td>
                  <td className="px-3 py-3 text-center hidden md:table-cell">
                    {entry.goal_difference > 0 ? `+${entry.goal_difference}` : entry.goal_difference}
                  </td>
                  
                  {/* Points */}
                  <td className="px-4 py-3 text-center font-black text-brand-dark text-xs md:text-sm">
                    {entry.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white p-8 text-center text-neutral-500 font-semibold text-xs border-t border-neutral-150">
          {isIt ? "Nessun dato sulla classifica trovato." : "No standings data found."}
        </div>
      )}

      {/* Table Pagination */}
      {standings.length > 0 && (
        <div className="p-4 border-t border-neutral-100 flex justify-center">
          <CustomPagination
            currentPage={currentPage}
            count={data?.count || 0}
            pageSize={PAGE_SIZE}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}

      {/* Legend Footer */}
      <div className="bg-neutral-50 border-t border-neutral-200 px-5 py-3.5 flex flex-wrap gap-4 text-[10px] md:text-xs font-semibold text-neutral-500 select-none">
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rounded bg-green-600 border border-green-700" />
          <span>{t.statistics.legend.cl}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rounded bg-orange-600 border border-orange-700" />
          <span>{t.statistics.legend.el}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rounded bg-red-600 border border-red-700" />
          <span>{t.statistics.legend.relegation}</span>
        </div>
      </div>

    </div>
  )
}

export default LeagueTable
