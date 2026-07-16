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

export interface Standing {
  position: number
  team_name: string
  team_logo: string
  played: number
  won: number
  drawn: number
  lost: number
  goals_for: number
  goals_against: number
  goal_difference: number
  points: number
  form: string
  description: string
}

export interface StandingsResponse {
  count: number
  next: string | null
  previous: string | null
  results: Standing[]
}

export interface League {
  id: number
  name: string
  short_code: string
  image_path: string
  type: string
  sub_type: string
  active: boolean
  category: number
  last_played_at: string
}

export interface LeaguesResponse {
  count: number
  next: string | null
  previous: string | null
  results: League[]
}

export interface Fixture {
  id: number
  league: string
  league_logo: string
  home_team: string
  home_team_logo: string
  away_team: string
  away_team_logo: string
  home_score: number
  away_score: number
  status: string
  starting_at: string
}

export interface FixturesResponse {
  count: number
  next: string | null
  previous: string | null
  results: Fixture[]
}

