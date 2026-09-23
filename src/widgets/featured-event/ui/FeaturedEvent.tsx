import { Button, Container, Group, Text } from '@mantine/core'
import { Link } from 'react-router-dom'
import { athleteLastName, athleteName, athletePhoto, athleteRecord, AthletePhoto } from '@/entities/athlete'
import { eventLocation, eventStart, eventTitle, fetchEvents, getMainBout, isUpcoming, type VflEvent } from '@/entities/event'
import { routes } from '@/shared/config'
import { formatDate, formatTime, useRequest } from '@/shared/lib'
import { Countdown, IconArrowRight, IconCalendar, IconClock, IconPin, IconTicket } from '@/shared/ui'
import classes from './FeaturedEvent.module.css'

function useFeaturedEvent() {
  const upcoming = useRequest('events:upcoming:featured', () => fetchEvents({ scope: 'upcoming', limit: 1 }))
  const noUpcoming = upcoming.data?.data.length === 0 || Boolean(upcoming.error)
  const past = useRequest(noUpcoming ? 'events:past:featured' : null, () => fetchEvents({ scope: 'past', limit: 1 }))

  return {
    event: upcoming.data?.data[0] ?? past.data?.data[0],
    isLoading: upcoming.isLoading || past.isLoading,
  }
}

export function FeaturedEvent() {
  const { event, isLoading } = useFeaturedEvent()

  if (!event) return <BrandHero loading={isLoading} />
  return <EventHero event={event} />
}

function EventHero({ event }: { event: VflEvent }) {
  const main = getMainBout(event)
  const upcoming = isUpcoming(event)
  const start = eventStart(event)
  const red = main?.red_corner
  const blue = main?.blue_corner

  return (
    <section className={classes.hero}>
      {event.banner_url && <div className={classes.banner} style={{ backgroundImage: `url(${event.banner_url})` }} />}
      <div className={classes.glow} />
      <div className={classes.grid} />
      <div className={classes.ghost} aria-hidden>
        {eventTitle(event).toUpperCase()}
      </div>

      {main && (
        <>
          <AthletePhoto eager src={athletePhoto(red, 'large')} alt={athleteName(red)} className={`${classes.fighter} ${classes.red}`} />
          <AthletePhoto eager src={athletePhoto(blue, 'large')} alt={athleteName(blue)} className={`${classes.fighter} ${classes.blue}`} />
          <div className={`${classes.corner} ${classes.cornerRed}`}>
            <span className={classes.cornerLabel}>Red corner</span>
            <span className={classes.cornerName}>{athleteName(red)}</span>
            <span className={classes.cornerRecord}>{athleteRecord(red)}</span>
          </div>
          <div className={`${classes.corner} ${classes.cornerBlue}`}>
            <span className={classes.cornerLabel}>Blue corner</span>
            <span className={classes.cornerName}>{athleteName(blue)}</span>
            <span className={classes.cornerRecord}>{athleteRecord(blue)}</span>
          </div>
        </>
      )}

      <Container size="xl" className={classes.content}>
        <div className={classes.center}>
          <span className={classes.kicker}>{upcoming ? 'Next Event' : event.status === 'cancelled' ? 'Cancelled' : 'Latest Event'}</span>
          <h1 className={classes.title}>{eventTitle(event)}</h1>
          {main && (
            <div className={classes.matchup}>
              <span className={classes.redName}>{athleteLastName(red)}</span>
              <span className={classes.vs}>VS</span>
              <span className={classes.blueName}>{athleteLastName(blue)}</span>
            </div>
          )}
          <div className={classes.meta}>
            <span>
              <IconCalendar size={16} /> {formatDate(event.starts_at)}
            </span>
            <span>
              <IconClock size={16} /> Main card {formatTime(event.main_card_at || event.starts_at)}
            </span>
            {eventLocation(event) && (
              <span>
                <IconPin size={16} /> {eventLocation(event)}
              </span>
            )}
          </div>
          {upcoming && start && <Countdown target={start} />}
          <Group gap="sm" justify="center" mt={6}>
            {upcoming && event.ticket_url && (
              <Button component="a" href={event.ticket_url} target="_blank" rel="noreferrer" size="lg" radius={0} leftSection={<IconTicket size={18} />}>
                Get Tickets
              </Button>
            )}
            <Button
              component={Link}
              to={routes.event(event.slug)}
              size="lg"
              radius={0}
              variant={upcoming && event.ticket_url ? 'white' : 'filled'}
              color={upcoming && event.ticket_url ? 'dark' : 'vfl'}
              rightSection={<IconArrowRight size={18} />}
            >
              {upcoming ? 'View Fight Card' : 'See Results'}
            </Button>
          </Group>
        </div>
      </Container>
    </section>
  )
}

function BrandHero({ loading }: { loading: boolean }) {
  return (
    <section className={classes.hero}>
      <div className={classes.glow} />
      <div className={classes.grid} />
      <div className={classes.ghost} aria-hidden>
        VAULT
      </div>
      <Container size="xl" className={classes.content} style={{ paddingTop: 0 }}>
        <div className={classes.center} style={{ opacity: loading ? 0.6 : 1 }}>
          <span className={classes.kicker}>Vault Fighting League · Dubai</span>
          <h1 className={classes.brand}>
            One Night.
            <br />
            <em>One Legacy.</em>
          </h1>
          <Text size="lg" c="dark.0" maw={560}>
            Elite professional MMA and unforgettable production — born in Dubai, built for the world.
          </Text>
          <Group gap="sm" justify="center">
            <Button component={Link} to={routes.events} size="lg" radius={0} rightSection={<IconArrowRight size={18} />}>
              Explore Events
            </Button>
            <Button component={Link} to={routes.athletes} size="lg" radius={0} variant="white" color="dark">
              Meet the Roster
            </Button>
          </Group>
        </div>
      </Container>
    </section>
  )
}
