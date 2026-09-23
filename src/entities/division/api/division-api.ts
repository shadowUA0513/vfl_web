import { apiClient, type ListResponse } from '@/shared/api'
import type { Division, DivisionGender, DivisionKind } from '../model/types'

export interface DivisionListParams {
  gender?: DivisionGender
  kind?: DivisionKind
}

export async function fetchDivisions(params: DivisionListParams = {}): Promise<Division[]> {
  const { data } = await apiClient.get<ListResponse<Division>>('/divisions', { params: { ...params, limit: 100 } })
  return [...data.data].sort((a, b) => a.sort_order - b.sort_order)
}
