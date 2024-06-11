import { MemoryRouter } from 'react-router-dom'

import { SignIn } from '@/auth/sign-in'
import { Layout } from '@/components/layout/layout'
import { Meta, StoryObj } from '@storybook/react'

type LayoutPropsAndCustomArgs = React.ComponentProps<typeof Layout>

const meta: Meta<LayoutPropsAndCustomArgs> = {
  component: Layout,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/Layout/Layout',
}

export default meta

type Story = StoryObj<LayoutPropsAndCustomArgs>
export const DefaultExample: Story = {
  args: {
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXBnJCBrKnx5d9Ru8Pe6I9JjZR5SaMsdGk2A&usqp=CAU',
    children: (
      <div
        style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', width: '100%' }}
      >
        {'Your advertisement could be here'}
      </div>
    ),
    email: 'emailFortest@gmail.com',
    isLoggedIn: true,
    onLogout: () => alert('Logged out'),
    userName: 'User Name',
  },
}

export const LogOutExample: Story = {
  args: {
    children: (
      <div
        style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', width: '100%' }}
      >
        <SignIn onSubmit={() => alert('Form submitted')} />
      </div>
    ),
    isLoggedIn: false,
  },
}
