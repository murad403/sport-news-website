"use client"
import React, { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, User, Mail } from "lucide-react"
import SearchBar from "../ui/SearchBar"
import Button from "../ui/Button"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "../ui/Sheet"
import { Dialog, DialogTrigger, DialogContent } from "../ui/Dialog"
import Input from "../ui/Input"
import { useTranslation } from "@/lib/useTranslation"
import { cn } from "@/lib/utils"

const Header: React.FC = () => {
  const { t, lang } = useTranslation()
  const pathname = usePathname()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [registerName, setRegisterName] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [authMode, setAuthMode] = useState<"signin" | "register">("signin")
  const [authMethod, setAuthMethod] = useState<"list" | "email">("list")

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      setIsLoggedIn(true)
      setShowLogin(false)
      setEmail("")
      setPassword("")
    }
  }

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (registerName && email && password) {
      setIsLoggedIn(true)
      setShowLogin(false)
      setRegisterName("")
      setEmail("")
      setPassword("")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  const handleOpenChange = (open: boolean) => {
    setShowLogin(open)
    if (!open) {
      setAuthMode("signin")
      setAuthMethod("list")
      setEmail("")
      setPassword("")
      setRegisterName("")
    }
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
    { label: t.navigation.sponsors, href: `/${lang}/sponsors` },
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
                  <span className="font-headline text-3xl font-bold tracking-tight text-brand-red">
                    ⚽ SportsPulse
                  </span>
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
        <Link href={`/${lang}`} className="flex items-center gap-1.5">
          <span className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight text-brand-red uppercase">
            ⚽ SportsPulse
          </span>
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

          <Dialog open={showLogin} onOpenChange={handleOpenChange}>
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
              <DialogTrigger>
                <button className="h-9 w-9 rounded-full bg-neutral-100 border border-neutral-200 hover:bg-neutral-250 flex items-center justify-center text-brand-dark transition-colors cursor-pointer" title="Sign In">
                  <User className="h-5 w-5 text-neutral-650" />
                </button>
              </DialogTrigger>
            )}

            <DialogContent className="sm:max-w-sm bg-white border border-neutral-200 text-brand-dark p-8">
              {/* SportsPulse logo centered */}
              <div className="flex items-center justify-center gap-1.5 mb-8 select-none">
                <span className="font-headline text-3xl font-extrabold tracking-tight text-brand-red uppercase">
                  ⚽ SportsPulse
                </span>
              </div>

              {/* Views */}
              {authMode === "signin" ? (
                authMethod === "list" ? (
                  /* View 1: Sign In List Options */
                  <div className="flex flex-col items-center gap-3 w-full text-center select-none">
                    <h2 className="text-2xl font-bold text-brand-dark mb-3">{t.auth.signInTitle}</h2>
                    
                    <button
                      onClick={() => alert("Sign in with Apple")}
                      className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-black hover:bg-neutral-900 text-white text-sm font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      <svg className="h-5 w-5 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.51 12.06 1.005 1.45 2.187 3.068 3.757 3.007 1.516-.06 2.09-.98 3.92-.98 1.82 0 2.347.98 3.93.95 1.618-.03 2.654-1.47 3.652-2.922 1.153-1.688 1.63-3.32 1.66-3.41-.03-.01-3.178-1.22-3.21-4.82-.03-3.02 2.47-4.47 2.58-4.54-1.42-2.08-3.6-2.31-4.38-2.36-2.062-.167-3.24 1.078-4.09 1.078zM16.14 3.75c.828-1.006 1.386-2.41 1.233-3.812-1.2.05-2.656.8-3.518 1.802-.74.85-1.39 2.27-1.216 3.655 1.34.1 2.7-.66 3.5-1.645z" />
                      </svg>
                      <span>{t.auth.withApple}</span>
                    </button>

                    <button
                      onClick={() => alert("Log in with Facebook")}
                      className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white text-sm font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      <svg className="h-5 w-5 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <span>{t.auth.withFacebook}</span>
                    </button>

                    <button
                      onClick={() => alert("Sign in with Google")}
                      className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-neutral-50 text-neutral-700 text-sm font-semibold rounded-lg border border-neutral-300 shadow-xs transition-colors cursor-pointer"
                    >
                      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                        <path fill="#EA4335" d="M12 5.04c1.67 0 3.17.58 4.35 1.71l3.25-3.25C17.65 1.58 14.98 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.85 2.99c.9-2.7 3.4-4.5 6.76-4.5z" />
                        <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.44c-.28 1.48-1.11 2.73-2.36 3.58l3.66 2.84c2.14-1.98 3.75-4.88 3.75-8.57z" />
                        <path fill="#FBBC05" d="M5.24 10.55c-.23-.7-.36-1.45-.36-2.22s.13-1.52.36-2.22L1.39 3.12C.5 4.9.01 6.89.01 9c0 2.11.49 4.1 1.38 5.88l3.85-3.33z" />
                        <path fill="#34A853" d="M12 17.5c-3.36 0-5.86-1.8-6.76-4.5L1.39 15.99c1.98 3.89 5.96 6.56 10.61 6.56 3 0 5.83-1.04 8.01-2.83l-3.66-2.84c-1.18.79-2.69 1.28-4.36 1.28z" />
                      </svg>
                      <span>{t.auth.withGoogle}</span>
                    </button>

                    <button
                      onClick={() => setAuthMethod("email")}
                      className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-sm font-semibold rounded-lg border border-neutral-200/60 transition-colors cursor-pointer"
                    >
                      <Mail className="h-5 w-5 text-neutral-600 shrink-0" />
                      <span>{t.auth.withEmail}</span>
                    </button>

                    <div className="text-xs text-neutral-500 mt-4">
                      {t.auth.noAccount}{" "}
                      <span onClick={() => { setAuthMode("register"); setAuthMethod("list"); }} className="text-brand-red hover:text-brand-red/90 cursor-pointer hover:underline font-bold">
                        {t.auth.registerLink}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* View 2: Sign In Email Input Form */
                  <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4 text-left">
                    <h2 className="text-lg font-bold text-brand-dark text-center mb-2">{t.auth.withEmail}</h2>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-neutral-500">{t.auth.emailLabel}</label>
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white border-neutral-250 text-brand-dark placeholder:text-neutral-400 focus-visible:ring-brand-red rounded-lg"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-neutral-500">{t.auth.passwordLabel}</label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white border-neutral-250 text-brand-dark placeholder:text-neutral-400 focus-visible:ring-brand-red rounded-lg"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full mt-2 font-bold bg-brand-red hover:bg-brand-red/90 text-white rounded-lg">
                      {t.auth.signInBtn}
                    </Button>

                    <button type="button" onClick={() => setAuthMethod("list")} className="w-full text-center text-xs text-neutral-500 hover:text-brand-red hover:underline mt-2 transition-colors cursor-pointer">
                      {t.auth.backBtn}
                    </button>
                  </form>
                )
              ) : (
                authMethod === "list" ? (
                  /* View 3: Register List Options */
                  <div className="flex flex-col items-center gap-3 w-full text-center select-none">
                    <h2 className="text-2xl font-bold text-brand-dark mb-3">{t.auth.signUpTitle}</h2>
                    
                    <button
                      onClick={() => alert("Sign up with Apple")}
                      className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-black hover:bg-neutral-900 text-white text-sm font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      <svg className="h-5 w-5 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.51 12.06 1.005 1.45 2.187 3.068 3.757 3.007 1.516-.06 2.09-.98 3.92-.98 1.82 0 2.347.98 3.93.95 1.618-.03 2.654-1.47 3.652-2.922 1.153-1.688 1.63-3.32 1.66-3.41-.03-.01-3.178-1.22-3.21-4.82-.03-3.02 2.47-4.47 2.58-4.54-1.42-2.08-3.6-2.31-4.38-2.36-2.062-.167-3.24 1.078-4.09 1.078zM16.14 3.75c.828-1.006 1.386-2.41 1.233-3.812-1.2.05-2.656.8-3.518 1.802-.74.85-1.39 2.27-1.216 3.655 1.34.1 2.7-.66 3.5-1.645z" />
                      </svg>
                      <span>{t.auth.withApple}</span>
                    </button>

                    <button
                      onClick={() => alert("Sign up with Facebook")}
                      className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white text-sm font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      <svg className="h-5 w-5 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <span>{t.auth.withFacebook}</span>
                    </button>

                    <button
                      onClick={() => alert("Sign up with Google")}
                      className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-neutral-50 text-neutral-700 text-sm font-semibold rounded-lg border border-neutral-300 shadow-xs transition-colors cursor-pointer"
                    >
                      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                        <path fill="#EA4335" d="M12 5.04c1.67 0 3.17.58 4.35 1.71l3.25-3.25C17.65 1.58 14.98 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.85 2.99c.9-2.7 3.4-4.5 6.76-4.5z" />
                        <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.44c-.28 1.48-1.11 2.73-2.36 3.58l3.66 2.84c2.14-1.98 3.75-4.88 3.75-8.57z" />
                        <path fill="#FBBC05" d="M5.24 10.55c-.23-.7-.36-1.45-.36-2.22s.13-1.52.36-2.22L1.39 3.12C.5 4.9.01 6.89.01 9c0 2.11.49 4.1 1.38 5.88l3.85-3.33z" />
                        <path fill="#34A853" d="M12 17.5c-3.36 0-5.86-1.8-6.76-4.5L1.39 15.99c1.98 3.89 5.96 6.56 10.61 6.56 3 0 5.83-1.04 8.01-2.83l-3.66-2.84c-1.18.79-2.69 1.28-4.36 1.28z" />
                      </svg>
                      <span>{t.auth.withGoogle}</span>
                    </button>

                    <button
                      onClick={() => setAuthMethod("email")}
                      className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-sm font-semibold rounded-lg border border-neutral-200/60 transition-colors cursor-pointer"
                    >
                      <Mail className="h-5 w-5 text-neutral-600 shrink-0" />
                      <span>{t.auth.regWithEmail}</span>
                    </button>

                    <div className="text-xs text-neutral-500 mt-4">
                      {t.auth.haveAccount}{" "}
                      <span onClick={() => { setAuthMode("signin"); setAuthMethod("list"); }} className="text-brand-red hover:text-brand-red/90 cursor-pointer hover:underline font-bold">
                        {t.auth.loginLink}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* View 4: Register Email Input Form */
                  <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4 text-left">
                    <h2 className="text-lg font-bold text-brand-dark text-center mb-2">{t.auth.regWithEmail}</h2>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-neutral-500">{t.auth.nameLabel}</label>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        className="bg-white border-neutral-250 text-brand-dark placeholder:text-neutral-400 focus-visible:ring-brand-red rounded-lg"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-neutral-500">{t.auth.emailLabel}</label>
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white border-neutral-250 text-brand-dark placeholder:text-neutral-400 focus-visible:ring-brand-red rounded-lg"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-neutral-500">{t.auth.passwordLabel}</label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white border-neutral-250 text-brand-dark placeholder:text-neutral-400 focus-visible:ring-brand-red rounded-lg"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full mt-2 font-bold bg-brand-red hover:bg-brand-red/90 text-white rounded-lg">
                      {t.auth.registerBtn}
                    </Button>

                    <button type="button" onClick={() => setAuthMethod("list")} className="w-full text-center text-xs text-neutral-500 hover:text-brand-red hover:underline mt-2 transition-colors cursor-pointer">
                      {t.auth.backBtn}
                    </button>
                  </form>
                )
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  )
}

export default Header
