import { Button, Container, Group, Stack, Text, Title } from '@mantine/core'
import { Link } from 'react-router-dom'
import { routes } from '@/shared/config'
import { IconArrowLeft } from './icons'

export function NotFound({ title = 'Knocked out.', description = "The page you're looking for doesn't exist or has moved." }) {
  return (
    <Container size="md" py={180}>
      <Stack align="center" ta="center" gap="lg">
        <Text
          ff="heading"
          lh={0.8}
          fz={{ base: 140, sm: 220 }}
          style={{ color: 'transparent', WebkitTextStroke: '2px var(--mantine-color-vfl-7)' }}
          aria-hidden
        >
          404
        </Text>
        <Title order={1} fz={{ base: 44, sm: 64 }}>
          {title}
        </Title>
        <Text c="dimmed" size="lg" maw={480}>
          {description}
        </Text>
        <Group>
          <Button component={Link} to={routes.home} radius={0} size="md" leftSection={<IconArrowLeft size={16} />}>
            Back to home
          </Button>
          <Button component={Link} to={routes.events} radius={0} size="md" variant="default">
            Browse events
          </Button>
        </Group>
      </Stack>
    </Container>
  )
}
