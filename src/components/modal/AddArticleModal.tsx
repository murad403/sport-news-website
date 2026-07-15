"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import logoImg from "@/assets/logo.png"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/Dialog"
import Button from "../ui/Button"
import Input from "../ui/Input"
import { CheckCircle2, Image as ImageIcon, Trash2 } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { AddArticleFormValues, addArticleSchema } from "@/validation/validation"



export interface CommunityArticleInput extends AddArticleFormValues {
  imageUrl?: string
}

interface AddArticleModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (article: CommunityArticleInput) => void
  lang?: string
}

const AddArticleModal: React.FC<AddArticleModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  lang = "it"
}) => {
  const { t } = useTranslation()
  const isIt = lang === "it"
  const [newImage, setNewImage] = useState<string>("")
  const [formSuccess, setFormSuccess] = useState(false)

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<AddArticleFormValues>({
    resolver: zodResolver(addArticleSchema),
    defaultValues: {
      author: "",
      title: "",
      excerpt: "",
      content: "",
      category: "Football"
    }
  })

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      reset({
        author: "",
        title: "",
        excerpt: "",
        content: "",
        category: "Football"
      })
      setNewImage("")
      setFormSuccess(false)
    }
  }, [isOpen, reset])

  const onSubmit = (values: AddArticleFormValues) => {
    setFormSuccess(true)

    // Call onSuccess after a brief success animation delay
    setTimeout(() => {
      onSuccess({
        ...values,
        imageUrl: newImage || undefined
      })
      setFormSuccess(false)
    }, 1500)
  }

  const sportCategories = [
    { value: "Football", label: t.navigation.football },
    { value: "Tennis", label: t.navigation.tennis },
    { value: "Basketball", label: t.navigation.basketball },
    { value: "F1", label: t.navigation.f1 },
    { value: "Cricket", label: "Cricket" },
    { value: "General", label: isIt ? "Generale" : "General" }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open && !formSuccess) onClose(); }}>
      <DialogContent className="sm:max-w-lg bg-white border border-neutral-200 text-brand-dark p-6">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl font-bold text-center text-brand-dark border-b border-neutral-100 pb-2">
            {t.community.modalTitle}
          </DialogTitle>
        </DialogHeader>

        {formSuccess ? (
          <div className="flex flex-col items-center justify-center text-center py-8 gap-4 select-none">
            <CheckCircle2 className="h-14 w-14 text-green-500 animate-bounce" />
            <h3 className="font-headline text-xl font-bold text-brand-dark">
              {t.community.publishedMsg}
            </h3>
            <p className="text-xs text-neutral-500 max-w-xs">
              {t.community.publishedDetail}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
            {/* Author Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-neutral-500">{t.community.nicknameLabel}</label>
              <Input
                type="text"
                placeholder={isIt ? "es. TifosoRossonero" : "e.g. PepFanatic"}
                {...register("author")}
              />
              {errors.author && (
                <span className="text-xs text-brand-red font-semibold">{errors.author.message}</span>
              )}
            </div>

            {/* Article Title */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-neutral-500">{t.community.titleLabel}</label>
              <Input
                type="text"
                placeholder={isIt ? "es. Perché la Juventus deve cambiare modulo" : "e.g. Why the Lakers need to draft a pure playmaker"}
                {...register("title")}
              />
              {errors.title && (
                <span className="text-xs text-brand-red font-semibold">{errors.title.message}</span>
              )}
            </div>

            {/* Grid Category & Excerpt */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-neutral-500">{t.community.categoryLabel}</label>
                <select
                  className="flex h-9 w-full rounded-md border border-neutral-200 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-red text-neutral-700 font-semibold cursor-pointer"
                  {...register("category")}
                >
                  {sportCategories.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
                {errors.category && (
                  <span className="text-xs text-brand-red font-semibold">{errors.category.message}</span>
                )}
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-[10px] font-bold uppercase text-neutral-500">{t.community.excerptLabel}</label>
                <Input
                  type="text"
                  placeholder={isIt ? "Breve descrizione in una frase..." : "Brief one-sentence summary..."}
                  {...register("excerpt")}
                />
                {errors.excerpt && (
                  <span className="text-xs text-brand-red font-semibold">{errors.excerpt.message}</span>
                )}
              </div>
            </div>

            {/* Article Content */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-neutral-500">{t.community.contentLabel}</label>
              <textarea
                placeholder={isIt ? "Scrivi qui la tua analisi sportiva approfondita..." : "Write your in-depth sports analysis here..."}
                className="flex min-h-[120px] w-full rounded-md border border-neutral-250 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-red text-neutral-800"
                {...register("content")}
              />
              {errors.content && (
                <span className="text-xs text-brand-red font-semibold">{errors.content.message}</span>
              )}
            </div>

            {/* Image Upload */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-neutral-500 flex items-center gap-1">
                <ImageIcon className="h-3.5 w-3.5" /> {t.community.imageLabel}
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
                      title={t.community.removeImage}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" className="w-full mt-2 font-bold h-10 cursor-pointer">
                {t.community.publishBtn}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AddArticleModal