import { Badge, Container, Group } from '@mantine/core'
import { Link } from 'react-router-dom'
import { athleteFirstName, athleteLastName, athleteName, athleteNickname, athletePhoto, AthletePhoto, type Athlete } from '@/entities/athlete'
import { divisionLabel } from '@/entities/division'
import { routes } from '@/shared/config'
import { ageFrom, cmToImperial, cmToInches, formatCountry, kgToLbs, titleCase } from '@/shared/lib'
import { IconArrowLeft } from '@/shared/ui'
import classes from './AthleteHero.module.css'

export function AthleteHero({ athlete }: { athlete: Athlete }) {
  const nickname = athleteNickname(athlete)
  const age = ageFrom(athlete.date_of_birth)

  const record = [
    { label: 'Wins', value: athlete.wins, color: 'var(--mantine-color-teal-6)' },
    { label: 'Losses', value: athlete.losses, color: 'var(--mantine-color-vfl-7)' },
    { label: 'Draws', value: athlete.draws, color: 'var(--mantine-color-dark-2)' },
  ]
  if (athlete.no_contests) record.push({ label: 'NC', value: athlete.no_contests, color: 'var(--mantine-color-dark-3)' })

  const bio = [
    { label: 'Age', value: age ? String(age) : null },
    { label: 'Height', value: athlete.height_cm ? `${athlete.height_cm} cm` : null, sub: cmToImperial(athlete.height_cm) },
    { label: 'Weight', value: athlete.weight_kg ? `${athlete.weight_kg} kg` : null, sub: kgToLbs(athlete.weight_kg) },
    { label: 'Reach', value: athlete.reach_cm ? `${athlete.reach_cm} cm` : null, sub: cmToInches(athlete.reach_cm) },
    { label: 'Leg reach', value: athlete.leg_reach_cm ? `${athlete.leg_reach_cm} cm` : null, sub: cmToInches(athlete.leg_reach_cm) },
    { label: 'Stance', value: titleCase(athlete.stance) || null },
    { label: 'Hometown', value: titleCase(athlete.hometown) || null },
    { label: 'Country', value: formatCountry(athlete.country) || null },
  ].filter((item) => item.value)

  return (
    <section className={classes.hero}>
      <div className={classes.ghost} aria-hidden>
        {athleteLastName(athlete).toUpperCase()}
      </div>
      <Container size="xl">
        <div className={classes.grid}>
          <div className={classes.photoWrap}>
            <AthletePhoto eager src={athletePhoto(athlete, 'large')} alt={athleteName(athlete)} className={classes.photo} />
          </div>

          <div className={classes.info}>
            <Link to={routes.athletes} className={classes.back}>
              <IconArrowLeft size={14} /> All athletes
            </Link>
            <Group gap={8}>
              {athlete.division && (
                <Badge radius={0} color="vfl" size="lg">
                  {divisionLabel(athlete.division)}
                </Badge>
              )}
              <Badge radius={0} variant="outline" color={athlete.status === 'active' ? 'teal' : 'gray'} size="lg">
                {athlete.status}
              </Badge>
            </Group>
            {nickname && <div className={classes.nickname}>“{nickname}”</div>}
            <h1 className={classes.name}>
              <span className={classes.first}>{athleteFirstName(athlete)}</span>
              <span className={classes.last}>{athleteLastName(athlete)}</span>
            </h1>
            <div className={classes.record} aria-label="Professional record">
              {record.map((cell) => (
                <div key={cell.label} className={classes.recordCell} style={{ ['--cell-color' as string]: cell.color }}>
                  <div className={classes.recordValue}>{cell.value}</div>
                  <div className={classes.recordLabel}>{cell.label}</div>
                </div>
              ))}
            </div>
            {bio.length > 0 && (
              <div className={classes.bio}>
                {bio.map((item) => (
                  <div key={item.label} className={classes.bioCell}>
                    <div className={classes.bioLabel}>{item.label}</div>
                    <div className={classes.bioValue}>{item.value}</div>
                    {item.sub && <div className={classes.bioSub}>{item.sub}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
