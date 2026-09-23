export const routes = {
  home: '/',
  events: '/events',
  event: (slug: string) => `/events/${slug}`,
  rankings: '/rankings',
  athletes: '/athletes',
  athlete: (slug: string) => `/athletes/${slug}`,
  about: '/about',
  contact: '/contact',
} as const

export const site = {
  name: 'Vault Fighting League',
  short: 'VFL',
  email: 'info@vaultexp.ae',
  instagram: 'https://www.instagram.com/vaultfightingleague/',
  tiktok: 'https://www.tiktok.com/@vaultfightingleague',
} as const
