import React from "react"
import { mockLeagueTables } from "@/lib/mockData"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/lib/useTranslation"

export interface LeagueTableProps {
  league: string
}

const LeagueTable: React.FC<LeagueTableProps> = ({ league }) => {
  const { t, lang } = useTranslation()
  const isIt = lang === "it"
  const standings = mockLeagueTables[league] || []

  // Helper to determine the border highlight based on position
  const getPositionHighlight = (pos: number) => {
    if (pos <= 4) return "border-l-4 border-l-green-500 bg-green-500/5" // Champions League
    if (pos === 5 || pos === 6) return "border-l-4 border-l-orange-500 bg-orange-500/5" // Europa League
    if (pos >= 18) return "border-l-4 border-l-red-500 bg-red-500/5" // Relegation
    return ""
  }

  const getBadgeColor = (pos: number) => {
    if (pos <= 4) return "bg-green-600 text-white font-bold"
    if (pos === 5 || pos === 6) return "bg-orange-600 text-white font-bold"
    if (pos >= 18) return "bg-red-600 text-white font-bold"
    return "bg-neutral-100 text-neutral-600 font-semibold"
  }

  return (
    <div className="w-full bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm select-none">
      
      {/* Table Title */}
      <div className="bg-brand-dark text-white px-5 py-4 flex items-center justify-between">
        <h3 className="font-headline text-xl font-bold uppercase tracking-wider">
          {isIt ? `Classifica ${league}` : `${league} Standings`}
        </h3>
        <span className="text-xs font-bold text-neutral-400">
          {isIt ? "Stagione 2025/2026" : "Season 2025/2026"}
        </span>
      </div>

      {/* Table Grid */}
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
                key={entry.club}
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
                
                {/* Club Name */}
                <td className="px-4 py-3 text-brand-dark font-extrabold text-xs md:text-sm">
                  {entry.club}
                </td>
                
                {/* Play Counts */}
                <td className="px-3 py-3 text-center">{entry.played}</td>
                <td className="px-3 py-3 text-center">{entry.won}</td>
                <td className="px-3 py-3 text-center">{entry.drawn}</td>
                <td className="px-3 py-3 text-center">{entry.lost}</td>
                <td className="px-3 py-3 text-center hidden md:table-cell">{entry.goalsFor}</td>
                <td className="px-3 py-3 text-center hidden md:table-cell">{entry.goalsAgainst}</td>
                <td className="px-3 py-3 text-center hidden md:table-cell">
                  {entry.goalDifference > 0 ? `+${entry.goalDifference}` : entry.goalDifference}
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
