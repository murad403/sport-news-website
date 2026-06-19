"use client"
import React from "react"
import { cn } from "@/lib/utils"
import { Shield, Award, Medal } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"

export interface SponsorCardProps {
  name: string
  logoText: string
  tier: "gold" | "silver" | "bronze"
  description: string
  websiteUrl?: string
  buttonText?: string
}

const tierMeta = {
  gold: {
    color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    icon: Award
  },
  silver: {
    color: "bg-slate-400/10 text-slate-500 border-slate-400/20",
    icon: Shield
  },
  bronze: {
    color: "bg-amber-600/10 text-amber-700 border-amber-600/20",
    icon: Medal
  }
}

const SponsorCard: React.FC<SponsorCardProps> = ({ name, logoText, tier, description, websiteUrl, buttonText }) => {
  const { lang } = useTranslation()
  const isIt = lang === "it"

  const meta = tierMeta[tier]
  const Icon = meta.icon

  const tierLabels = {
    gold: isIt ? "Sponsor Oro" : "Gold Sponsor",
    silver: isIt ? "Sponsor Argento" : "Silver Sponsor",
    bronze: isIt ? "Sponsor Bronzo" : "Bronze Sponsor"
  }

  return (
    <div className="flex flex-col h-full bg-white border border-neutral-200 rounded-xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <span
          className={cn(
            "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border",
            meta.color
          )}
        >
          <Icon className="h-3 w-3" />
          {tierLabels[tier]}
        </span>
      </div>

      <div className="flex items-center justify-center h-24 bg-neutral-50 border border-dashed border-neutral-200 rounded-lg mb-4 select-none">
        <span className="font-headline text-3xl font-bold tracking-wider text-neutral-400">
          {logoText}
        </span>
      </div>

      <h3 className="font-headline text-xl font-bold text-brand-dark mb-1">{name}</h3>
      <p className="text-sm text-neutral-600 grow mb-4">{description}</p>

      {websiteUrl && (
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-brand-red hover:underline inline-flex items-center"
        >
          {buttonText || (isIt ? "Visita il Sito Ufficiale →" : "Visit Partner Website →")}
        </a>
      )}
    </div>
  )
}

export default SponsorCard
