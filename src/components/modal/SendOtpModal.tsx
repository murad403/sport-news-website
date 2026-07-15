"use client"
import React, { useEffect } from "react"
import Image from "next/image"
import logoImg from "@/assets/logo.png"
import { Dialog, DialogContent } from "../ui/Dialog"
import Button from "../ui/Button"
import Input from "../ui/Input"
import { useTranslation } from "@/lib/useTranslation"
import { useSendOtpMutation } from "@/redux/features/auth/auth.api"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SendOtpFormValues, sendOtpSchema } from "@/validation/validation"

interface SendOtpModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (email: string) => void
  lang?: string
}

const SendOtpModal: React.FC<SendOtpModalProps> = ({ isOpen, onClose, onSuccess, lang = "it" }) => {
  const { t } = useTranslation()
  const [sendOtp, { isLoading, error }] = useSendOtpMutation()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SendOtpFormValues>({
    resolver: zodResolver(sendOtpSchema),
    defaultValues: {
      email: ""
    }
  })

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      reset({ email: "" })
    }
  }, [isOpen, reset])

  const onSubmit = async (values: SendOtpFormValues) => {
    try {
      await sendOtp({
        email: values.email,
        purpose: "reset_password"
      }).unwrap()

      onSuccess(values.email)
    } catch (err) {
      console.error("Send OTP Error:", err)
    }
  }

  const apiErrorMsg = error
    ? ((error as any)?.data?.message || (error as any)?.data?.detail || (error as any)?.data?.error || "Failed to send verification code. Please try again.")
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
            {lang === "it" ? "Password dimenticata" : "Forgot Password"}
          </h2>
          <p className="text-xs text-neutral-500 text-center -mt-2">
            {lang === "it"
              ? "Inserisci la tua email per ricevere un codice di verifica a 6 cifre."
              : "Enter your email address to receive a 6-digit verification code."}
          </p>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-neutral-500">{t.auth.emailLabel}</label>
            <Input
              type="email"
              placeholder="name@example.com"
              className="bg-white border-neutral-250 text-brand-dark placeholder:text-neutral-400 focus-visible:ring-brand-red rounded-lg"
              disabled={isLoading}
              {...register("email")}
            />
            {errors.email && (
              <span className="text-xs text-brand-red font-semibold">{errors.email.message}</span>
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
              ? (lang === "it" ? "Invio in corso..." : "Sending...")
              : (lang === "it" ? "Invia Codice" : "Send Code")}
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

export default SendOtpModal