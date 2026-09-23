import { Container, Skeleton, Stack } from '@mantine/core'
import { useDocumentTitle } from '@mantine/hooks'
import { useParams } from 'react-router-dom'
import { AthleteHero, AthleteStats, FightHistory } from '@/widgets/athlete-profile'
import { athleteName, fetchAthlete } from '@/entities/athlete'
import { getErrorMessage, isNotFound } from '@/shared/api'
import { useRequest } from '@/shared/lib'
import { ErrorState, NotFound } from '@/shared/ui'

export function AthleteDetailsPage() {
  const { slug = '' } = useParams()
  const { data: athlete, error, isLoading, retry } = useRequest(`athlete:${slug}`, () => fetchAthlete(slug))

  useDocumentTitle(athlete ? `${athleteName(athlete)} — VFL` : 'Athlete — VFL')

  if (isNotFound(error)) return <NotFound title="Not found." description="We couldn't find that athlete." />

  if (error) {
    return (
      <Container size="xl" pt={140}>
        <ErrorState message={getErrorMessage(error)} onRetry={retry} />
      </Container>
    )
  }

  if (isLoading || !athlete) {
    return (
      <Container size="xl" pt={140}>
        <Stack gap="md">
          <Skeleton h={120} w="50%" radius={0} />
          <Skeleton h={420} radius={0} />
        </Stack>
      </Container>
    )
  }

  return (
    <>
      <AthleteHero athlete={athlete} />
      <Container size="xl" mt={80}>
        <Stack gap={100}>
          <AthleteStats athlete={athlete} />
          <FightHistory slug={athlete.slug} />
        </Stack>
      </Container>
    </>
  )
}
