import { useState } from 'react'

import { FormValues, useCreateDeck } from '@/components/forms/create-deck-form/use-create-deck-form'

export const useCreateDeckFormLogic = (onSubmit: (data: FormValues) => void) => {
  const [downloaded, setDownloaded] = useState<null | string>(null)
  const [coverError, setCoverError] = useState<null | string>(null)
  const { control, getFieldState, handleSubmit, resetField, setValue, trigger, watch } =
    useCreateDeck()

  const extraActions = async () => {
    const success = await trigger('cover')
    const { error } = getFieldState('cover')
    const file = watch('cover')

    if (!success && error?.message) {
      setCoverError(error.message)
      resetField('cover')
    }

    if (file) {
      const img = success ? URL.createObjectURL(file) : null

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

    if (file) {
      formData.append('cover', file)
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
