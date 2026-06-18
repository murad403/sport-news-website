"use client"

import React from "react"
import { mockArticles } from "@/lib/mockData"
import ArticleDetail from "@/components/articles/ArticleDetail"
import RelatedArticles from "@/components/articles/RelatedArticles"
import Sidebar from "@/components/layout/Sidebar"
import Link from "next/link"
import Button from "@/components/ui/Button"
import { AlertTriangle } from "lucide-react"

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const unwrappedParams = React.use(params)
  const slug = unwrappedParams.slug

  // Find the article matching the slug
  const article = mockArticles.find((art) => art.slug === slug)

  if (!article) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 text-center select-none">
        <AlertTriangle className="h-16 w-16 text-brand-red mb-4" />
        <h1 className="font-headline text-3xl font-extrabold text-brand-dark mb-2">
          ARTICLE NOT FOUND
        </h1>
        <p className="text-neutral-500 mb-6 max-w-md">
          The sports report you are looking for does not exist or has been archived.
        </p>
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      
      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        
        {/* Main Content Column (Left, 70%) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <ArticleDetail article={article} />
          
          {/* Related Articles row */}
          <RelatedArticles currentArticleId={article.id} category={article.category} />
        </div>

        {/* Sidebar Column (Right, 30%) */}
        <div className="lg:col-span-3">
          <Sidebar />
        </div>

      </div>

    </div>
  )
}
