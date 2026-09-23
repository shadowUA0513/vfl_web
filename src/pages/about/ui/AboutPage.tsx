import { Container, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { useDocumentTitle } from '@mantine/hooks'
import { FounderQuote, Pillars } from '@/widgets/brand-story'
import { PageHeader, SectionHeading } from '@/shared/ui'

export function AboutPage() {
  useDocumentTitle('About — VFL')

  return (
    <>
      <PageHeader kicker="About VFL" title="Born in Dubai. Built for the World." ghost="VAULT" />
      <Container size="xl" mt={80}>
        <Stack gap={110}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={60}>
            <SectionHeading kicker="Who we are" title="A New Standard in Combat Sports" />
            <Stack gap="lg">
              <Text size="lg" c="dark.0">
                Vault Fighting League (VFL) is a Dubai-born mixed martial arts organisation and global combat-sports brand. It is being built to stage
                elite professional MMA competition while delivering the production, storytelling and live-event experience of a major entertainment
                property.
              </Text>
              <Text size="lg" c="dimmed">
                VFL's purpose is to discover and develop fighters, build meaningful championships and rivalries, and create events that fans can follow
                inside the arena, across broadcast and throughout digital media — at the intersection of sport and entertainment, without compromising
                the legitimacy of the competition.
              </Text>
            </Stack>
          </SimpleGrid>

          <Stack gap={36}>
            <SectionHeading kicker="What drives us" title="Our Pillars" />
            <Pillars />
          </Stack>

          <FounderQuote />

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={60}>
            <Stack gap={12}>
              <Text size="xs" fw={700} c="vfl.4" tt="uppercase" style={{ letterSpacing: '0.28em' }}>
                Founder &amp; CEO
              </Text>
              <Title order={2} fz={{ base: 52, sm: 76 }} lh={0.9}>
                Zeyd Al Moosa
              </Title>
            </Stack>
            <Stack gap="lg">
              <Text size="lg" c="dark.0">
                Zeyd founded VFL at 18 with a simple question: why couldn't one of the world's major MMA organisations be built here? Dubai had the
                audience, infrastructure, global connectivity and ambition, and the Middle East had become one of the most important regions in the
                world for combat sports.
              </Text>
              <Text size="lg" c="dimmed">
                A competitive volleyball player turned boxing and Muay Thai practitioner, Zeyd's entrepreneurial journey began in the trading-card
                market, where he learned that people don't only buy products — they buy into communities, experiences and things they feel emotionally
                connected to. From the beginning, VFL was conceived as a genuine sports property: its own fighters, championships, rivalries,
                personalities and fanbase.
              </Text>
            </Stack>
          </SimpleGrid>
        </Stack>
      </Container>
    </>
  )
}
