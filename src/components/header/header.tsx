import { Link } from 'react-router-dom'

import { LogoIcon } from '@/assets/logo'
import { UserDropDown, UserDropDownProps } from '@/components/header/user-drop-down'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

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
        <Link to={'https://github.com/Sergey-Bukreev/Flash-Cards'}>
          <LogoIcon />
        </Link>
        {isAuthenticated && (
          <div className={s.userInfoWrapper}>
            <Typography as={Link} className={s.name} to={'/profile'} variant={'h4'}>
              {userName}
            </Typography>
            <UserDropDown avatar={avatar} email={email} onLogout={onLogout} userName={userName} />
          </div>
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
