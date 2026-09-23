import { Container } from '@mantine/core'
import { useDocumentTitle } from '@mantine/hooks'
import { EventsList } from '@/widgets/events-list'
import { PageHeader } from '@/shared/ui'

export function EventsPage() {
  useDocumentTitle('Events — VFL')

  return (
    <>
      <PageHeader
        kicker="Fight Nights"
        title="Events"
        ghost="EVENTS"
        description="Every VFL fight night — upcoming cards, full results and where to watch."
      />
      <Container size="xl" mt={48}>
        <EventsList />
      </Container>
    </>
  )
}
