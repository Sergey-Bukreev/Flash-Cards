import type { Meta, StoryObj } from '@storybook/react'

import { MemoryRouter } from 'react-router-dom'

import { CreateDeckForm } from '@/components/forms/create-deck-form/create-deck-form'

const meta: Meta<typeof CreateDeckForm> = {
  component: CreateDeckForm,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/Forms/CreateDeckForm',
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultExample: Story = {
  args: {
    onSubmit: data => console.log('Form Submitted', data),
  },
}
