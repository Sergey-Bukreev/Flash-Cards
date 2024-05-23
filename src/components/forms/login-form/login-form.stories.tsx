import type { Meta, StoryObj } from '@storybook/react'

import { MemoryRouter } from 'react-router-dom'

import { LoginForm } from './login-form'

const meta: Meta<typeof LoginForm> = {
  component: LoginForm,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/Forms/LoginForm',
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultExample: Story = {}
