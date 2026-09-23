import { Button, SimpleGrid, Skeleton, Stack } from '@mantine/core'
import { Link } from 'react-router-dom'
import { AthleteCard, fetchAthletes } from '@/entities/athlete'
import { routes } from '@/shared/config'
import { useRequest } from '@/shared/lib'
import { IconArrowRight, SectionHeading } from '@/shared/ui'

export function RosterPreview() {
  const { data, error } = useRequest('athletes:roster-preview', () => fetchAthletes({ status: 'active', limit: 8 }))

  if (error || data?.data.length === 0) return null

  return (
    <Stack gap={36}>
      <SectionHeading
        kicker="The Roster"
        title="Meet the Fighters"
        description="The athletes building their legacy inside the VFL cage."
        action={
          <Button component={Link} to={routes.athletes} variant="subtle" color="gray" radius={0} rightSection={<IconArrowRight size={16} />}>
            Full roster
          </Button>
        }
      />
      <SimpleGrid cols={{ base: 2, sm: 3, lg: 4 }} spacing="md">
        {data
          ? data.data.map((athlete) => <AthleteCard key={athlete.id} athlete={athlete} />)
          : Array.from({ length: 4 }, (_, i) => <Skeleton key={i} radius={0} style={{ aspectRatio: '3 / 4' }} />)}
      </SimpleGrid>
    </Stack>
  )
}
