"use client"

import React, { useState, useMemo } from "react"
import { mockArticles } from "@/lib/mockData"
import ArticleCardHorizontal from "@/components/articles/ArticleCardHorizontal"
import Sidebar from "@/components/layout/Sidebar"
import Button from "@/components/ui/Button"
import { Filter, Trophy } from "lucide-react"

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const unwrappedParams = React.use(params)
  const category = unwrappedParams.category
  
  const [visibleCount, setVisibleCount] = useState(5)

  // Filter articles by category
  const filteredArticles = useMemo(() => {
    return mockArticles.filter(
      (art) => art.category.toLowerCase() === category.toLowerCase()
    )
  }, [category])

  const currentArticles = useMemo(() => {
    return filteredArticles.slice(0, visibleCount)
  }, [filteredArticles, visibleCount])

  const hasMore = filteredArticles.length > visibleCount

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3)
  }

  // Capitalize category name for presentation
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      
      {/* Page Header */}
      <div>
        <h1 className="font-headline text-3xl md:text-5xl font-extrabold uppercase text-brand-dark flex items-center gap-2">
          <Trophy className="h-8 w-8 text-brand-red" />
          {categoryTitle} News
        </h1>
        <p className="text-xs md:text-sm text-neutral-500 font-semibold">
          Explore all latest bulletins, match analyses, and reports in {categoryTitle}.
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
                    Load More Articles
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-neutral-200 rounded-xl p-10 text-center text-neutral-500">
              No news found in this category.
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
