import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { Layout, useAuthContext } from '@/components/layout/layout'
import { CheckEmailPage } from '@/pages/check-email/check-email.page'
import { CreateNewPasswordPage } from '@/pages/create-new-password/create-new-password.page'
import { DeckPage } from '@/pages/deck/deck.page'
import { DecksPage } from '@/pages/decks/decks.page'
import { ForgotPasswordPage } from '@/pages/forgot-password/forgot-password.page'
import { LearnPage } from '@/pages/learn/learn.page'
import { ProfilePage } from '@/pages/profile/profile'
import { SignInPage } from '@/pages/sign-in/sign-in.page'
import { SignUpPage } from '@/pages/sign-up/sign-up.page'

const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
    path: '/sign-in',
  },
  {
    element: <SignUpPage />,
    path: '/sign-up',
  },
  {
    element: <ForgotPasswordPage />,
    path: '/recover-password',
  },
  {
    element: <CheckEmailPage />,
    path: '/check-email/:email',
  },
  {
    element: <CreateNewPasswordPage />,
    path: '/create-new-password/:token',
  },
  {
    element: <ForgotPasswordPage />,
    path: '/forgot-password',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <DecksPage />,
    path: '/decks',
  },
  {
    element: <DeckPage />,
    path: '/decks/:deckId',
  },
  {
    element: <LearnPage />,
    path: '/decks/:deckId/learn',
  },
  {
    element: <ProfilePage />,
    path: '/profile',
  },
]

function PrivateRoutes() {
  const { isAuthenticated } = useAuthContext()

  return isAuthenticated ? <Outlet /> : <Navigate to={'/sign-in'} />
}

export const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      ...publicRoutes,
    ],
    element: <Layout />,
    path: '/',
  },
])

export function Router() {
  return <RouterProvider router={router} />
}
