import { Link } from 'react-router-dom'

import { LogoIcon } from '@/assets/logo'
import { UserDropDown, UserDropDownProps } from '@/components/header/user-drop-down/user-drop-down'
import { Button } from '@/components/ui/button'

import s from './header.module.scss'
export type HeaderProps =
  | ({
      isLoggedIn: false
    } & Partial<UserDropDownProps>)
  | ({
      isLoggedIn: true
    } & UserDropDownProps)
export const Header = (props: HeaderProps) => {
  const { avatar, email, isLoggedIn, onLogout, userName } = props

  return (
    <header className={s.header}>
      <div className={s.contentWrapper}>
        <Link to={'https://it-incubator.io'}>
          <LogoIcon />
        </Link>
        {isLoggedIn && (
          <UserDropDown avatar={avatar} email={email} onLogout={onLogout} userName={userName} />
        )}
        {!isLoggedIn && (
          <Button as={Link} to={'/sign-in'}>
            {'Sign In'}
          </Button>
        )}
      </div>
    </header>
  )
}
