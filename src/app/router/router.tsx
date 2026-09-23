import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/widgets/layout'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, lazy: () => import('@/pages/home').then((m) => ({ Component: m.HomePage })) },
      { path: 'events', lazy: () => import('@/pages/events').then((m) => ({ Component: m.EventsPage })) },
      { path: 'events/:slug', lazy: () => import('@/pages/event-details').then((m) => ({ Component: m.EventDetailsPage })) },
      { path: 'rankings', lazy: () => import('@/pages/rankings').then((m) => ({ Component: m.RankingsPage })) },
      { path: 'athletes', lazy: () => import('@/pages/athletes').then((m) => ({ Component: m.AthletesPage })) },
      { path: 'athletes/:slug', lazy: () => import('@/pages/athlete-details').then((m) => ({ Component: m.AthleteDetailsPage })) },
      { path: 'about', lazy: () => import('@/pages/about').then((m) => ({ Component: m.AboutPage })) },
      { path: 'contact', lazy: () => import('@/pages/contact').then((m) => ({ Component: m.ContactPage })) },
      { path: '*', lazy: () => import('@/pages/not-found').then((m) => ({ Component: m.NotFoundPage })) },
    ],
  },
])
