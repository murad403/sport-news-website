"use client"

import React, { useMemo } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs"
import { mockTransfers, mockInjuryUpdates, mockArticles } from "@/lib/mockData"
import ArticleCardHorizontal from "@/components/articles/ArticleCardHorizontal"
import { ArrowRight, RefreshCw, AlertCircle, Newspaper, Calendar } from "lucide-react"

export default function PlayerUpdatesPage() {
  
  // Filter articles about players (e.g. Transfers, Injuries or player tags)
  const playerArticles = useMemo(() => {
    return mockArticles.filter((article) =>
      article.tags.some((t) => ["transfers", "injury", "mbappe", "djokovic", "sainz"].includes(t.toLowerCase()))
    )
  }, [])

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      
      {/* Page Header */}
      <div>
        <h1 className="font-headline text-3xl md:text-5xl font-extrabold uppercase text-brand-dark flex items-center gap-2">
          <RefreshCw className="h-8 w-8 text-brand-red" />
          Player Updates & Transfers
        </h1>
        <p className="text-xs md:text-sm text-neutral-500 font-semibold">
          Latest player transfers, injury bulletins, and career updates.
        </p>
      </div>

      {/* Main Tabs Navigation */}
      <Tabs defaultValue="transfers" className="w-full">
        
        {/* Tabs Headers */}
        <TabsList className="w-full max-w-md grid grid-cols-3 mb-6 bg-neutral-100 p-1 rounded-xl border border-neutral-200">
          <TabsTrigger value="transfers" className="font-bold uppercase text-xs md:text-sm">
            Transfers
          </TabsTrigger>
          <TabsTrigger value="injuries" className="font-bold uppercase text-xs md:text-sm">
            Injuries
          </TabsTrigger>
          <TabsTrigger value="news" className="font-bold uppercase text-xs md:text-sm">
            Latest News
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Transfers Feed */}
        <TabsContent value="transfers" className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockTransfers.map((item) => {
              const isConfirmed = item.status === "confirmed"
              const isRumour = item.status === "rumour"
              const isLoan = item.status === "loan"

              return (
                <div
                  key={item.id}
                  className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm hover:border-neutral-300 transition-colors flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        isConfirmed
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : isRumour
                          ? "bg-yellow-100 text-yellow-750 border border-yellow-200"
                          : "bg-blue-100 text-blue-750 border border-blue-200"
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-bold uppercase flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {item.date}
                    </span>
                  </div>

                  <h3 className="font-headline text-2xl font-extrabold text-brand-dark mb-4">
                    {item.player}
                  </h3>

                  {/* Transfer Route Row */}
                  <div className="flex items-center justify-between gap-4 bg-neutral-50 border border-neutral-150 rounded-xl p-3.5 mb-4">
                    <div className="flex flex-col flex-1 text-center">
                      <span className="text-[9px] font-bold uppercase text-neutral-400">From</span>
                      <span className="text-sm font-bold text-brand-dark truncate">{item.fromClub}</span>
                    </div>
                    
                    <div className="shrink-0 bg-white border border-neutral-200 p-2 rounded-full shadow-xs">
                      <ArrowRight className="h-4 w-4 text-brand-red" />
                    </div>

                    <div className="flex flex-col flex-1 text-center">
                      <span className="text-[9px] font-bold uppercase text-neutral-400">To</span>
                      <span className="text-sm font-bold text-brand-red truncate">{item.toClub}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-neutral-500">Estimated Fee:</span>
                    <span className="text-brand-dark font-extrabold text-sm">{item.fee}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </TabsContent>

        {/* Tab 2: Injuries Tracker */}
        <TabsContent value="injuries">
          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-brand-dark text-white px-5 py-4 flex items-center justify-between">
              <h3 className="font-headline text-xl font-bold uppercase tracking-wider flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-brand-red" />
                Injury Bulletin
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50 text-neutral-500 font-bold border-b border-neutral-200 text-xs md:text-sm">
                    <th className="px-5 py-3">Player Name</th>
                    <th className="px-5 py-3">Club / Sport</th>
                    <th className="px-4 py-3">Injury Details</th>
                    <th className="px-4 py-3">Expected Return</th>
                    <th className="px-4 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockInjuryUpdates.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors font-semibold text-neutral-700"
                    >
                      <td className="px-5 py-3 text-brand-dark font-extrabold text-xs md:text-sm">{item.player}</td>
                      <td className="px-5 py-3 text-neutral-600 text-xs md:text-sm">{item.club}</td>
                      <td className="px-4 py-3 text-neutral-600 text-xs md:text-sm">{item.injury}</td>
                      <td className="px-4 py-3 text-neutral-600 text-xs md:text-sm">{item.expectedReturn}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 border border-red-200">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Tab 3: Player Specific News */}
        <TabsContent value="news" className="flex flex-col gap-4">
          {playerArticles.length > 0 ? (
            <div className="flex flex-col gap-4">
              {playerArticles.map((article) => (
                <ArticleCardHorizontal key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-neutral-200 rounded-xl p-10 text-center text-neutral-500">
              No recent player news.
            </div>
          )}
        </TabsContent>

      </Tabs>

    </div>
  )
}
