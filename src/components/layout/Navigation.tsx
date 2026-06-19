"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/lib/useTranslation"

const Navigation: React.FC = () => {
  const pathname = usePathname()
  const { t, lang } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: t.navigation.home, href: `/${lang}` },
    { label: t.navigation.football, href: `/${lang}/categories/Football` },
    { label: t.navigation.soccerResults, href: `/${lang}/soccer-results` },
    { label: t.navigation.tennis, href: `/${lang}/categories/Tennis` },
    { label: t.navigation.basketball, href: `/${lang}/categories/Basketball` },
    { label: t.navigation.f1, href: `/${lang}/categories/F1` },
    { label: t.navigation.playerUpdates, href: `/${lang}/player-updates` },
    { label: t.navigation.statistics, href: `/${lang}/statistics` },
    { label: t.navigation.sponsors, href: `/${lang}/sponsors` },
    { label: t.navigation.community, href: `/${lang}/community` }
  ]

  return (
    <nav
      className={cn(
        "sticky top-0 z-40 bg-white border-b border-neutral-200 transition-shadow select-none",
        isScrolled ? "shadow-md" : "shadow-sm"
      )}
    >
      <div className="max-w-5xl mx-auto px-4">
        {/* Horizontal scrollable container for mobile, standard centered tabs for desktop */}
        <div className="flex items-center justify-between gap-0.5 md:gap-1 overflow-x-auto no-scrollbar py-2 md:py-0 md:h-12">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== `/${lang}` && pathname.startsWith(item.href))

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative flex items-center h-full px-2 md:px-2.5 lg:px-3 py-2 md:py-0 text-[11px] md:text-xs lg:text-[13px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors hover:text-brand-red cursor-pointer",
                  isActive
                    ? "text-brand-red font-extrabold border-b-2 border-brand-red md:h-12"
                    : "text-brand-dark"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
