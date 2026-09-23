import { Badge } from '@mantine/core'
import { Link } from 'react-router-dom'
import { divisionName } from '@/entities/division/@x/athlete'
import { routes } from '@/shared/config'
import { athleteFirstName, athleteLastName, athleteName, athleteNickname, athletePhoto, athleteRecord } from '../lib/athlete-format'
import type { Athlete } from '../model/types'
import classes from './AthleteCard.module.css'
import { AthletePhoto } from './AthletePhoto'

export function AthleteCard({ athlete }: { athlete: Athlete }) {
  const nickname = athleteNickname(athlete)
  const lastName = athleteLastName(athlete)

  return (
    <Link to={routes.athlete(athlete.slug)} className={classes.card} aria-label={athleteName(athlete)}>
      <div className={classes.ghost} aria-hidden>
        {lastName.toUpperCase()}
      </div>
      <AthletePhoto src={athletePhoto(athlete)} alt={athleteName(athlete)} className={classes.photo} />
      {athlete.status !== 'active' && (
        <Badge className={classes.status} color="gray" variant="filled" radius={0}>
          {athlete.status}
        </Badge>
      )}
      <div className={classes.body}>
        {nickname && <div className={classes.nickname}>“{nickname}”</div>}
        <div className={classes.first}>{athleteFirstName(athlete)}</div>
        <div className={classes.last}>{lastName}</div>
        <div className={classes.meta}>
          <span>{divisionName(athlete.division) || 'Unassigned'}</span>
          <span className={classes.record}>{athleteRecord(athlete)}</span>
        </div>
      </div>
      <span className={classes.accent} />
    </Link>
  )
}
