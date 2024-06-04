import { ReactNode } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'

import { Header, HeaderProps } from '@/components/header'
import { useMeQuery } from '@/services/auth/auth.service'

import s from './layout.module.scss'
type AuthContext = {
  isAuthenticated: boolean
}

export function useAuthContext() {
  return useOutletContext<AuthContext>()
}
export const Layout = () => {
  const { data, isError, isLoading } = useMeQuery()
  const isAuthenticated = !isError && !isLoading

  return (
    <LayoutPrimitive
      avatar={data?.avatar ?? null}
      email={data?.email ?? ''}
      isAuthenticated={isAuthenticated}
      onLogout={() => {}}
      userName={data?.name ?? ''}
    >
      <Outlet context={{ isAuthenticated } satisfies AuthContext} />
    </LayoutPrimitive>
  )
}

export type LayoutProps = { children: ReactNode } & HeaderProps
export const LayoutPrimitive = ({ children, ...rest }: LayoutProps) => {
  return (
    <div className={s.layout}>
      <Header {...rest} />
      <main className={s.main}>{children}</main>
    </div>
  )
}
