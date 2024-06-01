import { ReactNode } from 'react'

import { Header, HeaderProps } from '@/components/header'

import s from './layout.module.scss'
export type LayoutProps = { children: ReactNode } & HeaderProps
export const Layout = ({ children, ...rest }: LayoutProps) => {
  return (
    <div className={s.layout}>
      <Header {...rest} />
      <main className={s.main}>{children}</main>
    </div>
  )
}
