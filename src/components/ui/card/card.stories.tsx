import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card'
import { Typography } from '@/components/ui/typography'
import { Meta, StoryObj } from '@storybook/react'

import s from '@/components/ui/card/card.module.scss'

const meta = {
  component: Card,
  tags: ['autodocs'],
  title: 'Components/UI/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultExample: Story = {
  args: {
    children: <div></div>,
  },
}

export const ExampleWithContent: Story = {
  args: {
    children: (
      <div className={s.content}>
        <Typography variant={'h1'}>Card for Test</Typography>
        <Typography variant={'body1'}>Click on button to visit google</Typography>
        <Button as={'a'} href={'https://www.google.com'} variant={'primary'}>
          Click Me
        </Button>
      </div>
    ),
  },
}
