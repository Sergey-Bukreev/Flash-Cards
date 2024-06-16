import { useState } from 'react'

import { FormValues, useCardForm } from '@/components/forms/card-form/use-card-form'
import { Card } from '@/services/cards/card.type'
export type CardFormDefaultValues = Pick<Card, 'answer' | 'answerImg' | 'question' | 'questionImg'>
export type CardFormProps = {
  defaultValues?: CardFormDefaultValues
  onCancel: () => void
  onSubmit: (data: FormValues) => void
}
const options = [
  { label: 'Text', value: 'text' },
  { label: 'Picture', value: 'picture' },
]

export const useCardFormLogic = ({ defaultValues, onSubmit }: CardFormProps) => {
  const values = {
    answer: defaultValues?.answer || '',
    question: defaultValues?.question || '',
  }
  const isImageVariant = defaultValues?.answerImg || defaultValues?.questionImg
  const [questionImg, setQuestionImg] = useState(defaultValues?.questionImg || null)
  const [questionImgError, setQuestionImgError] = useState<null | string>(null)
  const [answerImg, setAnswerImg] = useState(defaultValues?.answerImg || null)
  const [answerImgError, setAnswerImgError] = useState<null | string>(null)
  const [variant, setVariant] = useState(isImageVariant ? 'picture' : 'text')

  const pictureVariant = variant === 'picture'

  const errorData = {
    answerImg: { set: setAnswerImgError, text: answerImgError },
    questionImg: { set: setQuestionImgError, text: questionImgError },
  }

  const previewData = {
    answerImg: { picture: answerImg, set: setAnswerImg },
    questionImg: { picture: questionImg, set: setQuestionImg },
  }
  const { control, getFieldState, handleSubmit, resetField, setValue, trigger, watch } =
    useCardForm(values)

  const questionFile = watch('questionImg')
  const answerFile = watch('answerImg')
  const questionImgIsDirty = getFieldState('questionImg').isDirty
  const answerImgIsDirty = getFieldState('answerImg').isDirty

  const extraActions = (name: 'answerImg' | 'questionImg') => async () => {
    const success = await trigger(name)
    const { error } = getFieldState(name)
    const file = watch(name)

    if (!success && error?.message) {
      errorData[name].set(error.message)
      resetField(name)
    }

    if (file) {
      const noImage = defaultValues?.[name] ?? null
      const img = success ? URL.createObjectURL(file) : noImage

      previewData[name].set(img)

      if (errorData[name].text && !error?.message) {
        errorData[name].set(null)
      }
    }
  }

  const handleSetVariant = (value: string | undefined) => {
    value ? setVariant(value) : setVariant('')
  }
  const deleteQuestionImgHandler = () => {
    setValue('question', '')
    setQuestionImg(null)
    setQuestionImgError(null)
  }
  const deleteAnswerImgHandler = () => {
    setValue('answer', '')
    setAnswerImg(null)
    setAnswerImgError(null)
  }

  const sendHandler = (data: FormValues) => {
    const formData = new FormData()

    formData.append('question', data.question)
    formData.append('answer', data.answer)

    if (isImageVariant) {
      if (questionFile === null) {
        formData.append('questionImg', '')
      } else if (questionImgIsDirty && data.questionImg) {
        formData.append('questionImg', data.questionImg)
      }

      if (answerFile === null) {
        formData.append('answerImg', '')
      } else if (answerImgIsDirty && data.answerImg) {
        formData.append('answerImg', data.answerImg)
      }
    }

    onSubmit(formData as any)
  }
  const handleOnSubmit = handleSubmit(sendHandler)

  return {
    control,
    deleteAnswerImgHandler,
    deleteQuestionImgHandler,
    errorData,
    extraActions,
    handleOnSubmit,
    handleSetVariant,
    options,
    pictureVariant,
    previewData,
    variant,
  }
}
