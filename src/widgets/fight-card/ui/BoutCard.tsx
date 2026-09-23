import { Badge } from '@mantine/core'
import { Link } from 'react-router-dom'
import { athleteName, athleteNickname, athletePhoto, athleteRecord, AthletePhoto, type Athlete } from '@/entities/athlete'
import { boutResultLine, boutWeightLabel, hasResult, type Bout } from '@/entities/event'
import { routes } from '@/shared/config'
import classes from './BoutCard.module.css'

type CornerState = 'winner' | 'loser' | 'neutral'

function Corner({ athlete, side, state }: { athlete?: Athlete | null; side: 'red' | 'blue'; state: CornerState }) {
  const nickname = athleteNickname(athlete)

  return (
    <div
      className={`${classes.corner} ${side === 'blue' ? classes.blue : ''}`}
      data-winner={state === 'winner' || undefined}
      data-loser={state === 'loser' || undefined}
    >
      <AthletePhoto src={athletePhoto(athlete, 'thumb')} alt={athleteName(athlete)} className={classes.photo} />
      <div className={classes.info}>
        {nickname && <span className={classes.nickname}>“{nickname}”</span>}
        {athlete ? (
          <Link to={routes.athlete(athlete.slug)} className={classes.name}>
            {athleteName(athlete)}
          </Link>
        ) : (
          <span className={classes.name}>TBA</span>
        )}
        {athlete && <span className={classes.record}>{athleteRecord(athlete)}</span>}
        {state === 'winner' && <span className={classes.win}>WIN</span>}
      </div>
    </div>
  )
}

export function BoutCard({ bout, featured = false }: { bout: Bout; featured?: boolean }) {
  const decided = hasResult(bout) && bout.outcome === 'win' && bout.winner_id
  const stateOf = (id: string): CornerState => (decided ? (bout.winner_id === id ? 'winner' : 'loser') : 'neutral')
  const weight = boutWeightLabel(bout)

  return (
    <article className={`${classes.bout} ${featured ? classes.main : ''}`}>
      <Corner athlete={bout.red_corner} side="red" state={stateOf(bout.red_corner_id)} />

      <div className={classes.center}>
        <div className={classes.tags}>
          {bout.is_main_event && (
            <Badge size="xs" radius={0} color="vfl">
              Main Event
            </Badge>
          )}
          {bout.is_title_fight && (
            <Badge size="xs" radius={0} color="yellow" variant="filled" c="dark.9">
              Title Fight
            </Badge>
          )}
        </div>
        <span className={classes.vs}>VS</span>
        {weight && <span className={classes.weight}>{weight}</span>}
        {hasResult(bout) ? (
          <span className={classes.result}>{boutResultLine(bout)}</span>
        ) : (
          bout.scheduled_rounds > 0 && <span className={classes.weight}>{bout.scheduled_rounds} Rounds</span>
        )}
      </div>

      <Corner athlete={bout.blue_corner} side="blue" state={stateOf(bout.blue_corner_id)} />
    </article>
  )
}
