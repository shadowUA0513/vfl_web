import { createTheme, type MantineColorsTuple } from '@mantine/core'

// Built around the VFL brand red #CB0106 (index 7).
const vfl: MantineColorsTuple = ['#ffe9e9', '#ffd1d2', '#fca0a2', '#f86b6f', '#f43e43', '#f12329', '#e3121a', '#cb0106', '#b30005', '#9a0003']

const dark: MantineColorsTuple = ['#d6d6db', '#a3a3a8', '#7d7d83', '#5c5c62', '#3a3a3f', '#26262a', '#1a1a1d', '#121214', '#0b0b0c', '#050505']

export const theme = createTheme({
  primaryColor: 'vfl',
  primaryShade: 7,
  colors: { vfl, dark },
  black: '#050505',
  white: '#ffffff',
  fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  headings: {
    fontFamily: '"Bebas Neue", Oswald, Impact, "Arial Narrow", sans-serif',
    fontWeight: '400',
  },
  defaultRadius: 0,
  cursorType: 'pointer',
  focusRing: 'auto',
  breakpoints: { xs: '36em', sm: '48em', md: '62em', lg: '75em', xl: '88em' },
  components: {
    Container: {
      defaultProps: { px: { base: 'md', sm: 'xl' } },
    },
    Button: {
      styles: {
        root: { letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 },
      },
    },
    Badge: {
      styles: {
        root: { letterSpacing: '0.12em' },
      },
    },
  },
})
