import type { Meta, StoryObj } from '@storybook/react'

import { MemoryRouter } from 'react-router-dom'

import { EditProfileForm } from '@/components/forms/edit-profile-form/edit-profile-form'

const meta: Meta<typeof EditProfileForm> = {
  component: EditProfileForm,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/Forms/Edit-profile',
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultExample: Story = {
  args: {},
}
