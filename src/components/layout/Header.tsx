"use client"
import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Menu, User } from "lucide-react"
import logoImg from "@/assets/logo.png"
import SearchBar from "../ui/SearchBar"
import Button from "../ui/Button"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "../ui/Sheet"
import { useTranslation } from "@/lib/useTranslation"
import { cn } from "@/lib/utils"
import SignInModal from "@/components/modal/SignInModal"
import SignUpModal from "@/components/modal/SignUpModal"

const Header: React.FC = () => {
  const { t, lang } = useTranslation()
  const pathname = usePathname()
  const router = useRouter()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  const handleLanguageChange = (newLang: "it" | "en") => {
    if (newLang === lang) return

    // Replace locale in the current pathname
    const segments = pathname.split("/")
    if (segments[1] === "it" || segments[1] === "en") {
      segments[1] = newLang
    } else {
      // Fallback
      segments.unshift(newLang)
    }

    const newPath = segments.join("/") || "/"
    router.push(newPath)
  }

  const mobileNavLinks = [
    { label: t.navigation.home, href: `/${lang}` },
    { label: t.navigation.football, href: `/${lang}/categories/Football` },
    { label: t.navigation.soccerResults, href: `/${lang}/soccer-results` },
    { label: t.navigation.tennis, href: `/${lang}/categories/Tennis` },
    { label: t.navigation.basketball, href: `/${lang}/categories/Basketball` },
    { label: t.navigation.f1, href: `/${lang}/categories/F1` },
    { label: t.navigation.playerUpdates, href: `/${lang}/player-updates` },
    { label: t.navigation.statistics, href: `/${lang}/statistics` },
    { label: t.navigation.community, href: `/${lang}/community` },
    { label: t.navigation.aboutUs, href: `/${lang}/about` },
    { label: t.navigation.contact, href: `/${lang}/contact` }
  ]

  return (
    <header className="bg-white border-b border-neutral-200 select-none">
      <div className="max-w-5xl mx-auto h-20 px-4 flex items-center justify-between gap-4">
        
        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <button className="p-2 -ml-2 text-brand-dark hover:text-brand-red cursor-pointer">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>
                  <div className="flex items-center">
                    <Image
                      src={logoImg}
                      alt="La Tribuna Sportiva"
                      height={40}
                      className="h-10 w-auto object-contain"
                      priority
                    />
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                {mobileNavLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-base font-semibold text-brand-dark hover:text-brand-red transition-colors border-b border-neutral-100 pb-2"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center">
          <Image
            src={logoImg}
            alt="La Tribuna Sportiva"
            height={500}
            className="h-12 md:h-20 w-auto object-contain"
            priority
          />
        </Link>

        {/* Right Section: Search, Language picker & Login */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1 border border-neutral-250 bg-neutral-50 hover:bg-neutral-100 rounded-lg px-2.5 py-1.5 transition-colors duration-150 shadow-xs">
            <button
              onClick={() => handleLanguageChange("it")}
              className={cn(
                "text-[10px] font-extrabold uppercase px-1 cursor-pointer transition-colors duration-150",
                lang === "it" ? "text-brand-red" : "text-neutral-450 hover:text-neutral-800"
              )}
            >
              IT
            </button>
            <span className="text-neutral-300 text-[10px]">|</span>
            <button
              onClick={() => handleLanguageChange("en")}
              className={cn(
                "text-[10px] font-extrabold uppercase px-1 cursor-pointer transition-colors duration-150",
                lang === "en" ? "text-brand-red" : "text-neutral-450 hover:text-neutral-800"
              )}
            >
              EN
            </button>
          </div>

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <button className="h-9 w-9 rounded-full bg-neutral-100 border border-neutral-200 hover:bg-neutral-250 flex items-center justify-center text-brand-dark transition-colors cursor-pointer" title="Account Settings">
                <User className="h-5 w-5 text-neutral-600" />
              </button>
              <Button variant="outline" size="sm" onClick={handleLogout} className="rounded-full text-xs font-semibold">
                {lang === "it" ? "Esci" : "Logout"}
              </Button>
            </div>
          ) : (
            <button
              onClick={() => setShowSignIn(true)}
              className="h-9 w-9 rounded-full bg-neutral-100 border border-neutral-200 hover:bg-neutral-250 flex items-center justify-center text-brand-dark transition-colors cursor-pointer"
              title="Sign In"
            >
              <User className="h-5 w-5 text-neutral-650" />
            </button>
          )}

          <SignInModal
            isOpen={showSignIn}
            onClose={() => setShowSignIn(false)}
            onSuccess={() => {
              setIsLoggedIn(true)
              setShowSignIn(false)
            }}
            onSwitchToSignUp={() => {
              setShowSignIn(false)
              setShowSignUp(true)
            }}
          />

          <SignUpModal
            isOpen={showSignUp}
            onClose={() => setShowSignUp(false)}
            onSuccess={() => {
              setIsLoggedIn(true)
              setShowSignUp(false)
            }}
            onSwitchToSignIn={() => {
              setShowSignUp(false)
              setShowSignIn(true)
            }}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
