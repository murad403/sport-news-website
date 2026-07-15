"use client"
import React, { useState, useEffect } from "react"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import CategoryBadge from "@/components/ui/CategoryBadge"
import { Users, PlusCircle, ChevronDown, ChevronUp, ShieldAlert, Search, Loader2 } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"
import AddArticleModal from "@/components/modal/AddArticleModal"
import SignInModal from "@/components/modal/SignInModal"
import SignUpModal from "@/components/modal/SignUpModal"
import VerifyOtpModal from "@/components/modal/VerifyOtpModal"
import SendOtpModal from "@/components/modal/SendOtpModal"
import ResetPasswordModal from "@/components/modal/ResetPasswordModal"
import CustomPagination from "@/components/shared/CustomPagination"
import { useGetCommunityArticlesQuery } from "@/redux/features/article/article.api"
import { getCurrentUser } from "@/lib/auth"

const PAGE_SIZE = 20

export default function CommunityPage() {
  const { t, lang } = useTranslation()
  const isIt = lang === "it"

  // Search & Pagination States
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
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

  // Expandable Feed Item States
  const [expandedArticles, setExpandedArticles] = useState<Record<string, boolean>>({})

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText)
      setCurrentPage(1)
    }, 400)
    return () => clearTimeout(timer)
  }, [searchText])

  // Check auth state on mount
  useEffect(() => {
    const checkAuth = async () => {
      const { access } = await getCurrentUser()
      setIsLoggedIn(!!access)
    }
    checkAuth()
  }, [])

  // Query live community articles
  const { data, isLoading, isFetching, refetch } = useGetCommunityArticlesQuery({
    page: currentPage,
    search: debouncedSearch || undefined
  })

  const handleWriteArticleClick = () => {
    if (isLoggedIn) {
      setShowSubmitModal(true)
    } else {
      setShowSignIn(true)
    }
  }

  const toggleExpand = (id: string) => {
    setExpandedArticles((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const articles = data?.results || []
  const totalCount = data?.count || 0

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
          onSuccess={() => {
            setShowSubmitModal(false)
            refetch()
          }}
          lang={lang}
        />
      </div>

      {/* 2. Search filter Row */}
      <div className="relative w-full max-w-md">
        <Input
          type="text"
          placeholder={isIt ? "Cerca articoli della community..." : "Search community articles..."}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="pl-10 h-11 text-base rounded-lg border-neutral-350 focus-visible:ring-brand-red"
        />
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 pointer-events-none" />
      </div>

      {/* 3. Main content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        
        {/* Main Feed Column (Left, 70%) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {isLoading || isFetching ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3 bg-white border border-neutral-200 rounded-2xl">
              <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
              <p className="text-xs text-neutral-500 font-semibold">
                {isIt ? "Caricamento feed della community..." : "Loading community feed..."}
              </p>
            </div>
          ) : articles.length === 0 ? (
            <div className="bg-white border border-neutral-200 rounded-2xl py-20 text-center text-neutral-500">
              <p className="text-sm font-bold text-brand-dark mb-1">
                {isIt ? "Nessun articolo trovato" : "No articles found"}
              </p>
              <p className="text-xs text-neutral-455 max-w-xs mx-auto">
                {isIt 
                  ? "Non ci sono ancora articoli in questa sezione o la ricerca non ha prodotto risultati." 
                  : "There are no community articles posted here yet, or your search query returned no results."}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {articles.map((article) => {
                const isExpanded = !!expandedArticles[article.id]
                const dateStr = article.created_at
                  ? new Date(article.created_at).toLocaleDateString(isIt ? "it-IT" : "en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })
                  : ""

                return (
                  <div
                    key={article.id}
                    className="bg-white border border-neutral-200 rounded-xl p-5 md:p-6 shadow-sm hover:border-neutral-300 transition-colors flex flex-col"
                  >
                    {/* Upper Meta header */}
                    <div className="flex items-center justify-between mb-3 border-b border-neutral-50 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-neutral-100 border border-neutral-250 rounded-full overflow-hidden flex items-center justify-center font-bold text-brand-red text-xs shrink-0">
                          {article.author_image ? (
                            <img
                              src={article.author_image}
                              alt={article.author_name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            (article.author_name || "U").charAt(0).toUpperCase()
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-brand-dark">{article.author_name}</span>
                          <span className="text-[9px] text-neutral-400 font-semibold uppercase">
                            {dateStr}
                          </span>
                        </div>
                      </div>
                      {article.categories?.[0] && (
                        <CategoryBadge category={article.categories[0].name} />
                      )}
                    </div>

                    {/* Article Cover Image (if present) */}
                    {article.display_image && (
                      <div className="w-full h-48 md:h-64 rounded-lg overflow-hidden mb-4 border border-neutral-100 bg-neutral-50 shrink-0">
                        <img
                          src={article.display_image}
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
                        <p className="font-medium">{article.description || article.content}</p>
                      )}
                    </div>

                    {/* Tags Badge List */}
                    {article.tags && article.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5 items-center">
                        {article.tags.map((tag) => (
                          <span
                            key={tag.id}
                            className="inline-flex items-center px-2 py-0.5 bg-neutral-100 border border-neutral-200 text-neutral-600 font-bold text-[9px] rounded-md"
                          >
                            #{tag.name}
                          </span>
                        ))}
                      </div>
                    )}

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

              {/* Custom Pagination */}
              <CustomPagination
                currentPage={currentPage}
                count={totalCount}
                pageSize={PAGE_SIZE}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </div>

        {/* Sidebar Guidelines Column (Right, 30%) */}
        <div className="lg:col-span-3 lg:sticky lg:top-24 self-start flex flex-col gap-6 select-none">
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
