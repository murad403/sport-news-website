"use client"
import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog"
import { Calendar, Loader2 } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"
import { useGetArticleDetailsQuery } from "@/redux/features/article/article.api"
import CategoryBadge from "../ui/CategoryBadge"
import { cn } from "@/lib/utils"

interface ViewArticleModalProps {
  isOpen: boolean
  onClose: () => void
  slug: string | null
  lang?: string
}

const ViewArticleModal: React.FC<ViewArticleModalProps> = ({ isOpen, onClose, slug, lang = "it"}) => {
  const { t } = useTranslation()
  const isIt = lang === "it"
  const { data: article, isLoading, error } = useGetArticleDetailsQuery(slug || "", {
    skip: !slug || !isOpen
  })

  const dateStr = article?.created_at
    ? new Date(article.created_at).toLocaleDateString(isIt ? "it-IT" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    : ""

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open && !isLoading) onClose(); }}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto bg-white border border-neutral-200 text-brand-dark p-6">
        <DialogHeader className="relative">
          <DialogTitle className="font-headline text-2xl font-extrabold text-brand-dark uppercase tracking-tight pr-6 leading-tight">
            {isLoading ? (isIt ? "Caricamento..." : "Loading...") : article?.title}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
            <p className="text-xs text-neutral-500 font-semibold">
              {isIt ? "Caricamento articolo..." : "Loading article details..."}
            </p>
          </div>
        ) : error || !article ? (
          <div className="text-center py-10 text-brand-red font-semibold text-xs">
            ⚠️ {isIt ? "Impossibile caricare i dettagli dell'articolo." : "Failed to load article details."}
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            {/* Meta Row Info */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full border border-brand-red flex items-center justify-center bg-white text-brand-red font-bold text-sm shrink-0">
                  {article.author_name ? article.author_name.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-dark leading-tight">{article.author_name}</h4>
                  <div className="flex items-center gap-2 mt-0.5 text-[9px] text-neutral-400 font-bold uppercase">
                    <span className="flex items-center gap-0.5">
                      <Calendar className="h-3 w-3 text-neutral-350" />
                      {dateStr}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {/* Views count */}
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide border bg-neutral-50 border-neutral-200 text-neutral-600">
                  {article.views_count} {isIt ? "Visualizzazioni" : "Views"}
                </span>

                {/* Featured Badge */}
                {article.is_featured && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide border bg-indigo-50 border-indigo-200 text-indigo-700">
                    {isIt ? "In Evidenza" : "Featured"}
                  </span>
                )}

                {/* Published Badge */}
                <span
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide border",
                    article.is_published
                      ? "bg-teal-50 border-teal-200 text-teal-700"
                      : "bg-neutral-50 border-neutral-200 text-neutral-500"
                  )}
                >
                  {article.is_published ? (isIt ? "Pubblicato" : "Published") : (isIt ? "Bozza" : "Draft")}
                </span>

                {/* Status Badge */}
                <span
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide border",
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

            {/* Banner Image */}
            {article.display_image && (
              <div className="w-full h-64 md:h-80 relative rounded-xl overflow-hidden border border-neutral-100 bg-neutral-50 shrink-0">
                <img
                  src={article.display_image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Description / Summary */}
            {article.description && (
              <p className="text-xs text-neutral-500 font-bold leading-relaxed border-l-2 border-brand-red pl-3 italic">
                {article.description}
              </p>
            )}

            {/* Article Content Text */}
            <div className="text-xs md:text-sm text-neutral-700 leading-relaxed whitespace-pre-line font-medium pt-1">
              {article.content}
            </div>

            {/* Tags Badge List */}
            {article.tags && article.tags.length > 0 && (
              <div className="pt-4 border-t border-neutral-100 flex flex-wrap gap-1.5 items-center">
                <span className="text-[10px] font-bold uppercase text-neutral-400 mr-1.5">Tags:</span>
                {article.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center px-2.5 py-1 bg-neutral-100 border border-neutral-200 text-neutral-600 font-bold text-[10px] rounded-lg"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ViewArticleModal
