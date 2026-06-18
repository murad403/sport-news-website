import React from "react"
import { Article } from "@/lib/types"
import { mockArticles } from "@/lib/mockData"
import ArticleCard from "./ArticleCard"

export interface RelatedArticlesProps {
  currentArticleId: string
  category: string
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ currentArticleId, category }) => {
  // Filter out the current article, and try to find articles of the same category
  let related = mockArticles.filter(
    (art) => art.id !== currentArticleId && art.category === category
  )

  // If there are less than 3, backfill with other articles
  if (related.length < 3) {
    const backup = mockArticles.filter(
      (art) => art.id !== currentArticleId && art.category !== category
    )
    related = [...related, ...backup].slice(0, 3)
  } else {
    related = related.slice(0, 3)
  }

  return (
    <div className="w-full mt-12 select-none">
      <h3 className="font-headline text-2xl md:text-3xl font-bold uppercase text-brand-dark border-b-2 border-brand-red pb-2 mb-6">
        Related Articles
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {related.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}

export default RelatedArticles
