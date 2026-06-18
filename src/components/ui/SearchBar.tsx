"use client"

import React, { useState, useEffect, useRef } from "react"
import { Search, X, Loader2 } from "lucide-react"
import Link from "next/link"
import { mockArticles } from "@/lib/mockData"
import { Article } from "@/lib/types"
import { cn } from "@/lib/utils"

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Article[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    const timeout = setTimeout(() => {
      const filtered = mockArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.category.toLowerCase().includes(query.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
      setLoading(false)
    }, 200)

    return () => clearTimeout(timeout)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className="relative w-full max-w-[280px]">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search sports news..."
          className="w-full bg-neutral-100 hover:bg-neutral-200/70 focus:bg-white text-brand-dark placeholder:text-neutral-500 rounded-full py-1.5 pl-4 pr-10 text-sm border-0 focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query ? (
            <button
              onClick={() => {
                setQuery("")
                setResults([])
              }}
              className="text-neutral-400 hover:text-brand-red cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <Search className="h-4 w-4 text-neutral-400 pointer-events-none" />
          )}
        </div>
      </div>

      {isOpen && (query || results.length > 0) && (
        <div className="absolute right-0 top-full mt-2 w-[320px] bg-white border border-neutral-200 rounded-lg shadow-xl z-50 overflow-hidden max-h-[400px] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center p-4 text-neutral-500 gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-brand-red" />
              <span className="text-xs">Searching...</span>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              <div className="px-3 py-1 text-[10px] font-bold text-neutral-400 uppercase border-b border-neutral-100">
                Articles Found ({results.length})
              </div>
              {results.map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex flex-col px-3 py-2 hover:bg-neutral-50 transition-colors border-b border-neutral-50 last:border-b-0"
                >
                  <span className="text-xs font-semibold text-brand-red uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="text-sm font-semibold text-brand-dark leading-snug line-clamp-2">
                    {article.title}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-xs text-neutral-500">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar
