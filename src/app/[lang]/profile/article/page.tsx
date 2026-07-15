"use client"

import React, { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { PlusCircle, Search, Trash2, Calendar, User, FileText, Loader2 } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import CategoryBadge from "@/components/ui/CategoryBadge"
import AddArticleModal from "@/components/modal/AddArticleModal"
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
        <div className="flex flex-col gap-4">
          {articles.map((article) => {
            const dateStr = article.created_at
              ? new Date(article.created_at).toLocaleDateString(isIt ? "it-IT" : "en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                })
              : ""

            return (
              <div
                key={article.id}
                className="flex flex-col sm:flex-row gap-4 bg-white border border-neutral-200 hover:border-neutral-300 transition-colors p-4 rounded-xl shadow-xs"
              >
                {/* Display Image thumbnail */}
                <div className="w-full sm:w-36 h-28 relative rounded-lg overflow-hidden border border-neutral-100 bg-neutral-50 shrink-0">
                  {article.display_image ? (
                    <img
                      src={article.display_image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-300">
                      <FileText className="h-8 w-8" />
                    </div>
                  )}
                </div>

                {/* Article Info Details */}
                <div className="grow flex flex-col justify-between gap-2 min-w-0">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      {article.categories?.[0] && (
                        <CategoryBadge category={article.categories[0].name} />
                      )}
                      
                      {/* Status badge */}
                      <span
                        className={cn(
                          "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border",
                          {
                            "bg-amber-50 text-amber-700 border-amber-200": article.status === "pending",
                            "bg-emerald-50 text-emerald-700 border-emerald-200": article.status === "approved" || article.status === "published",
                            "bg-rose-50 text-rose-700 border-rose-250": article.status === "rejected"
                          }
                        )}
                      >
                        {article.status}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-brand-dark hover:text-brand-red transition-colors line-clamp-1 mb-1">
                      {article.title}
                    </h3>
                    
                    <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                      {article.description || article.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100 mt-1">
                    <div className="flex items-center gap-3 text-[10px] text-neutral-400 font-bold uppercase">
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-neutral-300" />
                        {article.author_name}
                      </span>
                      {dateStr && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-neutral-300" />
                          {dateStr}
                        </span>
                      )}
                    </div>

                    {/* Delete button */}
                    <button
                      disabled={isDeleting}
                      onClick={() => handleDelete(article.id)}
                      className="text-neutral-400 hover:text-brand-red p-1 transition-colors hover:bg-neutral-50 rounded-lg cursor-pointer"
                      title={isIt ? "Elimina articolo" : "Delete article"}
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
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
    </div>
  )
}