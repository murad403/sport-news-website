"use client"

import React, { useMemo } from "react"
import ArticleCard from "./ArticleCard"
import { useTranslation } from "@/lib/useTranslation"
import { useGetRelatedNewsQuery } from "@/redux/features/news/news.api"
import { Loader2 } from "lucide-react"

export interface RelatedArticlesProps {
  slug: string
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ slug }) => {
  const { lang } = useTranslation()
  const isIt = lang === "it"

  // Fetch related news from backend using the current article's slug
  const { data: relatedNews, isLoading } = useGetRelatedNewsQuery(slug)

  // Pass backend results directly (ArticleCard is backwards-compatible)
  const related = useMemo(() => {
    if (!relatedNews?.results) return []
    return relatedNews.results.slice(0, 3)
  }, [relatedNews])

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-10 gap-2 select-none">
        <Loader2 className="h-6 w-6 animate-spin text-brand-red" />
        <p className="text-xs text-neutral-500 font-semibold">
          {isIt ? "Caricamento articoli correlati..." : "Loading related articles..."}
        </p>
      </div>
    )
  }

  if (related.length === 0) return null

  return (
    <div className="w-full mt-12 select-none">
      <h3 className="font-headline text-2xl md:text-3xl font-bold uppercase text-brand-dark border-b-2 border-brand-red pb-2 mb-6">
        {isIt ? "Articoli Correlati" : "Related Articles"}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {related.map((article: any) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}

export default RelatedArticles
