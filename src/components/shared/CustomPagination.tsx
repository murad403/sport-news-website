"use client"

import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CustomPaginationProps {
  currentPage: number
  count: number
  pageSize: number
  onPageChange: (page: number) => void
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  count,
  pageSize,
  onPageChange
}) => {
  const totalPages = Math.ceil(count / pageSize)

  if (totalPages <= 1) return null

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const range = 1

    pages.push(1)

    if (currentPage - range > 2) {
      pages.push("...")
    }

    const start = Math.max(2, currentPage - range)
    const end = Math.min(totalPages - 1, currentPage + range)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (currentPage + range < totalPages - 1) {
      pages.push("...")
    }

    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex items-center justify-center gap-1.5 select-none mt-8">
      {/* Previous Button */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "flex items-center justify-center h-9 w-9 rounded-lg border border-neutral-250 text-neutral-600 bg-white transition-colors cursor-pointer hover:bg-neutral-50 hover:text-brand-red disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-neutral-600 disabled:cursor-not-allowed"
        )}
      >
        <ChevronLeft className="h-4.5 w-4.5" />
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex items-center justify-center h-9 w-9 text-neutral-400 font-semibold"
            >
              ...
            </span>
          )
        }

        const isCurrent = page === currentPage

        return (
          <button
            key={`page-${page}`}
            onClick={() => onPageChange(page as number)}
            className={cn(
              "flex items-center justify-center h-9 w-9 rounded-lg font-bold text-xs transition-colors cursor-pointer",
              isCurrent
                ? "bg-brand-red text-white shadow-xs"
                : "bg-white border border-neutral-250 text-neutral-700 hover:bg-neutral-50 hover:text-brand-red hover:border-brand-red"
            )}
          >
            {page}
          </button>
        )
      })}

      {/* Next Button */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "flex items-center justify-center h-9 w-9 rounded-lg border border-neutral-250 text-neutral-600 bg-white transition-colors cursor-pointer hover:bg-neutral-50 hover:text-brand-red disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-neutral-600 disabled:cursor-not-allowed"
        )}
      >
        <ChevronRight className="h-4.5 w-4.5" />
      </button>
    </div>
  )
}

export default CustomPagination