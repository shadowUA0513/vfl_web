import { Progress, RingProgress, SimpleGrid, Stack, Text } from '@mantine/core'
import type { Athlete } from '@/entities/athlete'
import { toPercent } from '@/shared/lib'
import { SectionHeading } from '@/shared/ui'
import classes from './AthleteStats.module.css'

function MethodBreakdown({ title, total, rows, color }: { title: string; total: number; rows: { label: string; value: number }[]; color: string }) {
  return (
    <div className={classes.panel}>
      <div className={classes.panelTitle}>{title}</div>
      <Stack gap="lg">
        {rows.map((row) => {
          const pct = total ? Math.round((row.value / total) * 100) : 0
          return (
            <div key={row.label} className={classes.method}>
              <span className={classes.methodLabel}>{row.label}</span>
              <span className={classes.methodValue}>
                {row.value}
                <small>{pct}%</small>
              </span>
              <Progress className={classes.bar} value={pct} color={color} size="md" radius={0} bg="dark.6" />
            </div>
          )
        })}
      </Stack>
    </div>
  )
}

function Ring({ value, label }: { value: number; label: string }) {
  return (
    <Stack gap={6} align="center">
      <RingProgress
        size={132}
        thickness={9}
        roundCaps
        sections={[{ value, color: 'vfl.6' }]}
        rootColor="dark.6"
        label={
          <Text ta="center" className={classes.ringLabel}>
            {value}%
          </Text>
        }
      />
      <span className={classes.ringCaption}>{label}</span>
    </Stack>
  )
}

const fixed = (value: number) => (Number.isInteger(value) ? String(value) : value.toFixed(2))

export function AthleteStats({ athlete }: { athlete: Athlete }) {
  const losses = athlete.losses_by_ko + athlete.losses_by_submission + athlete.losses_by_decision
  const hasPerformance = [
    athlete.sig_strikes_landed,
    athlete.striking_accuracy,
    athlete.strikes_landed_per_min,
    athlete.takedowns_landed,
    athlete.takedown_accuracy,
    athlete.takedown_defense,
    athlete.striking_defense,
  ].some((v) => v > 0)

  return (
    <Stack gap={36}>
      <SectionHeading kicker="Fight IQ" title="Athlete Stats" />

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
        <MethodBreakdown
          title="Wins by method"
          total={athlete.wins}
          color="teal.6"
          rows={[
            { label: 'KO / TKO', value: athlete.wins_by_ko },
            { label: 'Submission', value: athlete.wins_by_submission },
            { label: 'Decision', value: athlete.wins_by_decision },
          ]}
        />
        <MethodBreakdown
          title="Losses by method"
          total={losses || athlete.losses}
          color="vfl.6"
          rows={[
            { label: 'KO / TKO', value: athlete.losses_by_ko },
            { label: 'Submission', value: athlete.losses_by_submission },
            { label: 'Decision', value: athlete.losses_by_decision },
          ]}
        />
      </SimpleGrid>

      {hasPerformance && (
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <div className={classes.panel}>
            <div className={classes.panelTitle}>Striking</div>
            <SimpleGrid cols={2} spacing="lg">
              <Ring value={toPercent(athlete.striking_accuracy)} label="Accuracy" />
              <Ring value={toPercent(athlete.striking_defense)} label="Defense" />
              <div className={classes.tile}>
                <div className={classes.tileValue}>{fixed(athlete.strikes_landed_per_min)}</div>
                <div className={classes.tileLabel}>Sig. landed / min</div>
              </div>
              <div className={classes.tile}>
                <div className={classes.tileValue}>{fixed(athlete.strikes_absorbed_per_min)}</div>
                <div className={classes.tileLabel}>Sig. absorbed / min</div>
              </div>
            </SimpleGrid>
            <Text size="sm" c="dimmed" mt="lg">
              {athlete.sig_strikes_landed} of {athlete.sig_strikes_attempted} significant strikes landed
            </Text>
          </div>
          <div className={classes.panel}>
            <div className={classes.panelTitle}>Grappling</div>
            <SimpleGrid cols={2} spacing="lg">
              <Ring value={toPercent(athlete.takedown_accuracy)} label="TD accuracy" />
              <Ring value={toPercent(athlete.takedown_defense)} label="TD defense" />
              <div className={classes.tile}>
                <div className={classes.tileValue}>{fixed(athlete.takedown_avg_per_15_min)}</div>
                <div className={classes.tileLabel}>Takedowns / 15 min</div>
              </div>
              <div className={classes.tile}>
                <div className={classes.tileValue}>{fixed(athlete.submission_avg_per_15_min)}</div>
                <div className={classes.tileLabel}>Sub. attempts / 15 min</div>
              </div>
            </SimpleGrid>
            <Text size="sm" c="dimmed" mt="lg">
              {athlete.takedowns_landed} of {athlete.takedowns_attempted} takedowns landed
            </Text>
          </div>
        </SimpleGrid>
      )}
    </Stack>
  )
}
