import { apiClient } from '@/shared/api'
import type { DivisionRanking } from '../model/types'

export async function fetchRankings() {
  const { data } = await apiClient.get<DivisionRanking[] | null>('/rankings')
  return data ?? []
}

export async function fetchDivisionRanking(divisionId: string) {
  const { data } = await apiClient.get<DivisionRanking>(`/rankings/divisions/${encodeURIComponent(divisionId)}`)
  return data
}
