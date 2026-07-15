import baseApi from "@/redux/api/api"
import { TrendingTagsResponse, MostReadResponse } from "./news.type"

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
    })
  })
})

export const {
  useGetTrendingTagsQuery,
  useGetMostReadQuery
} = newsApi
