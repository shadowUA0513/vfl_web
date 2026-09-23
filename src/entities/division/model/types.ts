export type DivisionGender = 'men' | 'women'
export type DivisionKind = 'weight_class' | 'pound_for_pound'

export interface Division {
  id: string
  name: string
  slug: string
  gender: DivisionGender
  kind: DivisionKind
  weight_limit_lbs: number
  sort_order: number
}
