"use client"
import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/Dialog"
import Button from "../ui/Button"
import Input from "../ui/Input"
import { CheckCircle2, Image as ImageIcon, Trash2, X, Search, Loader2 } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AddArticleFormValues, addArticleSchema } from "@/validation/validation"
import { useGetCategoriesQuery } from "@/redux/features/categories/categories.api"
import { useGetTagsQuery } from "@/redux/features/tags/tags.api"
import { useAddArticleMutation } from "@/redux/features/article/article.api"
import { Tag } from "@/redux/features/tags/tags.type"

interface AddArticleModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (article?: any) => void
  lang?: string
}

const AddArticleModal: React.FC<AddArticleModalProps> = ({ isOpen, onClose, onSuccess, lang = "it" }) => {
  const { t } = useTranslation()
  const isIt = lang === "it"

  // Image Upload State
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")

  // Tag Search States
  const [tagSearchText, setTagSearchText] = useState("")
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])

  // Form Success Animation
  const [formSuccess, setFormSuccess] = useState(false)

  // API Queries & Mutations
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery()
  const { data: tagsData, isLoading: isTagsLoading } = useGetTagsQuery(tagSearchText || undefined, {
    skip: !tagSearchText
  })
  const [addArticle, { isLoading: isPublishing, error: publishError }] = useAddArticleMutation()

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<AddArticleFormValues>({
    resolver: zodResolver(addArticleSchema) as any,
    defaultValues: {
      title: "",
      description: "",
      content: "",
      categories: [],
      tags: [],
      language: lang,
      is_featured: true
    }
  })

  // Watch fields
  const formCategories = watch("categories")
  const formTags = watch("tags")

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      reset({
        title: "",
        description: "",
        content: "",
        categories: [],
        tags: [],
        language: lang,
        is_featured: true
      })
      setImageFile(null)
      setImagePreview("")
      setTagSearchText("")
      setSelectedTags([])
      setFormSuccess(false)
    }
  }, [isOpen, reset, lang])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddTag = (tag: Tag) => {
    if (formTags.includes(tag.id)) return

    const updatedTags = [...formTags, tag.id]
    setValue("tags", updatedTags, { shouldValidate: true })
    setSelectedTags([...selectedTags, tag])
    setTagSearchText("")
  }

  const handleRemoveTag = (tagId: string) => {
    const updatedTags = formTags.filter(id => id !== tagId)
    setValue("tags", updatedTags, { shouldValidate: true })
    setSelectedTags(selectedTags.filter(t => t.id !== tagId))
  }

  const onSubmit = async (values: AddArticleFormValues) => {
    try {
      const formData = new FormData()
      formData.append("title", values.title)
      formData.append("description", values.description || "")
      formData.append("content", values.content)
      formData.append("language", values.language)
      formData.append("is_featured", String(values.is_featured))

      // Append category IDs
      values.categories.forEach(catId => {
        formData.append("categories", catId)
      })

      // Append tag IDs
      values.tags.forEach(tagId => {
        formData.append("tags", tagId)
      })

      // Append binary image if present
      if (imageFile) {
        formData.append("image", imageFile)
      }

      await addArticle(formData).unwrap()
      setFormSuccess(true)

      setTimeout(() => {
        onSuccess({
          title: values.title,
          excerpt: values.description || "",
          content: values.content,
          category: categoriesData?.results?.find(c => c.id === values.categories[0])?.name || "General",
          author: "Md Murad islam",
          imageUrl: imagePreview || undefined
        })
      }, 1500)
    } catch (err) {
      console.error("Publish Article Error:", err)
    }
  }

  const apiErrorMsg = publishError
    ? ((publishError as any)?.data?.message || (publishError as any)?.data?.detail || (publishError as any)?.data?.error || "Failed to publish article.")
    : null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open && !formSuccess && !isPublishing) onClose(); }}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto bg-white border border-neutral-200 text-brand-dark p-6">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl font-bold text-center text-brand-dark border-b border-neutral-100 pb-2">
            {isIt ? "Scrivi Articolo" : "Write Article"}
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
            {apiErrorMsg && (
              <div className="bg-red-50 border border-red-200 text-brand-red rounded-lg p-3 text-xs font-semibold select-none">
                ⚠️ {apiErrorMsg}
              </div>
            )}

            {/* Article Title */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-neutral-500">
                {isIt ? "Titolo *" : "Title *"}
              </label>
              <Input
                type="text"
                placeholder={isIt ? "Inserisci il titolo dell'articolo" : "Enter article title"}
                disabled={isPublishing}
                {...register("title")}
              />
              {errors.title && (
                <span className="text-xs text-brand-red font-semibold">{errors.title.message}</span>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-neutral-500">
                {isIt ? "Descrizione" : "Description"}
              </label>
              <textarea
                placeholder={isIt ? "Breve descrizione in una frase..." : "Brief one-sentence summary..."}
                disabled={isPublishing}
                className="flex min-h-[50px] w-full rounded-md border border-neutral-250 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-red text-neutral-800"
                {...register("description")}
              />
              {errors.description && (
                <span className="text-xs text-brand-red font-semibold">{errors.description.message}</span>
              )}
            </div>

            {/* Article Content */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-neutral-500">
                {isIt ? "Contenuto *" : "Content *"}
              </label>
              <textarea
                placeholder={isIt ? "Scrivi qui la tua analisi sportiva approfondita..." : "Write your in-depth sports analysis here..."}
                disabled={isPublishing}
                className="flex min-h-[120px] w-full rounded-md border border-neutral-250 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-red text-neutral-800"
                {...register("content")}
              />
              {errors.content && (
                <span className="text-xs text-brand-red font-semibold">{errors.content.message}</span>
              )}
            </div>

            {/* Grid Category & Language */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category Dropdown */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-neutral-500">
                  {isIt ? "Categoria *" : "Category *"}
                </label>
                {isCategoriesLoading ? (
                  <div className="text-xs text-neutral-500 py-2">Loading categories...</div>
                ) : (
                  <select
                    disabled={isPublishing}
                    className="flex h-9 w-full rounded-md border border-neutral-200 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-red text-neutral-700 font-semibold cursor-pointer"
                    value={formCategories[0] || ""}
                    onChange={(e) => {
                      setValue("categories", e.target.value ? [e.target.value] : [], { shouldValidate: true })
                    }}
                  >
                    <option value="">{isIt ? "Seleziona categoria" : "Select Category"}</option>
                    {categoriesData?.results?.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                )}
                {errors.categories && (
                  <span className="text-xs text-brand-red font-semibold">{errors.categories.message}</span>
                )}
              </div>

              {/* Language Dropdown */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-neutral-500">
                  {isIt ? "Lingua *" : "Language *"}
                </label>
                <select
                  disabled={isPublishing}
                  className="flex h-9 w-full rounded-md border border-neutral-200 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-red text-neutral-700 font-semibold cursor-pointer"
                  {...register("language")}
                >
                  <option value="en">English</option>
                  <option value="it">Italiano</option>
                </select>
                {errors.language && (
                  <span className="text-xs text-brand-red font-semibold">{errors.language.message}</span>
                )}
              </div>
            </div>

            {/* Is Featured and Tag Search Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Is Featured */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-neutral-500">
                  Featured
                </label>
                <select
                  disabled={isPublishing}
                  className="flex h-9 w-full rounded-md border border-neutral-200 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-red text-neutral-700 font-semibold cursor-pointer"
                  value={watch("is_featured") ? "true" : "false"}
                  onChange={(e) => {
                    setValue("is_featured", e.target.value === "true", { shouldValidate: true })
                  }}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>

              {/* Tag Search and Badge */}
              <div className="sm:col-span-2 space-y-1">
                <label className="text-[10px] font-bold uppercase text-neutral-500">
                  {isIt ? "Cerca Tag *" : "Search Tag *"}
                </label>
                <div className="relative flex items-center">
                  <Input
                    type="text"
                    placeholder={isIt ? "Digita per cercare tag..." : "Type to search tags..."}
                    disabled={isPublishing}
                    value={tagSearchText}
                    onChange={(e) => setTagSearchText(e.target.value)}
                    className="pr-8"
                  />
                  {tagSearchText ? (
                    <button
                      type="button"
                      onClick={() => setTagSearchText("")}
                      className="absolute right-2 text-neutral-400 hover:text-neutral-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : (
                    <Search className="absolute right-2 h-4 w-4 text-neutral-400" />
                  )}
                </div>

                {/* Tag Search Results Popup dropdown */}
                {tagSearchText && (
                  <div className="absolute z-50 mt-1 max-h-40 w-[280px] overflow-y-auto rounded-md border border-neutral-200 bg-white shadow-lg">
                    {isTagsLoading ? (
                      <div className="flex items-center gap-1.5 p-2 text-xs text-neutral-500">
                        <Loader2 className="h-3 w-3 animate-spin" /> Searching...
                      </div>
                    ) : tagsData?.results && tagsData.results.length > 0 ? (
                      tagsData.results
                        .filter(t => !formTags.includes(t.id))
                        .map((tag) => (
                          <div
                            key={tag.id}
                            onClick={() => handleAddTag(tag)}
                            className="px-3 py-1.5 text-xs hover:bg-neutral-50 hover:text-brand-red font-semibold cursor-pointer border-b border-neutral-50 last:border-0"
                          >
                            {tag.name}
                          </div>
                        ))
                    ) : (
                      <div className="p-2 text-xs text-neutral-400">No tags found</div>
                    )}
                  </div>
                )}

                {errors.tags && (
                  <span className="text-xs text-brand-red font-semibold">{errors.tags.message}</span>
                )}
              </div>
            </div>

            {/* Selected Tags list */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedTags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-red/10 border border-brand-red/20 text-brand-red font-bold text-[10px] rounded-lg"
                  >
                    {tag.name}
                    <button
                      type="button"
                      disabled={isPublishing}
                      onClick={() => handleRemoveTag(tag.id)}
                      className="text-brand-red hover:text-brand-red/80 focus:outline-none cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Display Image Upload */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-neutral-500 flex items-center gap-1">
                <ImageIcon className="h-3.5 w-3.5" /> {isIt ? "Immagine Articolo" : "Article Image"}
              </label>
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept="image/*"
                  disabled={isPublishing}
                  onChange={handleImageChange}
                  className="flex h-9 w-full rounded-md border border-neutral-200 bg-white px-3 py-1 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-red text-neutral-700 font-semibold cursor-pointer file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-bold file:bg-neutral-100 file:text-brand-dark file:cursor-pointer hover:file:bg-neutral-200"
                />
                {imagePreview && (
                  <div className="relative w-full h-32 rounded-lg overflow-hidden border border-neutral-250">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      disabled={isPublishing}
                      onClick={() => {
                        setImageFile(null)
                        setImagePreview("")
                      }}
                      className="absolute top-2 right-2 bg-brand-dark/80 text-white rounded-full p-1.5 hover:bg-brand-red transition-colors flex items-center justify-center cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" className="w-full mt-2 font-bold h-10 cursor-pointer" disabled={isPublishing}>
                {isPublishing ? (isIt ? "Pubblicazione..." : "Publishing...") : (isIt ? "Pubblica Articolo" : "Publish Article")}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AddArticleModal