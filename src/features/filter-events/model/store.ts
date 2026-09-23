import { create } from 'zustand'
import type { EventScope } from '@/entities/event'

interface EventsFilterState {
  scope: EventScope
  search: string
  page: number
  setScope: (scope: EventScope) => void
  setSearch: (search: string) => void
  setPage: (page: number) => void
}

export const useEventsFilter = create<EventsFilterState>((set) => ({
  scope: 'upcoming',
  search: '',
  page: 1,
  setScope: (scope) => set({ scope, page: 1 }),
  setSearch: (search) => set({ search, page: 1 }),
  setPage: (page) => set({ page }),
}))
