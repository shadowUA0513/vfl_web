import { Text } from '@mantine/core'
import { IconCaretDown, IconCaretUp } from '@/shared/ui'
import type { RankingEntry } from '../model/types'

export function RankMovement({ entry }: { entry: RankingEntry }) {
  const up = entry.direction === 'up' || entry.change > 0
  const down = entry.direction === 'down' || entry.change < 0

  if (entry.direction === 'new' || (!entry.previous_rank && !up && !down)) {
    return (
      <Text span size="xs" fw={800} c="yellow.5" style={{ letterSpacing: '0.1em' }}>
        NEW
      </Text>
    )
  }
  if (up || down) {
    return (
      <Text span size="sm" fw={700} c={up ? 'teal.4' : 'vfl.4'} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        {up ? <IconCaretUp /> : <IconCaretDown />}
        {Math.abs(entry.change)}
      </Text>
    )
  }
  return (
    <Text span size="sm" c="dimmed">
      —
    </Text>
  )
}
