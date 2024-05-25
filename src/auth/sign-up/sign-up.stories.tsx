import type { Meta, StoryObj } from '@storybook/react'

import { MemoryRouter } from 'react-router-dom'

import { SignUp } from '@/auth/sign-up/sign-up'

const meta: Meta<typeof SignUp> = {
  component: SignUp,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/Forms/Sign-Up',
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultExample: Story = {}
