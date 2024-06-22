import { ComponentPropsWithoutRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { Avatar } from '@/components/ui/avatar'
import { DropDown, DropDownItem, DropDownSeparator } from '@/components/ui/drop-down'
import { PersonIcon } from '@/components/ui/drop-down/icons/person-icon'
import { SignOutIcon } from '@/components/ui/drop-down/icons/sing-out-icon'
import { Typography } from '@/components/ui/typography'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'

import s from './user-drop-down.module.scss'

import baseUserAvatar from './../../../assets/base-user-avatar.png'

export type UserDropDownProps = {
  avatar: null | string
  email: string
  onLogout: ComponentPropsWithoutRef<typeof DropdownMenuItem>['onSelect']
  userName: string
}
export const UserDropDown = (props: UserDropDownProps) => {
  const { avatar, email, onLogout, userName } = props
  const photo = (
    <div>
      <Avatar size={50} src={avatar?.length ? avatar : baseUserAvatar} />
    </div>
  )
  const navigate = useNavigate()

  const handleSelect = (callback: () => void) => {
    return () => {
      callback()
    }
  }

  return (
    <DropDown trigger={photo}>
      <DropDownItem>
        <div className={s.userInfoWrapper}>
          {photo}
          <div className={s.userNameWrapper}>
            <Typography variant={'subTitle2'}>{userName}</Typography>
            <Typography variant={'caption'}>{email}</Typography>
          </div>
        </div>
      </DropDownItem>
      <DropDownSeparator />
      <DropDownItem onSelect={handleSelect(() => navigate('/profile'))}>
        <PersonIcon />
        <Typography variant={'body2'}>{'My profile'}</Typography>
      </DropDownItem>
      <DropDownSeparator />
      <DropDownItem onSelect={onLogout}>
        <SignOutIcon />
        <Typography variant={'body2'}>{'Sign Out'}</Typography>
      </DropDownItem>
    </DropDown>
  )
}
