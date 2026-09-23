import { Button, SimpleGrid, Stack, Text } from '@mantine/core'
import { Link } from 'react-router-dom'
import { AthletePhoto } from '@/entities/athlete'
import { championLabel, fetchRankings, rankedName, rankingTitle, sortRankings } from '@/entities/ranking'
import { routes } from '@/shared/config'
import { useRequest } from '@/shared/lib'
import { IconArrowRight, IconTrophy, SectionHeading } from '@/shared/ui'
import classes from './RankingsBoard.module.css'

/** Home-page block listing current champions; hidden until rankings exist. */
export function ChampionsStrip() {
  const { data } = useRequest('rankings:all', fetchRankings)
  const withChamps = sortRankings(data ?? []).filter((r) => r.champion)

  if (withChamps.length === 0) return null

  return (
    <Stack gap={36}>
      <SectionHeading
        kicker="Rankings"
        title="Reigning Champions"
        action={
          <Button component={Link} to={routes.rankings} variant="subtle" color="gray" radius={0} rightSection={<IconArrowRight size={16} />}>
            Full rankings
          </Button>
        }
      />
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
        {withChamps.slice(0, 6).map((ranking) => (
          <Link key={ranking.division_id} to={routes.athlete(ranking.champion!.slug)} className={classes.champion} style={{ minHeight: 220 }}>
            <div className={classes.championBody}>
              <span className={classes.championLabel}>
                <IconTrophy size={14} /> {rankingTitle(ranking)}
              </span>
              <span className={classes.championName} style={{ fontSize: 40 }}>
                {rankedName(ranking.champion)}
              </span>
              <Text size="sm" c="dark.1">
                {championLabel(ranking)} · {ranking.champion!.record}
              </Text>
            </div>
            <AthletePhoto src={ranking.champion!.photo_url} alt={rankedName(ranking.champion)} className={classes.championPhoto} style={{ width: 150, height: 220 }} />
          </Link>
        ))}
      </SimpleGrid>
    </Stack>
  )
}
