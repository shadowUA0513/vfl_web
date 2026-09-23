import { apiClient, type ListResponse, type PageParams } from '@/shared/api'
import type { Athlete, AthleteStatus, FightHistoryItem } from '../model/types'

export interface AthleteListParams extends PageParams {
  search?: string
  division_id?: string
  status?: AthleteStatus
  country?: string
}

export async function fetchAthletes(params: AthleteListParams = {}) {
  const { data } = await apiClient.get<ListResponse<Athlete>>('/athletes', { params })
  return data
}

export async function fetchAthlete(idOrSlug: string) {
  const { data } = await apiClient.get<Athlete>(`/athletes/${encodeURIComponent(idOrSlug)}`)
  return data
}

export async function fetchFightHistory(idOrSlug: string) {
  const { data } = await apiClient.get<FightHistoryItem[] | null>(`/athletes/${encodeURIComponent(idOrSlug)}/fight-history`)
  return data ?? []
}
