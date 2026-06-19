"use client"

import React, { useState, useMemo } from "react"
import { getLocalArticles, getLocalCategoryName } from "@/lib/localizer"
import ArticleCardHorizontal from "@/components/articles/ArticleCardHorizontal"
import Sidebar from "@/components/layout/Sidebar"
import Button from "@/components/ui/Button"
import { Trophy } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const unwrappedParams = React.use(params)
  const category = unwrappedParams.category
  
  const { lang } = useTranslation()
  const isIt = lang === "it"
  const [visibleCount, setVisibleCount] = useState(5)

  // Filter articles by category and localized variants
  const filteredArticles = useMemo(() => {
    const articles = getLocalArticles(lang)
    return articles.filter(
      (art) => art.category.toLowerCase() === category.toLowerCase() || 
        (category.toLowerCase() === "football" && art.category.toLowerCase() === "calcio") ||
        (category.toLowerCase() === "calcio" && art.category.toLowerCase() === "football") ||
        (category.toLowerCase() === "basketball" && art.category.toLowerCase() === "basket") ||
        (category.toLowerCase() === "basket" && art.category.toLowerCase() === "basketball")
    )
  }, [category, lang])

  const currentArticles = useMemo(() => {
    return filteredArticles.slice(0, visibleCount)
  }, [filteredArticles, visibleCount])

  const hasMore = filteredArticles.length > visibleCount

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3)
  }

  // Localized category title for presentation
  const localizedCategoryName = getLocalCategoryName(category, lang)
  const categoryTitle = localizedCategoryName.charAt(0).toUpperCase() + localizedCategoryName.slice(1)

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      
      {/* Page Header */}
      <div>
        <h1 className="font-headline text-3xl md:text-5xl font-extrabold uppercase text-brand-dark flex items-center gap-2">
          <Trophy className="h-8 w-8 text-brand-red" />
          {isIt ? `Notizie ${categoryTitle}` : `${categoryTitle} News`}
        </h1>
        <p className="text-xs md:text-sm text-neutral-500 font-semibold">
          {isIt 
            ? `Esplora tutti gli ultimi bollettini, analisi delle partite e resoconti in ${categoryTitle}.`
            : `Explore all latest bulletins, match analyses, and reports in ${categoryTitle}.`}
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        
        {/* News Feed List (Left, 70%) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {filteredArticles.length > 0 ? (
            <div className="flex flex-col gap-5">
              {currentArticles.map((article) => (
                <ArticleCardHorizontal key={article.id} article={article} />
              ))}

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center mt-4">
                  <Button onClick={handleLoadMore} variant="outline" className="px-8 font-semibold">
                    {isIt ? "Carica altri articoli" : "Load More Articles"}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-neutral-200 rounded-xl p-10 text-center text-neutral-500">
              {isIt ? "Nessuna notizia trovata in questa categoria." : "No news found in this category."}
            </div>
          )}
        </div>

        {/* Sidebar (Right, 30%) */}
        <div className="lg:col-span-3">
          <Sidebar />
        </div>

      </div>

    </div>
  )
}
