"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import logoImg from "@/assets/logo.png"
import { Dialog, DialogContent } from "../ui/Dialog"
import Button from "../ui/Button"
import Input from "../ui/Input"
import { Mail, Eye, EyeOff } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"
import { useSignInMutation } from "@/redux/features/auth/auth.api"
import { saveToken } from "@/lib/auth"

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  onSwitchToSignUp: () => void
  onForgotPassword: () => void
  initialEmail?: string
  lang?: string
}

const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onSwitchToSignUp,
  onForgotPassword,
  initialEmail = "",
  lang = "it"
}) => {
  const { t } = useTranslation()
  const [authMethod, setAuthMethod] = useState<"list" | "email">("list")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [signIn, { isLoading }] = useSignInMutation()

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setAuthMethod("list")
      setEmail("")
      setPassword("")
      setShowPassword(false)
      setErrorMessage(null)
    } else if (initialEmail) {
      setAuthMethod("email")
      setEmail(initialEmail)
      setPassword("")
      setShowPassword(false)
      setErrorMessage(null)
    }
  }, [isOpen, initialEmail])

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    if (email && password) {
      try {
        const response = await signIn({ email, password }).unwrap()
        await saveToken(response.access, response.refresh)
        onSuccess()
      } catch (err: any) {
        console.error("Sign In Error:", err)
        const apiErrorMsg = err?.data?.message || err?.data?.detail || err?.data?.error || "Login failed. Please check your credentials."
        setErrorMessage(apiErrorMsg)
      }
    }
  }


  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open && !isLoading) onClose(); }}>
      <DialogContent className="sm:max-w-sm bg-white border border-neutral-200 text-brand-dark p-8">
        {/* SportsPulse logo centered */}
        <div className="flex items-center justify-center mb-8 select-none">
          <Image
            src={logoImg}
            alt="La Tribuna Sportiva"
            height={500}
            width={500}
            className="h-24 w-full object-cover"
          />
        </div>

        {authMethod === "list" ? (
          /* View 1: Sign In List Options */
          <div className="flex flex-col items-center gap-3 w-full text-center select-none">
            <h2 className="text-2xl font-bold text-brand-dark mb-3">{t.auth.signInTitle}</h2>

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
              <span onClick={onSwitchToSignUp} className="text-brand-red hover:text-brand-red/90 cursor-pointer hover:underline font-bold">
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
                disabled={isLoading}
              />
            </div>

             <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold uppercase text-neutral-500">{t.auth.passwordLabel}</label>
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-[10px] font-bold text-neutral-400 hover:text-brand-red cursor-pointer hover:underline"
                  disabled={isLoading}
                >
                  {lang === "it" ? "Password dimenticata?" : "Forgot Password?"}
                </button>
              </div>
              <div className="relative flex items-center">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white border-neutral-250 text-brand-dark placeholder:text-neutral-400 focus-visible:ring-brand-red rounded-lg pr-10"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-neutral-500 hover:text-neutral-700 cursor-pointer select-none"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="text-xs font-semibold text-brand-red bg-red-50 border border-red-200 rounded-lg p-2.5 text-center">
                {errorMessage}
              </div>
            )}

            <Button type="submit" className="w-full mt-2 font-bold bg-brand-red hover:bg-brand-red/90 text-white rounded-lg cursor-pointer" disabled={isLoading}>
              {isLoading ? "Signing in..." : t.auth.signInBtn}
            </Button>

            <button type="button" onClick={() => setAuthMethod("list")} className="w-full text-center text-xs text-neutral-500 hover:text-brand-red hover:underline mt-2 transition-colors cursor-pointer" disabled={isLoading}>
              {t.auth.backBtn}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default SignInModal