"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import logoImg from "@/assets/logo.png"
import { Dialog, DialogContent } from "../ui/Dialog"
import Button from "../ui/Button"
import Input from "../ui/Input"
import { Eye, EyeOff } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"
import { useResetPasswordMutation } from "@/redux/features/auth/auth.api"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const resetPasswordSchema = z.object({
  new_password: z.string().min(8, "Password must be at least 8 characters long")
})

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

interface ResetPasswordModalProps {
  isOpen: boolean
  email: string
  onClose: () => void
  onSuccess: () => void
  lang?: string
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  isOpen,
  email,
  onClose,
  onSuccess,
  lang = "it"
}) => {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      new_password: ""
    }
  })

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      reset({ new_password: "" })
      setShowPassword(false)
    }
  }, [isOpen, reset])

  const onSubmit = async (values: ResetPasswordFormValues) => {
    try {
      await resetPassword({
        email,
        new_password: values.new_password
      }).unwrap()

      onSuccess()
    } catch (err) {
      console.error("Reset Password Error:", err)
    }
  }

  const apiErrorMsg = error
    ? ((error as any)?.data?.message || (error as any)?.data?.detail || (error as any)?.data?.error || "Failed to reset password. Please try again.")
    : null

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

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-left">
          <h2 className="text-xl font-bold text-brand-dark text-center">
            {lang === "it" ? "Reimposta Password" : "Reset Password"}
          </h2>
          <p className="text-xs text-neutral-500 text-center -mt-2">
            {lang === "it" 
              ? "Crea una nuova password per il tuo account." 
              : "Create a new password for your account."}
          </p>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-neutral-500">{t.auth.passwordLabel}</label>
            <div className="relative flex items-center">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-white border-neutral-250 text-brand-dark placeholder:text-neutral-400 focus-visible:ring-brand-red rounded-lg pr-10"
                disabled={isLoading}
                {...register("new_password")}
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
            {errors.new_password && (
              <span className="text-xs text-brand-red font-semibold">{errors.new_password.message}</span>
            )}
          </div>

          {apiErrorMsg && (
            <div className="text-xs font-semibold text-brand-red bg-red-50 border border-red-200 rounded-lg p-2.5 text-center">
              {apiErrorMsg}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full mt-2 font-bold bg-brand-red hover:bg-brand-red/90 text-white rounded-lg cursor-pointer"
            disabled={isLoading}
          >
            {isLoading 
              ? (lang === "it" ? "Salvataggio..." : "Saving...") 
              : (lang === "it" ? "Reimposta Password" : "Reset Password")}
          </Button>

          <button 
            type="button" 
            onClick={onClose} 
            className="w-full text-center text-xs text-neutral-500 hover:text-brand-red hover:underline mt-2 transition-colors cursor-pointer"
            disabled={isLoading}
          >
            {t.auth.backBtn}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ResetPasswordModal