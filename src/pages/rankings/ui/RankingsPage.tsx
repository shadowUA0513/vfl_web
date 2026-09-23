import { Container } from '@mantine/core'
import { useDocumentTitle } from '@mantine/hooks'
import { RankingsBoard } from '@/widgets/rankings-board'
import { PageHeader } from '@/shared/ui'

export function RankingsPage() {
  useDocumentTitle('Rankings — VFL')

  return (
    <>
      <PageHeader
        kicker="Official"
        title="Rankings"
        ghost="RANKED"
        description="Champions and top contenders in every VFL division, updated after each fight night."
      />
      <Container size="xl" mt={48}>
        <RankingsBoard />
      </Container>
    </>
  )
}
