import { MemoryRouter } from 'react-router-dom'

import { Header } from '@/components/header/header'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {
    onLogout: { action: 'logout' },
  },
  component: Header,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/Header/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>
export const LoggedInExample: Story = {
  // @ts-expect-error
  args: {
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXBnJCBrKnx5d9Ru8Pe6I9JjZR5SaMsdGk2A&usqp=CAU',
    email: 'emailFortest@gmail.com',
    isLoggedIn: true,
    onLogout: () => {},
    userName: 'User Name',
  },
}
export const LoggedOutExample: Story = {
  // @ts-expect-error
  args: {
    isLoggedIn: false,
  },
}
