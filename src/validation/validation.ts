import z from "zod"

export const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters long")
})
export type SignUpFormValues = z.infer<typeof signUpSchema>

export const verifyOtpSchema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 digits").regex(/^\d+$/, "OTP must only contain digits")
})

export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>


export const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required")
})
export type SignInFormValues = z.infer<typeof signInSchema>

export const sendOtpSchema = z.object({
  email: z.string().email("Invalid email address")
})
export type SendOtpFormValues = z.infer<typeof sendOtpSchema>

export const resetPasswordSchema = z.object({
  new_password: z.string().min(8, "Password must be at least 8 characters long")
})
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>


export const addArticleSchema = z.object({
  author: z.string().min(1, "Nickname is required"),
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(10, "Content must be at least 10 characters long"),
  category: z.string().min(1, "Category is required")
})

export type AddArticleFormValues = z.infer<typeof addArticleSchema>