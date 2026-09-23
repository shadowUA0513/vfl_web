import { Button, Center, Pagination, SimpleGrid, Skeleton, Stack, Text } from '@mantine/core'
import { AthleteCard, fetchAthletes } from '@/entities/athlete'
import { AthletesFilterBar, useAthletesFilter } from '@/features/filter-athletes'
import { getErrorMessage } from '@/shared/api'
import { useRequest } from '@/shared/lib'
import { Empty, ErrorState, IconUsers } from '@/shared/ui'

const PAGE_SIZE = 12
const COLS = { base: 2, sm: 3, lg: 4 }

export function AthletesGrid() {
  const { search, divisionId, status, page, setPage, reset } = useAthletesFilter()
  const { data, error, isLoading, retry } = useRequest(`athletes:${search}:${divisionId}:${status}:${page}`, () =>
    fetchAthletes({
      search: search || undefined,
      division_id: divisionId ?? undefined,
      status: status === 'all' ? undefined : status,
      page,
      limit: PAGE_SIZE,
    }),
  )

  return (
    <Stack gap="xl">
      <AthletesFilterBar />

      {data && data.meta.total > 0 && (
        <Text size="sm" c="dimmed" fw={600} tt="uppercase" style={{ letterSpacing: '0.14em' }}>
          {data.meta.total} {data.meta.total === 1 ? 'athlete' : 'athletes'}
        </Text>
      )}

      {error ? (
        <ErrorState message={getErrorMessage(error)} onRetry={retry} />
      ) : isLoading || !data ? (
        <SimpleGrid cols={COLS} spacing="md">
          {Array.from({ length: 8 }, (_, i) => (
            <Skeleton key={i} radius={0} style={{ aspectRatio: '3 / 4' }} />
          ))}
        </SimpleGrid>
      ) : data.data.length === 0 ? (
        <Empty icon={<IconUsers size={26} />} title="No athletes found" description="Try a different name, division or status.">
          <Button variant="light" radius={0} onClick={reset}>
            Clear filters
          </Button>
        </Empty>
      ) : (
        <SimpleGrid cols={COLS} spacing="md">
          {data.data.map((athlete) => (
            <AthleteCard key={athlete.id} athlete={athlete} />
          ))}
        </SimpleGrid>
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
