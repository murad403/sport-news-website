"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import logoImg from "@/assets/logo.png"
import { Dialog, DialogContent } from "../ui/Dialog"
import Button from "../ui/Button"
import Input from "../ui/Input"
import { Mail } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"

interface SignUpModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
    onSwitchToSignIn: () => void
}

const SignUpModal: React.FC<SignUpModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    onSwitchToSignIn
}) => {
    const { t } = useTranslation()
    const [authMethod, setAuthMethod] = useState<"list" | "email">("list")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Reset form when modal opens/closes
    useEffect(() => {
        if (!isOpen) {
            setAuthMethod("list")
            setName("")
            setEmail("")
            setPassword("")
        }
    }, [isOpen])

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (name && email && password) {
            onSuccess()
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
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
                    /* View 3: Register List Options */
                    <div className="flex flex-col items-center gap-3 w-full text-center select-none">
                        <h2 className="text-2xl font-bold text-brand-dark mb-3">{t.auth.signUpTitle}</h2>

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
                            <span onClick={onSwitchToSignIn} className="text-brand-red hover:text-brand-red/90 cursor-pointer hover:underline font-bold">
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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                )}
            </DialogContent>
        </Dialog>
    )
}

export default SignUpModal
