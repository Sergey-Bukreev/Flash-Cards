import { Link } from 'react-router-dom'

import { FormValues, useSignIn } from '@/auth/sign-in/use-sign-in'
import { FormCheckbox } from '@/components/controled/form-checkbox'
import { FormInput } from '@/components/controled/form-input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './sign-in.module.scss'

export type SignInProps = {
  onSubmit: (data: FormValues) => void
}
export const SignIn = (props: SignInProps) => {
  const { control, handleSubmit } = useSignIn()
  const handleFormSubmitted = handleSubmit(props.onSubmit)

  return (
    <Card className={s.card}>
      <Typography className={s.title} variant={'h1'}>
        {'Sign In'}
      </Typography>
      <form onSubmit={handleFormSubmitted}>
        <div className={s.inputWrapper}>
          <FormInput control={control} label={'Email'} name={'email'} type={'text'} />
          <FormInput control={control} label={'Password'} name={'password'} type={'password'} />
        </div>

        <FormCheckbox
          className={s.checkbox}
          control={control}
          label={'Remember Me'}
          name={'rememberMe'}
        />
        <Typography as={Link} className={s.recoverLink} to={'/recover-password'} variant={'body2'}>
          {'Forgot Password?'}
        </Typography>
        <Button className={s.button} fullWidth type={'submit'}>
          {'Sign In'}
        </Button>
      </form>
      <Typography className={s.caption} variant={'body2'}>
        {`Don't have an account?`}
      </Typography>
      <Typography as={Link} className={s.signUpLink} to={'/sign-up'} variant={'link1'}>
        Sign Up
      </Typography>
    </Card>
  )
}
