import { AppLayout } from '@renderer/components/layout/AppLayout'
import { ErrorPage } from '@renderer/pages/ErrorPage'
import { EscapeRoomPage } from '@renderer/pages/EscapeRoomPage'
import { WelcomePage } from '@renderer/pages/WelcomePage'
import { createHashRouter, RouteObject } from 'react-router-dom'

/**
 * Route configuration for the application.
 */
const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <WelcomePage /> },
      { path: 'escape-rooms/:id', element: <EscapeRoomPage /> },
      { path: '*', element: <ErrorPage /> }
    ]
  }
]

/**
 * Application router instance
 */
export const router = createHashRouter(routes)
