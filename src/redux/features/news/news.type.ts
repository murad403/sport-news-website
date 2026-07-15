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
