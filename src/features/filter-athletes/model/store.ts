import { create } from 'zustand'
import type { AthleteStatus } from '@/entities/athlete'

export type AthleteStatusFilter = AthleteStatus | 'all'

interface AthletesFilterState {
  search: string
  divisionId: string | null
  status: AthleteStatusFilter
  page: number
  setSearch: (search: string) => void
  setDivisionId: (divisionId: string | null) => void
  setStatus: (status: AthleteStatusFilter) => void
  setPage: (page: number) => void
  reset: () => void
}

const initial = { search: '', divisionId: null, status: 'active' as AthleteStatusFilter, page: 1 }

export const useAthletesFilter = create<AthletesFilterState>((set) => ({
  ...initial,
  setSearch: (search) => set({ search, page: 1 }),
  setDivisionId: (divisionId) => set({ divisionId, page: 1 }),
  setStatus: (status) => set({ status, page: 1 }),
  setPage: (page) => set({ page }),
  reset: () => set(initial),
}))
