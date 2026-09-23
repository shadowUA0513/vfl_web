import { Button, EmptyState } from '@mantine/core'
import type { ReactNode } from 'react'
import { IconRefresh } from './icons'

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <EmptyState py={60} variant="light" color="vfl" icon={<IconRefresh size={26} />} title="Couldn't load this" description={message}>
      {onRetry && (
        <EmptyState.Actions>
          <Button variant="light" onClick={onRetry}>
            Try again
          </Button>
        </EmptyState.Actions>
      )}
    </EmptyState>
  )
}

interface EmptyProps {
  icon: ReactNode
  title: string
  description?: ReactNode
  children?: ReactNode
}

export function Empty({ icon, title, description, children }: EmptyProps) {
  return (
    <EmptyState py={60} withIndicatorBackground icon={icon} title={title} description={description}>
      {children && <EmptyState.Actions>{children}</EmptyState.Actions>}
    </EmptyState>
  )
}
