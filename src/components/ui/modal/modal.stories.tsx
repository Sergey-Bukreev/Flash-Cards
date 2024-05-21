import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { ModalProps, ModalWindow } from '@/components/ui/modal/modal'
import { Typography } from '@/components/ui/typography'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ModalWindow> = {
  component: ModalWindow,
  tags: ['autodocs'],
  title: 'Components/UI/Modal',
}

export default meta

type Story = StoryObj<typeof meta>

export const ControlExample: Story = (args: ModalProps) => {
  const [open, setOpen] = useState(args.open)

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true) // Установка состояния open в true
        }}
        variant={'primary'}
      >
        Open Modal
      </Button>
      <ModalWindow {...args} onOpenChange={setOpen} open={open}>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
          }}
        >
          <Typography variant={'subTitle1'}>Modal content</Typography>
          <Typography variant={'body2'}>Some message Some message Some message </Typography>
        </div>
      </ModalWindow>
    </>
  )
}

ControlExample.args = {
  open: false,
  title: 'Modal Title',
}
