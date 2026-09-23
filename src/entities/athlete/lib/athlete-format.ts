import { cleanQuotes, titleCase } from '@/shared/lib'
import type { Athlete } from '../model/types'

type NameFields = Pick<Athlete, 'first_name' | 'last_name'>

export const athleteName = (a?: NameFields | null) => (a ? titleCase(`${a.first_name} ${a.last_name}`) : 'TBA')

export const athleteFirstName = (a?: NameFields | null) => titleCase(a?.first_name)

export const athleteLastName = (a?: NameFields | null) => titleCase(a?.last_name) || titleCase(a?.first_name)

export const athleteNickname = (a?: Pick<Athlete, 'nickname'> | null) => titleCase(cleanQuotes(a?.nickname))

export function athleteRecord(a?: Pick<Athlete, 'wins' | 'losses' | 'draws' | 'no_contests'> | null) {
  if (!a) return '0-0-0'
  const base = `${a.wins}-${a.losses}-${a.draws}`
  return a.no_contests ? `${base} (${a.no_contests} NC)` : base
}

export const athletePhoto = (a?: Pick<Athlete, 'photo_url' | 'photo_large_url' | 'photo_thumbnail_url'> | null, size: 'thumb' | 'full' | 'large' = 'full') => {
  if (!a) return ''
  if (size === 'thumb') return a.photo_thumbnail_url || a.photo_url
  if (size === 'large') return a.photo_large_url || a.photo_url
  return a.photo_url || a.photo_large_url
}
