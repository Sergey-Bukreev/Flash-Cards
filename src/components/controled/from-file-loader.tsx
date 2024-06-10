import { ChangeEvent } from 'react'
import { useController } from 'react-hook-form'

import { ButtonProps } from '@/components/ui/button'
import { FileLoader } from '@/components/ui/file-loader/file-loader'

export type FromFileLoaderProps = {
  control: any
  extraActions?: () => void
  name: any
} & Omit<ButtonProps, 'onChange' | 'onClick' | 'type'>
export const FromFileLoader = ({
  control,
  extraActions,
  name,

  ...rest
}: FromFileLoaderProps) => {
  const {
    field: { onChange },
  } = useController({
    control,
    name,
  })

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    onChange(file)
    extraActions?.()
    e.target.value = ''
  }

  return <FileLoader onChange={changeHandler} type={'button'} {...rest} />
}
