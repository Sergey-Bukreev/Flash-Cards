import { ChangeEvent } from 'react'
import { useController } from 'react-hook-form'

import { ImageIcon } from '@/assets/image-icon'
import { Button, ButtonProps } from '@/components/ui/button'
import { DeleteIcon } from '@/components/ui/drop-down/icons/delete-icon'
import { FileLoader } from '@/components/ui/file-loader/file-loader'
import { Typography } from '@/components/ui/typography'

import s from './form-file-loader.module.scss'

import baseDeckCover from '../../../assets/base-deck-image.png'

export type FromFileLoaderProps = {
  control: any
  deleteCoverHandler: () => void
  errorMessage: null | string
  extraActions?: () => void
  name: any
  preview: null | string
} & Omit<ButtonProps, 'onChange' | 'onClick' | 'type'>

export const FromFileLoader = ({
  control,
  deleteCoverHandler,
  errorMessage,
  extraActions,
  name,
  preview,
  ...rest
}: FromFileLoaderProps) => {
  const {
    field: { onChange },
  } = useController({
    control,
    name,
  })

  const deleteHandler = () => {
    deleteCoverHandler()
  }

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    onChange(file)
    extraActions?.()
    e.target.value = ''
  }

  return (
    <div className={s.root}>
      <img alt={'Deck Cover'} className={s.image} src={preview ?? baseDeckCover} />
      {errorMessage && (
        <Typography className={s.errorMessage} variant={'caption'}>
          {errorMessage}
        </Typography>
      )}
      <div className={s.previewControls}>
        {preview && (
          <Button className={s.loader} fullWidth onClick={deleteHandler} variant={'secondary'}>
            <DeleteIcon className={s.icon} />
            {'Delete Cover'}
          </Button>
        )}
        <FileLoader className={s.loader} onChange={changeHandler} {...rest}>
          <ImageIcon className={s.icon} />
          {preview ? 'Change Cover' : 'Upload Cover'}
        </FileLoader>
      </div>
    </div>
  )
}
