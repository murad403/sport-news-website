import React from "react"
import Link from "next/link"
import { Trophy, ChevronRight } from "lucide-react"

interface CategoryCard {
  key: string
  nameIt: string
  nameEn: string
  icon: string
  color: string
  descIt: string
  descEn: string
}

const categories: CategoryCard[] = [
  { key: "Football", nameIt: "Calcio", nameEn: "Football", icon: "⚽", color: "from-red-500 to-red-600 shadow-red-500/10", descIt: "Resoconti delle partite, campionati, calciomercato e statistiche.", descEn: "Match reports, leagues, transfer news and stats." },
  { key: "Tennis", nameIt: "Tennis", nameEn: "Tennis", icon: "🎾", color: "from-blue-500 to-blue-600 shadow-blue-500/10", descIt: "Aggiornamenti sui Grand Slam, statistiche dei giocatori e centro partite.", descEn: "Grand Slam updates, player stats and match center." },
  { key: "Basketball", nameIt: "Basket", nameEn: "Basketball", icon: "🏀", color: "from-orange-500 to-orange-600 shadow-orange-500/10", descIt: "NBA, EuroLeague, risultati e aggiornamenti sui draft.", descEn: "NBA, EuroLeague, scores and drafts updates." },
  { key: "F1", nameIt: "F1", nameEn: "F1", icon: "🏎️", color: "from-purple-500 to-purple-600 shadow-purple-500/10", descIt: "GP di Monaco, contratti dei piloti, risultati delle gare.", descEn: "Monaco GP, driver contracts, racing results." },
  { key: "Cricket", nameIt: "Cricket", nameEn: "Cricket", icon: "🏏", color: "from-emerald-500 to-emerald-600 shadow-emerald-500/10", descIt: "Coppa del mondo T20, notizie IPL, bollettini in tempo reale.", descEn: "T20 World Cup, IPL Retentions, live bulletins." },
  { key: "Rugby", nameIt: "Rugby", nameEn: "Rugby", icon: "🏉", color: "from-cyan-500 to-cyan-600 shadow-cyan-500/10", descIt: "Sei Nazioni, partite, classifiche e notizie.", descEn: "Six Nations, matches, standings and news." },
  { key: "Golf", nameIt: "Golf", nameEn: "Golf", icon: "⛳", color: "from-teal-500 to-teal-600 shadow-teal-500/10", descIt: "Ryder Cup, dichiarazioni dei capitani, risultati principali.", descEn: "Ryder Cup, captains briefings, major results." }
]

export default async function CategoriesIndexPage({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const isIt = lang === "it"

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      
      {/* Page Header */}
      <div>
        <h1 className="font-headline text-3xl md:text-5xl font-extrabold uppercase text-brand-dark flex items-center gap-2">
          <Trophy className="h-8 w-8 text-brand-red" />
          {isIt ? "Sfoglia per Sport" : "Browse by Sport"}
        </h1>
        <p className="text-xs md:text-sm text-neutral-500 font-semibold">
          {isIt 
            ? "Seleziona una categoria per visualizzare gli ultimi aggiornamenti, notizie e analisi."
            : "Select a category to view latest match updates, news, and analysis."}
        </p>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-4">
        {categories.map((cat) => (
          <Link
            key={cat.key}
            href={`/${lang}/categories/${cat.key}`}
            className="group flex flex-col justify-between bg-white border border-neutral-200 hover:border-neutral-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
          >
            {/* Top Row: Icon & Arrow */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl select-none">{cat.icon}</span>
              <div className="h-8 w-8 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition-colors">
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>

            {/* Title & Desc */}
            <div>
              <h3 className="font-headline text-2xl font-extrabold text-brand-dark group-hover:text-brand-red transition-colors mb-1">
                {isIt ? cat.nameIt : cat.nameEn}
              </h3>
              <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                {isIt ? cat.descIt : cat.descEn}
              </p>
            </div>
            
            {/* Background Glow */}
            <div className={`absolute bottom-0 right-0 h-1.5 w-full bg-linear-to-r ${cat.color}`} />
          </Link>
        ))}
      </div>

    </div>
  )
}
