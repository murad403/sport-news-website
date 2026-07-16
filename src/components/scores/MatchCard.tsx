import React from "react"
import { MatchResult } from "@/lib/types"
import LiveBadge from "../ui/LiveBadge"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/lib/useTranslation"

export interface MatchCardProps {
  match: MatchResult
  className?: string
}

// Map leagues to standard colors (localized matches support)
const leagueColors: Record<string, string> = {
  "Premier League": "text-purple-600 bg-purple-50 border-purple-100",
  "La Liga": "text-sky-600 bg-sky-50 border-sky-100",
  "Serie A": "text-blue-600 bg-blue-50 border-blue-100",
  "Bundesliga": "text-red-600 bg-red-50 border-red-100",
  "Ligue 1": "text-yellow-600 bg-yellow-50 border-yellow-100",
  "Champions League": "text-indigo-600 bg-indigo-50 border-indigo-100",
  "Nations League": "text-emerald-600 bg-emerald-50 border-emerald-100",
  "Amichevole Internazionale": "text-neutral-600 bg-neutral-50 border-neutral-100",
  "International Friendly": "text-neutral-600 bg-neutral-50 border-neutral-100"
}

const MatchCard: React.FC<MatchCardProps> = ({ match, className }) => {
  const { lang } = useTranslation()
  const isLive = match.status === "live"
  const isUpcoming = match.status === "upcoming"
  const isFT = match.status === "ft"

  const lColor = leagueColors[match.league] || "text-neutral-600 bg-neutral-50 border-neutral-100"

  // Shorten date format for upcoming games
  const getUpcomingTime = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleTimeString(lang === "it" ? "it-IT" : "en-US", { hour: "2-digit", minute: "2-digit", hour12: false })
  }

  // Generate team emoji placeholders
  const getTeamIcon = (teamName: string) => {
    const icons: Record<string, string> = {
      Italy: "🇮🇹",
      Italia: "🇮🇹",
      Spain: "🇪🇸",
      Spagna: "🇪🇸",
      France: "🇫🇷",
      Francia: "🇫🇷",
      Germany: "🇩🇪",
      Germania: "🇩🇪",
      Arsenal: "🔴",
      Chelsea: "🔵",
      "Real Madrid": "⚪",
      Barcelona: "🔵🔴",
      Barcellona: "🔵🔴",
      "AC Milan": "🔴⚫",
      "Inter Milan": "🔵⚫",
      Inter: "🔵⚫",
      "Bayern Munich": "🔴",
      "Bayern Monaco": "🔴",
      Dortmund: "🟡⚫",
      PSG: "🔵",
      Marseille: "⚪🔵",
      Marsiglia: "⚪🔵",
      Juventus: "⚪⚫",
      Napoli: "🔵",
      Liverpool: "🔴",
      "Manchester Utd": "🔴",
      "Man City": "🔵"
    }
    return icons[teamName] || "⚽"
  }

  return (
    <div
      className={cn(
        "min-w-[185px] max-w-[210px] bg-white border border-neutral-200 rounded-xl p-3 shadow-sm select-none flex flex-col justify-between hover:border-neutral-300 transition-colors shrink-0",
        className
      )}
    >
      {/* League Header */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span
          className={cn(
            "text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border leading-none truncate max-w-[120px]",
            lColor
          )}
        >
          {match.league}
        </span>
        {isLive && (
          <span className="text-[10px] font-bold text-brand-red animate-pulse">
            {match.minute}'
          </span>
        )}
      </div>

      {/* Teams Grid */}
      <div className="flex flex-col gap-1.5 my-2">
        {/* Home Team */}
        <div className="flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-1.5 truncate pr-2">
            {match.homeTeamLogo ? (
              <img src={match.homeTeamLogo} alt={match.homeTeam} className="w-4.5 h-4.5 object-contain shrink-0" />
            ) : (
              <span className="text-sm shrink-0">{getTeamIcon(match.homeTeam)}</span>
            )}
            <span className="text-brand-dark truncate">{match.homeTeam}</span>
          </div>
          {!isUpcoming && (
            <span className={cn("text-xs font-bold font-headline text-neutral-800", isLive && "text-brand-red")}>
              {match.homeScore}
            </span>
          )}
        </div>

        {/* Away Team */}
        <div className="flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-1.5 truncate pr-2">
            {match.awayTeamLogo ? (
              <img src={match.awayTeamLogo} alt={match.awayTeam} className="w-4.5 h-4.5 object-contain shrink-0" />
            ) : (
              <span className="text-sm shrink-0">{getTeamIcon(match.awayTeam)}</span>
            )}
            <span className="text-brand-dark truncate">{match.awayTeam}</span>
          </div>
          {!isUpcoming && (
            <span className={cn("text-xs font-bold font-headline text-neutral-800", isLive && "text-brand-red")}>
              {match.awayScore}
            </span>
          )}
        </div>
      </div>

      {/* Footer Status Box */}
      <div className="border-t border-neutral-100 pt-2 flex items-center justify-between">
        {isLive ? (
          <LiveBadge className="px-1.5 py-0 text-[8px]" />
        ) : isFT ? (
          <span className="text-[9px] font-extrabold uppercase bg-neutral-100 text-neutral-500 px-1.5 py-0.5 rounded leading-none">
            {lang === "it" ? "FINALE" : "FT"}
          </span>
        ) : (
          <span className="text-[9px] font-bold uppercase bg-neutral-50 text-neutral-500 border border-neutral-200/50 px-1.5 py-0.5 rounded leading-none flex items-center gap-1">
            <span>{lang === "it" ? "In arrivo" : "Upcoming"}</span>
            <span className="text-brand-red font-semibold">{getUpcomingTime(match.matchDate)}</span>
          </span>
        )}
      </div>
    </div>
  )
}

export default MatchCard
