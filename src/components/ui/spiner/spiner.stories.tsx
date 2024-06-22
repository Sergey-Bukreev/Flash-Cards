import { Spiner } from '@/components/ui/spiner/spiner'
import { Meta, type StoryObj } from '@storybook/react'
const meta: Meta<typeof Spiner> = {
  component: Spiner,
  tags: ['autodocs'],
  title: 'Components/Spiner',
}

export default meta

type Story = StoryObj<typeof meta>
export const DefaultExample: Story = {
  args: {},
}
