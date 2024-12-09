import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button, ButtonProps } from '@/components/ui/button'
import { ArrowLeftIcon } from '@/components/ui/pagination/icons/arrow-left-icon'
import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import s from './back-button.module.scss'

export type BackButtonProps = {
  className?: string
  link: string
  text?: string
} & ButtonProps

export const BackButton: FC<BackButtonProps> = ({
  className,
  link,
  text = 'Back to Previous Page',
  ...rest
}: BackButtonProps) => {
  const navigate = useNavigate()

  const onHandleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    navigate(link)
  }

  return (
    <Button
      as={Link}
      className={clsx(s.button, className)}
      onClick={onHandleBack}
      to={'..'}
      {...rest}
    >
      <ArrowLeftIcon className={s.icon} height={22} width={22} />
      <Typography className={s.text} variant={'body2'}>
        {text}
      </Typography>
    </Button>
  )
}
