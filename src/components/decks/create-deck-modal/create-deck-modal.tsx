import { DeckForm } from '@/components/forms/deck-form/deck-form'
import { FormValues } from '@/components/forms/deck-form/use-deck-form'
import { ModalWindow } from '@/components/ui/modal'
import { useCreateDeckMutation } from '@/services/decks/decks.sevice'
import { CreateDecksArgs } from '@/services/decks/decks.type'
export type CreateDeckModalProps = {
  isOpen: boolean
  onClose: () => void
}
export const CreateDeckModal = ({ isOpen, onClose }: CreateDeckModalProps) => {
  const [createDeck] = useCreateDeckMutation()

  const handleOnCancel = () => onClose()

  const handleOnSubmit = async (data: FormValues) => {
    try {
      await createDeck(data as CreateDecksArgs).unwrap()
      onClose()
    } catch (error) {
      console.error('Failed to create deck:', error)
    }
  }

  return (
    <ModalWindow onOpenChange={onClose} open={isOpen} title={'Add New Deck'}>
      <DeckForm onCancel={handleOnCancel} onSubmit={handleOnSubmit} />
    </ModalWindow>
  )
}
