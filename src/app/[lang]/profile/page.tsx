"use client"

import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useGetProfileQuery, useUpdateProfileMutation } from "@/redux/features/auth/auth.api"
import { useTranslation } from "@/lib/useTranslation"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { Camera, User, Loader2 } from "lucide-react"

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().optional()
})

type ProfileFormValues = z.infer<typeof profileSchema>

export default function ProfilePage() {
  const { lang } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const { data: user, isLoading: isProfileLoading, error: profileError } = useGetProfileQuery()
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema)
  })

  // Prefill form when data is loaded
  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        bio: user.bio || ""
      })
      if (user.avatar) {
        setAvatarPreview(user.avatar)
      }
    }
  }, [user, reset])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: ProfileFormValues) => {
    setErrorMessage(null)
    setSuccessMessage(null)

    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("bio", data.bio || "")
    if (avatarFile) {
      formData.append("avatar", avatarFile)
    }

    try {
      await updateProfile(formData).unwrap()
      setSuccessMessage(lang === "it" ? "Profilo aggiornato con successo!" : "Profile updated successfully!")
      setIsEditing(false)
      setAvatarFile(null)
    } catch (err: any) {
      console.error("Profile update error:", err)
      const apiErrorMsg = err?.data?.message || err?.data?.detail || err?.data?.error || "Failed to update profile."
      setErrorMessage(apiErrorMsg)
    }
  }

  if (isProfileLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
      </div>
    )
  }

  if (profileError || !user) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 font-semibold">
          {lang === "it" ? "Impossibile caricare il profilo. Assicurati di aver effettuato l'accesso." : "Could not load profile. Please make sure you are logged in."}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-dark">
          {lang === "it" ? "Il Mio Profilo" : "My Profile"}
        </h1>
        <p className="text-xs text-neutral-500">
          {lang === "it" ? "Visualizza e aggiorna i dettagli del tuo account." : "View and update your account details."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Avatar section */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-neutral-200 bg-neutral-50 flex items-center justify-center shrink-0">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-12 w-12 text-neutral-400" />
            )}
            
            {isEditing && (
              <label className="absolute inset-0 bg-black/40 hover:bg-black/55 flex items-center justify-center cursor-pointer transition-colors">
                <Camera className="h-5 w-5 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-neutral-800 text-lg">{user.name}</h3>
            <p className="text-sm text-neutral-500">{user.email}</p>
          </div>
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-1 gap-4 max-w-xl">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-neutral-500">
              {lang === "it" ? "Nome Completo" : "Full Name"}
            </label>
            {isEditing ? (
              <div>
                <Input
                  type="text"
                  className="bg-white border-neutral-250 text-brand-dark focus-visible:ring-brand-red rounded-lg"
                  {...register("name")}
                  disabled={isUpdating}
                />
                {errors.name && (
                  <span className="text-xs text-brand-red font-semibold">{errors.name.message}</span>
                )}
              </div>
            ) : (
              <p className="py-2 px-3 border border-neutral-100 bg-neutral-50 rounded-lg text-sm text-neutral-700">
                {user.name}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-neutral-500">
              {lang === "it" ? "Indirizzo Email (Non modificabile)" : "Email Address (Non-editable)"}
            </label>
            <p className="py-2 px-3 border border-neutral-200/50 bg-neutral-100 rounded-lg text-sm text-neutral-450 select-none cursor-not-allowed">
              {user.email}
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-neutral-500">
              {lang === "it" ? "Biografia" : "Bio"}
            </label>
            {isEditing ? (
              <div>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-neutral-250 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-red disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("bio")}
                  disabled={isUpdating}
                />
                {errors.bio && (
                  <span className="text-xs text-brand-red font-semibold">{errors.bio.message}</span>
                )}
              </div>
            ) : (
              <p className="py-2 px-3 border border-neutral-100 bg-neutral-50 rounded-lg text-sm text-neutral-700 min-h-[40px] whitespace-pre-line">
                {user.bio || (lang === "it" ? "Nessuna biografia inserita." : "No biography added yet.")}
              </p>
            )}
          </div>
        </div>

        {/* Feedback Messages */}
        {errorMessage && (
          <div className="text-xs font-semibold text-brand-red bg-red-50 border border-red-200 rounded-lg p-2.5 max-w-xl text-center">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg p-2.5 max-w-xl text-center">
            {successMessage}
          </div>
        )}

        {/* Actions buttons */}
        <div className="flex gap-3 pt-2">
          {isEditing ? (
            <>
              <Button
                type="submit"
                className="bg-brand-red hover:bg-brand-red/90 text-white rounded-lg px-4 py-2 font-bold cursor-pointer"
                disabled={isUpdating}
              >
                {isUpdating ? (lang === "it" ? "Salvataggio..." : "Saving...") : (lang === "it" ? "Salva Modifiche" : "Save Changes")}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-lg px-4 py-2 font-bold cursor-pointer"
                onClick={() => {
                  setIsEditing(false)
                  reset({
                    name: user.name,
                    bio: user.bio || ""
                  })
                  setAvatarPreview(user.avatar)
                  setAvatarFile(null)
                  setErrorMessage(null)
                }}
                disabled={isUpdating}
              >
                {lang === "it" ? "Annulla" : "Cancel"}
              </Button>
            </>
          ) : (
            <Button
              type="button"
              className="bg-neutral-800 hover:bg-neutral-900 text-white rounded-lg px-4 py-2 font-bold cursor-pointer"
              onClick={() => {
                setIsEditing(true)
                setSuccessMessage(null)
                setErrorMessage(null)
              }}
            >
              {lang === "it" ? "Modifica Profilo" : "Edit Profile"}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}