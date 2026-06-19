"use client"

import React from "react"
import { MessageSquare } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"

const TopBar: React.FC = () => {
  const { t, lang } = useTranslation()

  // Format date dynamically based on language
  const formattedDate = new Date().toLocaleDateString(
    lang === "it" ? "it-IT" : "en-US",
    { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  )

  return (
    <div className="bg-brand-dark h-9 w-full flex items-center justify-between px-4 text-white text-xs border-b border-white/10 select-none">
      {/* Date */}
      <div className="font-medium capitalize">
        {formattedDate}
      </div>

      {/* Social Media Links */}
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline text-neutral-400 text-[10px] uppercase font-bold tracking-wider">
          {t.common.followUs}
        </span>
        <div className="flex items-center gap-3">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-red transition-colors"
            title="Facebook"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-red transition-colors"
            title="Twitter / X"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-red transition-colors"
            title="Instagram"
          >
            <svg className="h-4 w-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-red transition-colors"
            title="YouTube"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.555A3.002 3.002 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.555a3.002 3.002 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          <a
            href="https://whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-red transition-colors"
            title="WhatsApp Channel"
          >
            <MessageSquare className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default TopBar
