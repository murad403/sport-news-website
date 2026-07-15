"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useChangePasswordMutation } from "@/redux/features/auth/auth.api"
import { useTranslation } from "@/lib/useTranslation"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { Eye, EyeOff } from "lucide-react"

const changePasswordSchema = z.object({
  old_password: z.string().min(1, "Old password is required"),
  new_password: z.string().min(8, "New password must be at least 8 characters long"),
  confirm_password: z.string().min(1, "Please confirm your new password")
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"]
})

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>

export default function ChangePasswordPage() {
  const { lang } = useTranslation()
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const [changePassword, { isLoading }] = useChangePasswordMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema)
  })

  const onSubmit = async (data: ChangePasswordFormValues) => {
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      await changePassword({
        old_password: data.old_password,
        new_password: data.new_password
      }).unwrap()

      setSuccessMessage(
        lang === "it"
          ? "Password modificata con successo!"
          : "Password changed successfully!"
      )
      reset({
        old_password: "",
        new_password: "",
        confirm_password: ""
      })
    } catch (err: any) {
      console.error("Change password error:", err)
      const apiErrorMsg = err?.data?.message || err?.data?.detail || err?.data?.error || "Failed to change password. Please check your old password."
      setErrorMessage(apiErrorMsg)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-dark">
          {lang === "it" ? "Cambia Password" : "Change Password"}
        </h1>
        <p className="text-xs text-neutral-500">
          {lang === "it" 
            ? "Aggiorna la password del tuo account per mantenerlo sicuro." 
            : "Update your account password to keep it secure."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        {/* Old Password */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-neutral-500">
            {lang === "it" ? "Vecchia Password" : "Old Password"}
          </label>
          <div className="relative flex items-center">
            <Input
              type={showOldPassword ? "text" : "password"}
              placeholder="••••••••"
              className="bg-white border-neutral-250 text-brand-dark placeholder:text-neutral-400 focus-visible:ring-brand-red rounded-lg pr-10"
              {...register("old_password")}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-3 text-neutral-500 hover:text-neutral-700 cursor-pointer select-none"
              disabled={isLoading}
            >
              {showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.old_password && (
            <span className="text-xs text-brand-red font-semibold">{errors.old_password.message}</span>
          )}
        </div>

        {/* New Password */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-neutral-500">
            {lang === "it" ? "Nuova Password" : "New Password"}
          </label>
          <div className="relative flex items-center">
            <Input
              type={showNewPassword ? "text" : "password"}
              placeholder="••••••••"
              className="bg-white border-neutral-250 text-brand-dark placeholder:text-neutral-400 focus-visible:ring-brand-red rounded-lg pr-10"
              {...register("new_password")}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 text-neutral-500 hover:text-neutral-700 cursor-pointer select-none"
              disabled={isLoading}
            >
              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.new_password && (
            <span className="text-xs text-brand-red font-semibold">{errors.new_password.message}</span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-neutral-500">
            {lang === "it" ? "Conferma Nuova Password" : "Confirm New Password"}
          </label>
          <div className="relative flex items-center">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              className="bg-white border-neutral-250 text-brand-dark placeholder:text-neutral-400 focus-visible:ring-brand-red rounded-lg pr-10"
              {...register("confirm_password")}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 text-neutral-500 hover:text-neutral-700 cursor-pointer select-none"
              disabled={isLoading}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirm_password && (
            <span className="text-xs text-brand-red font-semibold">{errors.confirm_password.message}</span>
          )}
        </div>

        {/* Feedback Messages */}
        {errorMessage && (
          <div className="text-xs font-semibold text-brand-red bg-red-50 border border-red-200 rounded-lg p-2.5 text-center">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg p-2.5 text-center">
            {successMessage}
          </div>
        )}

        <Button
          type="submit"
          className="w-full mt-2 font-bold bg-brand-red hover:bg-brand-red/90 text-white rounded-lg cursor-pointer"
          disabled={isLoading}
        >
          {isLoading 
            ? (lang === "it" ? "Salvataggio..." : "Saving...") 
            : (lang === "it" ? "Aggiorna Password" : "Update Password")}
        </Button>
      </form>
    </div>
  )
}