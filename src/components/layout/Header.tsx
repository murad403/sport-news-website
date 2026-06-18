"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Menu, User, LogIn } from "lucide-react"
import SearchBar from "../ui/SearchBar"
import Button from "../ui/Button"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "../ui/Sheet"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/Dialog"
import Input from "../ui/Input"

const Header: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      setIsLoggedIn(true)
      setShowLogin(false)
      setEmail("")
      setPassword("")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
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

          <Dialog open={showLogin} onOpenChange={setShowLogin}>
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1 text-sm font-semibold text-brand-dark">
                  <User className="h-4 w-4 text-brand-red" />
                  <span>Account</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <DialogTrigger>
                <Button className="rounded-full flex items-center gap-1.5 px-5">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </DialogTrigger>
            )}

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-headline text-2xl font-bold text-center text-brand-dark">
                  Log in to SportsPulse
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-neutral-500">Email Address</label>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-neutral-500">Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full mt-2">
                    Submit Login
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  )
}

export default Header
