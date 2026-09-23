import { Group, Stack, Text, Title } from '@mantine/core'
import { formatTime } from '@/shared/lib'
import { Empty, IconUsers } from '@/shared/ui'
import { getMainBout, groupBouts, segmentLabel, type VflEvent } from '@/entities/event'
import { BoutCard } from './BoutCard'

const SEGMENT_TIME: Record<string, keyof VflEvent> = {
  main_card: 'main_card_at',
  prelims: 'prelims_at',
  early_prelims: 'early_prelims_at',
}

export function FightCard({ event }: { event: VflEvent }) {
  const groups = groupBouts(event.bouts)
  const main = getMainBout(event)

  if (groups.length === 0) {
    return <Empty icon={<IconUsers size={26} />} title="Fight card coming soon" description="Bouts for this event will be announced shortly." />
  }

  return (
    <Stack gap={56}>
      {groups.map(({ segment, bouts }) => {
        const timeKey = SEGMENT_TIME[segment]
        const time = timeKey ? (event[timeKey] as string) : ''
        return (
          <section key={segment}>
            <Group justify="space-between" align="flex-end" mb="md" pb="sm" style={{ borderBottom: '1px solid var(--vfl-line)' }}>
              <Title order={3} fz={{ base: 34, sm: 44 }} lh={1}>
                {segmentLabel(segment)}
              </Title>
              <Text size="sm" c="dimmed" fw={600} tt="uppercase" style={{ letterSpacing: '0.12em' }}>
                {bouts.length} {bouts.length === 1 ? 'bout' : 'bouts'}
                {time && formatTime(time) !== 'TBA' ? ` · ${formatTime(time)}` : ''}
              </Text>
            </Group>
            <Stack gap="sm">
              {bouts.map((bout) => (
                <BoutCard key={bout.id} bout={bout} featured={bout.id === main?.id} />
              ))}
            </Stack>
          </section>
        )
      })}
    </Stack>
  )
}
