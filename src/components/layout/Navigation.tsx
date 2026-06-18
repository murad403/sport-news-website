"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Home", href: "/" },
  { label: "Football", href: "/categories/Football" },
  { label: "Soccer Results", href: "/soccer-results" },
  { label: "Tennis", href: "/categories/Tennis" },
  { label: "Basketball", href: "/categories/Basketball" },
  { label: "F1", href: "/categories/F1" },
  { label: "Player Updates", href: "/player-updates" },
  { label: "Statistics", href: "/statistics" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Community", href: "/community" }
]

const Navigation: React.FC = () => {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
              (item.href !== "/" && pathname.startsWith(item.href))

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
