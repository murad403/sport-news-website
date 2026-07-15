"use client"

import React, { useState, useEffect } from "react"
import Input from "../ui/Input"
import { Search, ShieldAlert, Award, Star, TrendingUp, Loader2, User } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"
import { useGetPlayerStatsQuery } from "@/redux/features/statistics/statistics.api"
import CustomPagination from "../shared/CustomPagination"

const PAGE_SIZE = 20

const PlayerStatsTable: React.FC = () => {
  const { t, lang } = useTranslation()
  const isIt = lang === "it"

  // States for search and pagination
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

  // Query player stats API
  const { data, isLoading, isFetching, error } = useGetPlayerStatsQuery({
    page: currentPage,
    search: debouncedSearch || undefined
  })

  const players = data?.results || [];
  const totalCount = data?.count || 0;

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      {/* Search Bar Row */}
      <div className="relative w-full max-w-md">
        <Input
          type="text"
          placeholder={isIt ? "Cerca per nome (es. Franculino, Tonni)..." : "Search by player name (e.g. Franculino, Tonni)..."}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="pl-10 h-11 text-base rounded-lg border-neutral-350 focus-visible:ring-brand-red"
        />
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 pointer-events-none" />
      </div>

      {/* Loading state */}
      {isLoading || isFetching ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
          <p className="text-xs text-neutral-500 font-semibold">
            {isIt ? "Caricamento statistiche..." : "Loading player statistics..."}
          </p>
        </div>
      ) : error ? (
        <div className="bg-white border border-neutral-200 rounded-xl p-8 text-center text-brand-red font-semibold text-xs">
          ⚠️ {isIt ? "Errore durante il caricamento dei dati." : "Failed to load player stats data."}
        </div>
      ) : players.length > 0 ? (
        <div className="flex flex-col gap-6">
          {/* Players Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {players.map((player, idx) => (
              <div
                key={`${player.player_name}-${idx}`}
                className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm flex flex-col hover:border-neutral-350 transition-colors"
              >
                {/* Profile Header */}
                <div className="bg-brand-dark text-white p-5 flex items-center gap-4">
                  {/* Photo image */}
                  <div className="h-14 w-14 rounded-full border-2 border-brand-red bg-neutral-800 overflow-hidden shrink-0 flex items-center justify-center">
                    {player.player_photo && !player.player_photo.includes("placeholder") ? (
                      <img
                        src={player.player_photo}
                        alt={player.player_name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none"
                        }}
                      />
                    ) : (
                      <User className="h-6 w-6 text-neutral-400" />
                    )}
                  </div>

                  <div className="grow min-w-0">
                    <h3 className="font-headline text-xl font-extrabold tracking-wide text-white truncate uppercase">
                      {player.player_name}
                    </h3>
                    <span className="text-[10px] font-bold text-neutral-405 uppercase tracking-widest block mt-0.5">
                      {player.position || (isIt ? "Sconosciuto" : "Unknown")}
                    </span>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold text-brand-red uppercase">
                      {player.team_name || (isIt ? "Nessun Club" : "No Club")}
                    </div>
                    <div className="text-[10px] text-neutral-405 font-bold uppercase mt-0.5">
                      {player.country}
                    </div>
                  </div>
                </div>

                {/* Stats Body */}
                <div className="p-5 grow grid grid-cols-3 gap-4 border-b border-neutral-100 bg-neutral-50/50">
                  <div className="flex flex-col items-center justify-center p-3 bg-white border border-neutral-150 rounded-lg text-center shadow-xs">
                    <span className="text-[10px] font-extrabold text-neutral-400 uppercase mb-1">
                      {isIt ? "Partite" : "Matches"}
                    </span>
                    <span className="text-lg font-bold font-headline text-brand-dark">
                      {player.matches}
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-white border border-neutral-150 rounded-lg text-center shadow-xs">
                    <span className="text-[10px] font-extrabold text-neutral-400 uppercase mb-1">
                      {isIt ? "Gol" : "Goals"}
                    </span>
                    <span className="text-lg font-bold font-headline text-brand-red">
                      {player.goals}
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-white border border-neutral-150 rounded-lg text-center shadow-xs">
                    <span className="text-[10px] font-extrabold text-neutral-400 uppercase mb-1">
                      Assist
                    </span>
                    <span className="text-lg font-bold font-headline text-brand-dark">
                      {player.assists}
                    </span>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="p-5 grid grid-cols-2 gap-4 text-xs font-semibold text-neutral-600">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span>
                      {isIt ? "Valutazione:" : "Rating:"}{" "}
                      <strong className="text-brand-dark">{player.rating || "N/A"}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-brand-red" />
                    <span>
                      {isIt ? "Prec. Passaggi:" : "Pass Accuracy:"}{" "}
                      <strong className="text-brand-dark">
                        {player.pass_accuracy !== null ? `${player.pass_accuracy}%` : "N/A"}
                      </strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-neutral-400" />
                    <span>
                      {isIt ? "Ammonizioni:" : "Yellow Cards:"}{" "}
                      <strong className="text-yellow-600">{player.yellow_cards}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 text-red-500" />
                    <span>
                      {isIt ? "Espulsioni:" : "Red Cards:"}{" "}
                      <strong className="text-red-600">{player.red_cards}</strong>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Pagination */}
          <CustomPagination
            currentPage={currentPage}
            count={totalCount}
            pageSize={PAGE_SIZE}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded-xl p-8 text-center text-neutral-500">
          {isIt
            ? `Nessun giocatore trovato corrispondente a "${searchText}"`
            : `No players found matching "${searchText}"`}
        </div>
      )}
    </div>
  )
}

export default PlayerStatsTable
