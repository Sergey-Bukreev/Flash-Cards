import { EditProfileForm } from '@/components/forms/edit-profile-form'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { EditIcon } from '@/components/ui/drop-down/icons/edit-icon'
import { SignOutIcon } from '@/components/ui/drop-down/icons/sing-out-icon'
import { FileLoader } from '@/components/ui/file-loader/file-loader'
import { Page } from '@/components/ui/page'
import { Typography } from '@/components/ui/typography'
import { useProfilePage } from '@/pages/profile/use-profile-page'

import s from './profile.module.scss'

import baseUserPhoto from '../../assets/base-user-avatar.png'

export const ProfilePage = () => {
  const { handleOnUpdateName, isEditMode, me, onEditModeHandler, onLogOut, updateAvatar } =
    useProfilePage()

  return (
    <Page className={s.root}>
      <Card className={s.card}>
        <Typography className={s.title} variant={'h1'}>
          {'Personal Information'}
        </Typography>
        <div className={s.avatarWrapper}>
          <Avatar size={120} src={me?.avatar ?? baseUserPhoto} />
          {!isEditMode && (
            <FileLoader
              as={Button}
              className={s.fileLoader}
              name={'avtar'}
              onChange={updateAvatar}
              variant={'icon'}
            >
              <EditIcon />
            </FileLoader>
          )}
        </div>
        <div className={s.infoWrapper}>
          {!isEditMode && (
            <>
              <Typography as={'h1'} variant={'h1'}>
                {me?.name}
                <Button onClick={onEditModeHandler} variant={'icon'}>
                  <EditIcon />
                </Button>
              </Typography>
              <Typography className={s.email} variant={'body2'}>
                {me?.email}
              </Typography>
              <Button className={s.outButton} onClick={onLogOut} variant={'secondary'}>
                <SignOutIcon height={20} width={20} />
                {'Log Out'}
              </Button>
            </>
          )}
          {isEditMode && (
            <EditProfileForm
              defaultValues={{ name: me?.name || '' }}
              onSubmit={handleOnUpdateName}
            />
          )}
        </div>
      </Card>
    </Page>
  )
}
