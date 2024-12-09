import { toast } from 'react-toastify'

import { CreateDeckModalProps } from '@/components/decks/create-deck-modal'
import { DeckForm } from '@/components/forms/deck-form'
import { FormValues } from '@/components/forms/deck-form/use-deck-form'
import { ModalWindow } from '@/components/ui/modal'
import { useUpdateDeckMutation } from '@/services/decks/decks.sevice'
import { UpdateDecksArgs } from '@/services/decks/decks.type'

export type EditDeckModalProps = {
  cover: null | string
  id: string
  isPrivate: boolean
  name: string
} & CreateDeckModalProps

export const EditDeckModal = ({
  cover,
  id,
  isOpen,
  isPrivate,
  name,
  onClose,
}: EditDeckModalProps) => {
  const defaultValues = {
    cover,
    isPrivate,
    name,
  }
  const [updateDeck] = useUpdateDeckMutation()

  const handleOnCancel = () => onClose()
  const handleOnSubmit = async (data: FormValues) => {
    try {
      await updateDeck({ body: data, id } as UpdateDecksArgs).unwrap()
      toast.success(`Deck "${name}" updated successfully.`)
      onClose()
    } catch (error: any) {
      toast.error(error.data.message ?? `Failed to update Deck "${name}"`)
    }
  }

  return (
    <ModalWindow onOpenChange={onClose} open={isOpen} title={'Edit Deck'}>
      <DeckForm defaultValues={defaultValues} onCancel={handleOnCancel} onSubmit={handleOnSubmit} />
    </ModalWindow>
  )
}
