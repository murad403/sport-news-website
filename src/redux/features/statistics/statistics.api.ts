import baseApi from "@/redux/api/api"
import { PlayerStatsResponse } from "./statistics.type"

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
    })
  })
})

export const {
  useGetPlayerStatsQuery
} = statisticsApi
