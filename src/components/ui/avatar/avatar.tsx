import { CSSProperties, ComponentPropsWithoutRef, FC } from 'react'

import clsx from 'clsx'

import s from './avatar.module.scss'

export type AvatarProps = {
  size?: CSSProperties['width']
} & ComponentPropsWithoutRef<'img'>
export const Avatar: FC<AvatarProps> = (props: AvatarProps) => {
  const { className, size = '36px', style, ...rest } = props

  return (
    <img
      className={clsx(className, s.Avatar)}
      style={{
        ...style,
        height: size,
        width: size,
      }}
      {...rest}
    />
  )
}
