import baseApi from "@/redux/api/api"
import { TrendingTagsResponse, MostReadResponse, NewsResponse, NewsArticle } from "./news.type"

const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTrendingTags: builder.query<TrendingTagsResponse, void>({
      query: () => {
        return {
          url: '/news/tags/trending/',
          method: "GET"
        }
      }
    }),
    getMostRead: builder.query<MostReadResponse, void>({
      query: () => {
        return {
          url: '/news/most-read/',
          method: "GET"
        }
      }
    }),

    // news*******************************
    getNews: builder.query<NewsResponse, { category?: string; page?: number } | void>({
      query: (args) => {
        const params: Record<string, any> = {}
        if (args) {
          if (args.category) params.category = args.category
          if (args.page) params.page = args.page
        }
        return {
          url: '/news/',
          method: "GET",
          params
        }
      }
    }),
    getNewsDetails: builder.query<NewsArticle, string>({
      query: (slug) => {
        return {
          url: `/news/${slug}/`,
          method: "GET"
        }
      }
    }),
    getRelatedNews: builder.query<NewsResponse, string>({
      query: (slug) => {
        return {
          url: `/news/${slug}/related/`,
          method: "GET"
        }
      }
    }),
  })
})

export const {
  useGetTrendingTagsQuery,
  useGetMostReadQuery,
  useGetNewsQuery,
  useGetNewsDetailsQuery,
  useGetRelatedNewsQuery
} = newsApi
