"use client"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import CategoryBadge from "../ui/CategoryBadge"
import { Clock, User } from "lucide-react"
import { formatShortDate } from "@/lib/utils"
import { useTranslation } from "@/lib/useTranslation"

export interface ArticleCardProps {
  article: any
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const { lang } = useTranslation()

  if (!article) return null

  const imageUrl = article.display_image || article.image_url || article.imageUrl || "/images/placeholder.jpg"
  const categoryName = article.categories?.[0]?.name || article.category || "Sports"
  const authorName = article.author_name || article.author || "Reporter"
  const publishedDate = article.pub_date || article.created_at || article.publishedAt

  return (
    <Link href={`/${lang}/article/${article.slug}`} className="group flex flex-col h-full bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow select-none">
      {/* Aspect Ratio Video Container for Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
        <Image
          src={imageUrl}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Category Badge overlay */}
        <div className="absolute top-3 left-3 z-10">
          <CategoryBadge category={categoryName} />
        </div>
      </div>

      {/* Info Content */}
      <div className="flex flex-col grow p-4">
        {/* Meta Info */}
        <div className="flex items-center gap-3 text-[10px] md:text-xs text-neutral-500 font-semibold mb-2">
          <span className="flex items-center gap-1">
            <User className="h-3.5 w-3.5 text-neutral-400" />
            {authorName}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-neutral-400" />
            {formatShortDate(publishedDate)}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-headline text-lg md:text-xl font-bold uppercase text-brand-dark leading-tight line-clamp-3 mb-2 group-hover:text-brand-red transition-colors">
          {article.title}
        </h3>

        {/* Excerpt if present */}
        {(article.description || article.excerpt) && (
          <p className="text-xs md:text-sm text-neutral-650 line-clamp-2 mt-auto font-normal">
            {article.description || article.excerpt}
          </p>
        )}
      </div>
    </Link>
  )
}

export default ArticleCard
