"use client"

import React, { useState } from "react"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/Dialog"
import CategoryBadge from "@/components/ui/CategoryBadge"
import { Users, PlusCircle, CheckCircle2, ChevronDown, ChevronUp, ShieldAlert, Image as ImageIcon, Trash2 } from "lucide-react"

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

const sportCategories = ["Football", "Tennis", "Basketball", "F1", "Cricket", "General"]

export default function CommunityPage() {
  const [articles, setArticles] = useState<CommunityArticle[]>(initialCommunityArticles)
  
  // Form States
  const [newTitle, setNewTitle] = useState("")
  const [newCategory, setNewCategory] = useState("Football")
  const [newExcerpt, setNewExcerpt] = useState("")
  const [newContent, setNewContent] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newImage, setNewImage] = useState<string>("")
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [formError, setFormError] = useState("")
  const [formSuccess, setFormSuccess] = useState(false)

  // Expandable States
  const [expandedArticles, setExpandedArticles] = useState<Record<string, boolean>>({})

  const toggleExpand = (id: string) => {
    setExpandedArticles((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newTitle.trim() || !newExcerpt.trim() || !newContent.trim() || !newAuthor.trim()) {
      setFormError("Please fill in all form fields to publish.")
      return
    }

    const newArticle: CommunityArticle = {
      id: `c-${Date.now()}`,
      title: newTitle.trim(),
      excerpt: newExcerpt.trim(),
      content: newContent.trim(),
      category: newCategory,
      author: newAuthor.trim(),
      publishedAt: new Date().toISOString(),
      imageUrl: newImage || undefined
    }

    setArticles([newArticle, ...articles])
    setFormSuccess(true)
    setFormError("")

    // Clear form
    setNewTitle("")
    setNewCategory("Football")
    setNewExcerpt("")
    setNewContent("")
    setNewAuthor("")
    setNewImage("")

    setTimeout(() => {
      setFormSuccess(false)
      setShowSubmitModal(false)
    }, 1500)
  }

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl md:text-5xl font-extrabold uppercase text-brand-dark flex items-center gap-2">
            <Users className="h-8 w-8 text-brand-red animate-pulse" />
            SportsPulse Fan Forum
          </h1>
          <p className="text-xs md:text-sm text-neutral-500 font-semibold">
            The community section where users write and publish their own articles, analysis and opinions.
          </p>
        </div>

        {/* Submit Dialog Modal */}
        <Dialog open={showSubmitModal} onOpenChange={setShowSubmitModal}>
          <DialogTrigger>
            <Button className="flex items-center gap-1.5 font-bold h-10 px-5 rounded-lg select-none cursor-pointer">
              <PlusCircle className="h-4.5 w-4.5" />
              Write Article
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-lg bg-white border border-neutral-200 text-brand-dark p-6">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl font-bold text-center text-brand-dark border-b border-neutral-100 pb-2">
                Write Community Article
              </DialogTitle>
            </DialogHeader>

            {formSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-8 gap-4 select-none">
                <CheckCircle2 className="h-14 w-14 text-green-500 animate-bounce" />
                <h3 className="font-headline text-xl font-bold text-brand-dark">
                  Article Published!
                </h3>
                <p className="text-xs text-neutral-500 max-w-xs">
                  Your analysis has been successfully added to the Fan Forum feed.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreateArticle} className="space-y-4 text-left">
                {formError && (
                  <div className="bg-red-50 border border-red-200 text-brand-red rounded-lg p-3 text-xs font-semibold select-none">
                    ⚠️ {formError}
                  </div>
                )}

                {/* Author Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-neutral-500">Your Nickname</label>
                  <Input
                    type="text"
                    placeholder="e.g. PepFanatic"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    required
                  />
                </div>

                {/* Article Title */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-neutral-500">Article Title</label>
                  <Input
                    type="text"
                    placeholder="e.g. Why the Lakers need to draft a pure playmaker"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Grid Category & Excerpt */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-neutral-500">Sport Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="flex h-9 w-full rounded-md border border-neutral-200 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-red text-neutral-700 font-semibold cursor-pointer"
                    >
                      {sportCategories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[10px] font-bold uppercase text-neutral-500">Short Summary Excerpt</label>
                    <Input
                      type="text"
                      placeholder="Brief one-sentence summary..."
                      value={newExcerpt}
                      onChange={(e) => setNewExcerpt(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Article Content */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-neutral-500">Article Content (Body)</label>
                  <textarea
                    placeholder="Write your in-depth sports analysis here..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="flex min-h-[120px] w-full rounded-md border border-neutral-250 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-red text-neutral-800"
                    required
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-neutral-500 flex items-center gap-1">
                    <ImageIcon className="h-3.5 w-3.5" /> Article Image
                  </label>
                  <div className="flex flex-col gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onloadend = () => {
                            setNewImage(reader.result as string)
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                      className="flex h-9 w-full rounded-md border border-neutral-200 bg-white px-3 py-1 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-red text-neutral-700 font-semibold cursor-pointer file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-bold file:bg-neutral-100 file:text-brand-dark file:cursor-pointer hover:file:bg-neutral-200"
                    />
                    {newImage && (
                      <div className="relative w-full h-32 rounded-lg overflow-hidden border border-neutral-250">
                        <img src={newImage} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setNewImage("")}
                          className="absolute top-2 right-2 bg-brand-dark/80 text-white rounded-full p-1.5 hover:bg-brand-red transition-colors flex items-center justify-center cursor-pointer"
                          title="Remove Image"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <DialogFooter>
                  <Button type="submit" className="w-full mt-2 font-bold h-10">
                    Publish to Fan Forum
                  </Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
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
                        {new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
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
                <div className="text-xs md:text-sm text-neutral-650 leading-relaxed font-normal">
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
                      Read Less <ChevronUp className="h-3.5 w-3.5" />
                    </>
                  ) : (
                    <>
                      Read Full Article <ChevronDown className="h-3.5 w-3.5" />
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
              Posting Guidelines
            </h3>
            <ul className="flex flex-col gap-3 text-xs font-semibold text-neutral-350 leading-relaxed list-disc pl-4">
              <li>
                <strong className="text-white">Be Civil & Respectful</strong>: Avoid insults, harassment or toxic arguments with other fans.
              </li>
              <li>
                <strong className="text-white">Keep it Sports Related</strong>: Articles and columns must be relevant to sports teams, players or analytics.
              </li>
              <li>
                <strong className="text-white">No Copyright Violation</strong>: Avoid copy-pasting entire articles from other publications. Write in your own words.
              </li>
              <li>
                <strong className="text-white">Editorial Review</strong>: The editors reserve the right to archive posts violating community standards.
              </li>
            </ul>
          </div>

          {/* Guidelines Box */}
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm text-center">
            <h4 className="font-headline text-lg font-bold text-brand-dark mb-1.5">
              Want to join the staff?
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed font-semibold mb-3">
              If your community articles demonstrate high-quality analysis and engage our readers, our editorial team will reach out to pitch official staff writing opportunities!
            </p>
            <Button variant="outline" className="w-full text-xs font-bold rounded-lg cursor-pointer">
              Learn More
            </Button>
          </div>
        </div>

      </div>

    </div>
  )
}
