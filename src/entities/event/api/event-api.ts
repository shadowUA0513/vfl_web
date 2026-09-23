import { apiClient, type ListResponse, type PageParams } from '@/shared/api'
import type { EventScope, EventStatus, VflEvent } from '../model/types'

export interface EventListParams extends PageParams {
  scope?: EventScope
  status?: EventStatus
  search?: string
}

export async function fetchEvents(params: EventListParams = {}) {
  const { data } = await apiClient.get<ListResponse<VflEvent>>('/events', { params })
  return data
}

export async function fetchEvent(idOrSlug: string) {
  const { data } = await apiClient.get<VflEvent>(`/events/${encodeURIComponent(idOrSlug)}`)
  return data
}
