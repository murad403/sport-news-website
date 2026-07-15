"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import logoImg from "@/assets/logo.png"
import { Dialog, DialogContent } from "../ui/Dialog"
import Button from "../ui/Button"
import Input from "../ui/Input"
import { useTranslation } from "@/lib/useTranslation"
import { useVerifyOtpMutation } from "@/redux/features/auth/auth.api"

interface VerifyOtpModalProps {
  isOpen: boolean
  email: string
  onClose: () => void
  onSuccess: () => void
}

const VerifyOtpModal: React.FC<VerifyOtpModalProps> = ({
  isOpen,
  email,
  onClose,
  onSuccess
}) => {
  const { t } = useTranslation()
  const [otp, setOtp] = useState("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation()

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setOtp("")
      setErrorMessage(null)
    }
  }, [isOpen])

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (otp.length !== 6) {
      setErrorMessage((t.auth.otpLabel || "OTP Code") + " must be 6 digits.")
      return
    }

    try {
      await verifyOtp({
        email,
        otp,
        purpose: "signup"
      }).unwrap()
      
      onSuccess()
    } catch (err: any) {
      console.error("OTP Verification Error:", err)
      const apiErrorMsg = err?.data?.message || err?.data?.detail || err?.data?.error || "OTP verification failed. Please try again."
      setErrorMessage(apiErrorMsg)
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

        <form onSubmit={handleVerifySubmit} className="flex flex-col gap-4 text-left">
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
              value={otp}
              onChange={(e) => {
                // Only allow numbers and max length 6
                const val = e.target.value.replace(/\D/g, "")
                setOtp(val)
              }}
              className="bg-white border-neutral-250 text-brand-dark text-center tracking-[0.5em] text-lg font-bold placeholder:text-neutral-350 focus-visible:ring-brand-red rounded-lg"
              required
              disabled={isLoading}
            />
          </div>

          {errorMessage && (
            <div className="text-xs font-semibold text-brand-red bg-red-50 border border-red-200 rounded-lg p-2.5 text-center">
              {errorMessage}
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
