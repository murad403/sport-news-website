"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Menu, User } from "lucide-react"
import SearchBar from "../ui/SearchBar"
import Button from "../ui/Button"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "../ui/Sheet"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/Dialog"
import Input from "../ui/Input"

const Header: React.FC = () => {
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

  const mobileNavLinks = [
    { label: "Home", href: "/" },
    { label: "Football", href: "/categories/Football" },
    { label: "Soccer Results", href: "/soccer-results" },
    { label: "Tennis", href: "/categories/Tennis" },
    { label: "Basketball", href: "/categories/Basketball" },
    { label: "F1", href: "/categories/F1" },
    { label: "Player Updates", href: "/player-updates" },
    { label: "Statistics", href: "/statistics" },
    { label: "Sponsors", href: "/sponsors" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" }
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
        <Link href="/" className="flex items-center gap-1.5">
          <span className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight text-brand-red uppercase">
            ⚽ SportsPulse
          </span>
        </Link>

        {/* Right Section: Search & Login */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <SearchBar />
          </div>

          <Dialog open={showLogin} onOpenChange={handleOpenChange}>
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button className="h-9 w-9 rounded-full bg-neutral-100 border border-neutral-200 hover:bg-neutral-250 flex items-center justify-center text-brand-dark transition-colors cursor-pointer" title="Account Settings">
                  <User className="h-5 w-5 text-neutral-600" />
                </button>
                <Button variant="outline" size="sm" onClick={handleLogout} className="rounded-full text-xs font-semibold">
                  Logout
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
                  <div className="flex flex-col items-center gap-4 text-center select-none">
                    <h2 className="text-xl font-bold text-brand-dark mb-2">Sign in</h2>
                    
                    <button onClick={() => alert("Sign in with Apple")} className="w-full text-center py-2 text-sm font-semibold text-neutral-600 hover:text-brand-red hover:underline transition-all cursor-pointer">
                      Sign in with Apple
                    </button>
                    <button onClick={() => alert("Log in with Facebook")} className="w-full text-center py-2 text-sm font-semibold text-neutral-600 hover:text-brand-red hover:underline transition-all cursor-pointer">
                      Log in with Facebook
                    </button>
                    <button onClick={() => alert("Sign in with Google")} className="w-full text-center py-2 text-sm font-semibold text-neutral-600 hover:text-brand-red hover:underline transition-all cursor-pointer">
                      Sign in with Google
                    </button>
                    <button onClick={() => setAuthMethod("email")} className="w-full text-center py-2 text-sm font-semibold text-neutral-600 hover:text-brand-red hover:underline transition-all cursor-pointer">
                      Log in with email and password
                    </button>

                    <div className="text-xs text-neutral-500 mt-6">
                      Don't have an account?{" "}
                      <span onClick={() => { setAuthMode("register"); setAuthMethod("list"); }} className="text-brand-red hover:text-brand-red/90 cursor-pointer hover:underline font-bold">
                        Register
                      </span>
                    </div>
                  </div>
                ) : (
                  /* View 2: Sign In Email Input Form */
                  <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4 text-left">
                    <h2 className="text-lg font-bold text-brand-dark text-center mb-2">Log in with email and password</h2>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-neutral-500">Email Address</label>
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
                      <label className="text-[10px] font-bold uppercase text-neutral-500">Password</label>
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
                      Sign In
                    </Button>

                    <button type="button" onClick={() => setAuthMethod("list")} className="w-full text-center text-xs text-neutral-500 hover:text-brand-red hover:underline mt-2 transition-colors cursor-pointer">
                      Back to options
                    </button>
                  </form>
                )
              ) : (
                authMethod === "list" ? (
                  /* View 3: Register List Options */
                  <div className="flex flex-col items-center gap-4 text-center select-none">
                    <h2 className="text-xl font-bold text-brand-dark mb-2">Create your account</h2>
                    
                    <button onClick={() => alert("Sign up with Apple")} className="w-full text-center py-2 text-sm font-semibold text-neutral-600 hover:text-brand-red hover:underline transition-all cursor-pointer">
                      Sign up with Apple
                    </button>
                    <button onClick={() => alert("Sign up with Facebook")} className="w-full text-center py-2 text-sm font-semibold text-neutral-600 hover:text-brand-red hover:underline transition-all cursor-pointer">
                      Sign up with Facebook
                    </button>
                    <button onClick={() => alert("Sign up with Google")} className="w-full text-center py-2 text-sm font-semibold text-neutral-600 hover:text-brand-red hover:underline transition-all cursor-pointer">
                      Sign up with Google
                    </button>
                    <button onClick={() => setAuthMethod("email")} className="w-full text-center py-2 text-sm font-semibold text-neutral-600 hover:text-brand-red hover:underline transition-all cursor-pointer">
                      Register with email and password
                    </button>

                    <div className="text-xs text-neutral-500 mt-6">
                      Already have an account?{" "}
                      <span onClick={() => { setAuthMode("signin"); setAuthMethod("list"); }} className="text-brand-red hover:text-brand-red/90 cursor-pointer hover:underline font-bold">
                        Sign in
                      </span>
                    </div>
                  </div>
                ) : (
                  /* View 4: Register Email Input Form */
                  <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4 text-left">
                    <h2 className="text-lg font-bold text-brand-dark text-center mb-2">Register with email and password</h2>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-neutral-500">Full Name</label>
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
                      <label className="text-[10px] font-bold uppercase text-neutral-500">Email Address</label>
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
                      <label className="text-[10px] font-bold uppercase text-neutral-500">Password</label>
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
                      Register
                    </Button>

                    <button type="button" onClick={() => setAuthMethod("list")} className="w-full text-center text-xs text-neutral-500 hover:text-brand-red hover:underline mt-2 transition-colors cursor-pointer">
                      Back to options
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
