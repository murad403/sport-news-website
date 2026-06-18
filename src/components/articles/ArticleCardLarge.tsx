import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Article } from "@/lib/types"
import CategoryBadge from "../ui/CategoryBadge"
import { Clock, User } from "lucide-react"
import { formatShortDate } from "@/lib/utils"

export interface ArticleCardLargeProps {
  article: Article
  showExcerpt?: boolean
}

const ArticleCardLarge: React.FC<ArticleCardLargeProps> = ({ article, showExcerpt = true }) => {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group relative flex flex-col justify-end w-full h-[320px] md:h-[480px] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-brand-dark select-none"
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-neutral-900 z-0">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          sizes="(max-width: 1024px) 100vw, 80vw"
          priority
          className="object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-75"
        />
        {/* Dark linear gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
      </div>

      {/* Top Overlaid Badge */}
      <div className="absolute top-4 left-4 z-20">
        <CategoryBadge category={article.category} className="px-3 py-1 text-xs md:text-sm font-extrabold shadow-md" />
      </div>

      {/* Details Container */}
      <div className="relative z-20 p-6 md:p-8 flex flex-col gap-2 md:gap-3 text-white max-w-4xl">
        {/* Metadata */}
        <div className="flex items-center gap-4 text-xs font-semibold text-neutral-300">
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4 text-brand-red" />
            {article.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-neutral-400" />
            {formatShortDate(article.publishedAt)}
          </span>
          <span className="bg-white/10 px-2 py-0.5 rounded text-[10px]">
            {article.readingTime} min read
          </span>
        </div>

        {/* Title */}
        <h2 className="font-headline text-2xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white leading-[1.05] group-hover:text-brand-red transition-colors duration-200">
          {article.title}
        </h2>

        {/* Excerpt */}
        {showExcerpt && article.excerpt && (
          <p className="text-neutral-200 text-xs md:text-sm leading-relaxed line-clamp-2 hidden sm:block max-w-2xl font-light">
            {article.excerpt}
          </p>
        )}
      </div>
    </Link>
  )
}

export default ArticleCardLarge
