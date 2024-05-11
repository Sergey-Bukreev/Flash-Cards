import type { Meta, StoryObj } from '@storybook/react'

import { Select } from '@/components/ui/select/select'

const meta = {
  argTypes: { onValueChange: { action: 'select changes' } },
  component: Select,
  tags: ['autodocs'],
  title: 'Components/UI/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const data = [
  { label: 'Variant 1', value: '1' },
  { label: 'Variant 2', value: '2' },
  { label: 'Variant 3', value: '3' },
  { label: 'Variant 4', value: '4' },
  { label: 'Variant 5', value: '5' },
]

export const ControlExample: Story = {
  args: {
    disabled: false,
    label: 'Select',
    options: data,
  },
}

export const DisabledExample: Story = {
  args: {
    disabled: true,
    label: 'Select',
    options: data,
    value: '1',
  },
}
