import { Button, Container, Group, Stack } from '@mantine/core'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { athleteName, athletePhoto, AthletePhoto } from '@/entities/athlete'
import { eventLocation, eventStart, EventStatusBadge, eventTitle, getMainBout, isUpcoming, type VflEvent } from '@/entities/event'
import { routes } from '@/shared/config'
import { formatDate, formatTime, parseDate, titleCase } from '@/shared/lib'
import { Countdown, IconArrowLeft, IconCalendar, IconClock, IconPin, IconTicket, IconTv } from '@/shared/ui'
import classes from './EventHero.module.css'

function Fact({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className={classes.fact}>
      {icon}
      <div>
        <div className={classes.factLabel}>{label}</div>
        <div className={classes.factValue}>{value}</div>
      </div>
    </div>
  )
}

export function EventHero({ event }: { event: VflEvent }) {
  const upcoming = isUpcoming(event)
  const start = eventStart(event)
  const main = getMainBout(event)
  const background = event.banner_url || event.poster_url

  const schedule = [
    { label: 'Early prelims', at: event.early_prelims_at },
    { label: 'Prelims', at: event.prelims_at },
    { label: 'Main card', at: event.main_card_at },
  ].filter((s) => parseDate(s.at))

  return (
    <section className={classes.hero}>
      {background && <div className={classes.bg} style={{ backgroundImage: `url(${background})` }} />}
      <div className={classes.glow} />
      <div className={classes.ghost} aria-hidden>
        {eventTitle(event).toUpperCase()}
      </div>

      <Container size="xl">
        <div className={classes.grid}>
          <Stack gap="lg">
            <Link to={routes.events} className={classes.back}>
              <IconArrowLeft size={14} /> All events
            </Link>
            <Group gap={8}>
              <EventStatusBadge event={event} />
            </Group>
            <h1 className={classes.title}>{eventTitle(event)}</h1>
            {event.subtitle && <div className={classes.subtitle}>{titleCase(event.subtitle)}</div>}

            <div className={classes.facts}>
              <Fact icon={<IconCalendar />} label="Date" value={formatDate(event.starts_at)} />
              {eventLocation(event) && <Fact icon={<IconPin />} label="Venue" value={eventLocation(event)} />}
              {schedule.map((s) => (
                <Fact key={s.label} icon={<IconClock />} label={s.label} value={formatTime(s.at)} />
              ))}
              {event.broadcast_platform && <Fact icon={<IconTv />} label="Watch" value={event.broadcast_platform} />}
            </div>

            {upcoming && start && <Countdown target={start} />}

            {upcoming && event.ticket_url && (
              <Group>
                <Button component="a" href={event.ticket_url} target="_blank" rel="noreferrer" size="lg" radius={0} leftSection={<IconTicket size={18} />}>
                  Get Tickets
                </Button>
              </Group>
            )}
          </Stack>

          <div className={classes.visual}>
            {event.poster_url ? (
              <img src={event.poster_url} alt={`${eventTitle(event)} poster`} className={classes.poster} />
            ) : (
              main && (
                <div className={classes.faceoff}>
                  <AthletePhoto eager src={athletePhoto(main.red_corner, 'large')} alt={athleteName(main.red_corner)} className={classes.faceoffPhoto} />
                  <AthletePhoto eager src={athletePhoto(main.blue_corner, 'large')} alt={athleteName(main.blue_corner)} className={classes.faceoffPhoto} />
                  <span className={classes.faceoffVs}>VS</span>
                </div>
              )
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
