"use client"

import React, { useState, useMemo, useEffect } from "react"
import Button from "@/components/ui/Button"
import CategoryBadge from "@/components/ui/CategoryBadge"
import { Users, PlusCircle, ChevronDown, ChevronUp, ShieldAlert } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"
import AddArticleModal from "@/components/modal/AddArticleModal"
import SignInModal from "@/components/modal/SignInModal"
import SignUpModal from "@/components/modal/SignUpModal"
import VerifyOtpModal from "@/components/modal/VerifyOtpModal"
import SendOtpModal from "@/components/modal/SendOtpModal"
import ResetPasswordModal from "@/components/modal/ResetPasswordModal"
import { getCurrentUser } from "@/lib/auth"

interface CommunityArticle {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  publishedAt: string
  imageUrl?: string
}

const initialCommunityArticles: CommunityArticle[] = [
  {
    id: "c-1",
    title: "The Rise of Youth Academies in Modern Football: Why Homegrown Talent is Key",
    excerpt: "With transfer fees spiraling out of control, top clubs are returning to their roots. We explore the tactical and financial benefits of investing in homegrown academy graduates.",
    content: "In an era where a single marquee transfer can cost upwards of €100 million, football clubs are facing immense pressure to balance their checkbooks. Financial Fair Play (FFP) regulations have forced ownership groups to reconsider their squad assembly strategies. The most sustainable solution is starring them right in the face: their own youth academies.\n\nClubs like Barcelona (La Masia), Ajax, and Manchester United have historically built their legacies on homegrown core groups. Today, we see Arsenal and Chelsea harvesting massive rewards from academy prospects like Bukayo Saka and Levi Colwill. These players not only represent zero transfer cost on the balance sheet but also possess an innate connection to the club's culture, badge, and supporters that bought-in assets rarely match.\n\nFrom a tactical perspective, academy players are drilled in the club's philosophy from early childhood. When they step onto the first-team pitch, they already know the passing networks, pressing zones, and transitional runs by heart. Ultimately, youth development is no longer just a romantic ideal; it is a critical pillar of modern football survival.",
    category: "Football",
    author: "Liam Connor",
    publishedAt: "2026-06-18T11:00:00Z",
    imageUrl: "/images/football_youth.png"
  },
  {
    id: "c-2",
    title: "Why Charles Leclerc is the True Heir to Schumacher's Ferrari Legacy",
    excerpt: "After his emotional victory at Monza and Monaco, Charles Leclerc has proven he has the driving mastery and mental fortitude to lead Scuderia Ferrari back to the pinnacle of F1.",
    content: "Scuderia Ferrari has had many drivers since Michael Schumacher's dominant era, but none have captured the hearts of the Tifosi quite like Charles Leclerc. The Monégasque driver carries the weight of a nation and the most legendary brand in motorsport on his shoulders, and he does so with grace, lightning speed, and raw emotion.\n\nLeclerc's driving style is defined by aggressive qualifiers and surgical overtaking maneuvers. His ability to extract maximum performance from the car on street circuits (evidenced by his multiple poles in Baku and Monaco) places him in a tier of his own. But it is his mental strength—rebounding from strategic errors, engine failures, and personal tragedies—that defines his championship pedigree.\n\nWith Lewis Hamilton joining Ferrari next season, many expect a civil war. However, Leclerc's deep-rooted connection to Maranello makes him the standard-bearer. Just as Schumacher built Ferrari around himself in the late 90s, Leclerc is laying down the foundation for Ferrari's next golden age under Fred Vasseur.",
    category: "F1",
    author: "EnzoTifosi99",
    publishedAt: "2026-06-17T15:20:00Z",
    imageUrl: "/images/leclerc_ferrari.png"
  },
  {
    id: "c-3",
    title: "Is the Over-Reliance on 3-Point Shooting Damaging the Aesthetic of Basketball?",
    excerpt: "The 'Moreyball' revolution has changed basketball forever. But has the constant barrage of three-pointers made NBA games predictable and boring?",
    content: "Walk into any gym today, and you'll see teenagers launching deep pull-up threes instead of practicing layups or mid-range pull-ups. The analytical revolution led by Stephen Curry and the Houston Rockets proved mathematically that three is greater than two. As a result, NBA spacing has expanded, and three-point attempt records are shattered every single season.\n\nWhile this has led to high-scoring games and historic offensive ratings, it has arguably damaged the visual variety of the sport. Mid-range jump shots, post-up turnarounds, and creative driving floaters are becoming endangered species. Instead, games often devolve into repetitive pick-and-rolls ending in either a layup or a kick-out pass to a corner shooter.\n\nWhen both teams take 45+ threes a game, the outcome is frequently decided simply by variance—who had a hot shooting night from behind the arc. The grit, post control, and midrange mastery of past eras provided a tactical chess match that today's shootouts occasionally lack.",
    category: "Basketball",
    author: "OldSchoolHoops",
    publishedAt: "2026-06-16T10:00:00Z",
    imageUrl: "/images/basketball_3pointer.png"
  }
]

export default function CommunityPage() {
  const { t, lang } = useTranslation()
  const isIt = lang === "it"

  // Localized Initial Articles
  const localizedInitialArticles = useMemo(() => {
    return initialCommunityArticles.map(art => {
      if (art.id === "c-1") {
        return {
          ...art,
          title: isIt ? "La crescita dei vivai nel calcio moderno: perché i talenti fatti in casa sono la chiave" : art.title,
          excerpt: isIt ? "Con i costi dei trasferimenti fuori controllo, i grandi club tornano alle origini. Esploriamo i benefici tattici e finanziari degli investimenti nei giovani del vivaio." : art.excerpt,
          content: isIt ? "In un'epoca in cui un singolo acquisto di spicco può costare oltre 100 milioni di euro, i club di calcio affrontano enormi pressioni per bilanciare i conti. Le regole del Fair Play Finanziario (FFP) hanno costretto le proprietà a riconsiderare le strategie di allestimento delle rose. La soluzione più sostenibile è proprio sotto i loro occhi: i propri settori giovanili.\n\nClubs come Barcellona (La Masia), Ajax e Manchester United hanno storicamente costruito i loro successi su gruppi di talenti locali. Oggi vediamo l'Arsenal e il Chelsea raccogliere enormi frutti da elementi del vivaio come Bukayo Saka e Levi Colwill. Questi giocatori non solo rappresentano un costo di trasferimento pari a zero a bilancio, ma possiedono anche una connessione innata con la cultura del club, la maglia e i tifosi che i calciatori acquistati all'esterno raramente riescono ad eguagliare.\n\nDal punto di vista tattico, i ragazzi del vivaio vengono formati secondo la filosofia del club fin dalla tenera età. Quando scendono in campo con la prima squadra, conoscono già a memoria schemi di passaggio, zone di pressing e inserimenti. In definitiva, lo sviluppo giovanile non è più solo un ideale romantico; è un pilastro fondamentale per la sopravvivenza del calcio moderno." : art.content,
          category: isIt ? "Calcio" : art.category
        }
      }
      if (art.id === "c-2") {
        return {
          ...art,
          title: isIt ? "Perché Charles Leclerc è il vero erede del mito di Schumacher in Ferrari" : art.title,
          excerpt: isIt ? "Dopo le sue emozionanti vittorie a Monza e Monaco, Charles Leclerc ha dimostrato di avere la maestria di guida e la forza mentale per riportare la Scuderia Ferrari al vertice della F1." : art.excerpt,
          content: isIt ? "La Scuderia Ferrari ha avuto molti piloti dopo il ciclo vincente di Michael Schumacher, ma nessuno ha saputo conquistare il cuore dei Tifosi come Charles Leclerc. Il pilota monegasco porta sulle spalle il peso di un'intera nazione e del marchio più leggendario del motorsport, e lo fa con grazia, velocità pura e un'incredibile passionalità.\n\nLo stile di guida di Leclerc è caratterizzato da qualifiche aggressive e sorpassi chirurgici. La sua capacità di estrarre le massime prestazioni dalla monoposto sui tracciati cittadini (dimostrata dalle pole multiple a Baku e Monaco) lo colloca in una categoria a sé. Ma è la sua forza mentale – nel riprendersi da errori strategici, guasti al motore e tragedie personali – a definire la sua stoffa da campione.\n\nCon l'arrivo di Lewis Hamilton in Ferrari la prossima stagione, in molti prevedono accesi duelli interni. Tuttavia, il legame profondo di Leclerc con Maranello lo rende il vero punto di riferimento. Proprio come Schumacher ha plasmato la Ferrari attorno a sé alla fine degli anni '90, Leclerc sta gettando le fondamenta per la nuova epoca d'oro della Ferrari sotto la guida di Fred Vasseur." : art.content,
          category: "F1"
        }
      }
      if (art.id === "c-3") {
        return {
          ...art,
          title: isIt ? "L'eccessivo affidamento sul tiro da tre punti sta rovinando l'estetica del basket?" : art.title,
          excerpt: isIt ? "La rivoluzione 'Moreyball' ha cambiato per sempre il basket. Ma la costante raffica di tiri da tre punti ha reso le partite NBA prevedibili e noiose?" : art.excerpt,
          content: isIt ? "Entra in una qualsiasi palestra oggi e vedrai adolescenti lanciare tiri da tre punti da distanza siderale invece di esercitarsi nei sottomano o nei tiri dal mezzo angolo. La rivoluzione analitica guidata da Stephen Curry e dai Houston Rockets ha dimostrato matematicamente che tre punti valgono più di due. Come risultato, la spaziatura in NBA si è allargata a dismisura e i record di tentativi da tre vengono frantumati in ogni singola stagione.\n\nSebbene questo abbia portato a punteggi molto elevati e a valutazioni offensive da record, ha indubbiamente penalizzato la varietà estetica del gioco. I tiri in sospensione dalla media distanza, i movimenti in post-basso e le soluzioni creative in penetrazione stanno diventando specie in via d'estinzione. Al contrario, le partite spesso degenerano in ripetitivi pick-and-roll che finiscono o con un sottomano o con uno scarico verso un tiratore piazzato in angolo.\n\nQuando entrambe le squadre tentano più di 45 tiri da tre a partita, l'esito viene deciso spesso semplicemente dalla varianza di tiro. Il gioco fisico, il controllo del post e la maestria dalla media distanza delle epoche passate garantivano una battaglia tattica simile a una partita a scacchi che le sfide attuali talvolta non riescono ad offrire." : art.content,
          category: isIt ? "Basket" : art.category
        }
      }
      return art
    })
  }, [isIt])

  const [articles, setArticles] = useState<CommunityArticle[]>(localizedInitialArticles)
  const [showSubmitModal, setShowSubmitModal] = useState(false)

  // Auth States
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [showVerifyOtp, setShowVerifyOtp] = useState(false)
  const [showSendOtp, setShowSendOtp] = useState(false)
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [otpEmail, setOtpEmail] = useState("")
  const [otpPurpose, setOtpPurpose] = useState<"signup" | "reset_password">("signup")

  // Check auth state on mount
  useEffect(() => {
    const checkAuth = async () => {
      const { access } = await getCurrentUser()
      setIsLoggedIn(!!access)
    }
    checkAuth()
  }, [])

  const handleWriteArticleClick = () => {
    if (isLoggedIn) {
      setShowSubmitModal(true)
    } else {
      setShowSignIn(true)
    }
  }

  // Expandable States
  const [expandedArticles, setExpandedArticles] = useState<Record<string, boolean>>({})

  const toggleExpand = (id: string) => {
    setExpandedArticles((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl md:text-5xl font-extrabold uppercase text-brand-dark flex items-center gap-2">
            <Users className="h-8 w-8 text-brand-red animate-pulse" />
            {t.community.title}
          </h1>
          <p className="text-xs md:text-sm text-neutral-500 font-semibold">
            {t.community.subtitle}
          </p>
        </div>

        <Button 
          onClick={handleWriteArticleClick} 
          className="flex items-center gap-1.5 font-bold h-10 px-5 rounded-lg select-none cursor-pointer"
        >
          <PlusCircle className="h-4.5 w-4.5" />
          {t.community.writeArticle}
        </Button>

        <AddArticleModal
          isOpen={showSubmitModal}
          onClose={() => setShowSubmitModal(false)}
          onSuccess={(newArticleData) => {
            const newArticle: CommunityArticle = {
              id: `c-${Date.now()}`,
              publishedAt: new Date().toISOString(),
              ...newArticleData
            }
            setArticles([newArticle, ...articles])
            setShowSubmitModal(false)
          }}
          lang={lang}
        />
      </div>

      {/* 2. Main content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        
        {/* Main Feed Column (Left, 70%) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {articles.map((article) => {
            const isExpanded = !!expandedArticles[article.id]

            return (
              <div
                key={article.id}
                className="bg-white border border-neutral-200 rounded-xl p-5 md:p-6 shadow-sm hover:border-neutral-300 transition-colors flex flex-col"
              >
                {/* Upper Meta */}
                <div className="flex items-center justify-between mb-3 border-b border-neutral-50 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-neutral-100 border border-neutral-250 rounded-full flex items-center justify-center font-bold text-brand-red text-xs">
                      {article.author.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-brand-dark">{article.author}</span>
                      <span className="text-[9px] text-neutral-400 font-semibold uppercase">
                        {new Date(article.publishedAt).toLocaleDateString(isIt ? "it-IT" : "en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                  <CategoryBadge category={article.category} />
                </div>

                {/* Article Image (if present) */}
                {article.imageUrl && (
                  <div className="w-full h-48 md:h-64 rounded-lg overflow-hidden mb-4 border border-neutral-100">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Title */}
                <h3 className="font-headline text-xl md:text-2xl font-bold uppercase text-brand-dark leading-snug mb-2">
                  {article.title}
                </h3>

                {/* Excerpt/Content */}
                <div className="text-xs md:text-sm text-neutral-655 leading-relaxed font-normal">
                  {isExpanded ? (
                    <div className="space-y-4">
                      {article.content.split("\n\n").map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="font-medium">{article.excerpt}</p>
                  )}
                </div>

                {/* Action Toggle Read More */}
                <button
                  onClick={() => toggleExpand(article.id)}
                  className="text-xs font-bold text-brand-red hover:underline self-start mt-3 flex items-center gap-0.5 cursor-pointer"
                >
                  {isExpanded ? (
                    <>
                      {t.common.readLess} <ChevronUp className="h-3.5 w-3.5" />
                    </>
                  ) : (
                    <>
                      {t.common.readMore} <ChevronDown className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            )
          })}
        </div>

        {/* Sidebar Guidelines Column (Right, 30%) */}
        <div className="lg:col-span-3 flex flex-col gap-6 select-none">
          {/* Rules and Guidelines Card */}
          <div className="bg-brand-dark text-white rounded-2xl p-5 shadow-md flex flex-col gap-4">
            <h3 className="font-headline text-xl font-bold text-brand-red uppercase border-b border-neutral-800 pb-2 flex items-center gap-1.5">
              <ShieldAlert className="h-5 w-5" />
              {t.community.guidelinesTitle}
            </h3>
            <ul className="flex flex-col gap-3 text-xs font-semibold text-neutral-350 leading-relaxed list-disc pl-4">
              {t.community.guidelines.map((guideline, idx) => {
                const parts = guideline.split(":")
                if (parts.length > 1) {
                  return (
                    <li key={idx}>
                      <strong className="text-white">{parts[0]}</strong>: {parts.slice(1).join(":")}
                    </li>
                  )
                }
                return <li key={idx}>{guideline}</li>
              })}
            </ul>
          </div>

          {/* Guidelines Box */}
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm text-center">
            <h4 className="font-headline text-lg font-bold text-brand-dark mb-1.5">
              {t.community.joinStaffTitle}
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed font-semibold mb-3">
              {t.community.joinStaffText}
            </p>
            <Button variant="outline" className="w-full text-xs font-bold rounded-lg cursor-pointer">
              {isIt ? "Scopri di Più" : "Learn More"}
            </Button>
          </div>
        </div>

      </div>

      {/* Authentication Modals */}
      <SignInModal
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSuccess={() => {
          setIsLoggedIn(true)
          setShowSignIn(false)
          setShowSubmitModal(true)
        }}
        onSwitchToSignUp={() => {
          setShowSignIn(false)
          setShowSignUp(true)
        }}
        onForgotPassword={() => {
          setShowSignIn(false)
          setShowSendOtp(true)
        }}
        lang={lang}
      />

      <SignUpModal
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSuccess={(email) => {
          setOtpEmail(email)
          setOtpPurpose("signup")
          setShowSignUp(false)
          setShowVerifyOtp(true)
        }}
        onSwitchToSignIn={() => {
          setShowSignUp(false)
          setShowSignIn(true)
        }}
      />

      <SendOtpModal
        isOpen={showSendOtp}
        onClose={() => setShowSendOtp(false)}
        onSuccess={(email) => {
          setOtpEmail(email)
          setOtpPurpose("reset_password")
          setShowSendOtp(false)
          setShowVerifyOtp(true)
        }}
        lang={lang}
      />

      <VerifyOtpModal
        isOpen={showVerifyOtp}
        email={otpEmail}
        purpose={otpPurpose}
        onClose={() => setShowVerifyOtp(false)}
        onSuccess={() => {
          setShowVerifyOtp(false)
          if (otpPurpose === "reset_password") {
            setShowResetPassword(true)
          } else {
            setShowSignIn(true)
          }
        }}
      />

      <ResetPasswordModal
        isOpen={showResetPassword}
        email={otpEmail}
        onClose={() => setShowResetPassword(false)}
        onSuccess={() => {
          setShowResetPassword(false)
          setShowSignIn(true)
        }}
        lang={lang}
      />
    </div>
  )
}
