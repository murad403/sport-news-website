export interface Category {
  id: string
  name: string
  slug: string
  news_count?: number
}

export interface CategoriesResponse {
  count: number
  next: string | null
  previous: string | null
  results: Category[]
}
