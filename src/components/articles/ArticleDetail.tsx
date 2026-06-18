import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Article } from "@/lib/types"
import CategoryBadge from "../ui/CategoryBadge"
import { Clock, User, Share2, Link2, BookOpen } from "lucide-react"
import { formatDate } from "@/lib/utils"

export interface ArticleDetailProps {
  article: Article
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
  return (
    <article className="w-full bg-white border border-neutral-200 rounded-xl overflow-hidden p-6 md:p-8 shadow-sm select-none">
      
      {/* 1. Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-neutral-500 font-semibold mb-4">
        <Link href="/" className="hover:text-brand-red">Home</Link>
        <span>/</span>
        <Link href={`/categories/${article.category}`} className="hover:text-brand-red uppercase">{article.category}</Link>
        <span>/</span>
        <span className="truncate max-w-[200px] sm:max-w-md font-medium text-neutral-400">{article.title}</span>
      </nav>

      {/* 2. Headline & Excerpt */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex items-center justify-between">
          <CategoryBadge category={article.category} className="px-3 py-1 text-xs md:text-sm font-extrabold" />
          <span className="flex items-center gap-1 text-xs text-neutral-400 font-medium">
            <BookOpen className="h-4 w-4" />
            {article.readingTime} MIN READ
          </span>
        </div>

        <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-brand-dark leading-[1.05]">
          {article.title}
        </h1>

        <p className="text-base md:text-xl text-neutral-600 font-medium leading-relaxed border-l-4 border-brand-red pl-4">
          {article.excerpt}
        </p>
      </div>

      {/* 3. Metadata & Share Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-y border-neutral-100 mb-6">
        {/* Author info */}
        <div className="flex items-center gap-3 text-xs md:text-sm text-neutral-500 font-semibold">
          <div className="h-10 w-10 bg-neutral-100 rounded-full border border-neutral-200 flex items-center justify-center font-bold text-brand-red">
            {article.author.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-brand-dark">{article.author}</span>
            <span className="text-neutral-400 font-normal">{formatDate(article.publishedAt)}</span>
          </div>
        </div>

        {/* Share buttons */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase text-neutral-400 flex items-center gap-1">
            <Share2 className="h-3.5 w-3.5" /> Share:
          </span>
          <button className="h-8 w-8 rounded-full border border-neutral-200 hover:bg-neutral-50 hover:text-brand-red flex items-center justify-center transition-colors cursor-pointer" title="Facebook">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
            </svg>
          </button>
          <button className="h-8 w-8 rounded-full border border-neutral-200 hover:bg-neutral-50 hover:text-brand-red flex items-center justify-center transition-colors cursor-pointer" title="Twitter">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              alert("Link copied to clipboard!")
            }}
            className="h-8 w-8 rounded-full border border-neutral-200 hover:bg-neutral-50 hover:text-brand-red flex items-center justify-center transition-colors cursor-pointer"
            title="Copy Link"
          >
            <Link2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 4. Large Feature Image */}
      <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-8 bg-neutral-100 shadow-sm border border-neutral-200">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          sizes="(max-width: 1024px) 100vw, 800px"
          priority
          className="object-cover"
        />
      </div>

      {/* 5. Article Content Body */}
      <div className="prose max-w-none text-brand-dark leading-relaxed space-y-6 text-sm md:text-base font-normal">
        {article.content.split("\n\n").map((paragraph, index) => {
          // Put an ad banner placeholder in the middle of the article
          if (index === 1) {
            return (
              <React.Fragment key={index}>
                <p>{paragraph}</p>
                <div className="my-8 bg-neutral-50 border border-neutral-200 rounded-xl p-4 flex flex-col items-center justify-center text-center h-[160px] select-none">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider mb-2">
                    Advertisement
                  </span>
                  <div className="w-[468px] max-w-full h-[60px] bg-neutral-200 border border-neutral-300 rounded flex items-center justify-center text-xs font-semibold text-neutral-500">
                    468 x 60 Content Banner Place
                  </div>
                </div>
              </React.Fragment>
            )
          }

          // Render paragraph or blockquote
          if (paragraph.startsWith('"') || paragraph.startsWith('“')) {
            return (
              <blockquote key={index} className="border-l-4 border-brand-red pl-4 italic text-neutral-600 my-4 text-base md:text-lg">
                {paragraph}
              </blockquote>
            )
          }

          return <p key={index}>{paragraph}</p>
        })}
      </div>

      {/* 6. Tags Section */}
      <div className="border-t border-neutral-100 pt-6 mt-8">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-neutral-400 uppercase mr-2">Tags:</span>
          {article.tags.map((tag) => (
            <Link
              key={tag}
              href={`/categories/Football`}
              className="text-xs font-semibold px-2.5 py-1 bg-neutral-100 hover:bg-brand-red hover:text-white text-neutral-700 rounded transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

    </article>
  )
}

export default ArticleDetail
