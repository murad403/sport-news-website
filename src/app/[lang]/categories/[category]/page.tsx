"use client"

import React, { useState, useMemo } from "react"
import { getLocalCategoryName } from "@/lib/localizer"
import ArticleCardHorizontal from "@/components/articles/ArticleCardHorizontal"
import Sidebar from "@/components/layout/Sidebar"
import { Trophy, Loader2 } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"
import { useGetNewsQuery } from "@/redux/features/news/news.api"
import CustomPagination from "@/components/shared/CustomPagination"

const PAGE_SIZE = 20

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

const mapCategorySlugToBackend = (cat: string): string => {
  const lower = cat.toLowerCase()
  if (lower === "calcio") return "football"
  if (lower === "basket") return "basketball"
  return lower
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const unwrappedParams = React.use(params)
  const category = unwrappedParams.category
  
  const { lang } = useTranslation()
  const isIt = lang === "it"
  const [page, setPage] = useState(1)

  const backendCategory = useMemo(() => {
    return mapCategorySlugToBackend(category)
  }, [category])

  // Fetch news dynamically from backend
  const { data: newsResponse, isLoading, isFetching } = useGetNewsQuery({
    category: backendCategory,
    page
  })

  // Feed API response results directly
  const articles = useMemo(() => {
    return newsResponse?.results || []
  }, [newsResponse])

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
          {isLoading || isFetching ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
              <p className="text-xs text-neutral-500 font-semibold">
                {isIt ? "Caricamento articoli..." : "Loading articles..."}
              </p>
            </div>
          ) : articles.length > 0 ? (
            <div className="flex flex-col gap-5">
              {articles.map((article) => (
                <ArticleCardHorizontal key={article.id} article={article} />
              ))}

              {/* Pagination Controls */}
              {newsResponse && newsResponse.count > PAGE_SIZE && (
                <CustomPagination
                  currentPage={page}
                  count={newsResponse.count}
                  pageSize={PAGE_SIZE}
                  onPageChange={(p) => {
                    setPage(p)
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                />
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
