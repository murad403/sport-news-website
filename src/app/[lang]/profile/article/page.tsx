"use client"

import React, { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { PlusCircle, Search, Trash2, Calendar, User, FileText, Loader2 } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import CategoryBadge from "@/components/ui/CategoryBadge"
import AddArticleModal from "@/components/modal/AddArticleModal"
import ViewArticleModal from "@/components/modal/ViewArticleModal"
import CustomPagination from "@/components/shared/CustomPagination"
import { useGetMineArticlesQuery, useDeleteArticleMutation } from "@/redux/features/article/article.api"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 10

export default function MyArticlesPage() {
  const { lang } = useParams() as { lang: string }
  const { t } = useTranslation()
  const isIt = lang === "it"

  // States
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  // Debounce search text
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText)
      setCurrentPage(1)
    }, 400)
    return () => clearTimeout(timer)
  }, [searchText])

  // Queries & Mutations
  const { data, isLoading, isFetching, refetch } = useGetMineArticlesQuery({
    page: currentPage,
    search: debouncedSearch
  })
  const [deleteArticle, { isLoading: isDeleting }] = useDeleteArticleMutation()

  const handleDelete = async (id: string) => {
    const confirmMsg = isIt
      ? "Sei sicuro di voler eliminare questo articolo?"
      : "Are you sure you want to delete this article?"
    if (window.confirm(confirmMsg)) {
      try {
        await deleteArticle(id).unwrap()
      } catch (err) {
        console.error("Failed to delete article:", err)
      }
    }
  }

  const articles = data?.results || []
  const totalCount = data?.count || 0

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">
            {isIt ? "I Miei Articoli" : "My Articles"}
          </h1>
          <p className="text-xs text-neutral-500">
            {isIt 
              ? "Visualizza, scrivi e gestisci i tuoi articoli sportivi personalizzati." 
              : "View, write and manage your custom sports articles."}
          </p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 bg-brand-red hover:bg-brand-red/90 text-white rounded-lg px-4 py-2 font-bold cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <PlusCircle className="h-4.5 w-4.5" />
          {isIt ? "Scrivi Articolo" : "Write Article"}
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="relative max-w-md">
        <Input
          type="text"
          placeholder={isIt ? "Cerca tra i tuoi articoli..." : "Search your articles..."}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="pl-9 bg-white border-neutral-250 placeholder:text-neutral-400 focus-visible:ring-brand-red rounded-lg"
        />
        <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-neutral-400" />
      </div>

      {/* Loading state */}
      {isLoading || isFetching ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
          <p className="text-xs text-neutral-500 font-semibold">
            {isIt ? "Caricamento articoli..." : "Loading articles..."}
          </p>
        </div>
      ) : articles.length === 0 ? (
        /* Empty State */
        <div className="text-center py-16 border-2 border-dashed border-neutral-200 rounded-2xl bg-neutral-50 max-w-xl mx-auto px-6">
          <FileText className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-brand-dark mb-1">
            {isIt ? "Nessun articolo trovato" : "No articles found"}
          </h3>
          <p className="text-xs text-neutral-500 mb-4 max-w-xs mx-auto">
            {isIt 
              ? "Non hai ancora inviato nessun articolo o la ricerca non ha prodotto risultati." 
              : "You haven't submitted any articles yet, or your search query returned no results."}
          </p>
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="outline"
            className="rounded-lg text-xs font-bold cursor-pointer"
          >
            {isIt ? "Crea il tuo primo articolo" : "Create your first article"}
          </Button>
        </div>
      ) : (
        /* Articles List Grid */
        <div className="flex flex-col gap-6">
          {articles.map((article) => {
            const dateStr = article.created_at
              ? new Date(article.created_at).toLocaleDateString(isIt ? "it-IT" : "en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })
              : ""

            return (
              <div
                key={article.id}
                className="bg-white border border-neutral-200 hover:border-neutral-300 transition-colors p-4 md:p-5 rounded-xl shadow-xs flex flex-col"
              >
                {/* Top header row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    {/* Avatar circle containing first letter of author */}
                    <div className="h-8 w-8 rounded-full border border-brand-red flex items-center justify-center text-brand-red font-bold text-xs bg-white shrink-0">
                      {article.author_name ? article.author_name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-brand-dark leading-tight">{article.author_name}</h4>
                      <span className="text-[9px] text-neutral-405 font-bold uppercase">
                        {dateStr}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    {/* Status badge */}
                    <span
                      className={cn(
                        "inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wide border",
                        {
                          "bg-amber-50 text-amber-700 border-amber-200": article.status === "pending",
                          "bg-emerald-50 text-emerald-700 border-emerald-200": article.status === "approved" || article.status === "published",
                          "bg-rose-50 text-rose-700 border-rose-250": article.status === "rejected"
                        }
                      )}
                    >
                      {article.status}
                    </span>
                    {article.categories?.[0] && (
                      <CategoryBadge category={article.categories[0].name} />
                    )}
                  </div>
                </div>

                {/* Display Image banner */}
                {article.display_image && (
                  <div className="w-full h-40 md:h-52 relative rounded-xl overflow-hidden border border-neutral-100 bg-neutral-50 mb-3 shrink-0">
                    <img
                      src={article.display_image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Title */}
                <h3 className="font-headline text-base md:text-lg font-extrabold text-brand-dark mb-1.5 uppercase leading-snug">
                  {article.title}
                </h3>

                {/* Content */}
                <p className="text-xs text-neutral-600 mb-4 leading-relaxed whitespace-pre-line line-clamp-2">
                  {article.description || article.content}
                </p>

                {/* Bottom Action Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100 mt-2">
                  <button
                    onClick={() => {
                      setSelectedArticleSlug(article.slug)
                      setIsViewModalOpen(true)
                    }}
                    className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {isIt ? "Visualizza Articolo" : "View Article"}
                  </button>

                  <button
                    disabled={isDeleting}
                    onClick={() => handleDelete(article.id)}
                    className="text-neutral-400 hover:text-brand-red p-1 transition-colors hover:bg-neutral-50 rounded-lg cursor-pointer flex items-center gap-1 text-xs font-bold"
                    title={isIt ? "Elimina articolo" : "Delete article"}
                  >
                    <Trash2 className="h-4 w-4" />
                    {isIt ? "Elimina" : "Delete"}
                  </button>
                </div>
              </div>
            )
          })}

          {/* Custom Pagination */}
          <CustomPagination
            currentPage={currentPage}
            count={totalCount}
            pageSize={PAGE_SIZE}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}

      {/* Add Article Modal */}
      <AddArticleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false)
          refetch()
        }}
        lang={lang}
      />

      {/* View Article Modal */}
      <ViewArticleModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setSelectedArticleSlug(null)
        }}
        slug={selectedArticleSlug}
        lang={lang}
      />
    </div>
  )
}