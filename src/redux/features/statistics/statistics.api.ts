import baseApi from "@/redux/api/api"
import { PlayerStatsResponse, TopScorersResponse, StandingsResponse } from "./statistics.type"

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
    getStandings: builder.query<StandingsResponse, { page?: number } | void>({
      query: (args) => {
        const params: Record<string, any> = {}
        if (args) {
          if (args.page) params.page = args.page
        }
        return {
          url: '/stats/standings/',
          method: "GET",
          params
        }
      }
    }),
  })
})

export const {
  useGetPlayerStatsQuery,
  useGetTopScorersQuery,
  useGetStandingsQuery
} = statisticsApi
