import { CardForm } from '@/components/forms/card-form'
import { FormValues } from '@/components/forms/card-form/use-card-form'
import { ModalWindow } from '@/components/ui/modal'
import { useCreateCardMutation } from '@/services/cards/card.service'
import { CardParams } from '@/services/cards/card.type'

export type CreateCarModalProps = {
  id: string
  isOpen: boolean
  onClose: () => void
}
export const CreateCardModal = ({ id, isOpen, onClose }: CreateCarModalProps) => {
  const [createCard] = useCreateCardMutation()
  const handleOnCancel = () => onClose()

  const handleOnnSubmit = async (data: FormValues) => {
    try {
      await createCard({ body: data as CardParams, id }).unwrap()
      onClose()
    } catch (error) {
      console.error('Failed to create card:', error)
    }
  }

  return (
    <ModalWindow onOpenChange={onClose} open={isOpen} title={'Add New Card'}>
      <CardForm onCancel={handleOnCancel} onSubmit={handleOnnSubmit} />
    </ModalWindow>
  )
}
