import React from "react"
import { MatchResult } from "@/lib/types"
import LiveBadge from "../ui/LiveBadge"

export interface LiveScoreCardProps {
  match: MatchResult
}

const LiveScoreCard: React.FC<LiveScoreCardProps> = ({ match }) => {
  const getTeamIcon = (teamName: string) => {
    const icons: Record<string, string> = {
      Italy: "🇮🇹", Spain: "🇪🇸", France: "🇫🇷", Germany: "🇩🇪",
      Arsenal: "🔴", Chelsea: "🔵", "Real Madrid": "⚪", Barcelona: "🔵🔴",
      "AC Milan": "🔴⚫", "Inter Milan": "🔵⚫", "Bayern Munich": "🔴",
      Dortmund: "🟡⚫", PSG: "🔵", Marseille: "⚪🔵", Juventus: "⚪⚫",
      Napoli: "🔵", Liverpool: "🔴", "Manchester Utd": "🔴", "Man City": "🔵"
    }
    return icons[teamName] || "⚽"
  }

  return (
    <div className="bg-red-500/5 border border-brand-red/20 rounded-xl p-4 select-none relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Background Pulse Glow */}
      <div className="absolute top-0 right-0 h-16 w-16 bg-brand-red/10 rounded-full blur-xl -translate-y-6 translate-x-6 animate-pulse" />

      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <span className="text-[10px] font-extrabold uppercase bg-brand-red/10 text-brand-red border border-brand-red/20 px-2 py-0.5 rounded-full">
          {match.league}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
          </span>
          <span className="text-xs font-bold text-brand-red">
            {match.minute}'
          </span>
        </div>
      </div>

      {/* Teams and Score Content */}
      <div className="flex items-center justify-between gap-4 my-2">
        {/* Home Team */}
        <div className="flex flex-col items-center flex-1 text-center min-w-0">
          <span className="text-3xl mb-1 select-none">{getTeamIcon(match.homeTeam)}</span>
          <span className="text-xs font-bold text-brand-dark truncate w-full">{match.homeTeam}</span>
        </div>

        {/* Live Score */}
        <div className="flex items-center justify-center shrink-0">
          <span className="font-headline text-3xl font-extrabold text-brand-red tracking-wide">
            {match.homeScore} : {match.awayScore}
          </span>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center flex-1 text-center min-w-0">
          <span className="text-3xl mb-1 select-none">{getTeamIcon(match.awayTeam)}</span>
          <span className="text-xs font-bold text-brand-dark truncate w-full">{match.awayTeam}</span>
        </div>
      </div>

      {/* Live Badge and Action Tracker */}
      <div className="border-t border-brand-red/10 pt-2.5 mt-3 flex items-center justify-between">
        <LiveBadge className="px-1.5 py-0.5 text-[8px]" />
        <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
          Second Half Action
        </span>
      </div>
    </div>
  )
}

export default LiveScoreCard
