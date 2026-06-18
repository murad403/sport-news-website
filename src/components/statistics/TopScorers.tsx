import React from "react"
import { mockTopScorers } from "@/lib/mockData"
import { Award } from "lucide-react"

const TopScorers: React.FC = () => {
  return (
    <div className="w-full bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm select-none">
      
      {/* Table Title */}
      <div className="bg-brand-dark text-white px-5 py-4 flex items-center justify-between">
        <h3 className="font-headline text-xl font-bold uppercase tracking-wider flex items-center gap-2">
          <Award className="h-5 w-5 text-brand-red" />
          Top Scorers
        </h3>
        <span className="text-xs font-bold text-neutral-400">All Leagues</span>
      </div>

      {/* Table Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 text-neutral-500 font-bold border-b border-neutral-200 text-xs md:text-sm select-none">
              <th className="px-4 py-3 text-center w-12">Rank</th>
              <th className="px-4 py-3">Player Name</th>
              <th className="px-4 py-3">Club</th>
              <th className="px-3 py-3 text-center">Goals</th>
              <th className="px-3 py-3 text-center">Assists</th>
              <th className="px-3 py-3 text-center">Matches</th>
            </tr>
          </thead>
          <tbody>
            {mockTopScorers.map((scorer) => (
              <tr
                key={scorer.player}
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
                
                {/* Player Name */}
                <td className="px-4 py-3 text-brand-dark font-extrabold text-xs md:text-sm">
                  {scorer.player}
                </td>
                
                {/* Club */}
                <td className="px-4 py-3 text-xs md:text-sm text-neutral-600">
                  {scorer.club}
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

    </div>
  )
}

export default TopScorers
