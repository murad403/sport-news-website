"use client"

import React, { useMemo } from "react"
import LiveScoresBar from "@/components/home/LiveScoresBar"
import HeroSection from "@/components/home/HeroSection"
import FeaturedArticles from "@/components/home/FeaturedArticles"
import CategoryNewsGrid from "@/components/home/CategoryNewsGrid"
import AdBanner from "@/components/home/AdBanner"
import { useGetNewsQuery, useGetFeaturedNewsQuery } from "@/redux/features/news/news.api"
import { Loader2 } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"

interface HomePageProps {
  params: Promise<{ lang: string }>
}

export default function HomePage({ params }: HomePageProps) {
  const unwrappedParams = React.use(params)
  const lang = unwrappedParams.lang
  const { t } = useTranslation()
  const isIt = lang === "it"

  // Fetch news for Hero section and Featured articles
  const { data: newsResponse, isLoading: isNewsLoading } = useGetNewsQuery({ page: 1 })
  const { data: featuredResponse, isLoading: isFeaturedLoading } = useGetFeaturedNewsQuery()

  // Extract Hero articles (first 3)
  const heroArticles = useMemo(() => {
    return newsResponse?.results?.slice(0, 3) || []
  }, [newsResponse])

  // Extract Featured articles
  const featuredArticles = useMemo(() => {
    return featuredResponse?.results || []
  }, [featuredResponse])

  const showLoading = isNewsLoading || isFeaturedLoading

  return (
    <div className="flex flex-col w-full gap-2">
      {/* 1. Live Scores Row */}
      <div className="-mx-4 -mt-6 mb-4">
        <LiveScoresBar />
      </div>

      {showLoading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-3 select-none">
          <Loader2 className="h-10 w-10 animate-spin text-brand-red" />
          <p className="text-sm text-neutral-500 font-semibold">
            {isIt ? "Caricamento notizie..." : "Loading news..."}
          </p>
        </div>
      ) : (
        <>
          {/* 2. Hero Section */}
          {heroArticles.length > 0 && (
            <HeroSection articles={heroArticles} />
          )}

          {/* 3. Featured Articles Grid */}
          {featuredArticles.length > 0 && (
            <FeaturedArticles articles={featuredArticles} />
          )}

          {/* 4. Football Category Section */}
          <CategoryNewsGrid category="Football" />

          {/* 5. Leaderboard Advertisement */}
          <AdBanner />

          {/* 6. Tennis Category Section */}
          <CategoryNewsGrid category="Tennis" />

          {/* 7. Basketball Category Section */}
          <CategoryNewsGrid category="Basketball" />
          
          <CategoryNewsGrid category="F1" />

          <CategoryNewsGrid category="Golf" />

          <CategoryNewsGrid category="Rugby" />
        </>
      )}
    </div>
  )
}
