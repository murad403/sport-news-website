"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import { Mail, Phone, MapPin, CheckCircle2, Send, HelpCircle } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"
import { cn } from "@/lib/utils"
import { useSendContactMessageMutation } from "@/redux/features/auth/auth.api"

export default function ContactPage() {
  const { t, lang } = useTranslation()
  const isIt = lang === "it"

  const [submitted, setSubmitted] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const [sendContactMessage, { isLoading }] = useSendContactMessageMutation()

  const contactSchema = React.useMemo(() => {
    return z.object({
      name: z.string().trim().min(1, isIt ? "Il nome è obbligatorio." : "Name is required."),
      email: z.string().trim().min(1, isIt ? "L'email è obbligatoria." : "Email is required.").email(isIt ? "Inserisci un indirizzo email valido." : "Please provide a valid email address."),
      subject: z.string().trim().min(1, isIt ? "L'oggetto è obbligatorio." : "Subject is required."),
      message: z.string().trim().min(1, isIt ? "Il messaggio è obbligatorio." : "Message is required."),
    })
  }, [isIt])

  type ContactFormValues = z.infer<typeof contactSchema>

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    }
  })

  const onSubmit = async (data: ContactFormValues) => {
    setApiError(null)
    try {
      await sendContactMessage(data).unwrap()
      setSubmitted(true)
      reset()
    } catch (err: any) {
      console.error("Failed to send contact message:", err)
      setApiError(
        err?.data?.detail || 
        err?.data?.message || 
        (isIt ? "Si è verificato un errore durante l'invio del messaggio." : "An error occurred while sending your message.")
      )
    }
  }

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      
      {/* Page Header */}
      <div>
        <h1 className="font-headline text-3xl md:text-5xl font-extrabold uppercase text-brand-dark flex items-center gap-2">
          <Mail className="h-8 w-8 text-brand-red" />
          {isIt ? "Contatti LA | TRIBUNA SPORTIVA" : "Contact LA | TRIBUNA SPORTIVA"}
        </h1>
        <p className="text-xs md:text-sm text-neutral-500 font-semibold">
          {t.contact.subtitle}
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-10 gap-8 items-start my-4">
        
        {/* Contact Form Box (Left, 6 cols of 10) */}
        <div className="md:col-span-6 bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
              <CheckCircle2 className="h-16 w-16 text-green-500 animate-bounce" />
              <h2 className="font-headline text-2xl font-extrabold text-brand-dark">
                {t.contact.successMsg.toUpperCase()}
              </h2>
              <p className="text-sm text-neutral-500 max-w-sm">
                {t.contact.successDetail}
              </p>
              <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-4 font-semibold">
                {isIt ? "Invia un altro messaggio" : "Send Another Message"}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              
              {/* API Error Box */}
              {apiError && (
                <div className="bg-red-50 border border-red-200 text-brand-red rounded-lg p-3 text-xs font-semibold">
                  ⚠️ {apiError}
                </div>
              )}

              {/* Name field */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-neutral-500">{t.contact.nameLabel}</label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  {...register("name")}
                  className={cn(errors.name ? "border-brand-red focus-visible:ring-brand-red/50" : "")}
                />
                {errors.name && (
                  <p className="text-xs font-semibold text-brand-red mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email field */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-neutral-500">{t.contact.emailLabel}</label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  {...register("email")}
                  className={cn(errors.email ? "border-brand-red focus-visible:ring-brand-red/50" : "")}
                />
                {errors.email && (
                  <p className="text-xs font-semibold text-brand-red mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Subject Input Field */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-neutral-500">{t.contact.subjectLabel}</label>
                <Input
                  type="text"
                  placeholder={isIt ? "Oggetto della richiesta" : "Inquiry Subject"}
                  {...register("subject")}
                  className={cn(errors.subject ? "border-brand-red focus-visible:ring-brand-red/50" : "")}
                />
                {errors.subject && (
                  <p className="text-xs font-semibold text-brand-red mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message field */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-neutral-500">{t.contact.messageLabel}</label>
                <textarea
                  placeholder={isIt ? "Come possiamo aiutarti?" : "How can we help you?"}
                  {...register("message")}
                  className={cn(
                    "flex min-h-[120px] w-full rounded-md border border-border bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-red disabled:cursor-not-allowed disabled:opacity-50 text-neutral-800",
                    errors.message ? "border-brand-red focus-visible:ring-brand-red/50" : ""
                  )}
                />
                {errors.message && (
                  <p className="text-xs font-semibold text-brand-red mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Send Button */}
              <Button type="submit" disabled={isLoading} className="w-full flex items-center gap-2 mt-4 font-bold h-10">
                <Send className="h-4 w-4" />
                {isLoading ? (isIt ? "Invio in corso..." : "Sending...") : t.contact.sendBtn}
              </Button>

            </form>
          )}
        </div>

        {/* Contact Info Column (Right, 4 cols of 10) */}
        <div className="md:col-span-4 flex flex-col gap-6 select-none">
          
          {/* Info Details card */}
          <div className="bg-brand-dark text-white rounded-2xl p-6 shadow-md flex flex-col gap-6">
            <h3 className="font-headline text-2xl font-extrabold text-brand-red uppercase border-b border-neutral-800 pb-2">
              {t.contact.corporateOffice}
            </h3>

            <div className="flex flex-col gap-4 text-xs font-semibold">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-red shrink-0" />
                <div className="flex flex-col gap-0.5 text-neutral-300">
                  <span>LA | TRIBUNA SPORTIVA Media Group</span>
                  <span>100 San Siro Boulevard, Suite 500</span>
                  <span>{isIt ? "Milano, Italia (IT-20151)" : "Milan, Italy (IT-20151)"}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-brand-red shrink-0" />
                <span className="text-neutral-355 hover:text-white transition-colors">+39 02 123 4567</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-brand-red shrink-0" />
                <span className="text-neutral-355 hover:text-white transition-colors">contact@LA | TRIBUNA SPORTIVA.com</span>
              </div>
            </div>
          </div>

          {/* FAQ Box */}
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-headline text-lg font-bold text-brand-dark flex items-center gap-2 border-b border-neutral-100 pb-2 mb-3">
              <HelpCircle className="h-4 w-4 text-brand-red" />
              {t.contact.faqTitle}
            </h3>
            <div className="flex flex-col gap-3 text-xs leading-relaxed text-neutral-600 font-semibold">
              {t.contact.faq.map((item, idx) => (
                <div key={idx}>
                  <h4 className="text-brand-dark font-extrabold">{item.q}</h4>
                  <p className="font-medium text-neutral-500">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
