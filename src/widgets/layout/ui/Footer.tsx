import { Container, Group, Text } from '@mantine/core'
import { Link } from 'react-router-dom'
import { routes, site } from '@/shared/config'
import { IconInstagram, IconMail, IconTiktok, Logo } from '@/shared/ui'
import classes from './Footer.module.css'

const COLUMNS = [
  {
    title: 'League',
    links: [
      { label: 'Events', to: routes.events },
      { label: 'Rankings', to: routes.rankings },
      { label: 'Athletes', to: routes.athletes },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About VFL', to: routes.about },
      { label: 'Contact', to: routes.contact },
      { label: 'Partnerships', to: routes.contact },
    ],
  },
]

export function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.ghost} aria-hidden>
        VAULT
      </div>
      <Container size="xl">
        <div className={classes.grid}>
          <div>
            <Logo height={34} />
            <Text c="dimmed" mt="lg" maw={340}>
              Dubai-born professional MMA. Elite competition, world-class production and fighters worth following.
            </Text>
            <Group gap={10} mt="xl">
              <a className={classes.social} href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <IconInstagram />
              </a>
              <a className={classes.social} href={site.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok">
                <IconTiktok />
              </a>
              <a className={classes.social} href={`mailto:${site.email}`} aria-label="Email">
                <IconMail />
              </a>
            </Group>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <div className={classes.heading}>{column.title}</div>
              {column.links.map((link) => (
                <Link key={link.label} to={link.to} className={classes.link}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}

          <div>
            <div className={classes.heading}>Get in touch</div>
            <a className={classes.link} href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <Text c="dimmed" size="sm" mt="xs">
              Dubai, United Arab Emirates
            </Text>
          </div>
        </div>

        <div className={classes.bottom}>
          <span>© {new Date().getFullYear()} Vault Fighting League. All rights reserved.</span>
          <span>Born in Dubai. Built for the world.</span>
        </div>
      </Container>
    </footer>
  )
}
