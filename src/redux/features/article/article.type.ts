import { Category } from "../categories/categories.type"
import { Tag } from "../tags/tags.type"

export interface Article {
  id: string
  title: string
  slug: string
  description: string
  content: string
  display_image: string | null
  image_url: string | null
  link: string | null
  categories: Category[]
  tags: Tag[]
  author_name: string
  source_name: string | null
  source_url: string | null
  language: string
  sentiment: string | null
  pub_date: string | null
  is_featured: boolean
  is_published: boolean
  views_count: number
  status: "pending" | "approved" | "rejected" | string
  created_at: string
  updated_at: string
}

export interface ArticlesResponse {
  count: number
  next: string | null
  previous: string | null
  results: Article[]
}
