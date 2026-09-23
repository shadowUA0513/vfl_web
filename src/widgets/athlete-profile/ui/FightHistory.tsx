import { Skeleton, Stack } from '@mantine/core'
import { Link } from 'react-router-dom'
import { fetchFightHistory, type FightHistoryItem } from '@/entities/athlete'
import { methodLabel } from '@/entities/event'
import { getErrorMessage } from '@/shared/api'
import { routes } from '@/shared/config'
import { formatDate, joinParts, titleCase, useRequest } from '@/shared/lib'
import { Empty, ErrorState, IconCalendar, SectionHeading } from '@/shared/ui'
import classes from './FightHistory.module.css'

const RESULT_LETTER: Record<string, string> = { win: 'W', loss: 'L', draw: 'D', no_contest: 'NC' }

function method(item: FightHistoryItem) {
  return joinParts(methodLabel(item.method), item.method_detail ? titleCase(item.method_detail) : null) || '—'
}

export function FightHistory({ slug }: { slug: string }) {
  const { data, error, isLoading, retry } = useRequest(`athlete:${slug}:history`, () => fetchFightHistory(slug))

  return (
    <Stack gap={36}>
      <SectionHeading kicker="Career" title="Fight History" />

      {error ? (
        <ErrorState message={getErrorMessage(error)} onRetry={retry} />
      ) : isLoading || !data ? (
        <Stack gap="xs">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} h={64} radius={0} />
          ))}
        </Stack>
      ) : data.length === 0 ? (
        <Empty icon={<IconCalendar size={26} />} title="No recorded fights yet" description="This athlete's professional bouts will appear here." />
      ) : (
        <div className={classes.table} role="table" aria-label="Fight history">
          <div className={classes.head} role="row">
            <span>Result</span>
            <span>Opponent</span>
            <span>Event</span>
            <span>Method</span>
            <span>Round</span>
            <span>Time</span>
            <span>Date</span>
          </div>
          {data.map((item, index) => (
            <div key={item.bout_id ?? `${item.fought_at}-${index}`} className={classes.row} role="row">
              <span className={classes.result} data-result={item.result}>
                {RESULT_LETTER[item.result] ?? '—'}
              </span>
              {item.opponent_id ? (
                <Link to={routes.athlete(item.opponent_id)} className={classes.opponent}>
                  {titleCase(item.opponent_name)}
                </Link>
              ) : (
                <span className={classes.opponent}>{titleCase(item.opponent_name)}</span>
              )}
              <span className={classes.cell}>
                {item.event_id ? <Link to={routes.event(item.event_id)}>{titleCase(item.event_name)}</Link> : titleCase(item.event_name) || '—'}
              </span>
              <span className={classes.cell}>{method(item)}</span>
              <span className={classes.cell}>{item.round || '—'}</span>
              <span className={classes.cell}>{item.end_time || '—'}</span>
              <span className={classes.cell}>{formatDate(item.fought_at)}</span>
              <span className={classes.mobileMeta}>
                {joinParts(method(item), item.round ? `R${item.round}` : null, titleCase(item.event_name), formatDate(item.fought_at))}
              </span>
            </div>
          ))}
        </div>
      )}
    </Stack>
  )
}
