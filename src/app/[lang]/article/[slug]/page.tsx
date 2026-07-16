"use client"

import React from "react"
import ArticleDetail from "@/components/articles/ArticleDetail"
import RelatedArticles from "@/components/articles/RelatedArticles"
import Sidebar from "@/components/layout/Sidebar"
import Link from "next/link"
import Button from "@/components/ui/Button"
import { AlertTriangle, Loader2 } from "lucide-react"
import { useGetNewsDetailsQuery } from "@/redux/features/news/news.api"

interface ArticlePageProps {
  params: Promise<{
    slug: string
    lang: string
  }>
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const unwrappedParams = React.use(params)
  const slug = unwrappedParams.slug
  const lang = unwrappedParams.lang
  const isIt = lang === "it"

  // Fetch article detail dynamically from backend
  const { data: newsDetails, isLoading, error } = useGetNewsDetailsQuery(slug)

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-32 gap-3 select-none">
        <Loader2 className="h-10 w-10 animate-spin text-brand-red" />
        <p className="text-sm text-neutral-500 font-semibold">
          {isIt ? "Caricamento articolo..." : "Loading article..."}
        </p>
      </div>
    )
  }

  if (error || !newsDetails) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 text-center select-none">
        <AlertTriangle className="h-16 w-16 text-brand-red mb-4" />
        <h1 className="font-headline text-3xl font-extrabold text-brand-dark mb-2">
          {isIt ? "ARTICOLO NON TROVATO" : "ARTICLE NOT FOUND"}
        </h1>
        <p className="text-neutral-500 mb-6 max-w-md">
          {isIt 
            ? "L'articolo sportivo che stai cercando non esiste o è stato archiviato."
            : "The sports report you are looking for does not exist or has been archived."}
        </p>
        <Link href={`/${lang}`}>
          <Button>{isIt ? "Torna alla Home" : "Return to Home"}</Button>
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
          <ArticleDetail article={newsDetails} />
          
          {/* Related Articles row */}
          <RelatedArticles slug={slug} />
        </div>

        {/* Sidebar Column (Right, 30%) */}
        <div className="lg:col-span-3">
          <Sidebar />
        </div>

      </div>

    </div>
  )
}
