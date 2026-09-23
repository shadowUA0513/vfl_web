import { Link } from 'react-router-dom'
import { routes } from '@/shared/config'

export function Logo({ height = 28 }: { height?: number }) {
  return (
    <Link to={routes.home} aria-label="VFL home" style={{ display: 'inline-flex', lineHeight: 0 }}>
      <img src="/vfl-logo.png" alt="VFL — Vault Fighting League" style={{ width: 'auto', height }} />
    </Link>
  )
}
