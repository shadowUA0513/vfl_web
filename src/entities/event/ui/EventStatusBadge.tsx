import { Badge } from '@mantine/core'
import { isUpcoming } from '../lib/event-helpers'
import type { VflEvent } from '../model/types'

export function EventStatusBadge({ event }: { event: VflEvent }) {
  if (event.status === 'cancelled') {
    return (
      <Badge color="gray" variant="light" radius={0}>
        Cancelled
      </Badge>
    )
  }
  if (isUpcoming(event)) {
    return (
      <Badge color="vfl" variant="filled" radius={0}>
        Upcoming
      </Badge>
    )
  }
  return (
    <Badge color="dark.3" variant="outline" radius={0}>
      Results
    </Badge>
  )
}
