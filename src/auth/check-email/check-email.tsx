import { Link } from 'react-router-dom'

import { EmailIcon } from '@/auth/check-email/icon/email-icon'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './check-email.module.scss'
export type CheckEmailProps = {
  email: string | undefined
}
export const CheckEmail = ({ email }: CheckEmailProps) => {
  return (
    <Card className={s.card}>
      <Typography className={s.title} variant={'h1'}>
        {'Check your email'}
      </Typography>
      <div className={s.iconWrapper}>
        <EmailIcon />
      </div>
      <Typography className={s.text} variant={'body2'}>
        {`We've sent an e-mail with instructions to ${email}`}
      </Typography>
      <Button as={Link} fullWidth to={'/sing-in'}>
        {'Back to Sign in'}
      </Button>
    </Card>
  )
}
