import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Article } from "@/lib/types"
import CategoryBadge from "../ui/CategoryBadge"
import { Clock, User } from "lucide-react"
import { formatShortDate } from "@/lib/utils"
import { useTranslation } from "@/lib/useTranslation"

export interface ArticleCardHorizontalProps {
  article: Article
}

const ArticleCardHorizontal: React.FC<ArticleCardHorizontalProps> = ({ article }) => {
  const { lang } = useTranslation()
  const isIt = lang === "it"

  return (
    <Link
      href={`/${lang}/article/${article.slug}`}
      className="group flex flex-col sm:flex-row gap-4 bg-white border border-neutral-200 rounded-xl overflow-hidden p-3 shadow-sm hover:shadow-md transition-shadow select-none w-full"
    >
      {/* Left Thumbnail */}
      <div className="relative aspect-video sm:aspect-square sm:w-44 shrink-0 rounded-lg overflow-hidden bg-neutral-100">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          sizes="(max-width: 640px) 100vw, 200px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Category Overlay for Mobile */}
        <div className="absolute top-2.5 left-2.5 sm:hidden">
          <CategoryBadge category={article.category} />
        </div>
      </div>

      {/* Right Content */}
      <div className="flex flex-col justify-between py-1 grow">
        <div className="flex flex-col gap-1.5">
          {/* Category overlay for Desktop */}
          <div className="hidden sm:block">
            <CategoryBadge category={article.category} />
          </div>

          {/* Title */}
          <h3 className="font-headline text-lg font-bold uppercase text-brand-dark leading-snug group-hover:text-brand-red transition-colors line-clamp-2">
            {article.title}
          </h3>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-xs md:text-sm text-neutral-600 line-clamp-2 font-normal">
              {article.excerpt}
            </p>
          )}
        </div>

        {/* Footer Meta Info */}
        <div className="flex items-center gap-4 text-[10px] md:text-xs text-neutral-500 font-semibold mt-3 sm:mt-0">
          <span className="flex items-center gap-1">
            <User className="h-3.5 w-3.5 text-neutral-400" />
            {article.author}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-neutral-400" />
            {formatShortDate(article.publishedAt)}
          </span>
          <span className="ml-auto text-neutral-400">
            {article.readingTime} {isIt ? "minuti lettura" : "min read"}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ArticleCardHorizontal
