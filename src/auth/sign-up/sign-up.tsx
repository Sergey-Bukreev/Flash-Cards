import { FC } from 'react'
import { Link } from 'react-router-dom'

import { FormValues, useSignUp } from '@/auth/sign-up/use-sing-up'
import { FormInput } from '@/components/controled/form-input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './sign-up.module.scss'

export type SignUpProps = {
  onSubmit: (data: FormValues) => void
}
export const SignUp: FC<SignUpProps> = (props: SignUpProps) => {
  const { control, handleSubmit } = useSignUp()
  const handleFormSubmitted = handleSubmit(props.onSubmit)

  return (
    <Card className={s.card}>
      <Typography className={s.title} variant={'h1'}>
        {'Sign Up'}
      </Typography>
      <form onSubmit={handleFormSubmitted}>
        <div className={s.inputWrapper}>
          <FormInput control={control} label={'Email'} name={'email'} type={'text'} />
          <FormInput control={control} label={'Password'} name={'password'} type={'password'} />
          <FormInput
            control={control}
            label={'Confirm Password'}
            name={'confirmPassword'}
            type={'password'}
          />
        </div>
        <Button className={s.button} fullWidth type={'submit'}>
          {'Sign Up'}
        </Button>
        <Typography className={s.caption} variant={'body2'}>
          {'Already have an account?'}
        </Typography>
        <Typography as={Link} className={s.signInLink} to={'/sign-in'} variant={'link1'}>
          {'Sign Up'}
        </Typography>
      </form>
    </Card>
  )
}
