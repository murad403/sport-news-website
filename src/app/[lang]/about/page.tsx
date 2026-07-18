import React from "react"
import Image from "next/image"
import { Shield, Sparkles, Trophy, Users, Heart } from "lucide-react"

export default async function AboutPage({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const isIt = lang === "it"

  const team = [
    { name: "Alessandro Bianchi", role: isIt ? "Direttore Editoriale" : "Editor-in-Chief", image: "https://picsum.photos/150/150?random=a" },
    { name: "Sarah Jenkins", role: isIt ? "Analista Tennis Senior" : "Senior Tennis Analyst", image: "https://picsum.photos/150/150?random=b" },
    { name: "David Croft", role: isIt ? "Corrispondente Motorsport" : "Motorsport Correspondent", image: "https://picsum.photos/150/150?random=c" },
    { name: "Marco Rossi", role: isIt ? "Inviato Speciale Calcio" : "Lead Football Reporter", image: "https://picsum.photos/150/150?random=d" }
  ]

  const stats = [
    { value: "2018", label: isIt ? "Anno di Fondazione" : "Founded Year" },
    { value: "50.000+", label: isIt ? "Articoli Pubblicati" : "Articles Published" },
    { value: "5,2 Milioni", label: isIt ? "Lettori Mensili" : "Monthly Readers" },
    { value: "15+", label: isIt ? "Sport Coperti" : "Sports Covered" }
  ]

  const timeline = [
    { year: "2018", title: isIt ? "Lancio di LA | TRIBUNA SPORTIVA" : "LA | TRIBUNA SPORTIVA Launch", desc: isIt ? "Inizialmente nato come blog locale di notizie calcistiche, LA | TRIBUNA SPORTIVA è nato dalla passione per l'analisi sportiva." : "Initially started as a local soccer news blog, LA | TRIBUNA SPORTIVA was born out of passion for sports analysis." },
    { year: "2020", title: isIt ? "Espansione a Motori e Tennis" : "Expansion to Motorsports & Tennis", desc: isIt ? "Assunzione di corrispondenti specializzati per espandere il reporting a Formula 1, tennis Grand Slam e campionati di basket." : "Brought on specialized correspondents to expand reporting into Formula 1, tennis Grand Slams, and basketball leagues." },
    { year: "2023", title: isIt ? "Rilascio Centro Partite Live" : "Live Match Center Rollout", desc: isIt ? "Introdotte widget segnapunti in tempo reale e tabelle statistiche automatizzate per i principali campionati di calcio europei." : "Introduced real-time scoreboard widgets and automated statistic tables for major European soccer leagues." },
    { year: "2026", title: isIt ? "Riprogettazione del Sito" : "Site Redesign", desc: isIt ? "Rilancio della piattaforma con l'attuale estetica rossa e scura, ottimizzando per i lettori da mobile e l'alta velocità di caricamento." : "Relaunched the platform with the current red-and-dark aesthetic, optimizing for mobile readers and high-speed data delivery." }
  ]

  return (
    <div className="w-full flex flex-col gap-10 select-none">
      
      {/* 1. Mission statement hero */}
      <section className="bg-brand-dark text-white rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-md">
        <div className="max-w-3xl flex flex-col gap-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-brand-red/10 border border-brand-red/20 text-brand-red px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-max">
            <Trophy className="h-4 w-4" />
            {isIt ? "La Nostra Missione" : "Our Mission"}
          </span>
          <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-none">
            {isIt ? "Diamo Voce ai Tifosi di Tutto il Mondo" : "Empowering Sports Fans Everywhere"}
          </h1>
          <p className="text-sm md:text-base text-neutral-350 leading-relaxed font-light mt-2">
            {isIt 
              ? "In LA | TRIBUNA SPORTIVA crediamo che le notizie sportive debbano essere rapide, altamente accurate e approfondite. Il nostro team di analisti, reporter e collaboratori lavora 24 ore su 24 per fornire risultati live, indiscrezioni di mercato e analisi statistiche, per non farti perdere mai un istante di gioco."
              : "At LA | TRIBUNA SPORTIVA, we believe sports news should be fast, highly accurate, and in-depth. Our dedicated team of analysts, reporters, and coordinators work around the clock to deliver real-time match reports, transfer rumors, and statistical analyses so that you never miss a beat of the game."
            }
          </p>
        </div>
        <div className="absolute bottom-0 right-0 opacity-10 font-headline text-9xl font-black translate-x-10 translate-y-10 uppercase tracking-tighter">
          PULSE
        </div>
      </section>

      {/* 2. Stats Bar */}
      <section className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1 border-r border-neutral-100 last:border-r-0 last:pr-0">
            <span className="font-headline text-3xl md:text-4xl font-extrabold text-brand-red leading-none">
              {stat.value}
            </span>
            <span className="text-[10px] md:text-xs font-bold uppercase text-neutral-500 tracking-wider">
              {stat.label}
            </span>
          </div>
        ))}
      </section>

      {/* 3. Team grid */}
      <section className="flex flex-col gap-6">
        <div className="border-b border-neutral-200 pb-3">
          <h2 className="font-headline text-2xl md:text-3xl font-extrabold uppercase text-brand-dark flex items-center gap-2">
            <Users className="h-6 w-6 text-brand-red" />
            {isIt ? "Incontra i Nostri Esperti" : "Meet Our Experts"}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.name} className="bg-white border border-neutral-200 rounded-xl p-4 text-center hover:shadow-sm transition-shadow">
              <div className="relative h-24 w-24 mx-auto rounded-full overflow-hidden mb-3 border border-neutral-200 bg-neutral-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <h3 className="text-xs md:text-sm font-bold text-brand-dark leading-snug line-clamp-1">{member.name}</h3>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{member.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Timeline Milestones */}
      <section className="flex flex-col gap-6 select-none">
        <div className="border-b border-neutral-200 pb-3">
          <h2 className="font-headline text-2xl md:text-3xl font-extrabold uppercase text-brand-dark flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-brand-red" />
            {isIt ? "La Nostra Storia" : "Our History Timeline"}
          </h2>
        </div>

        <div className="flex flex-col gap-6 pl-4 border-l-2 border-brand-red/30">
          {timeline.map((mile) => (
            <div key={mile.year} className="relative flex flex-col gap-1">
              {/* Timeline dot */}
              <div className="absolute left-[-23px] top-1 h-3 w-3 bg-brand-red border-2 border-white rounded-full shadow-sm" />
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-brand-red font-headline bg-brand-red/5 px-2 py-0.5 rounded">
                  {mile.year}
                </span>
                <h3 className="font-headline text-lg font-bold uppercase text-brand-dark">
                  {mile.title}
                </h3>
              </div>
              <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-normal max-w-2xl pl-1">
                {mile.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
