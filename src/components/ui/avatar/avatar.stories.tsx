import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from '@/components/ui/avatar/avatar'

const meta = {
  component: Avatar,
  tags: ['autodocs'],
  title: 'Components/UI/Avatar',
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 100,
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXBnJCBrKnx5d9Ru8Pe6I9JjZR5SaMsdGk2A&usqp=CAU',
  },
}
