import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

import { Avatar } from '@/components/ui/avatar'
import { DropDown, DropDownItem, DropDownSeparator } from '@/components/ui/drop-down'
import { PersonIcon } from '@/components/ui/drop-down/icons/person-icon'
import { SignOutIcon } from '@/components/ui/drop-down/icons/sing-out-icon'
import { Typography } from '@/components/ui/typography'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'

import s from './user-drop-down.module.scss'

import baseUserAvatar from './../../../assets/base-user-avatar.png'

export type UserDropDownProps = {
  avatar: string | undefined
  email: string
  onLogout: ComponentPropsWithoutRef<typeof DropdownMenuItem>['onSelect']
  userName: string
}
export const UserDropDown = (props: UserDropDownProps) => {
  const { avatar, email, onLogout, userName } = props
  const selectTrigger = (avatar: string | undefined) => {
    if (avatar?.length) {
      return (
        <div>
          <Avatar src={avatar} />
        </div>
      )
    } else {
      return (
        <div>
          <Avatar src={baseUserAvatar} />
        </div>
      )
    }
  }
  const photo = selectTrigger(avatar)

  return (
    <DropDown trigger={photo}>
      <DropDownItem>
        <div className={s.userInfoWrapper}>
          {photo}
          <div className={s.userNameWrapper}>
            <Typography variant={'subTitle1'}>{userName}</Typography>
            <Typography variant={'caption'}>{email}</Typography>
          </div>
        </div>
      </DropDownItem>
      <DropDownSeparator />
      <DropDownItem>
        <PersonIcon />
        <Typography as={Link} className={s.Link} to={'/profile'} variant={'body2'}>
          {'My profile'}
        </Typography>
      </DropDownItem>
      <DropDownSeparator />
      <DropDownItem onSelect={onLogout}>
        <SignOutIcon />
        <Typography variant={'body2'}>{'Sign Out'}</Typography>
      </DropDownItem>
    </DropDown>
  )
}
