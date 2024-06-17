import { Rating } from '@/components/ui/rating'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Rating,
  tags: ['autodocs'],
  title: 'Components/UI/Rating',
} satisfies Meta<typeof Rating>

export default meta

type Story = StoryObj<typeof meta>

export const DefaultExample: Story = {
  args: {},
}
export const SelectedExample: Story = {
  args: {
    selectedGrade: 3,
  },
}

export const BigSizeExample: Story = {
  args: {
    size: 100,
  },
}
