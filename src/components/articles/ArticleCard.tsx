import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Article } from "@/lib/types"
import CategoryBadge from "../ui/CategoryBadge"
import { Clock, User } from "lucide-react"
import { formatShortDate } from "@/lib/utils"

export interface ArticleCardProps {
  article: Article
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link href={`/article/${article.slug}`} className="group flex flex-col h-full bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow select-none">
      {/* Aspect Ratio Video Container for Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Category Badge overlay */}
        <div className="absolute top-3 left-3 z-10">
          <CategoryBadge category={article.category} />
        </div>
      </div>

      {/* Info Content */}
      <div className="flex flex-col flex-grow p-4">
        {/* Meta Info */}
        <div className="flex items-center gap-3 text-[10px] md:text-xs text-neutral-500 font-semibold mb-2">
          <span className="flex items-center gap-1">
            <User className="h-3.5 w-3.5 text-neutral-400" />
            {article.author}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-neutral-400" />
            {formatShortDate(article.publishedAt)}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-headline text-lg md:text-xl font-bold uppercase text-brand-dark leading-tight line-clamp-3 mb-2 group-hover:text-brand-red transition-colors">
          {article.title}
        </h3>

        {/* Excerpt if present */}
        {article.excerpt && (
          <p className="text-xs md:text-sm text-neutral-600 line-clamp-2 mt-auto">
            {article.excerpt}
          </p>
        )}
      </div>
    </Link>
  )
}

export default ArticleCard
