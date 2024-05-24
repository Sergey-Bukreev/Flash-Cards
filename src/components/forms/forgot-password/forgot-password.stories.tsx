import type { Meta, StoryObj } from '@storybook/react'

import { MemoryRouter } from 'react-router-dom'

import { ForgotPassword } from '@/components/forms/forgot-password/forgot-password'

const meta: Meta<typeof ForgotPassword> = {
  component: ForgotPassword,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/Forms/Forgot-Password',
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultExample: Story = {}
