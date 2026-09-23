import { Container } from '@mantine/core'
import type { ReactNode } from 'react'
import classes from './PageHeader.module.css'
import { SectionHeading } from './SectionHeading'

interface PageHeaderProps {
  kicker: string
  title: ReactNode
  description?: ReactNode
  ghost?: string
  children?: ReactNode
}

export function PageHeader({ kicker, title, description, ghost, children }: PageHeaderProps) {
  return (
    <header className={classes.root}>
      {ghost && (
        <div className={classes.ghost} aria-hidden>
          {ghost}
        </div>
      )}
      <Container size="xl" className={classes.inner}>
        <SectionHeading kicker={kicker} title={title} description={description} order={1} />
        {children}
      </Container>
    </header>
  )
}
