import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ModalWindow } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { useDeleteCardMutation } from '@/services/cards/card.service'

import s from './delete-card-modal.module.scss'
export type DeleteCardModalProps = {
  id: string
  isOpen: boolean
  name: string | undefined
  onClose: () => void
}
export const DeleteCardModal = ({ id, isOpen, name, onClose }: DeleteCardModalProps) => {
  const [deleteCard] = useDeleteCardMutation()
  const handleOnCancel = () => onClose()
  const handleOnDelete = async () => {
    try {
      await deleteCard({ id }).unwrap()
      toast.success(`Card "${name}" deleted successfully.`)
      onClose()
    } catch (error: any) {
      toast.error(error.data.message ?? `Failed to delete the card "${name}"`)
    }
  }

  return (
    <ModalWindow onOpenChange={onClose} open={isOpen} title={'Delete Card'}>
      <Card className={s.card}>
        <Typography variant={'body1'}>{`Do you really want to remove card "${name}"?`}</Typography>
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
