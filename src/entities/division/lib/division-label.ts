import { titleCase } from '@/shared/lib'
import type { Division } from '../model/types'

export function divisionName(division?: Pick<Division, 'name' | 'gender'> | null): string {
  if (!division) return ''
  const name = titleCase(division.name)
  return division.gender === 'women' && !/women/i.test(name) ? `Women's ${name}` : name
}

export function divisionLabel(division?: Division | null): string {
  if (!division) return ''
  const name = divisionName(division)
  return division.weight_limit_lbs ? `${name} · ${division.weight_limit_lbs} lbs` : name
}
