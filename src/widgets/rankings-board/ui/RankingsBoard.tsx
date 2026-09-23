import { Button, Skeleton, Stack, Text } from '@mantine/core'
import { Link } from 'react-router-dom'
import { AthletePhoto } from '@/entities/athlete'
import {
  championLabel,
  fetchRankings,
  rankedName,
  rankedNickname,
  rankingTitle,
  RankMovement,
  sortRankings,
  type DivisionRanking,
} from '@/entities/ranking'
import { DivisionPicker, useRankingDivision } from '@/features/select-ranking-division'
import { getErrorMessage } from '@/shared/api'
import { routes } from '@/shared/config'
import { formatDate, useRequest } from '@/shared/lib'
import { Empty, ErrorState, IconTrophy } from '@/shared/ui'
import classes from './RankingsBoard.module.css'

export function RankingsBoard() {
  const { data, error, isLoading, retry } = useRequest('rankings:all', fetchRankings)
  const { divisionId, setDivisionId } = useRankingDivision()

  if (error) return <ErrorState message={getErrorMessage(error)} onRetry={retry} />

  if (isLoading || !data) {
    return (
      <div className={classes.layout}>
        <Skeleton h={360} radius={0} />
        <Stack gap="sm">
          <Skeleton h={300} radius={0} />
          <Skeleton h={80} radius={0} />
          <Skeleton h={80} radius={0} />
        </Stack>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <Empty
        icon={<IconTrophy size={26} />}
        title="Official rankings are on the way"
        description="VFL divisional and pound-for-pound rankings will be published here once the first rankings panel is complete."
      >
        <Button component={Link} to={routes.athletes} variant="light" radius={0}>
          Browse the roster
        </Button>
      </Empty>
    )
  }

  const rankings = sortRankings(data)
  const active = rankings.find((r) => r.division_id === divisionId) ?? rankings[0]

  return (
    <div className={classes.layout}>
      <aside className={classes.aside}>
        <DivisionPicker rankings={rankings} value={active.division_id} onChange={setDivisionId} />
      </aside>
      <DivisionBoard ranking={active} />
    </div>
  )
}

function DivisionBoard({ ranking }: { ranking: DivisionRanking }) {
  const entries = [...(ranking.entries ?? [])].sort((a, b) => a.rank - b.rank)
  const champ = ranking.champion

  return (
    <section aria-label={rankingTitle(ranking)}>
      <Text size="sm" c="dimmed" mb="sm" fw={600} tt="uppercase" style={{ letterSpacing: '0.14em' }}>
        {rankingTitle(ranking)}
        {ranking.published_at && ` · Updated ${formatDate(ranking.published_at)}`}
      </Text>

      {champ ? (
        <Link to={routes.athlete(champ.slug)} className={classes.champion}>
          <div className={classes.championGhost} aria-hidden>
            C
          </div>
          <div className={classes.championBody}>
            <span className={classes.championLabel}>
              <IconTrophy size={16} /> {championLabel(ranking)}
            </span>
            <span className={classes.championName}>{rankedName(champ)}</span>
            {rankedNickname(champ) && (
              <Text fs="italic" c="dark.1">
                “{rankedNickname(champ)}”
              </Text>
            )}
            <Text ff="heading" fz={28} c="dark.0">
              {champ.record}
            </Text>
          </div>
          <AthletePhoto src={champ.photo_url} alt={rankedName(champ)} className={classes.championPhoto} />
        </Link>
      ) : (
        <div className={classes.champion} style={{ minHeight: 140 }}>
          <div className={classes.championBody}>
            <span className={classes.championLabel}>
              <IconTrophy size={16} /> {championLabel(ranking)}
            </span>
            <span className={classes.championName}>Vacant</span>
          </div>
        </div>
      )}

      {entries.length > 0 ? (
        <div className={classes.rows}>
          {entries.map((entry) => (
            <Link key={entry.athlete.id} to={routes.athlete(entry.athlete.slug)} className={classes.row}>
              <span className={classes.rank}>{entry.rank}</span>
              <RankMovement entry={entry} />
              <AthletePhoto src={entry.athlete.photo_url} alt={rankedName(entry.athlete)} className={classes.avatar} />
              <div className={classes.who}>
                <div className={classes.name}>{rankedName(entry.athlete)}</div>
                {rankedNickname(entry.athlete) && (
                  <Text size="xs" c="dimmed" fs="italic" truncate>
                    “{rankedNickname(entry.athlete)}”
                  </Text>
                )}
              </div>
              <span className={classes.recordCol}>{entry.athlete.record}</span>
            </Link>
          ))}
        </div>
      ) : (
        <Text c="dimmed" mt="lg">
          No contenders ranked in this division yet.
        </Text>
      )}
    </section>
  )
}
