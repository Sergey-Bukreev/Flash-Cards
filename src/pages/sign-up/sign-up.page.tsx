import { SignUp } from '@/auth/sign-up'
import { Page } from '@/components/ui/page'
import { useSignInMutation, useSignUpMutation } from '@/services/auth/auth.service'
import { SignUpArgs } from '@/services/auth/auth.types'

import s from './sign-up.page.module.scss'

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()
  const [signIn] = useSignInMutation()

  const handleSignUp = async (data: SignUpArgs) => {
    try {
      await signUp({ email: data.email, password: data.password }).unwrap()
      await signIn({ email: data.email, password: data.password }).unwrap()
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <Page className={s.root}>
      <SignUp onSubmit={handleSignUp} />
    </Page>
  )
}
