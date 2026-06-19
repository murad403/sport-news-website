"use client"

import { useParams } from "next/navigation"
import { getTranslation, Locale } from "./translations"

export function useTranslation() {
  const params = useParams()
  const lang = (params?.lang as string) || "it"
  const t = getTranslation(lang)
  return { t, lang: lang === "en" ? "en" : "it" as Locale }
}
