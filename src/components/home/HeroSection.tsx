import React from "react"
import { Article } from "@/lib/types"
import ArticleCardLarge from "../articles/ArticleCardLarge"
import ArticleCard from "../articles/ArticleCard"

export interface HeroSectionProps {
  articles: Article[]
}

const HeroSection: React.FC<HeroSectionProps> = ({ articles }) => {
  // We need at least 3 articles
  const mainArticle = articles[0]
  const sideArticles = articles.slice(1, 3)

  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-10 gap-6 my-6 select-none">
      
      {/* Main Feature: Left 60% (6 cols of 10) */}
      <div className="lg:col-span-6 h-full flex flex-col">
        {mainArticle && (
          <ArticleCardLarge article={mainArticle} />
        )}
      </div>

      {/* Side Stories: Right 40% (4 cols of 10) */}
      <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
        {sideArticles.map((article) => (
          <div key={article.id} className="flex-1 h-[228px]">
            <ArticleCard article={article} />
          </div>
        ))}
      </div>

    </section>
  )
}

export default HeroSection
