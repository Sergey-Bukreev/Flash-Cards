import { useNavigate } from 'react-router-dom'

import { ForgotPassword } from '@/auth/forgot-password'
import { FormValues } from '@/auth/forgot-password/use-forgot-password'
import { Page } from '@/components/ui/page'
import { useRecoverPasswordMutation } from '@/services/auth/auth.service'

import s from './forgot-password.page.module.scss'

import { emailRecoveringTemplate as html } from './../../components/common/utils/email-recover'
export const ForgotPasswordPage = () => {
  const [recoverPassword] = useRecoverPasswordMutation()
  const navigate = useNavigate()

  const handleOnSubmit = async ({ email }: FormValues) => {
    try {
      await recoverPassword({ email, html }).unwrap()
      navigate(`/check-email/${email}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Page className={s.root}>
      <ForgotPassword onSubmit={handleOnSubmit} />
    </Page>
  )
}
