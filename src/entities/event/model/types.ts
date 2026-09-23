import type { Athlete } from '@/entities/athlete/@x/event'
import type { Division } from '@/entities/division/@x/event'

export type EventStatus = 'scheduled' | 'completed' | 'cancelled'
export type EventScope = 'upcoming' | 'past' | 'all'
export type BoutSegment = 'main_card' | 'prelims' | 'early_prelims'
export type BoutMethod = 'ko_tko' | 'submission' | 'decision' | 'dq' | 'other'
export type BoutOutcome = 'win' | 'draw' | 'no_contest'

export interface Bout {
  id: string
  event_id: string
  position: number
  segment: BoutSegment | string
  division_id: string
  division?: Division | null
  weight_class_label: string
  scheduled_rounds: number
  is_title_fight: boolean
  is_main_event: boolean
  red_corner_id: string
  red_corner?: Athlete | null
  blue_corner_id: string
  blue_corner?: Athlete | null
  winner_id?: string | null
  winner?: Athlete | null
  outcome: BoutOutcome | ''
  method: BoutMethod | ''
  method_detail: string
  end_round: number
  end_time: string
  result_recorded_at?: string | null
}

export interface VflEvent {
  id: string
  slug: string
  name: string
  subtitle: string
  status: EventStatus
  starts_at: string
  early_prelims_at: string
  prelims_at: string
  main_card_at: string
  venue_name: string
  city: string
  region: string
  country: string
  poster_url: string
  banner_url: string
  broadcast_platform: string
  ticket_url: string
  bouts?: Bout[] | null
}
