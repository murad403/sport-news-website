"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { MessageSquare } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"
import logoImg from "@/assets/logo.png"

const Footer: React.FC = () => {
  const { t, lang } = useTranslation()

  return (
    <footer className="bg-brand-dark text-white border-t-4 border-brand-red select-none">
      {/* Upper Content */}
      <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Column 1: Brand Info */}
        <div className="flex flex-col gap-4">
          <Link href={`/${lang}`} className="inline-flex items-center bg-white p-2 rounded-lg max-w-[200px]">
            <Image
              src={logoImg}
              alt="La Tribuna Sportiva"
              height={500}
              className="h-20 w-auto object-contain"
            />
          </Link>
          <p className="text-xs text-neutral-400 leading-relaxed">
            {t.common.footerDesc}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <svg className="h-4 w-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.555A3.002 3.002 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.555a3.002 3.002 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Sports Categories */}
        <div className="flex flex-col gap-3">
          <h4 className="font-headline text-lg font-bold uppercase tracking-wider text-neutral-200 border-b border-neutral-800 pb-2">
            {t.common.sports}
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-neutral-400">
            <Link href={`/${lang}/categories/Football`} className="hover:text-brand-red transition-colors">{t.navigation.football}</Link>
            <Link href={`/${lang}/categories/Tennis`} className="hover:text-brand-red transition-colors">{t.navigation.tennis}</Link>
            <Link href={`/${lang}/categories/Basketball`} className="hover:text-brand-red transition-colors">{t.navigation.basketball}</Link>
            <Link href={`/${lang}/categories/F1`} className="hover:text-brand-red transition-colors">{t.navigation.f1}</Link>
            <Link href={`/${lang}/categories/Cricket`} className="hover:text-brand-red transition-colors">{t.navigation.football === "Calcio" ? "Cricket" : "Cricket"}</Link>
            <Link href={`/${lang}/categories/Golf`} className="hover:text-brand-red transition-colors">Golf</Link>
            <Link href={`/${lang}/categories/Rugby`} className="hover:text-brand-red transition-colors">Rugby</Link>
          </div>
        </div>

        {/* Column 3: Quick Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-headline text-lg font-bold uppercase tracking-wider text-neutral-200 border-b border-neutral-800 pb-2">
            {t.common.quickLinks}
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-neutral-400">
            <Link href={`/${lang}`} className="hover:text-brand-red transition-colors">{t.navigation.home}</Link>
            <Link href={`/${lang}/soccer-results`} className="hover:text-brand-red transition-colors">{t.navigation.soccerResults === "Risultati Calcio" ? "Risultati" : "Results"}</Link>
            <Link href={`/${lang}/statistics`} className="hover:text-brand-red transition-colors">{t.navigation.statistics}</Link>
            <Link href={`/${lang}/player-updates`} className="hover:text-brand-red transition-colors">{t.navigation.playerUpdates === "Aggiornamenti Giocatori" ? "Giocatori" : "Players"}</Link>
            <Link href={`/${lang}/about`} className="hover:text-brand-red transition-colors">{t.navigation.aboutUs}</Link>
          </div>
        </div>

        {/* Column 4: Legal & Support */}
        <div className="flex flex-col gap-3">
          <h4 className="font-headline text-lg font-bold uppercase tracking-wider text-neutral-200 border-b border-neutral-800 pb-2">
            {t.common.legalContact}
          </h4>
          <div className="flex flex-col gap-2 text-xs text-neutral-400">
            <Link href={`/${lang}/privacy-policy`} className="hover:text-brand-red transition-colors">{lang === "it" ? "Informativa sulla privacy" : "Privacy Policy"}</Link>
            <Link href={`/${lang}/terms-of-service`} className="hover:text-brand-red transition-colors">{lang === "it" ? "Termini di servizio" : "Terms of Service"}</Link>
            {/* <Link href={`/${lang}/about`} className="hover:text-brand-red transition-colors">{lang === "it" ? "Informativa sui cookie" : "Cookie Policy"}</Link> */}
            <Link href={`/${lang}/contact`} className="hover:text-brand-red transition-colors">{t.navigation.contact}</Link>
          </div>
        </div>

      </div>

      {/* Lower Bar */}
      <div className="bg-black/40 py-4 text-center border-t border-neutral-900 text-[10px] text-neutral-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © {new Date().getFullYear()} LA | TRIBUNA SPORTIVA. {t.common.allRightsReserved}
          </span>
          <div className="flex gap-4">
            <span className="hover:underline cursor-pointer">{lang === "it" ? "Scelte pubblicitarie" : "Ad Choices"}</span>
            <span className="hover:underline cursor-pointer">{lang === "it" ? "Gestisci cookie" : "Manage Cookies"}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
