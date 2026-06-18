import React from "react"
import { Article } from "@/lib/types"
import ArticleCardHorizontal from "../articles/ArticleCardHorizontal"

export interface LatestNewsProps {
  articles: Article[]
}

const LatestNews: React.FC<LatestNewsProps> = ({ articles }) => {
  return (
    <div className="w-full select-none flex flex-col gap-4">
      {articles.map((article) => (
        <ArticleCardHorizontal key={article.id} article={article} />
      ))}
    </div>
  )
}

export default LatestNews
