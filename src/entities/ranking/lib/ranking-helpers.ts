import { cleanQuotes, titleCase } from '@/shared/lib'
import type { DivisionRanking, RankedAthlete } from '../model/types'

export const rankingTitle = (ranking: DivisionRanking) => {
  if (ranking.kind === 'pound_for_pound') return ranking.gender === 'women' ? "Women's Pound-for-Pound" : 'Pound-for-Pound'
  const name = titleCase(ranking.division_name)
  return ranking.gender === 'women' && !/women/i.test(name) ? `Women's ${name}` : name
}

export const rankedName = (athlete?: RankedAthlete | null) => titleCase(athlete?.name)

export const rankedNickname = (athlete?: RankedAthlete | null) => titleCase(cleanQuotes(athlete?.nickname))

export const championLabel = (ranking: DivisionRanking) => titleCase(ranking.champion_label) || 'Champion'

/** Weight classes first, then pound-for-pound, men before women. */
export function sortRankings(list: DivisionRanking[]) {
  const weight = (r: DivisionRanking) => (r.kind === 'pound_for_pound' ? 0 : 1) + (r.gender === 'women' ? 2 : 0)
  return [...list].sort((a, b) => weight(a) - weight(b))
}
