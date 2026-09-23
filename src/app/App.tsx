import '@mantine/core/styles.css'
import './styles/global.css'

import { MantineProvider } from '@mantine/core'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'
import { theme } from './styles/theme'

export function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark" forceColorScheme="dark">
      <RouterProvider router={router} />
    </MantineProvider>
  )
}
