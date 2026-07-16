"use client"
import React from "react"
import ArticleCard from "../articles/ArticleCard"
import { useTranslation } from "@/lib/useTranslation"

export interface FeaturedArticlesProps {
  articles: any[]
}

const FeaturedArticles: React.FC<FeaturedArticlesProps> = ({ articles }) => {
  const { t } = useTranslation()

  return (
    <div className="w-full my-8 select-none">
      <h3 className="font-headline text-2xl md:text-3xl font-extrabold uppercase text-brand-dark border-b-2 border-brand-red pb-2 mb-6">
        {t.home.featured}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}

export default FeaturedArticles
