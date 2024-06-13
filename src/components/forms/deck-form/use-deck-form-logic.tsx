import { useState } from 'react'

import { FormValues, useCreateDeck } from '@/components/forms/deck-form/use-deck-form'
type DeckFormDefaultValues = {
  cover: null | string
} & Pick<FormValues, 'isPrivate' | 'name'>
export type DeckFormProps = {
  defaultValues?: DeckFormDefaultValues
  onCancel: () => void
  onSubmit: (data: FormValues) => void
}
export const useDeckFormLogic = ({ defaultValues, onSubmit }: DeckFormProps) => {
  const [downloaded, setDownloaded] = useState<null | string>(defaultValues?.cover || null)
  const [coverError, setCoverError] = useState<null | string>(null)
  const values = {
    isPrivate: defaultValues?.isPrivate || false,
    name: defaultValues?.name || '',
  }
  const { control, getFieldState, handleSubmit, resetField, setValue, trigger, watch } =
    useCreateDeck(values)

  const fileIsDirty = getFieldState('cover').isDirty

  const extraActions = async () => {
    const success = await trigger('cover')
    const { error } = getFieldState('cover')
    const file = watch('cover')

    if (!success && error?.message) {
      setCoverError(error.message)
      resetField('cover')
    }

    if (file) {
      const noImage = defaultValues?.cover ?? null
      const img = success ? URL.createObjectURL(file) : noImage

      setDownloaded(img)

      if (coverError && !error?.message) {
        setCoverError(null)
      }
    }
  }

  const deleteCoverHandler = () => {
    setValue('cover', null)
    setDownloaded(null)
    setCoverError(null)
  }

  const sendHandler = async (data: FormValues) => {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('isPrivate', `${data.isPrivate}`)
    const file = watch('cover')

    if (file === null) {
      formData.append('cover', '')
    } else if (fileIsDirty && data.cover) {
      formData.append('cover', data.cover)
    }
    onSubmit(formData as any)
  }

  const handleOnSubmit = handleSubmit(sendHandler)

  return {
    control,
    coverError,
    deleteCoverHandler,
    downloaded,
    extraActions,
    handleOnSubmit,
  }
}
