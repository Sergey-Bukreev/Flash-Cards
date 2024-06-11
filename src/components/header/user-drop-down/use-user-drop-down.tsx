import { Avatar } from '@/components/ui/avatar'
import { Typography } from '@/components/ui/typography'

import s from './user-drop-down.module.scss'

interface UseUserAvatarProps {
  avatar: null | string
  baseUserAvatar: string
  userName: string
}

export const useUserDropDown = ({ avatar, baseUserAvatar, userName }: UseUserAvatarProps) => {
  const photo = (
    <div>
      <Avatar src={avatar?.length ? avatar : baseUserAvatar} />
    </div>
  )

  const trigger = (
    <div className={s.trigger}>
      <Typography className={s.name} variant={'subTitle1'}>
        {userName}
      </Typography>
      {photo}
    </div>
  )

  return { photo, trigger }
}
