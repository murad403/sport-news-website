"use client"

import React, { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/Select"
import LeagueTable from "@/components/statistics/LeagueTable"
import TopScorers from "@/components/statistics/TopScorers"
import PlayerStatsTable from "@/components/statistics/PlayerStatsTable"
import { BarChart3 } from "lucide-react"

export default function StatisticsPage() {
  const [selectedLeague, setSelectedLeague] = useState("Premier League")

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      
      {/* Page Header */}
      <div>
        <h1 className="font-headline text-3xl md:text-5xl font-extrabold uppercase text-brand-dark flex items-center gap-2">
          <BarChart3 className="h-8 w-8 text-brand-red" />
          Sports Analytics & Stats
        </h1>
        <p className="text-xs md:text-sm text-neutral-500 font-semibold">
          Detailed standings tables, player performance statistics, and league leaders.
        </p>
      </div>

      {/* Main Tabs Container */}
      <Tabs defaultValue="tables" className="w-full">
        
        {/* Tabs Triggers List */}
        <TabsList className="w-full max-w-md grid grid-cols-3 mb-6 bg-neutral-100 p-1 rounded-xl border border-neutral-200">
          <TabsTrigger value="tables" className="font-bold uppercase text-xs md:text-sm">
            League Tables
          </TabsTrigger>
          <TabsTrigger value="scorers" className="font-bold uppercase text-xs md:text-sm">
            Top Scorers
          </TabsTrigger>
          <TabsTrigger value="players" className="font-bold uppercase text-xs md:text-sm">
            Player Stats
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: League Standings */}
        <TabsContent value="tables" className="flex flex-col gap-4">
          {/* League Select Trigger */}
          <div className="w-full max-w-xs flex flex-col gap-1.5 mb-2">
            <span className="text-xs font-bold uppercase text-neutral-500">Select League:</span>
            <Select value={selectedLeague} onValueChange={setSelectedLeague}>
              <SelectTrigger>
                <SelectValue placeholder="Select League" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Premier League">Premier League</SelectItem>
                <SelectItem value="La Liga">La Liga</SelectItem>
                <SelectItem value="Serie A">Serie A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Render Standings Table */}
          <LeagueTable league={selectedLeague} />
        </TabsContent>

        {/* Tab 2: Top Scorers */}
        <TabsContent value="scorers">
          <TopScorers />
        </TabsContent>

        {/* Tab 3: Individual Player Analytics */}
        <TabsContent value="players">
          <PlayerStatsTable />
        </TabsContent>

      </Tabs>

    </div>
  )
}
