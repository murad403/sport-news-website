import React from "react"
import Link from "next/link"
import { mockArticles } from "@/lib/mockData"
import ArticleCard from "../articles/ArticleCard"
import Button from "../ui/Button"
import { ChevronRight } from "lucide-react"

export interface CategoryNewsGridProps {
  category: string
}

const CategoryNewsGrid: React.FC<CategoryNewsGridProps> = ({ category }) => {
  // Filter mock articles by category and take the first 3
  const categoryArticles = mockArticles
    .filter((article) => article.category.toLowerCase() === category.toLowerCase())
    .slice(0, 3)

  if (categoryArticles.length === 0) return null

  return (
    <div className="w-full my-8 select-none">
      
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-6">
        <h3 className="font-headline text-2xl md:text-3xl font-extrabold uppercase text-brand-dark flex items-center gap-2">
          <span className="h-6 w-1 bg-brand-red inline-block rounded-full" />
          {category} News
        </h3>
        
        <Link href={`/categories/${category}`}>
          <Button variant="ghost" size="sm" className="font-semibold text-xs md:text-sm text-brand-red flex items-center gap-1">
            View All {category}
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
