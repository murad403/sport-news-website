"use client"

import React, { useState } from "react"
import Input from "../ui/Input"
import { Search, ShieldAlert, Award, Star, TrendingUp } from "lucide-react"

interface PlayerProfile {
  name: string
  club: string
  position: string
  nationality: string
  goals: number
  assists: number
  matches: number
  yellowCards: number
  redCards: number
  passAccuracy: string
  rating: number
}

const mockPlayerProfiles: PlayerProfile[] = [
  {
    name: "Erling Haaland",
    club: "Manchester City",
    position: "Forward (ST)",
    nationality: "Norway",
    goals: 27,
    assists: 5,
    matches: 31,
    yellowCards: 2,
    redCards: 0,
    passAccuracy: "78%",
    rating: 8.2
  },
  {
    name: "Kylian Mbappé",
    club: "Real Madrid",
    position: "Forward (LW/ST)",
    nationality: "France",
    goals: 27,
    assists: 7,
    matches: 29,
    yellowCards: 3,
    redCards: 0,
    passAccuracy: "84%",
    rating: 8.4
  },
  {
    name: "Cole Palmer",
    club: "Chelsea",
    position: "Midfielder (CAM/RW)",
    nationality: "England",
    goals: 22,
    assists: 11,
    matches: 34,
    yellowCards: 4,
    redCards: 0,
    passAccuracy: "88%",
    rating: 7.9
  },
  {
    name: "Jude Bellingham",
    club: "Real Madrid",
    position: "Midfielder (CAM)",
    nationality: "England",
    goals: 19,
    assists: 6,
    matches: 28,
    yellowCards: 5,
    redCards: 1,
    passAccuracy: "89%",
    rating: 8.1
  },
  {
    name: "Phil Foden",
    club: "Manchester City",
    position: "Midfielder (RW/CAM)",
    nationality: "England",
    goals: 19,
    assists: 8,
    matches: 35,
    yellowCards: 1,
    redCards: 0,
    passAccuracy: "91%",
    rating: 8.0
  }
]

const PlayerStatsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPlayers = mockPlayerProfiles.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      {/* Search Bar Row */}
      <div className="relative w-full max-w-md">
        <Input
          type="text"
          placeholder="Search by player name (e.g. Haaland, Palmer)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-11 text-base rounded-lg border-neutral-300 focus-visible:ring-brand-red"
        />
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 pointer-events-none" />
      </div>

      {/* Players Results Grid */}
      {filteredPlayers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPlayers.map((player) => (
            <div
              key={player.name}
              className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm flex flex-col hover:border-neutral-300 transition-colors"
            >
              {/* Profile Header */}
              <div className="bg-brand-dark text-white p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-headline text-2xl font-extrabold tracking-wide text-white">
                    {player.name}
                  </h3>
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                    {player.position}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-brand-red uppercase">{player.club}</div>
                  <div className="text-xs text-neutral-400 font-semibold">{player.nationality}</div>
                </div>
              </div>

              {/* Stats Body */}
              <div className="p-5 flex-grow grid grid-cols-3 gap-4 border-b border-neutral-100 bg-neutral-50/50">
                <div className="flex flex-col items-center justify-center p-3 bg-white border border-neutral-150 rounded-lg text-center shadow-xs">
                  <span className="text-xs font-extrabold text-neutral-400 uppercase mb-1">Matches</span>
                  <span className="text-xl font-bold font-headline text-brand-dark">{player.matches}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-white border border-neutral-150 rounded-lg text-center shadow-xs">
                  <span className="text-xs font-extrabold text-neutral-400 uppercase mb-1">Goals</span>
                  <span className="text-xl font-bold font-headline text-brand-red">{player.goals}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-white border border-neutral-150 rounded-lg text-center shadow-xs">
                  <span className="text-xs font-extrabold text-neutral-400 uppercase mb-1">Assists</span>
                  <span className="text-xl font-bold font-headline text-brand-dark">{player.assists}</span>
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="p-5 grid grid-cols-2 gap-4 text-xs font-semibold text-neutral-600">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span>Rating: <strong className="text-brand-dark">{player.rating}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-brand-red" />
                  <span>Pass Accuracy: <strong className="text-brand-dark">{player.passAccuracy}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-neutral-400" />
                  <span>Yellow Cards: <strong className="text-yellow-600">{player.yellowCards}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-red-500" />
                  <span>Red Cards: <strong className="text-red-600">{player.redCards}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded-xl p-8 text-center text-neutral-500">
          No players found matching "{searchTerm}"
        </div>
      )}
    </div>
  )
}

export default PlayerStatsTable
