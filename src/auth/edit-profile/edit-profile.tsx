import { ReactNode } from 'react'

import { FormValues, useEditProfile } from '@/auth/edit-profile/use-edit-profile'
import { FormInput } from '@/components/controled/form-input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './edit-profile.module.scss'

export type EditProfileProps = {
  children?: ReactNode
  onSubmit: (data: FormValues) => void
}
export const EditProfileForm = ({ children, onSubmit }: EditProfileProps) => {
  const { control, handleSubmit } = useEditProfile()

  return (
    <Card className={s.card}>
      <Typography className={s.title} variant={'h1'}>
        {'Personal Information'}
      </Typography>
      <div className={s.childrenWrapper}>{children}</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputWrapper}>
          <FormInput control={control} label={'Nickname'} name={'name'} type={'text'} />
        </div>

        <Button className={s.button} fullWidth>
          {'Save Changes'}
        </Button>
      </form>
    </Card>
  )
}
