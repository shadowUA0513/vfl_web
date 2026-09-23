import { Burger, Button, Container, Drawer, Stack } from '@mantine/core'
import { useDisclosure, useWindowScroll } from '@mantine/hooks'
import { Link, NavLink } from 'react-router-dom'
import { routes } from '@/shared/config'
import { IconArrowRight, IconTicket, Logo } from '@/shared/ui'
import classes from './Header.module.css'

const NAV = [
  { label: 'Events', to: routes.events },
  { label: 'Rankings', to: routes.rankings },
  { label: 'Athletes', to: routes.athletes },
  { label: 'About', to: routes.about },
  { label: 'Contact', to: routes.contact },
]

export function Header() {
  const [{ y }] = useWindowScroll()
  const [opened, { toggle, close }] = useDisclosure(false)

  return (
    <header className={classes.header} data-scrolled={y > 24 || undefined}>
      <Container size="xl" className={classes.inner}>
        <Logo height={30} />

        <nav className={classes.nav} aria-label="Main">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={classes.link}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={classes.actions}>
          <Button component={Link} to={routes.events} className={classes.cta} leftSection={<IconTicket size={16} />} radius={0} size="sm">
            Get Tickets
          </Button>
          <Burger opened={opened} onClick={toggle} className={classes.burger} aria-label="Toggle navigation" size="sm" />
        </div>
      </Container>

      <Drawer opened={opened} onClose={close} position="right" size="100%" title={<Logo height={26} />} zIndex={200}>
        <Stack gap={0} mt="md">
          {[{ label: 'Home', to: routes.home }, ...NAV].map((item) => (
            <NavLink key={item.to} to={item.to} end className={classes.drawerLink} onClick={close}>
              {item.label}
              <IconArrowRight size={22} />
            </NavLink>
          ))}
          <Button component={Link} to={routes.events} onClick={close} mt="xl" size="lg" radius={0} leftSection={<IconTicket size={18} />}>
            Get Tickets
          </Button>
        </Stack>
      </Drawer>
    </header>
  )
}
