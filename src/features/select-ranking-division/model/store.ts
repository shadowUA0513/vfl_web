import { create } from 'zustand'

interface RankingDivisionState {
  divisionId: string | null
  setDivisionId: (divisionId: string) => void
}

export const useRankingDivision = create<RankingDivisionState>((set) => ({
  divisionId: null,
  setDivisionId: (divisionId) => set({ divisionId }),
}))
