import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Option, RadioGroup } from '@/components/ui/radio-group/radio-group'

const meta = {
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/Radio Group',
} satisfies Meta<typeof RadioGroup>

const data: Option[] = [
  { label: 'Variant 1', value: '1' },
  { label: 'Variant 2', value: '2' },
  { label: 'Variant 3', value: '3' },
  { label: 'Variant 4', value: '4' },
  { label: 'Variant 5', value: '5' },
]

export default meta
type Story = StoryObj<typeof meta>
export const DefaultExample: Story = {
  args: {
    disabled: false,
    options: data,
    value: '3',
  },
}

export const DisabledExample: Story = {
  args: {
    disabled: true,
    options: data,
    value: '2',
  },
}
export const ControlExample: Story = {
  args: {
    options: data,
  },

  render: args => {
    const [value, setValue] = useState('1')

    return (
      <div>
        <RadioGroup {...args} onValueChange={setValue} value={value} />
      </div>
    )
  },
}

export const WithErrorExample: Story = {
  args: {
    errorMessage: 'Error message Error Message',
    options: data,
    value: '5',
  },
}
