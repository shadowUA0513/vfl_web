import { Button, Skeleton, Stack } from '@mantine/core'
import { Link } from 'react-router-dom'
import { EventCard, fetchEvents } from '@/entities/event'
import { routes } from '@/shared/config'
import { useRequest } from '@/shared/lib'
import { IconArrowRight, SectionHeading } from '@/shared/ui'

/** Home-page block: upcoming events, falling back to the latest results. */
export function EventsPreview() {
  const upcoming = useRequest('events:upcoming::1:preview', () => fetchEvents({ scope: 'upcoming', limit: 3 }))
  const none = upcoming.data?.data.length === 0
  const past = useRequest(none ? 'events:past::1:preview' : null, () => fetchEvents({ scope: 'past', limit: 3 }))
  const events = none ? past.data?.data : upcoming.data?.data

  if (upcoming.error || (none && past.data?.data.length === 0)) return null

  return (
    <Stack gap={36}>
      <SectionHeading
        kicker={none ? 'Results' : 'Schedule'}
        title={none ? 'Recent Events' : 'Upcoming Events'}
        action={
          <Button component={Link} to={routes.events} variant="subtle" color="gray" radius={0} rightSection={<IconArrowRight size={16} />}>
            All events
          </Button>
        }
      />
      <Stack gap="md">
        {events
          ? events.map((event) => <EventCard key={event.id} event={event} />)
          : Array.from({ length: 2 }, (_, i) => <Skeleton key={i} h={150} radius={0} />)}
      </Stack>
    </Stack>
  )
}
