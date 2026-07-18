"use client"
import React, { useEffect } from "react"
import Image from "next/image"
import logoImg from "@/assets/logo.png"
import { Dialog, DialogContent } from "../ui/Dialog"
import Button from "../ui/Button"
import Input from "../ui/Input"
import { useTranslation } from "@/lib/useTranslation"
import { useVerifyOtpMutation } from "@/redux/features/auth/auth.api"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { VerifyOtpFormValues, verifyOtpSchema } from "@/validation/validation"

interface VerifyOtpModalProps {
  isOpen: boolean
  email: string
  onClose: () => void
  onSuccess: () => void
  purpose?: "signup" | "reset_password"
}

const VerifyOtpModal: React.FC<VerifyOtpModalProps> = ({ isOpen, email, onClose, onSuccess, purpose = "signup" }) => {
  const { t } = useTranslation()
  const [verifyOtp, { isLoading, error }] = useVerifyOtpMutation()

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: ""
    }
  })

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      reset({ otp: "" })
    }
  }, [isOpen, reset])

  const onSubmit = async (values: VerifyOtpFormValues) => {
    try {
      await verifyOtp({
        email,
        otp: values.otp,
        purpose
      }).unwrap()

      onSuccess()
    } catch (err) {
      console.error("OTP Verification Error:", err)
    }
  }

  const apiErrorMsg = error
    ? ((error as any)?.data?.message || (error as any)?.data?.detail || (error as any)?.data?.error || "OTP verification failed. Please try again.")
    : null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open && !isLoading) onClose(); }}>
      <DialogContent className="sm:max-w-sm bg-white border border-neutral-200 text-brand-dark p-8">
        {/* LA | TRIBUNA SPORTIVA logo centered */}
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
          <h2 className="text-xl font-bold text-brand-dark text-center">{t.auth.otpTitle}</h2>
          <p className="text-xs text-neutral-500 text-center -mt-2">
            {t.auth.otpSubtitle} <strong className="text-neutral-700">{email}</strong>
          </p>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-neutral-500">{t.auth.otpLabel}</label>
            <Input
              type="text"
              maxLength={6}
              placeholder={t.auth.otpPlaceholder}
              className="bg-white border-neutral-250 text-brand-dark text-center tracking-[0.5em] text-lg font-bold placeholder:text-neutral-350 focus-visible:ring-brand-red rounded-lg"
              disabled={isLoading}
              {...register("otp", {
                onChange: (e) => {
                  const val = e.target.value.replace(/\D/g, "")
                  setValue("otp", val)
                }
              })}
            />
            {errors.otp && (
              <span className="text-xs text-brand-red font-semibold">{errors.otp.message}</span>
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
            {isLoading ? "Verifying..." : t.auth.verifyBtn}
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

export default VerifyOtpModal
