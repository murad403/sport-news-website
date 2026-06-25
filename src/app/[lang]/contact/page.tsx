"use client"

import React, { useState } from "react"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/Select"
import { Mail, Phone, MapPin, CheckCircle2, Send, HelpCircle } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"

export default function ContactPage() {
  const { t, lang } = useTranslation()
  const isIt = lang === "it"

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = () => {
    // Basic validations
    if (!name.trim() || !email.trim() || !subject || !message.trim()) {
      setError(isIt ? "Compila tutti i campi prima di inviare il messaggio." : "Please fill out all the fields before submitting.")
      return
    }

    if (!email.includes("@")) {
      setError(isIt ? "Inserisci un indirizzo email valido." : "Please provide a valid email address.")
      return
    }

    setError("")
    setSubmitted(true)
    setName("")
    setEmail("")
    setSubject("")
    setMessage("")
  }

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      
      {/* Page Header */}
      <div>
        <h1 className="font-headline text-3xl md:text-5xl font-extrabold uppercase text-brand-dark flex items-center gap-2">
          <Mail className="h-8 w-8 text-brand-red" />
          {isIt ? "Contatti SportsPulse" : "Contact SportsPulse"}
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
            <div className="flex flex-col gap-4">
              
              {/* Error Box */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-brand-red rounded-lg p-3 text-xs font-semibold">
                  ⚠️ {error}
                </div>
              )}

              {/* Name field */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-neutral-500">{t.contact.nameLabel}</label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email field */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-neutral-500">{t.contact.emailLabel}</label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Subject Dropdown Select */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-neutral-500">{t.contact.subjectLabel}</label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder={isIt ? "Seleziona l'oggetto" : "Select Subject Inquiry"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">{isIt ? "Richiesta Generale" : "General Inquiry"}</SelectItem>
                    <SelectItem value="Press">{isIt ? "Stampa & Redazione" : "Press & Editorial"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Message field */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-neutral-500">{t.contact.messageLabel}</label>
                <textarea
                  placeholder={isIt ? "Come possiamo aiutarti?" : "How can we help you?"}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex min-h-[120px] w-full rounded-md border border-border bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-red disabled:cursor-not-allowed disabled:opacity-50 text-neutral-800"
                />
              </div>

              {/* Send Button */}
              <Button onClick={handleSubmit} className="w-full flex items-center gap-2 mt-4 font-bold h-10">
                <Send className="h-4 w-4" />
                {t.contact.sendBtn}
              </Button>

            </div>
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
                  <span>SportsPulse Media Group</span>
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
                <span className="text-neutral-355 hover:text-white transition-colors">contact@sportspulse.com</span>
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
