import { Group } from '@mantine/core'
import { Link } from 'react-router-dom'
import { athleteLastName, athleteName, athletePhoto, AthletePhoto } from '@/entities/athlete/@x/event'
import { routes } from '@/shared/config'
import { dateParts, formatTime, titleCase } from '@/shared/lib'
import { IconArrowRight, IconClock, IconPin } from '@/shared/ui'
import { eventCity, eventTitle, getMainBout } from '../lib/event-helpers'
import type { VflEvent } from '../model/types'
import classes from './EventCard.module.css'
import { EventStatusBadge } from './EventStatusBadge'

export function EventCard({ event }: { event: VflEvent }) {
  const parts = dateParts(event.starts_at)
  const main = getMainBout(event)
  const location = [titleCase(event.venue_name), eventCity(event)].filter(Boolean).join(', ')
  const headline = main ? `${athleteLastName(main.red_corner)} vs ${athleteLastName(main.blue_corner)}` : event.subtitle

  return (
    <Link to={routes.event(event.slug)} className={`${classes.card} ${event.status === 'cancelled' ? classes.cancelled : ''}`}>
      <div className={classes.date}>
        {parts ? (
          <>
            <span className={classes.weekday}>{parts.weekday}</span>
            <span className={classes.day}>{parts.day}</span>
            <span className={classes.month}>
              {parts.month} {parts.year}
            </span>
          </>
        ) : (
          <span className={classes.day}>TBA</span>
        )}
      </div>

      <div className={classes.body}>
        <Group gap={8}>
          <EventStatusBadge event={event} />
        </Group>
        <div className={classes.name}>{eventTitle(event)}</div>
        {headline && <div className={classes.subtitle}>{headline}</div>}
        <div className={classes.info}>
          <span>
            <IconClock size={14} /> {formatTime(event.main_card_at || event.starts_at)}
          </span>
          {location && (
            <span>
              <IconPin size={14} /> {location}
            </span>
          )}
        </div>
      </div>

      <div className={classes.faceoff}>
        {main && (
          <>
            <AthletePhoto src={athletePhoto(main.red_corner, 'thumb')} alt={athleteName(main.red_corner)} className={classes.fighter} />
            <AthletePhoto src={athletePhoto(main.blue_corner, 'thumb')} alt={athleteName(main.blue_corner)} className={classes.fighter} />
            <span className={classes.vs}>VS</span>
          </>
        )}
        <span className={classes.arrow}>
          <IconArrowRight size={18} />
        </span>
      </div>
    </Link>
  )
}
