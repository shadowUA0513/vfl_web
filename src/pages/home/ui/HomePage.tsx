import { Button, Container, Stack } from '@mantine/core'
import { useDocumentTitle } from '@mantine/hooks'
import { Link } from 'react-router-dom'
import { RosterPreview } from '@/widgets/athletes-grid'
import { FounderQuote, Pillars, Ticker } from '@/widgets/brand-story'
import { EventsPreview } from '@/widgets/events-list'
import { FeaturedEvent } from '@/widgets/featured-event'
import { ChampionsStrip } from '@/widgets/rankings-board'
import { routes } from '@/shared/config'
import { IconArrowRight, SectionHeading } from '@/shared/ui'

export function HomePage() {
  useDocumentTitle('VFL — Vault Fighting League · Dubai MMA')

  return (
    <>
      <FeaturedEvent />
      <Ticker />
      <Container size="xl" mt={100}>
        <Stack gap={120}>
          <EventsPreview />
          <ChampionsStrip />
          <RosterPreview />
          <Stack gap={36}>
            <SectionHeading
              kicker="The Experience"
              title="More Than a Fight"
              description="A VFL event is designed as one complete show — from the moment you arrive to the final bell."
              action={
                <Button component={Link} to={routes.about} variant="subtle" color="gray" radius={0} rightSection={<IconArrowRight size={16} />}>
                  About VFL
                </Button>
              }
            />
            <Pillars limit={3} />
          </Stack>
          <FounderQuote />
        </Stack>
      </Container>
    </>
  )
}
