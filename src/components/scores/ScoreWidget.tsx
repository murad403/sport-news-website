import React from "react"
import { MatchResult } from "@/lib/types"
import LiveBadge from "../ui/LiveBadge"
import { cn } from "@/lib/utils"
import { Calendar, Clock } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"

export interface ScoreWidgetProps {
  match: MatchResult
}

const ScoreWidget: React.FC<ScoreWidgetProps> = ({ match }) => {
  const { lang } = useTranslation()
  const isIt = lang === "it"

  const isLive = match.status === "live"
  const isUpcoming = match.status === "upcoming"
  const isFT = match.status === "ft"

  const getUpcomingTime = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleTimeString(isIt ? "it-IT" : "en-US", { hour: "2-digit", minute: "2-digit", hour12: false })
  }

  const getTeamIcon = (teamName: string) => {
    const icons: Record<string, string> = {
      Italy: "🇮🇹", Italia: "🇮🇹", Spain: "🇪🇸", Spagna: "🇪🇸", France: "🇫🇷", Francia: "🇫🇷", Germany: "🇩🇪", Germania: "🇩🇪",
      Arsenal: "🔴", Chelsea: "🔵", "Real Madrid": "⚪", Barcelona: "🔵🔴", Barcellona: "🔵🔴",
      "AC Milan": "🔴⚫", "Inter Milan": "🔵⚫", Inter: "🔵⚫", "Bayern Munich": "🔴", "Bayern Monaco": "🔴",
      Dortmund: "🟡⚫", PSG: "🔵", Marseille: "⚪🔵", Marsiglia: "⚪🔵", Juventus: "⚪⚫",
      Napoli: "🔵", Liverpool: "🔴", "Manchester Utd": "🔴", "Man City": "🔵"
    }
    return icons[teamName] || "⚽"
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-4 md:p-5 shadow-sm hover:border-neutral-300 transition-colors select-none flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* 1. Left: League Info & Status */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider bg-neutral-100 text-neutral-600 border border-neutral-200 px-2.5 py-0.5 rounded-full">
          {match.league}
        </span>
        {isLive && (
          <span className="flex items-center gap-1">
            <LiveBadge className="px-1.5 py-0.5 text-[9px]" />
            <span className="text-xs font-extrabold text-brand-red animate-pulse">{match.minute}'</span>
          </span>
        )}
        {isFT && (
          <span className="text-xs font-extrabold text-neutral-400 bg-neutral-50 border border-neutral-200 px-2 py-0.5 rounded">
            {isIt ? "Finale" : "Full Time"}
          </span>
        )}
        {isUpcoming && (
          <span className="text-xs font-semibold text-neutral-400 flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {getUpcomingTime(match.matchDate)}
          </span>
        )}
      </div>

      {/* 2. Center: Teams & Scores */}
      <div className="flex items-center justify-center gap-4 md:gap-8 grow">
        {/* Home Team */}
        <div className="flex items-center gap-2 md:gap-3 text-right flex-1 justify-end min-w-0">
          <span className="text-sm md:text-base font-bold text-brand-dark truncate">{match.homeTeam}</span>
          <span className="text-2xl shrink-0">{getTeamIcon(match.homeTeam)}</span>
        </div>

        {/* Score Block */}
        <div className="flex items-center justify-center shrink-0 bg-neutral-50 px-4 py-2 rounded-lg border border-neutral-100 min-w-[70px]">
          {isUpcoming ? (
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">VS</span>
          ) : (
            <span className="font-headline text-xl md:text-2xl font-extrabold text-brand-dark flex items-center gap-1.5">
              <span className={cn(isLive && "text-brand-red")}>{match.homeScore}</span>
              <span className="text-neutral-300">-</span>
              <span className={cn(isLive && "text-brand-red")}>{match.awayScore}</span>
            </span>
          )}
        </div>

        {/* Away Team */}
        <div className="flex items-center gap-2 md:gap-3 text-left flex-1 justify-start min-w-0">
          <span className="text-2xl shrink-0">{getTeamIcon(match.awayTeam)}</span>
          <span className="text-sm md:text-base font-bold text-brand-dark truncate">{match.awayTeam}</span>
        </div>
      </div>

      {/* 3. Right: Match Date */}
      <div className="flex items-center gap-1 text-xs text-neutral-400 font-medium md:justify-end shrink-0 select-none">
        <Calendar className="h-3.5 w-3.5" />
        <span>{new Date(match.matchDate).toLocaleDateString(isIt ? "it-IT" : "en-US", { month: "short", day: "numeric" })}</span>
      </div>
    </div>
  )
}

export default ScoreWidget
