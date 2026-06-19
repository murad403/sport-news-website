"use client"

import React, { useState } from "react"
import Link from "next/link"
import { getLocalArticles } from "@/lib/localizer"
import Input from "../ui/Input"
import Button from "../ui/Button"
import { useTranslation } from "@/lib/useTranslation"

const Sidebar: React.FC = () => {
  const { lang } = useTranslation()
  const isIt = lang === "it"
  const articles = getLocalArticles(lang)

  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  // Get first 5 articles for "Most Read"
  const mostReadArticles = articles.slice(0, 5)

  // Unique tags for "Trending"
  const trendingTags = Array.from(
    new Set(articles.flatMap((a) => a.tags))
  ).slice(0, 10)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
    }
  }

  return (
    <aside className="w-full flex flex-col gap-8 select-none">
      
      {/* 1. Most Read */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
        <h3 className="font-headline text-2xl font-bold uppercase text-brand-dark border-b-2 border-brand-red pb-2 mb-4">
          {isIt ? "I Più Letti" : "Most Read"}
        </h3>
        <div className="flex flex-col gap-4">
          {mostReadArticles.map((article, idx) => (
            <Link
              key={article.id}
              href={`/${lang}/article/${article.slug}`}
              className="flex gap-4 group"
            >
              {/* Number indicator */}
              <div className="font-headline text-3xl font-extrabold text-brand-red opacity-80 group-hover:opacity-100 transition-opacity">
                {idx + 1}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-0.5">
                  {article.category}
                </span>
                <h4 className="text-sm font-bold text-brand-dark leading-snug line-clamp-2 group-hover:text-brand-red transition-colors">
                  {article.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 2. Ad Placeholder */}
      <div className="bg-neutral-100 border border-neutral-200 rounded-xl p-4 flex flex-col items-center justify-center text-center h-[280px]">
        <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider mb-2">
          {isIt ? "Spazio Pubblicitario" : "Advertisement"}
        </span>
        <div className="w-[300px] h-[250px] bg-neutral-200 border border-neutral-300 rounded flex items-center justify-center text-sm font-semibold text-neutral-500">
          {isIt ? "Spazio Banner 300 x 250" : "300 x 250 Banner Place"}
        </div>
      </div>

      {/* 3. Trending Tags */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
        <h3 className="font-headline text-2xl font-bold uppercase text-brand-dark border-b-2 border-brand-red pb-2 mb-4">
          {isIt ? "Tendenze" : "Trending"}
        </h3>
        <div className="flex flex-wrap gap-2">
          {trendingTags.map((tag) => (
            <Link
              key={tag}
              href={`/${lang}/categories/Football`} // Direct to a category or general page
              className="text-xs font-semibold px-2.5 py-1 bg-neutral-100 hover:bg-brand-red hover:text-white text-neutral-700 rounded transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      {/* 4. Newsletter Signup */}
      <div className="bg-brand-dark text-white border border-neutral-800 rounded-xl p-5 shadow-md">
        <h3 className="font-headline text-2xl font-bold uppercase text-brand-red mb-2">
          {isIt ? "Iscriviti alla Newsletter" : "Join Newsletter"}
        </h3>
        <p className="text-xs text-neutral-300 mb-4 leading-relaxed">
          {isIt 
            ? "Iscriviti per ricevere avvisi sulle ultime notizie, articoli esclusivi e approfondimenti inviati direttamente nella tua casella di posta."
            : "Subscribe to get breaking news alerts, exclusive features, and direct insights sent straight to your inbox."}
        </p>

        {subscribed ? (
          <div className="bg-brand-red/10 border border-brand-red/20 text-brand-red rounded-lg p-3 text-xs font-semibold text-center">
            {isIt ? "✓ Grazie per l'iscrizione!" : "✓ Thank you for subscribing!"}
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <Input
              type="email"
              placeholder={isIt ? "Il tuo indirizzo email" : "Your email address"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-neutral-800/80 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-brand-red"
              required
            />
            <Button type="submit" className="w-full">
              {isIt ? "Iscriviti" : "Subscribe"}
            </Button>
          </form>
        )}
      </div>

    </aside>
  )
}

export default Sidebar
