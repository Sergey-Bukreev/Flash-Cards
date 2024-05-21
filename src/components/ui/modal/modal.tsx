import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'

import { CloseIcon } from '@/components/ui/input/icons/iconsPack/close-outline'
import { Typography } from '@/components/ui/typography'
import * as Modal from '@radix-ui/react-dialog'

import s from './modal.module.scss'
export type ModalProps = {
  children: ReactNode
  onOpenChange: (open: boolean) => void
  open: boolean
  title: string
} & Omit<ComponentPropsWithoutRef<typeof Modal.Dialog>, 'onOpenChange' | 'open'>
export const ModalWindow: FC<ModalProps> = (props: ModalProps) => {
  const { children, onOpenChange, open, title, ...rest } = props

  return (
    <Modal.Root onOpenChange={onOpenChange} open={open} {...rest}>
      <Modal.Portal>
        <Modal.Overlay className={s.ModalOverlay} />
        <Modal.Content className={s.ModalContent}>
          <div className={s.ModalHeader}>
            <Modal.Title asChild>
              <Typography as={'h2'} variant={'h2'}>
                {title}
              </Typography>
            </Modal.Title>
            <Modal.Description />
            <Modal.Close className={s.closeButton}>
              <CloseIcon />
            </Modal.Close>
          </div>

          {children}
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}
