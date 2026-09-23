import type { Division } from '@/entities/division/@x/athlete'

export type AthleteStatus = 'active' | 'inactive' | 'retired'

export interface Athlete {
  id: string
  slug: string
  first_name: string
  last_name: string
  nickname: string
  status: AthleteStatus
  photo_url: string
  photo_thumbnail_url: string
  photo_large_url: string
  division_id: string
  division?: Division | null

  wins: number
  losses: number
  draws: number
  no_contests: number
  wins_by_ko: number
  wins_by_submission: number
  wins_by_decision: number
  losses_by_ko: number
  losses_by_submission: number
  losses_by_decision: number

  height_cm: number
  weight_kg: number
  reach_cm: number
  leg_reach_cm: number
  stance: string
  date_of_birth: string
  hometown: string
  country: string

  sig_strikes_landed: number
  sig_strikes_attempted: number
  striking_accuracy: number
  striking_defense: number
  strikes_landed_per_min: number
  strikes_absorbed_per_min: number
  takedowns_landed: number
  takedowns_attempted: number
  takedown_accuracy: number
  takedown_defense: number
  takedown_avg_per_15_min: number
  submission_avg_per_15_min: number
}

export type FightResult = 'win' | 'loss' | 'draw' | 'no_contest'

export interface FightHistoryItem {
  source: 'bout' | 'legacy'
  bout_id?: string
  event_id?: string
  event_name: string
  opponent_id?: string
  opponent_name: string
  fought_at: string
  result: FightResult
  method: string
  method_detail: string
  round: number
  end_time: string
}
