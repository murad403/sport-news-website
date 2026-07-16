"use client"
import React, { useMemo } from "react"
import Link from "next/link"
import { getLocalCategoryName } from "@/lib/localizer"
import ArticleCard from "../articles/ArticleCard"
import Button from "../ui/Button"
import { ChevronRight, Loader2 } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"
import { useGetNewsQuery } from "@/redux/features/news/news.api"

export interface CategoryNewsGridProps {
  category: string
}

const mapCategorySlugToBackend = (cat: string): string => {
  const lower = cat.toLowerCase()
  if (lower === "calcio") return "football"
  if (lower === "basket") return "basketball"
  return lower
}

const CategoryNewsGrid: React.FC<CategoryNewsGridProps> = ({ category }) => {
  const { lang } = useTranslation()
  const isIt = lang === "it"

  const backendCategory = useMemo(() => {
    return mapCategorySlugToBackend(category)
  }, [category])

  // Fetch articles for the category from backend
  const { data: newsResponse, isLoading } = useGetNewsQuery({
    category: backendCategory,
    page: 1
  })

  // Take the first 3 articles
  const categoryArticles = useMemo(() => {
    return newsResponse?.results?.slice(0, 3) || []
  }, [newsResponse])

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-10 select-none">
        <Loader2 className="h-6 w-6 animate-spin text-brand-red mr-2" />
        <span className="text-xs text-neutral-500 font-semibold">
          {isIt ? "Caricamento notizie..." : "Loading news..."}
        </span>
      </div>
    )
  }

  if (categoryArticles.length === 0) return null

  const localizedCategoryName = getLocalCategoryName(category, lang)

  return (
    <div className="w-full my-8 select-none">
      
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-6">
        <h3 className="font-headline text-2xl md:text-3xl font-extrabold uppercase text-brand-dark flex items-center gap-2">
          <span className="h-6 w-1 bg-brand-red inline-block rounded-full" />
          {isIt ? `Notizie ${localizedCategoryName}` : `${localizedCategoryName} News`}
        </h3>
        
        <Link href={`/${lang}/categories/${category}`}>
          <Button variant="ghost" size="sm" className="font-semibold text-xs md:text-sm text-brand-red flex items-center gap-1">
            {isIt ? "Vedi Tutto" : "View All"} {localizedCategoryName}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

    </div>
  )
}

export default CategoryNewsGrid
