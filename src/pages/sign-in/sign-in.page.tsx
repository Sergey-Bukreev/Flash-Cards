import { useNavigate } from 'react-router-dom'

import { SignIn } from '@/auth/sign-in'
import { Page } from '@/components/ui/page'
import { useMeQuery, useSignInMutation } from '@/services/auth/auth.service'
import { LoginArgs } from '@/services/auth/auth.types'

import s from './sign-in.page.module.scss'

export const SignInPage = () => {
  const { data: me } = useMeQuery()
  const [signIn] = useSignInMutation()

  const navigate = useNavigate()

  const handleSignIn = async (data: LoginArgs) => {
    try {
      await signIn(data).unwrap()
      navigate('/')
    } catch (error: any) {
      console.log(error)
    }
  }

  if (me) {
    navigate('/')
  }

  return (
    <Page className={s.root}>
      <SignIn onSubmit={handleSignIn} />
    </Page>
  )
}
