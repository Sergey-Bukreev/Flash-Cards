import { toast } from 'react-toastify'

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
      toast.success('Account created successfully')

      try {
        await signIn({ email: data.email, password: data.password }).unwrap()
        toast.success('Signed in successfully')
      } catch (signInError: any) {
        toast.error(
          signInError.data?.message ?? 'Failed to sign in. Please try logging in manually.'
        )
      }
    } catch (signUpError: any) {
      toast.error(signUpError.data?.message ?? 'Failed to create account. Please try again.')
    }
  }

  return (
    <Page className={s.root}>
      <SignUp onSubmit={handleSignUp} />
    </Page>
  )
}
