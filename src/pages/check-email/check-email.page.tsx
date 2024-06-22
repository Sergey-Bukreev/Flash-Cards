import { useParams } from 'react-router-dom'

import { CheckEmail } from '@/auth/check-email'
import { Page } from '@/components/ui/page'

import s from './check-email.page.module.scss'

export const CheckEmailPage = () => {
  const { email } = useParams<{ email: string }>()

  console.log('RENDER')
  console.log(email)

  return (
    <Page className={s.root}>
      <CheckEmail email={email ?? undefined} />
    </Page>
  )
}
