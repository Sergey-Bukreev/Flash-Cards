import type { Meta, StoryObj } from '@storybook/react'

import { MemoryRouter } from 'react-router-dom'

import { EditProfileForm } from '@/auth/edit-profile/edit-profile'
import { Avatar } from '@/components/ui/avatar'

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
  args: {
    children: (
      <Avatar
        size={96}
        src={
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXBnJCBrKnx5d9Ru8Pe6I9JjZR5SaMsdGk2A&usqp=CAU'
        }
      />
    ),
  },
}
