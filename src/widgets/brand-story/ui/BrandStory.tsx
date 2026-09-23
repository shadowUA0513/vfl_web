import { Marquee, Text } from '@mantine/core'
import classes from './BrandStory.module.css'

const PILLARS = [
  { title: 'Elite MMA', text: 'Professional competition built around credible matchmaking and high-quality fights.' },
  { title: 'Fighter Platform', text: 'A stage where emerging athletes build names, careers and global fanbases.' },
  { title: 'Event Experience', text: 'Walkouts, lighting, music, media and hospitality designed as one complete show.' },
  { title: 'Global Ambition', text: 'A sports property born in Dubai and designed to travel to major cities worldwide.' },
  { title: 'Storytelling', text: 'Fights become stories fans follow and remember. Athletes are people worth caring about.' },
  { title: 'Integrity', text: 'Safety, fairness and transparency at the core of every bout we stage.' },
]

const TICKER = ['Vault Fighting League', 'Born in Dubai', 'Built for the world', 'Elite MMA', 'One Night. One Legacy.']

export function Pillars({ limit = PILLARS.length }: { limit?: number }) {
  return (
    <div className={classes.pillars}>
      {PILLARS.slice(0, limit).map((pillar, i) => (
        <div key={pillar.title} className={classes.pillar}>
          <div className={classes.num}>{String(i + 1).padStart(2, '0')}</div>
          <div className={classes.pillarTitle}>{pillar.title}</div>
          <Text c="dimmed" mt="sm">
            {pillar.text}
          </Text>
        </div>
      ))}
    </div>
  )
}

export function FounderQuote() {
  return (
    <figure className={classes.quote} style={{ margin: 0 }}>
      <blockquote className={classes.quoteText} style={{ margin: 0 }}>
        I don't want VFL to simply sign recognisable names. <em>I want VFL to create names.</em>
      </blockquote>
      <figcaption className={classes.cite}>Zeyd Al Moosa · Founder &amp; CEO</figcaption>
    </figure>
  )
}

export function Ticker() {
  return (
    <div className={classes.ticker} aria-hidden>
      <Marquee duration={30000} gap={28} fadeEdges={false} pauseOnHover>
        {TICKER.map((item) => (
          <span key={item} className={classes.tickerItem}>
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  )
}
