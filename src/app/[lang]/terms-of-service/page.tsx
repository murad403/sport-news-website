import React from "react"
import { FileText, Calendar, Info, Scale, ShieldAlert, Award, Shield } from "lucide-react"

interface PageProps {
  params: Promise<{
    lang: string
  }>
}

export default async function TermsOfServicePage({ params }: PageProps) {
  const { lang } = await params
  const isIt = lang === "it"

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 select-none flex flex-col gap-8">
      
      {/* Page Header */}
      <div className="text-center md:text-left flex flex-col md:flex-row items-center gap-4 border-b border-neutral-200 pb-6">
        <div className="h-16 w-16 bg-brand-red/10 rounded-full flex items-center justify-center text-brand-red shrink-0">
          <FileText className="h-10 w-10" />
        </div>
        <div className="flex flex-col gap-1.5">
          <h1 className="font-headline text-3xl md:text-5xl font-extrabold uppercase text-brand-dark leading-none">
            {isIt ? "Termini di Servizio" : "Terms of Service"}
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
              ? "Benvenuto su La Tribuna Sportiva. Accedendo o utilizzando il nostro sito web, accetti di essere vincolato dai seguenti Termini di servizio. Ti invitiamo a leggerli attentamente prima di utilizzare la piattaforma."
              : "Welcome to La Tribuna Sportiva. By accessing or using our website, you agree to be bound by the following Terms of Service. Please read them carefully before using our platform."}
          </p>
        </div>

        {/* Section 1 */}
        <div className="flex flex-col gap-3">
          <h2 className="font-headline text-xl md:text-2xl font-bold uppercase text-brand-dark border-l-3 border-brand-red pl-3 flex items-center gap-2">
            <Info className="h-5 w-5 text-brand-red" />
            {isIt ? "1. Accettazione dei Termini" : "1. Acceptance of Terms"}
          </h2>
          <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
            {isIt
              ? "L'utilizzo di questo portale implica l'accettazione incondizionata dei presenti termini. Se non concordi con una qualsiasi delle clausole qui espresse, sei invitato a non utilizzare il portale o i servizi correlati."
              : "By using this portal, you indicate your unconditional acceptance of these terms. If you do not agree with any of the clauses outlined herein, please refrain from using the website or its associated services."}
          </p>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col gap-3">
          <h2 className="font-headline text-xl md:text-2xl font-bold uppercase text-brand-dark border-l-3 border-brand-red pl-3 flex items-center gap-2">
            <Shield className="h-5 w-5 text-brand-red" />
            {isIt ? "2. Condotta dell'Utente" : "2. User Conduct"}
          </h2>
          <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
            {isIt
              ? "Ti impegni a utilizzare il sito web esclusivamente per scopi leciti e in modo da non violare i diritti di terzi. È vietato pubblicare commenti offensivi, diffamatori, osceni o inviare spam."
              : "You agree to utilize the website solely for lawful purposes and in a manner that does not infringe upon the rights of others. Posting abusive, defamatory, obscene comments or sending unsolicited spam is strictly prohibited."}
          </p>
        </div>

        {/* Section 3 */}
        <div className="flex flex-col gap-3">
          <h2 className="font-headline text-xl md:text-2xl font-bold uppercase text-brand-dark border-l-3 border-brand-red pl-3 flex items-center gap-2">
            <Award className="h-5 w-5 text-brand-red" />
            {isIt ? "3. Proprietà Intellettuale" : "3. Intellectual Property"}
          </h2>
          <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
            {isIt
              ? "Tutti gli articoli, i testi editoriali, le immagini, i loghi e il codice sorgente del sito sono di nostra proprietà o concessi in licenza. È vietata la riproduzione o la redistribuzione senza previa autorizzazione scritta."
              : "All articles, editorial texts, graphics, logos, and underlying source code are our exclusive property or licensed to us. Reproduction or redistribution of any content without prior written authorization is forbidden."}
          </p>
        </div>

        {/* Section 4 */}
        <div className="flex flex-col gap-3">
          <h2 className="font-headline text-xl md:text-2xl font-bold uppercase text-brand-dark border-l-3 border-brand-red pl-3 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-brand-red" />
            {isIt ? "4. Limitazione di Responsabilità" : "4. Limitation of Liability"}
          </h2>
          <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
            {isIt
              ? "La Tribuna Sportiva non si assume alcuna responsabilità per l'accuratezza o la completezza dei contenuti e dei risultati statistici. I servizi sono forniti 'così come sono' senza garanzie di alcun tipo."
              : "La Tribuna Sportiva assumes no liability for the absolute accuracy or completeness of editorial reports or real-time score statistics. All features are provided 'as is' without warranties of any kind."}
          </p>
        </div>

        {/* Section 5 */}
        <div className="flex flex-col gap-3">
          <h2 className="font-headline text-xl md:text-2xl font-bold uppercase text-brand-dark border-l-3 border-brand-red pl-3 flex items-center gap-2">
            <Scale className="h-5 w-5 text-brand-red" />
            {isIt ? "5. Legge Applicabile" : "5. Governing Law"}
          </h2>
          <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
            {isIt
              ? "I presenti Termini di servizio sono disciplinati e interpretati in conformità con le leggi italiane. Per qualsiasi controversia sarà competente in via esclusiva il Foro di Roma."
              : "These Terms of Service are governed by and construed in accordance with the laws of Italy. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Rome."}
          </p>
        </div>

      </div>

    </div>
  )
}