export interface TrendingTag {
  id: string
  name: string
  slug: string
  news_count: number
}

export interface TrendingTagsResponse {
  count: number
  next: string | null
  previous: string | null
  results: TrendingTag[]
}

export interface MostReadArticle {
  id: string
  slug: string
  title: string
  description: string
  display_image: string
  category: string
  author_name: string
  pub_date: string
  views_count: number
}

export interface MostReadResponse {
  count: number
  next: string | null
  previous: string | null
  results: MostReadArticle[]
}

export interface NewsCategory {
  id: string
  name: string
  slug: string
}

export interface NewsTag {
  id: string
  name: string
  slug: string
}

export interface NewsArticle {
  id: string
  title: string
  slug: string
  description: string
  content: string
  display_image: string | null
  image_url: string | null
  link: string | null
  categories: NewsCategory[]
  tags: NewsTag[]
  author_name: string
  author_image: string
  source_name: string | null
  source_url: string | null
  language: string
  sentiment: string | null
  pub_date: string | null
  is_featured: boolean
  is_published: boolean
  views_count: number
  status: string
  created_at: string
  updated_at: string
}

export interface NewsResponse {
  count: number
  next: string | null
  previous: string | null
  results: NewsArticle[]
}

export interface NewsLetterSubscribeRequest {
  email: string
}

export interface NewsLetterSubscribeResponse {
  message?: string
  email?: string
}
