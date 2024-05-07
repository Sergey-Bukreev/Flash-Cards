import { useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox/checkbox'

export default {
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    onChange: { action: 'changed' },
  },
  component: Checkbox,
  title: 'Components/UI/Checkbox',
}
export const DefaultExample = () => {
  return <Checkbox label={'default checkbox'} />
}
export const DisabledExample = () => {
  return <Checkbox disabled label={'disabled checkbox'} />
}
export const CheckedExample = () => {
  return <Checkbox checked label={'checked checkbox'} />
}
export const DisabledCheckedExample = () => {
  return <Checkbox checked disabled label={'disabled checked'} />
}
export const ControlExample = () => {
  const [checked, setChecked] = useState<boolean>(false)

  return (
    <Checkbox
      checked={checked}
      label={'control checkbox'}
      onChange={() => setChecked(prevChecked => !prevChecked)}
    />
  )
}
