"use client"

import React from "react"
import Link from "next/link"
import { usePathname, useParams } from "next/navigation"
import { User, Lock } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"
import { cn } from "@/lib/utils"

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { lang } = useParams() as { lang: string }
  const pathname = usePathname()
  const { t } = useTranslation()

  const links = [
    {
      label: lang === "it" ? "Profilo Utente" : "User Profile",
      href: `/${lang}/profile`,
      icon: User
    },
    {
      label: lang === "it" ? "Cambia Password" : "Change Password",
      href: `/${lang}/profile/change-password`,
      icon: Lock
    }
  ]

  return (
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 py-4">
      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-xs space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 px-3 mb-3 select-none">
            {lang === "it" ? "Impostazioni Account" : "Account Settings"}
          </h2>
          <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible">
            {links.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-150 shrink-0",
                    isActive
                      ? "bg-brand-red text-white"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="grow bg-white border border-neutral-200 rounded-xl p-6 md:p-8 shadow-xs min-h-[400px]">
        {children}
      </div>
    </div>
  )
}
