import { MemoryRouter } from 'react-router-dom'

import { Header } from '@/components/header/header'
import { Meta, StoryObj } from '@storybook/react'
type HeaderPropsAndCustomArgs = React.ComponentProps<typeof Header>
const meta: Meta<HeaderPropsAndCustomArgs> = {
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
}

export default meta
type Story = StoryObj<HeaderPropsAndCustomArgs>
export const LoggedInExample: Story = {
  args: {
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXBnJCBrKnx5d9Ru8Pe6I9JjZR5SaMsdGk2A&usqp=CAU',
    email: 'emailFortest@gmail.com',
    isAuthenticated: true,
    onLogout: () => {},
    userName: 'User Name',
  },
}
export const LoggedOutExample: Story = {
  args: {
    isAuthenticated: false,
  },
}
