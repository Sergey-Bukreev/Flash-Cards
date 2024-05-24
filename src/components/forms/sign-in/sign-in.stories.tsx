import type { Meta, StoryObj } from '@storybook/react'

import { MemoryRouter } from 'react-router-dom'

import { SignIn } from './sign-in'

const meta: Meta<typeof SignIn> = {
  component: SignIn,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/Forms/Sign-In',
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultExample: Story = {}
