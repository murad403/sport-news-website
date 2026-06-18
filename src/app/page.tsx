import React from "react"
import { mockArticles } from "@/lib/mockData"
import LiveScoresBar from "@/components/home/LiveScoresBar"
import HeroSection from "@/components/home/HeroSection"
import FeaturedArticles from "@/components/home/FeaturedArticles"
import CategoryNewsGrid from "@/components/home/CategoryNewsGrid"
import AdBanner from "@/components/home/AdBanner"

export const revalidate = 60 // Revalidate home page every 60s

export default function HomePage() {
  // Separate articles for homepage components
  const heroArticles = mockArticles.slice(0, 3)
  const featuredArticles = mockArticles.slice(3, 7)

  return (
    <div className="flex flex-col w-full gap-2">
      {/* 1. Live Scores Row */}
      <div className="-mx-4 -mt-6 mb-4">
        <LiveScoresBar />
      </div>

      {/* 2. Hero Section */}
      <HeroSection articles={heroArticles} />

      {/* 3. Featured Articles Grid */}
      <FeaturedArticles articles={featuredArticles} />

      {/* 4. Football Category Section */}
      <CategoryNewsGrid category="Football" />

      {/* 5. Leaderboard Advertisement */}
      <AdBanner />

      {/* 6. Tennis Category Section */}
      <CategoryNewsGrid category="Tennis" />

      {/* 7. Basketball Category Section */}
      <CategoryNewsGrid category="Basketball" />
    </div>
  )
}
