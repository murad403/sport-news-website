export interface Tag {
  id: string
  name: string
  slug: string
  news_count?: number
}

export interface TagsResponse {
  count: number
  next: string | null
  previous: string | null
  results: Tag[]
}
