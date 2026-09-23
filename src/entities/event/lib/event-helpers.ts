import { formatCountry, joinParts, parseDate, titleCase } from '@/shared/lib'
import type { Bout, VflEvent } from '../model/types'

const SEGMENT_ORDER = ['main_card', 'prelims', 'early_prelims']

const SEGMENT_LABELS: Record<string, string> = {
  main_card: 'Main Card',
  prelims: 'Prelims',
  early_prelims: 'Early Prelims',
}

const METHOD_LABELS: Record<string, string> = {
  ko_tko: 'KO/TKO',
  submission: 'Submission',
  decision: 'Decision',
  dq: 'DQ',
  other: 'Other',
}

export const segmentLabel = (segment: string) => SEGMENT_LABELS[segment] ?? titleCase(segment.replace(/_/g, ' '))

export const methodLabel = (method?: string | null) => (method ? (METHOD_LABELS[method] ?? titleCase(method.replace(/_/g, ' '))) : '')

export const eventStart = (event: VflEvent) => parseDate(event.starts_at) ?? parseDate(event.main_card_at)

export function isUpcoming(event: VflEvent): boolean {
  if (event.status !== 'scheduled') return false
  const start = eventStart(event)
  return !start || start.getTime() > Date.now() - 6 * 3600_000
}

export const eventLocation = (event: VflEvent) => joinParts(titleCase(event.venue_name), titleCase(event.city), formatCountry(event.country))

export const eventCity = (event: VflEvent) => joinParts(titleCase(event.city), formatCountry(event.country))

export const eventTitle = (event: VflEvent) => titleCase(event.name)

const byPosition = (a: Bout, b: Bout) => a.position - b.position

export function groupBouts(bouts?: Bout[] | null) {
  const groups = new Map<string, Bout[]>()
  for (const bout of [...(bouts ?? [])].sort(byPosition)) {
    const list = groups.get(bout.segment) ?? []
    list.push(bout)
    groups.set(bout.segment, list)
  }
  const rank = (segment: string) => {
    const index = SEGMENT_ORDER.indexOf(segment)
    return index === -1 ? SEGMENT_ORDER.length : index
  }
  return [...groups.entries()].sort(([a], [b]) => rank(a) - rank(b)).map(([segment, list]) => ({ segment, bouts: list }))
}

export function getMainBout(event: VflEvent): Bout | undefined {
  const bouts = [...(event.bouts ?? [])].sort(byPosition)
  return bouts.find((b) => b.is_main_event) ?? bouts.find((b) => b.segment === 'main_card') ?? bouts[0]
}

export const hasResult = (bout: Bout) => Boolean(bout.outcome)

export function boutResultLine(bout: Bout): string {
  if (!bout.outcome) return ''
  if (bout.outcome === 'draw') return joinParts('Draw', methodLabel(bout.method))
  if (bout.outcome === 'no_contest') return 'No Contest'
  return joinParts(
    methodLabel(bout.method),
    bout.method_detail ? titleCase(bout.method_detail) : null,
    bout.end_round ? `R${bout.end_round}` : null,
    bout.end_time || null,
  )
}

export const boutWeightLabel = (bout: Bout) => titleCase(bout.weight_class_label) || titleCase(bout.division?.name)
