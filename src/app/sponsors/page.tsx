import React from "react"
import Link from "next/link"
import SponsorCard from "@/components/ui/SponsorCard"
import Button from "@/components/ui/Button"
import { Sparkles, Calendar, Heart, Shield } from "lucide-react"

export default function SponsorsPage() {
  const currentSponsors = [
    { name: "Apex Sports Gear", logoText: "APEX", tier: "gold" as const, description: "Providing state-of-the-art sports apparel and gear to athletes worldwide.", url: "https://example.com" },
    { name: "Velocity Energy", logoText: "VELOCITY", tier: "gold" as const, description: "Fueling champions with healthy sports drinks and energy boosters.", url: "https://example.com" },
    { name: "Nova Watches", logoText: "NOVA", tier: "silver" as const, description: "Official timekeeper of global racing events and championship tournaments.", url: "https://example.com" },
    { name: "Omni Health", logoText: "OMNI", tier: "silver" as const, description: "Innovative physiotherapy solutions and sports recovery therapy programs.", url: "https://example.com" },
    { name: "Summit Drinks", logoText: "SUMMIT", tier: "bronze" as const, description: "Pure mineral spring water from alpine ridges, keeping athletes hydrated.", url: "https://example.com" }
  ]

  const packages = [
    {
      name: "Bronze Placement",
      price: "$299",
      impressions: "10,000+",
      features: [
        "Standard Sidebar banner (300x250)",
        "Rotation across all sports reports",
        "Analytics reports dashboard",
        "Cancel anytime"
      ],
      color: "border-amber-600/30"
    },
    {
      name: "Silver Feature",
      price: "$699",
      impressions: "50,000+",
      features: [
        "Homepage featured ad banners",
        "Mid-article ad placements",
        "Co-branded content tag coverage",
        "Dedicated analytics advisor",
        "Priority ad load priority"
      ],
      color: "border-slate-400/40 relative scale-105 shadow-md",
      featured: true
    },
    {
      name: "Gold Premium",
      price: "$1,499",
      impressions: "200,050+",
      features: [
        "Sticky homepage premium banner",
        "Weekly newsletter spotlight",
        "Custom editorial review article",
        "Direct API report feeds",
        "Dedicated customer support team"
      ],
      color: "border-yellow-500/30"
    }
  ]

  return (
    <div className="w-full flex flex-col gap-10 select-none">
      
      {/* 1. Hero Section */}
      <section className="bg-brand-dark text-white rounded-2xl p-8 md:p-12 text-center relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 h-48 w-48 bg-brand-red/10 rounded-full blur-3xl -translate-y-12 translate-x-12 animate-pulse" />
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-4 relative z-10">
          <span className="inline-flex items-center gap-1 bg-brand-red/10 border border-brand-red/20 text-brand-red px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            Partner With SportsPulse
          </span>
          <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-none">
            Boost Your Brand Reach
          </h1>
          <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-light">
            Advertise with the fastest growing professional sports platform. Access highly engaged sports fans, statistics analysts, and fantasy managers globally.
          </p>
          <Link href="/contact" className="mt-4">
            <Button size="lg" className="rounded-full font-bold">
              Become a Partner Today
            </Button>
          </Link>
        </div>
      </section>

      {/* 2. Ad Package Pricing Cards */}
      <section className="flex flex-col gap-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-headline text-2xl md:text-4xl font-extrabold uppercase text-brand-dark">
            Advertising Packages
          </h2>
          <p className="text-xs md:text-sm text-neutral-500 font-semibold">
            Choose the visibility package that matches your business goal and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 items-stretch">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`bg-white border rounded-2xl p-6 flex flex-col justify-between ${pkg.color}`}
            >
              {pkg.featured && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-brand-red text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="font-headline text-xl font-bold uppercase text-brand-dark mb-1">{pkg.name}</h3>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-3xl font-bold text-brand-dark">{pkg.price}</span>
                  <span className="text-xs text-neutral-500 font-semibold">/ month</span>
                </div>
                
                <div className="bg-neutral-50 border border-neutral-100 rounded-lg px-3 py-2 text-xs font-semibold text-neutral-600 mb-6 flex items-center justify-between">
                  <span>Guaranteed impressions:</span>
                  <strong className="text-brand-red">{pkg.impressions}</strong>
                </div>

                <ul className="flex flex-col gap-3.5 mb-8 text-xs font-semibold text-neutral-600">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <span className="text-brand-red font-bold">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/contact" className="w-full">
                <Button variant={pkg.featured ? "default" : "outline"} className="w-full font-bold">
                  Inquire Now
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Current Partners Section */}
      <section className="flex flex-col gap-6">
        <div className="border-b border-neutral-200 pb-3">
          <h2 className="font-headline text-2xl md:text-3xl font-extrabold uppercase text-brand-dark">
            Our Official Partners
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentSponsors.map((sponsor) => (
            <SponsorCard
              key={sponsor.name}
              name={sponsor.name}
              logoText={sponsor.logoText}
              tier={sponsor.tier}
              description={sponsor.description}
              websiteUrl={sponsor.url}
            />
          ))}
        </div>
      </section>

    </div>
  )
}
