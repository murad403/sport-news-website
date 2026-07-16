import baseApi from "@/redux/api/api"
import { PlayerStatsResponse, TopScorersResponse, StandingsResponse, LeaguesResponse, FixturesResponse } from "./statistics.type"

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

    getLeagues: builder.query<LeaguesResponse, { page_size?: number } | void>({
      query: (args) => {
        const params: Record<string, any> = {}
        if (args) {
          if (args.page_size) params.page_size = args.page_size
        }
        return {
          url: '/stats/leagues/',
          method: "GET",
          params
        }
      }
    }),
    getFixtures: builder.query<FixturesResponse, { page?: number; page_size?: number; date?: string; league?: string; search?: string } | void>({
      query: (args) => {
        const params: Record<string, any> = {}
        if (args) {
          if (args.page) params.page = args.page
          if (args.page_size) params.page_size = args.page_size
          if (args.date) params.date = args.date
          if (args.league) params.league = args.league
          if (args.search) params.search = args.search
        }
        return {
          url: '/stats/fixtures/',
          method: "GET",
          params
        }
      }
    }),

    // to do after get api key from client side*********************
    // getTransfer: builder.query({
    //   query: () => {
    //     return {
    //       url: '/stats/standings/',
    //       method: "GET"
    //     }
    //   }
    // }),
  })
})

export const {
  useGetPlayerStatsQuery,
  useGetTopScorersQuery,
  useGetStandingsQuery,
  useGetLeaguesQuery,
  useGetFixturesQuery
} = statisticsApi
