import type { Meta, StoryObj } from '@storybook/react'

import { MemoryRouter } from 'react-router-dom'

import { DeckForm } from '@/components/forms/deck-form/deck-form'

const meta: Meta<typeof DeckForm> = {
  component: DeckForm,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/Forms/DeckForm',
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultExample: Story = {
  args: {
    onSubmit: data => console.log('Form Submitted', data),
  },
}
