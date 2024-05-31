import type { Meta, StoryObj } from '@storybook/react'

import { MemoryRouter } from 'react-router-dom'

import { UserDropDown } from '@/components/header/user-drop-down/user-drop-down'

const meta: Meta<typeof UserDropDown> = {
  component: UserDropDown,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/Header/UserDropDown',
}

export default meta

type Story = StoryObj<typeof UserDropDown>

export const DefaultExample: Story = {
  args: {
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXBnJCBrKnx5d9Ru8Pe6I9JjZR5SaMsdGk2A&usqp=CAU',
    email: 'test@test.com',
    userName: 'Test User Name',
  },
  render: args => {
    return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <UserDropDown
          avatar={args.avatar}
          email={args.email}
          onLogout={() => {}}
          userName={args.userName}
        />
      </div>
    )
  },
}

export const WithOutAvatarExample: Story = {
  args: {
    avatar: undefined,
    email: 'anotherUserLongEmail@test.com',
    userName: 'Another User',
  },
  render: args => {
    return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <UserDropDown
          avatar={args.avatar}
          email={args.email}
          onLogout={() => {}}
          userName={args.userName}
        />
      </div>
    )
  },
}
