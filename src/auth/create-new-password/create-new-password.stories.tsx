import type { Meta, StoryObj } from '@storybook/react'

import { MemoryRouter } from 'react-router-dom'

import { CreateNewPassword } from '@/auth/create-new-password/create-new-password'

const meta: Meta<typeof CreateNewPassword> = {
  component: CreateNewPassword,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/Forms/Create-New-Password',
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultExample: Story = {}
