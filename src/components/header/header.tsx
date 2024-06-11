import { Link } from 'react-router-dom'

import { LogoIcon } from '@/assets/logo'
import { UserDropDown, UserDropDownProps } from '@/components/header/user-drop-down/user-drop-down'
import { Button } from '@/components/ui/button'

import s from './header.module.scss'
export type HeaderProps =
  | ({
      isAuthenticated: false
    } & Partial<UserDropDownProps>)
  | ({
      isAuthenticated: true
    } & UserDropDownProps)
export const Header = (props: HeaderProps) => {
  const { avatar, email, isAuthenticated, onLogout, userName } = props

  return (
    <header className={s.header}>
      <div className={s.contentWrapper}>
        <Link to={'https://it-incubator.io'}>
          <LogoIcon />
        </Link>
        {isAuthenticated && (
          <UserDropDown avatar={avatar} email={email} onLogout={onLogout} userName={userName} />
        )}
        {!isAuthenticated && (
          <Button as={Link} to={'/sign-in'}>
            {'Sign In'}
          </Button>
        )}
      </div>
    </header>
  )
}
