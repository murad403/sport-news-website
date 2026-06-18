export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  publishedAt: string
  imageUrl: string
  tags: string[]
  readingTime: number
  featured?: boolean
}

export interface MatchResult {
  id: string
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  status: 'live' | 'ft' | 'upcoming'
  minute?: number
  league: string
  matchDate: string
}

export interface LeagueTableEntry {
  position: number
  club: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
}

export interface Transfer {
  id: string
  player: string
  fromClub: string
  toClub: string
  fee: string
  status: 'confirmed' | 'rumour' | 'loan'
  date: string
}

export interface TopScorer {
  rank: number
  player: string
  club: string
  goals: number
  assists: number
  matches: number
}

export interface InjuryUpdate {
  id: string
  player: string
  club: string
  injury: string
  expectedReturn: string
  status: string
}
