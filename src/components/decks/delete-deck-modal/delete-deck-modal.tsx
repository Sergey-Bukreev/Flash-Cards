import { FC } from 'react'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ModalWindow } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { useDeleteDeckMutation } from '@/services/decks/decks.sevice'

import s from './delete-deck-modal.module.scss'
export type DeleteModalProps = {
  id: string
  isOpen: boolean
  name: string | undefined
  onClose: () => void
}
export const DeleteDeckModal: FC<DeleteModalProps> = ({
  id,
  isOpen,
  name,
  onClose,
}: DeleteModalProps) => {
  const [deleteDeck] = useDeleteDeckMutation()
  const handleOnCancel = () => onClose()
  const handleOnDelete = async () => {
    try {
      await deleteDeck({ id }).unwrap()
      toast.success(`Deck "${name}" deleted successfully.`)
      onClose()
    } catch (error: any) {
      toast.error(error.data.message ?? `Failed to delete Deck "${name}"`)
    }
  }

  return (
    <ModalWindow onOpenChange={onClose} open={isOpen} title={'Delete Pack'}>
      <Card className={s.card}>
        <Typography variant={'body1'}>
          {`Do you really want to remove ${name}? All cards will be deleted.`}
        </Typography>
        <div className={s.buttonWrapper}>
          <Button onClick={handleOnCancel} variant={'secondary'}>
            {'Cancel'}
          </Button>
          <Button onClick={handleOnDelete} variant={'primary'}>
            {'Delete'}
          </Button>
        </div>
      </Card>
    </ModalWindow>
  )
}
