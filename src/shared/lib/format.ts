const collapse = (value: string) => value.replace(/\s+/g, ' ').trim()

/** API data is typed in by hand, so casing and spacing vary ("joshua  van", "vegas"). */
export function titleCase(value?: string | null): string {
  if (!value) return ''
  return collapse(value)
    .split(' ')
    .map((word) => (word.length <= 3 && word === word.toUpperCase() ? word : word[0].toUpperCase() + word.slice(1)))
    .join(' ')
}

export function cleanQuotes(value?: string | null): string {
  return value ? collapse(value.replace(/^["'“”]+|["'“”]+$/g, '')) : ''
}

const dateFmt = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
const timeFmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })

export function parseDate(iso?: string | null): Date | null {
  if (!iso || iso.startsWith('0001')) return null
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? null : date
}

export const formatDate = (iso?: string | null) => {
  const date = parseDate(iso)
  return date ? dateFmt.format(date) : 'TBA'
}

export const formatTime = (iso?: string | null) => {
  const date = parseDate(iso)
  return date ? timeFmt.format(date) : 'TBA'
}

export function dateParts(iso?: string | null) {
  const date = parseDate(iso)
  if (!date) return null
  return {
    day: date.toLocaleDateString('en-GB', { day: '2-digit' }),
    month: date.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
    weekday: date.toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase(),
    year: date.getFullYear(),
  }
}

export function ageFrom(iso?: string | null): number | null {
  const date = parseDate(iso)
  if (!date) return null
  const diff = Date.now() - date.getTime()
  return Math.floor(diff / (365.25 * 24 * 3600 * 1000))
}

export function cmToImperial(cm?: number | null): string | null {
  if (!cm) return null
  const inches = cm / 2.54
  return `${Math.floor(inches / 12)}' ${Math.round(inches % 12)}"`
}

export const cmToInches = (cm?: number | null) => (cm ? `${Math.round(cm / 2.54)}"` : null)

export const kgToLbs = (kg?: number | null) => (kg ? `${Math.round(kg * 2.20462)} lbs` : null)

/** Stats may arrive as 0–1 fractions or 0–100 percentages. */
export const toPercent = (value?: number | null) => {
  if (!value) return 0
  return Math.round(value <= 1 ? value * 100 : value)
}

export const joinParts = (...parts: Array<string | null | undefined>) => parts.filter(Boolean).join(' · ')

/** "usa" → "USA", "gruziya" → "Gruziya" */
export const formatCountry = (value?: string | null) => {
  const clean = titleCase(value)
  return clean.length > 0 && clean.length <= 3 ? clean.toUpperCase() : clean
}
