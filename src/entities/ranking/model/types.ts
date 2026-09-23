export interface RankedAthlete {
  id: string
  slug: string
  name: string
  nickname: string
  photo_url: string
  record: string
}

export type RankDirection = 'up' | 'down' | 'same' | 'new' | string

export interface RankingEntry {
  rank: number
  previous_rank: number
  change: number
  direction: RankDirection
  athlete: RankedAthlete
}

export interface DivisionRanking {
  division_id: string
  division_name: string
  division_slug: string
  gender: string
  kind: 'weight_class' | 'pound_for_pound' | string
  champion?: RankedAthlete | null
  champion_label: string
  entries?: RankingEntry[] | null
  published_at: string
  snapshot_id: string
}
