import { Button, Center, Pagination, Skeleton, Stack } from '@mantine/core'
import { EventCard, fetchEvents } from '@/entities/event'
import { EventsFilterBar, useEventsFilter } from '@/features/filter-events'
import { getErrorMessage } from '@/shared/api'
import { useRequest } from '@/shared/lib'
import { Empty, ErrorState, IconCalendar } from '@/shared/ui'

const PAGE_SIZE = 8

export function EventsList() {
  const { scope, search, page, setPage, setScope } = useEventsFilter()
  const { data, error, isLoading, retry } = useRequest(`events:${scope}:${search}:${page}`, () =>
    fetchEvents({ scope, search: search || undefined, page, limit: PAGE_SIZE }),
  )

  return (
    <Stack gap="xl">
      <EventsFilterBar />

      {error ? (
        <ErrorState message={getErrorMessage(error)} onRetry={retry} />
      ) : isLoading || !data ? (
        <Stack gap="md">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} h={150} radius={0} />
          ))}
        </Stack>
      ) : data.data.length === 0 ? (
        <Empty
          icon={<IconCalendar size={26} />}
          title={search ? 'No events match your search' : scope === 'upcoming' ? 'No upcoming events announced yet' : 'No events yet'}
          description={scope === 'upcoming' && !search ? 'The next VFL fight night will be announced soon. Catch up on past results in the meantime.' : undefined}
        >
          {scope === 'upcoming' && (
            <Button variant="light" radius={0} onClick={() => setScope('past')}>
              See past events
            </Button>
          )}
        </Empty>
      ) : (
        <Stack gap="md">
          {data.data.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </Stack>
      )}

      {data && data.meta.total_pages > 1 && (
        <Center>
          <Pagination
            total={data.meta.total_pages}
            value={page}
            onChange={(next) => {
              setPage(next)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            radius={0}
            color="vfl"
          />
        </Center>
      )}
    </Stack>
  )
}
