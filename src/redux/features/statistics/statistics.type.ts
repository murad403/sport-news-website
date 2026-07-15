export interface PlayerStat {
  player_name: string
  player_photo: string
  team_name: string
  country: string
  position: string
  matches: number
  goals: number
  assists: number
  rating: string | null
  pass_accuracy: number | null
  yellow_cards: number
  red_cards: number
}

export interface PlayerStatsResponse {
  count: number
  next: string | null
  previous: string | null
  results: PlayerStat[]
}

export interface TopScorer {
  rank: number
  player_name: string
  player_photo: string
  team_name: string
  goals: number
  assists: number
  matches: number
}

export interface TopScorersResponse {
  count: number
  next: string | null
  previous: string | null
  results: TopScorer[]
}
