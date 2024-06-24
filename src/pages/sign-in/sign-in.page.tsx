import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

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
      toast.success('You are successfully authorized')
    } catch (error: any) {
      toast.error(error?.data?.message ?? 'Could not sign in')
    }
  }

  if (me) {
    navigate('/decks')
  }

  return (
    <Page className={s.root}>
      <SignIn onSubmit={handleSignIn} />
    </Page>
  )
}
