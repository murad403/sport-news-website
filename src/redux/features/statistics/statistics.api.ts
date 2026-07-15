import baseApi from "@/redux/api/api"
import { PlayerStatsResponse, TopScorersResponse } from "./statistics.type"

const statisticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlayerStats: builder.query<PlayerStatsResponse, { page?: number; search?: string } | void>({
      query: (args) => {
        const params: Record<string, any> = {}
        if (args) {
          if (args.page) params.page = args.page
          if (args.search) params.search = args.search
        }
        return {
          url: `/stats/players/`,
          method: "GET",
          params
        }
      }
    }),
    getTopScorers: builder.query<TopScorersResponse, { page?: number; search?: string } | void>({
      query: (args) => {
        const params: Record<string, any> = {}
        if (args) {
          if (args.page) params.page = args.page
          if (args.search) params.search = args.search
        }
        return {
          url: '/stats/topscorers/',
          method: "GET",
          params
        }
      }
    }),
  })
})

export const {
  useGetPlayerStatsQuery,
  useGetTopScorersQuery
} = statisticsApi
