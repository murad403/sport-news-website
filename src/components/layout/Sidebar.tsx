"use client"

import React, { useState } from "react"
import Link from "next/link"
import Input from "../ui/Input"
import Button from "../ui/Button"
import { useTranslation } from "@/lib/useTranslation"
import { useGetTrendingTagsQuery, useGetMostReadQuery, useNewsLetterSubscribeMutation } from "@/redux/features/news/news.api"
import { Loader2 } from "lucide-react"

const Sidebar: React.FC = () => {
  const { lang } = useTranslation()
  const isIt = lang === "it"

  // Newsletter Signup State
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [subscribe, { isLoading: isSubscribing }] = useNewsLetterSubscribeMutation()

  // Fetch live trending tags and most read articles
  const { data: trendingData, isLoading: isTrendingLoading } = useGetTrendingTagsQuery()
  const { data: mostReadData, isLoading: isMostReadLoading } = useGetMostReadQuery()

  const mostReadArticles = (mostReadData?.results || []).slice(0, 5)
  const trendingTags = (trendingData?.results || []).slice(0, 10)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      try {
        await subscribe({ email }).unwrap()
        setSubscribed(true)
        setEmail("")
      } catch (error) {
        alert(isIt ? "Si è verificato un errore durante l'iscrizione. Riprova." : "Failed to subscribe. Please try again.")
      }
    }
  }

  return (
    <aside className="w-full lg:sticky lg:top-24 self-start flex flex-col gap-8 select-none">
      
      {/* 1. Most Read */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
        <h3 className="font-headline text-2xl font-bold uppercase text-brand-dark border-b-2 border-brand-red pb-2 mb-4">
          {isIt ? "I Più Letti" : "Most Read"}
        </h3>
        
        {isMostReadLoading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-5 w-5 animate-spin text-brand-red" />
          </div>
        ) : mostReadArticles.length === 0 ? (
          <p className="text-xs text-neutral-450 text-center py-4">
            {isIt ? "Nessun articolo trovato" : "No articles found"}
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {mostReadArticles.map((article, idx) => (
              <Link
                key={article.id}
                href={`/${lang}/article/${article.slug}`}
                className="flex gap-4 group"
              >
                {/* Number indicator */}
                <div className="font-headline text-3xl font-extrabold text-brand-red opacity-80 group-hover:opacity-100 transition-opacity shrink-0">
                  {idx + 1}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-0.5 truncate">
                    {article.category || "News"}
                  </span>
                  <h4 className="text-xs font-bold text-brand-dark leading-snug line-clamp-2 group-hover:text-brand-red transition-colors">
                    {article.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* 2. Advertisement */}
      <div className="bg-white border border-neutral-200 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
        <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider mb-2">
          {isIt ? "Spazio Pubblicitario" : "Advertisement"}
        </span>
        <div className="w-[300px] h-[250px] relative rounded-lg overflow-hidden border border-neutral-200 bg-neutral-50 shrink-0">
          <img
            src="/sports_ad_banner.png"
            alt="Advertisement"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 3. Trending Tags */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
        <h3 className="font-headline text-2xl font-bold uppercase text-brand-dark border-b-2 border-brand-red pb-2 mb-4">
          {isIt ? "Tendenze" : "Trending"}
        </h3>

        {isTrendingLoading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-5 w-5 animate-spin text-brand-red" />
          </div>
        ) : trendingTags.length === 0 ? (
          <p className="text-xs text-neutral-450 text-center py-4">
            {isIt ? "Nessuna tendenza trovata" : "No trending tags found"}
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag) => (
              <Link
                key={tag.id}
                href={`/${lang}/categories/Football`} // Direct to a category or general landing page
                className="text-xs font-semibold px-2.5 py-1 bg-neutral-100 hover:bg-brand-red hover:text-white text-neutral-700 rounded transition-colors"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* 4. Newsletter Signup */}
      <div className="bg-brand-dark text-white border border-neutral-800 rounded-xl p-5 shadow-md">
        <h3 className="font-headline text-2xl font-bold uppercase text-brand-red mb-2">
          {isIt ? "Iscriviti alla Newsletter" : "Join Newsletter"}
        </h3>
        <p className="text-xs text-neutral-300 mb-4 leading-relaxed font-semibold">
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
             <Button type="submit" disabled={isSubscribing} className="w-full font-bold select-none cursor-pointer flex items-center justify-center gap-1.5">
              {isSubscribing && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {isIt ? "Iscriviti" : "Subscribe"}
            </Button>
          </form>
        )}
      </div>

    </aside>
  )
}

export default Sidebar
