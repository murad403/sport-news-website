"use client"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import CategoryBadge from "../ui/CategoryBadge"
import { Clock, User } from "lucide-react"
import { formatShortDate } from "@/lib/utils"
import { useTranslation } from "@/lib/useTranslation"

export interface ArticleCardLargeProps {
  article: any
  showExcerpt?: boolean
}

const ArticleCardLarge: React.FC<ArticleCardLargeProps> = ({ article, showExcerpt = true }) => {
  const { lang } = useTranslation()

  if (!article) return null

  const imageUrl = article.display_image || article.image_url || article.imageUrl || "/images/placeholder.jpg"
  const categoryName = article.categories?.[0]?.name || article.category || "Sports"
  const authorName = article.author_name || article.author || "Reporter"
  const publishedDate = article.pub_date || article.created_at || article.publishedAt

  // Calculate reading time dynamically from content or use pre-calculated
  const readingTime = article.readingTime || (() => {
    const wordCount = (article.content || "").trim().split(/\s+/).length
    return Math.max(1, Math.ceil(wordCount / 200))
  })()

  return (
    <Link
      href={`/${lang}/article/${article.slug}`}
      className="group relative flex flex-col justify-end w-full h-[320px] md:h-[480px] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-brand-dark select-none"
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-neutral-900 z-0">
        <Image
          src={imageUrl}
          alt={article.title}
          fill
          sizes="(max-width: 1024px) 100vw, 80vw"
          priority
          className="object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-75"
        />
        {/* Dark linear gradient overlay for readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent z-10" />
      </div>

      {/* Top Overlaid Badge */}
      <div className="absolute top-4 left-4 z-20">
        <CategoryBadge category={categoryName} className="px-3 py-1 text-xs md:text-sm font-extrabold shadow-md" />
      </div>

      {/* Details Container */}
      <div className="relative z-20 p-6 md:p-8 flex flex-col gap-2 md:gap-3 text-white max-w-4xl">
        {/* Metadata */}
        <div className="flex items-center gap-4 text-xs font-semibold text-neutral-300">
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4 text-brand-red" />
            {authorName}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-neutral-400" />
            {formatShortDate(publishedDate)}
          </span>
          <span className="bg-white/10 px-2 py-0.5 rounded text-[10px]">
            {lang === "it" ? `${readingTime} min lettura` : `${readingTime} min read`}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-headline text-2xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white leading-[1.05] group-hover:text-brand-red transition-colors duration-200">
          {article.title}
        </h2>

        {/* Excerpt */}
        {showExcerpt && (article.description || article.excerpt) && (
          <p className="text-neutral-200 text-xs md:text-sm leading-relaxed line-clamp-2 hidden sm:block max-w-2xl font-light">
            {article.description || article.excerpt}
          </p>
        )}
      </div>
    </Link>
  )
}

export default ArticleCardLarge
