import { useState } from 'react'

import { Tabs } from '@/components/ui/tabs/tabs'
import { Meta } from '@storybook/react'

const meta = {
  component: Tabs,
  tags: ['autodocs'],
  title: 'Components/UI/Tabs',
} satisfies Meta<typeof Tabs>

export default meta

const tabs = [
  { name: 'Page 1', value: 'page 1 content' },
  { name: 'Page 2', value: 'page 2 content' },
  { name: 'Page 3', value: 'page 3 content' },
  { name: 'Page 4', value: 'page 4 content' },
  { disabled: true, name: 'Page disabled', value: 'page disabled' },
]

export const DefaultExample = {
  render: () => {
    return (
      <div>
        <Tabs label={'LABEL'} tabs={tabs} value={tabs[2].value} />
      </div>
    )
  },
}
export const ControlExample = {
  render: () => {
    const [value, setValue] = useState<string>(tabs[0].value)

    const handleChange = (newValue: string) => {
      setValue(newValue)
    }

    return (
      <div>
        <Tabs label={'click on page'} onValueChange={handleChange} tabs={tabs} value={value} />
      </div>
    )
  },
}
