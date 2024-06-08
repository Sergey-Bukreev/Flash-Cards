import { CreateDeckForm } from '@/components/forms/create-deck-form/create-deck-form'
import { FormValues } from '@/components/forms/create-deck-form/use-create-deck-form'
import { ModalWindow } from '@/components/ui/modal'
import { useCreateDeckMutation } from '@/services/decks/decks.sevice'
export type CreateDeckModalProps = {
  isOpen: boolean
  onClose: () => void
}
export const CreateDeckModal = ({ isOpen, onClose }: CreateDeckModalProps) => {
  const [createDeck] = useCreateDeckMutation()

  const handleOnCancel = () => onClose()

  const handleOnSubmit = async (data: FormValues) => {
    try {
      await createDeck(data).unwrap()
      onClose()
    } catch (error) {
      console.error('Failed to create deck:', error)
    }
  }

  return (
    <ModalWindow onOpenChange={onClose} open={isOpen} title={'Add New Deck'}>
      <CreateDeckForm onCancel={handleOnCancel} onSubmit={handleOnSubmit} />
    </ModalWindow>
  )
}
