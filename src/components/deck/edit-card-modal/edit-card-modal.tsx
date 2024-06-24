import { toast } from 'react-toastify'

import { CreateCarModalProps } from '@/components/deck/create-card-modal'
import { CardForm } from '@/components/forms/card-form'
import { FormValues } from '@/components/forms/card-form/use-card-form'
import { ModalWindow } from '@/components/ui/modal'
import { useUpdateCardMutation } from '@/services/cards/card.service'
import { CardParams } from '@/services/cards/card.type'
export type EditCardModalProps = {
  answer: string
  answerImg: null | string
  question: string
  questionImg: null | string
} & CreateCarModalProps
export const EditCardModal = (props: EditCardModalProps) => {
  const { answer, answerImg, id, isOpen, onClose, question, questionImg } = props
  const defaultValues = { answer, answerImg, question, questionImg }
  const [updateCard] = useUpdateCardMutation()
  const handleOnCancel = () => onClose()
  const handleOnSubmit = async (data: FormValues) => {
    try {
      await updateCard({ id, params: data as CardParams })
      toast.success(`Card "${question}" updated successfully.`)
      onClose()
    } catch (error: any) {
      toast.error(error.data.message ?? `Failed to update card "${question}"`)
    }
  }

  return (
    <ModalWindow onOpenChange={onClose} open={isOpen} title={'Edit Card'}>
      <CardForm defaultValues={defaultValues} onCancel={handleOnCancel} onSubmit={handleOnSubmit} />
    </ModalWindow>
  )
}
