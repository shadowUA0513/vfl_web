import { Container, Skeleton, Stack } from '@mantine/core'
import { useDocumentTitle } from '@mantine/hooks'
import { useParams } from 'react-router-dom'
import { EventHero } from '@/widgets/event-hero'
import { FightCard } from '@/widgets/fight-card'
import { eventTitle, fetchEvent } from '@/entities/event'
import { getErrorMessage, isNotFound } from '@/shared/api'
import { useRequest } from '@/shared/lib'
import { ErrorState, NotFound, SectionHeading } from '@/shared/ui'

export function EventDetailsPage() {
  const { slug = '' } = useParams()
  const { data: event, error, isLoading, retry } = useRequest(`event:${slug}`, () => fetchEvent(slug))

  useDocumentTitle(event ? `${eventTitle(event)} — VFL` : 'Event — VFL')

  if (isNotFound(error)) return <NotFound title="Not found." description="We couldn't find that event." />

  if (error) {
    return (
      <Container size="xl" pt={140}>
        <ErrorState message={getErrorMessage(error)} onRetry={retry} />
      </Container>
    )
  }

  if (isLoading || !event) {
    return (
      <Container size="xl" pt={140}>
        <Stack gap="md">
          <Skeleton h={90} w="60%" radius={0} />
          <Skeleton h={200} radius={0} />
          <Skeleton h={160} radius={0} />
        </Stack>
      </Container>
    )
  }

  return (
    <>
      <EventHero event={event} />
      <Container size="xl" mt={80}>
        <Stack gap={40}>
          <SectionHeading kicker="Fight Card" title="The Bouts" />
          <FightCard event={event} />
        </Stack>
      </Container>
    </>
  )
}
