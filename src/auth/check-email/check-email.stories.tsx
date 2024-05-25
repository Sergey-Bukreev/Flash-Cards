import type { Meta, StoryObj } from '@storybook/react'

import { MemoryRouter } from 'react-router-dom'

import { CheckEmail } from '@/auth/check-email/check-email'

const meta: Meta<typeof CheckEmail> = {
  component: CheckEmail,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/Forms/Check-Email',
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultExample: Story = {
  args: {
    email: 'testEmail@google.com',
  },
}
