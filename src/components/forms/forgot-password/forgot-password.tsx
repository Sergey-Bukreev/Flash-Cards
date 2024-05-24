import { FC } from 'react'
import { Link } from 'react-router-dom'

import { FormInput } from '@/components/controled/form-input'
import {
  FormValues,
  useForgotPassword,
} from '@/components/forms/forgot-password/use-forgot-password'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './forgot-password.module.scss'
export type ForgotPasswordProps = {
  onSubmit: (data: FormValues) => void
}
export const ForgotPassword: FC<ForgotPasswordProps> = (props: ForgotPasswordProps) => {
  const { control, handleSubmit } = useForgotPassword()
  const handleFormSubmitted = handleSubmit(props.onSubmit)

  return (
    <Card className={s.card}>
      <Typography className={s.title} variant={'h1'}>
        {'Forgot your password?'}
      </Typography>
      <form onSubmit={handleFormSubmitted}>
        <div className={s.inputWrapper}>
          <FormInput control={control} label={'Email'} name={'email'} type={'text'} />
        </div>
        <Typography className={s.text} variant={'body2'}>
          {'Enter your email address and we will send you further instructions'}
        </Typography>
        <Button className={s.button} fullWidth type={'submit'}>
          {'Send Instructions'}
        </Button>
      </form>
      <Typography className={s.caption} variant={'body2'}>
        {'Did you remember your password?'}
      </Typography>
      <Typography as={Link} className={s.SignInLink} to={'/sign-in'} variant={'link1'}>
        {'Try logging in'}
      </Typography>
    </Card>
  )
}
