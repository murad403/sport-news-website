import React from "react"
import { ShieldCheck, Calendar, Lock, Mail, Globe } from "lucide-react"

interface PageProps {
  params: Promise<{
    lang: string
  }>
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const { lang } = await params
  const isIt = lang === "it"

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 select-none flex flex-col gap-8">
      
      {/* Page Header */}
      <div className="text-center md:text-left flex flex-col md:flex-row items-center gap-4 border-b border-neutral-200 pb-6">
        <div className="h-16 w-16 bg-brand-red/10 rounded-full flex items-center justify-center text-brand-red shrink-0">
          <ShieldCheck className="h-10 w-10" />
        </div>
        <div className="flex flex-col gap-1.5">
          <h1 className="font-headline text-3xl md:text-5xl font-extrabold uppercase text-brand-dark leading-none">
            {isIt ? "Informativa sulla Privacy" : "Privacy Policy"}
          </h1>
          <p className="text-xs md:text-sm text-neutral-500 font-semibold flex items-center gap-1.5 justify-center md:justify-start">
            <Calendar className="h-4 w-4 text-brand-red" />
            {isIt ? "Ultimo aggiornamento: 16 Luglio 2026" : "Last updated: July 16, 2026"}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-10 shadow-xs flex flex-col gap-8">
        
        {/* Intro */}
        <div className="flex flex-col gap-2">
          <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
            {isIt
              ? "La tua privacy è estremamente importante per noi. Questa Informativa sulla privacy spiega quali informazioni personali raccogliamo, come le utilizziamo e i tuoi diritti in relazione ad esse sul nostro portale di notizie sportive."
              : "Your privacy is of paramount importance to us. This Privacy Policy details the types of personal information we collect, how we handle it, and the rights you possess in connection with your data on our sports portal."}
          </p>
        </div>

        {/* Section 1 */}
        <div className="flex flex-col gap-3">
          <h2 className="font-headline text-xl md:text-2xl font-bold uppercase text-brand-dark border-l-3 border-brand-red pl-3 flex items-center gap-2">
            <Globe className="h-5 w-5 text-brand-red" />
            {isIt ? "1. Informazioni che Raccogliamo" : "1. Information We Collect"}
          </h2>
          <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
            {isIt
              ? "Raccogliamo informazioni fornite direttamente da te (ad esempio, quando ti registri per una newsletter, crei un account, lasci commenti o ci contatti). Queste possono includere:"
              : "We gather information that you provide to us directly (for instance, when signing up for newsletter services, registering an account, commenting on sports columns, or getting in touch). This may include:"}
          </p>
          <ul className="list-disc pl-5 text-sm md:text-base text-neutral-600 space-y-1">
            {isIt ? (
              <>
                <li>Nome e indirizzo email per newsletter e account personali.</li>
                <li>Dettagli del profilo come immagini di avatar se caricate.</li>
                <li>Informazioni inviate tramite i form di supporto o di contatto.</li>
              </>
            ) : (
              <>
                <li>Your name and email address for newsletter subscriptions and account updates.</li>
                <li>Profile details such as custom avatars or user preferences if updated.</li>
                <li>Communications sent via support tickets or contact forms.</li>
              </>
            )}
          </ul>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col gap-3">
          <h2 className="font-headline text-xl md:text-2xl font-bold uppercase text-brand-dark border-l-3 border-brand-red pl-3 flex items-center gap-2">
            <Lock className="h-5 w-5 text-brand-red" />
            {isIt ? "2. Come Utilizziamo le Informazioni" : "2. How We Use Your Information"}
          </h2>
          <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
            {isIt
              ? "Utilizziamo le informazioni raccolte per fornire e migliorare i nostri servizi editoriali. In particolare per:"
              : "We deploy the gathered information solely to deliver and optimize our editorial offerings. Specifically, this includes:"}
          </p>
          <ul className="list-disc pl-5 text-sm md:text-base text-neutral-600 space-y-1">
            {isIt ? (
              <>
                <li>Fornire aggiornamenti sportivi e newsletter personalizzate.</li>
                <li>Moderare e approvare in modo sicuro i commenti sportivi della community.</li>
                <li>Risolvere problemi tecnici o rispondere a richieste di supporto.</li>
                <li>Analizzare dati in forma aggregata per ottimizzare la leggibilità del sito.</li>
              </>
            ) : (
              <>
                <li>Delivering timely sports columns and customized news updates.</li>
                <li>Moderating and publishing community comments on match bulletins safely.</li>
                <li>Troubleshooting platform issues or addressing support inquiries.</li>
                <li>Analyzing anonymous site traffic data to refine the layout and content hierarchy.</li>
              </>
            )}
          </ul>
        </div>

        {/* Section 3 */}
        <div className="flex flex-col gap-3">
          <h2 className="font-headline text-xl md:text-2xl font-bold uppercase text-brand-dark border-l-3 border-brand-red pl-3 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-brand-red" />
            {isIt ? "3. Cookie e Tecnologie di Tracciamento" : "3. Cookies & Tracking"}
          </h2>
          <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
            {isIt
              ? "Utilizziamo cookie tecnici essenziali e cookie analitici di terze parti per migliorare l'esperienza di navigazione. Puoi controllare le tue impostazioni relative ai cookie direttamente nelle preferenze del tuo browser web."
              : "We utilize essential operational cookies alongside anonymous analytical tracking cookies to enrich user flows. You can configure and manage cookie preferences directly from your device browser settings at any point."}
          </p>
        </div>

        {/* Section 4 */}
        <div className="flex flex-col gap-3">
          <h2 className="font-headline text-xl md:text-2xl font-bold uppercase text-brand-dark border-l-3 border-brand-red pl-3 flex items-center gap-2">
            <Mail className="h-5 w-5 text-brand-red" />
            {isIt ? "4. Contatti" : "4. Contact Us"}
          </h2>
          <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
            {isIt
              ? "Per qualsiasi domanda relativa a questa Informativa sulla privacy o sul trattamento dei tuoi dati personali, ti invitiamo a contattarci all'indirizzo email support@latribunasportiva.com."
              : "If you have questions regarding this Privacy Policy or wishes to inspect or delete your personal details, feel free to drop us a line at support@latribunasportiva.com."}
          </p>
        </div>

      </div>

    </div>
  )
}