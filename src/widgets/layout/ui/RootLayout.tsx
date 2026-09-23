import { Center, Loader } from '@mantine/core'
import { Suspense } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'

export function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Suspense
          fallback={
            <Center h="100vh">
              <Loader color="vfl" type="bars" />
            </Center>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  )
}
