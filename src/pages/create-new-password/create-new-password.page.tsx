import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { CreateNewPassword } from '@/auth/create-new-password'
import { FormValues } from '@/auth/create-new-password/use-create-new-password'
import { Page } from '@/components/ui/page'
import { useResetPasswordMutation } from '@/services/auth/auth.service'

import s from './create-new-password.page.module.scss'
export const CreateNewPasswordPage = () => {
  const navigate = useNavigate()
  const { token } = useParams<{ token: string }>()
  const [resetPassword] = useResetPasswordMutation()
  const handleOnSubmit = async ({ password }: FormValues) => {
    if (token) {
      try {
        await resetPassword({ password, token }).unwrap()
        navigate('/sign-in')
        toast.success('Password reset successfully.')
      } catch (error: any) {
        toast.error(error.data.message ?? 'Password reset failed')
      }
    }
  }

  return (
    <Page className={s.root}>
      <CreateNewPassword onSubmit={handleOnSubmit} />
    </Page>
  )
}
