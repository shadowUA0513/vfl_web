import { Container, SimpleGrid, Text } from '@mantine/core'
import { useDocumentTitle } from '@mantine/hooks'
import type { ReactNode } from 'react'
import { site } from '@/shared/config'
import { IconArrowRight, IconInstagram, IconMail, IconTicket, IconTiktok, IconTrophy, IconTv, PageHeader } from '@/shared/ui'
import classes from './ContactPage.module.css'

interface ContactCard {
  icon: ReactNode
  title: string
  text: string
  cta: string
  href: string
  external?: boolean
}

const mail = (subject: string) => `mailto:${site.email}?subject=${encodeURIComponent(subject)}`

const CARDS: ContactCard[] = [
  { icon: <IconMail />, title: 'General enquiries', text: 'Questions about VFL, our events or the league.', cta: site.email, href: mail('General enquiry') },
  { icon: <IconTrophy />, title: 'Partnerships', text: 'Sponsorship, brand partnerships and hospitality packages.', cta: 'Become a partner', href: mail('Partnership enquiry') },
  { icon: <IconTv />, title: 'Media & press', text: 'Fight-week accreditation, interviews and press assets.', cta: 'Request accreditation', href: mail('Media accreditation') },
  { icon: <IconTicket />, title: 'Group bookings', text: 'Corporate groups, VIP boxes and large-party bookings.', cta: 'Book a group', href: mail('Group booking') },
  { icon: <IconInstagram />, title: 'Instagram', text: 'Fight-night content, announcements and behind the scenes.', cta: '@vaultfightingleague', href: site.instagram, external: true },
  { icon: <IconTiktok />, title: 'TikTok', text: 'Highlights, walkouts and fighter content.', cta: '@vaultfightingleague', href: site.tiktok, external: true },
]

export function ContactPage() {
  useDocumentTitle('Contact — VFL')

  return (
    <>
      <PageHeader kicker="Contact" title="Get in Touch" ghost="CONTACT" description="Fighters, partners, media and fans — this is where it starts." />
      <Container size="xl" mt={64}>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
          {CARDS.map((card) => (
            <a key={card.title} href={card.href} className={classes.card} {...(card.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
              <span className={classes.icon}>{card.icon}</span>
              <span className={classes.title}>{card.title}</span>
              <Text c="dimmed">{card.text}</Text>
              <span className={classes.go}>
                {card.cta} <IconArrowRight size={14} />
              </span>
            </a>
          ))}
        </SimpleGrid>
      </Container>
    </>
  )
}
