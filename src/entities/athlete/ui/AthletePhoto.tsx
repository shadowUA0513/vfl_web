import { useState, type CSSProperties } from 'react'

interface AthletePhotoProps {
  src?: string
  alt: string
  className?: string
  style?: CSSProperties
  /** Use for above-the-fold hero photos */
  eager?: boolean
}

/** Athlete photos are transparent PNG cut-outs; falls back to a silhouette. */
export function AthletePhoto({ src, alt, className, style, eager = false }: AthletePhotoProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)

  if (!src || failedSrc === src) {
    return (
      <svg className={className} style={style} viewBox="0 0 200 260" role="img" aria-label={alt} preserveAspectRatio="xMidYMax meet">
        <defs>
          <linearGradient id="vfl-silhouette" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3a3a40" />
            <stop offset="1" stopColor="#141416" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="78" r="42" fill="url(#vfl-silhouette)" />
        <path d="M20 260c4-70 38-118 80-118s76 48 80 118z" fill="url(#vfl-silhouette)" />
      </svg>
    )
  }

  return <img src={src} alt={alt} className={className} style={style} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" onError={() => setFailedSrc(src)} />
}
