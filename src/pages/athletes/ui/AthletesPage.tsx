import { Container } from '@mantine/core'
import { useDocumentTitle } from '@mantine/hooks'
import { AthletesGrid } from '@/widgets/athletes-grid'
import { PageHeader } from '@/shared/ui'

export function AthletesPage() {
  useDocumentTitle('Athletes — VFL')

  return (
    <>
      <PageHeader
        kicker="The Roster"
        title="Athletes"
        ghost="ROSTER"
        description="The fighters of the Vault Fighting League — records, stats and fight history."
      />
      <Container size="xl" mt={48}>
        <AthletesGrid />
      </Container>
    </>
  )
}
