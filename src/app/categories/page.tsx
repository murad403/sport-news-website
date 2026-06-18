import React from "react"
import Link from "next/link"
import { Trophy, ChevronRight } from "lucide-react"

interface CategoryCard {
  name: string
  icon: string
  color: string
  description: string
}

const categories: CategoryCard[] = [
  { name: "Football", icon: "⚽", color: "from-red-500 to-red-600 shadow-red-500/10", description: "Match reports, leagues, transfer news and stats." },
  { name: "Tennis", icon: "🎾", color: "from-blue-500 to-blue-600 shadow-blue-500/10", description: "Grand Slam updates, player stats and match center." },
  { name: "Basketball", icon: "🏀", color: "from-orange-500 to-orange-600 shadow-orange-500/10", description: "NBA, EuroLeague, scores and drafts updates." },
  { name: "F1", icon: "🏎️", color: "from-purple-500 to-purple-600 shadow-purple-500/10", description: "Monaco GP, driver contracts, racing results." },
  { name: "Cricket", icon: "🏏", color: "from-emerald-500 to-emerald-600 shadow-emerald-500/10", description: "T20 World Cup, IPL Retentions, live bulletins." },
  { name: "Rugby", icon: "🏉", color: "from-cyan-500 to-cyan-600 shadow-cyan-500/10", description: "Six Nations, matches, standings and news." },
  { name: "Golf", icon: "⛳", color: "from-teal-500 to-teal-600 shadow-teal-500/10", description: "Ryder Cup, captains briefings, major results." }
]

export default function CategoriesIndexPage() {
  return (
    <div className="w-full flex flex-col gap-6 select-none">
      
      {/* Page Header */}
      <div>
        <h1 className="font-headline text-3xl md:text-5xl font-extrabold uppercase text-brand-dark flex items-center gap-2">
          <Trophy className="h-8 w-8 text-brand-red" />
          Browse by Sport
        </h1>
        <p className="text-xs md:text-sm text-neutral-500 font-semibold">
          Select a category to view latest match updates, news, and analysis.
        </p>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-4">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/categories/${cat.name}`}
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
                {cat.name}
              </h3>
              <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                {cat.description}
              </p>
            </div>
            
            {/* Background Glow */}
            <div className={`absolute bottom-0 right-0 h-1.5 w-full bg-gradient-to-r ${cat.color}`} />
          </Link>
        ))}
      </div>

    </div>
  )
}
