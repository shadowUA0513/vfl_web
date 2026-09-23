import { Stack, Text, Title } from '@mantine/core'
import type { ReactNode } from 'react'
import classes from './SectionHeading.module.css'

interface SectionHeadingProps {
  kicker?: string
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
  order?: 1 | 2 | 3
}

export function SectionHeading({ kicker, title, description, action, order = 2 }: SectionHeadingProps) {
  return (
    <div className={classes.row}>
      <Stack gap={12} maw={760}>
        {kicker && <span className={classes.kicker}>{kicker}</span>}
        <Title order={order} className={classes.title}>
          {title}
        </Title>
        {description && (
          <Text c="dimmed" size="lg">
            {description}
          </Text>
        )}
      </Stack>
      {action}
    </div>
  )
}
