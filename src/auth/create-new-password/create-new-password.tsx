import { FC } from 'react'

import {
  FormValues,
  useCreateNewpPassword,
} from '@/auth/create-new-password/use-create-new-password'
import { FormInput } from '@/components/controled/form-input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './create-new-password.module.scss'

export type CreateNewPasswordProps = {
  onSubmit: (data: FormValues) => void
}
export const CreateNewPassword: FC<CreateNewPasswordProps> = (props: CreateNewPasswordProps) => {
  const { control, handleSubmit } = useCreateNewpPassword()
  const handleFormSubmitted = handleSubmit(props.onSubmit)

  return (
    <Card className={s.card}>
      <Typography className={s.title} variant={'h1'}>
        {'Create New Password'}
      </Typography>
      <form onSubmit={handleFormSubmitted}>
        <div className={s.inputWrapper}>
          <FormInput control={control} label={'Password'} name={'password'} type={'password'} />
        </div>
        <Typography className={s.text} variant={'caption'}>
          {'Create new password and we will send you further instructions to email'}
        </Typography>
        <Button className={s.button} fullWidth type={'submit'}>
          {'Create new password'}
        </Button>
      </form>
    </Card>
  )
}
