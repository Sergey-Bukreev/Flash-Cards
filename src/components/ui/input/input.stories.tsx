import React, { useState } from 'react'

import { Input } from '@/components/ui/input/input'

export default {
  argTypes: {
    disabled: { control: 'boolean' },
    errorMessage: { control: 'text' },
    label: { control: 'text' },
    onChange: { action: 'changed' },
    placeholder: { control: 'text' },
    type: {
      control: {
        options: ['text', 'number', 'email', 'password', 'date', 'search'],
        type: 'select',
      },
    },
    value: { control: 'text' },
  },
  component: Input,
  title: 'Components/UI/Input',
}

export const DefaultExample: React.FC = () => {
  const [value, setValue] = useState<string | undefined>('')

  return (
    <Input
      disabled={false}
      label={'Default Input'}
      onChange={e => setValue(e.target.value)}
      placeholder={'Placeholder'}
      type={'text'}
      value={value}
    />
  )
}

export const DisabledExample: React.FC = () => (
  <Input
    disabled
    label={'Default Input disabled'}
    placeholder={'Placeholder'}
    type={'text'}
    value={''}
  />
)

export const WithErrorMessageExample: React.FC = () => (
  <Input
    disabled={false}
    errorMessage={'ErrorMessage'}
    label={'Input with error message'}
    placeholder={'Placeholder'}
    type={'text'}
    value={''}
  />
)

export const PasswordExample: React.FC = () => {
  const [value, setValue] = useState<string | undefined>('')

  return (
    <Input
      disabled={false}
      label={'password'}
      onChange={e => setValue(e.target.value)}
      placeholder={'Enter search query'}
      type={'password'}
      value={value}
    />
  )
}

export const SearchExample: React.FC = () => {
  const [value, setValue] = useState<string | undefined>('')

  const handleClear = () => {
    setValue('')
  }

  return (
    <Input
      clear={handleClear}
      disabled={false}
      label={'Search'}
      onChange={e => setValue(e.target.value)}
      placeholder={'Enter search query'}
      type={'search'}
      value={value}
    />
  )
}

export const SearchWithErrorExample: React.FC = () => {
  const [value, setValue] = useState<string | undefined>('')

  const handleClear = () => {
    setValue('')
  }

  return (
    <Input
      clear={handleClear}
      disabled={false}
      errorMessage={'errorMessage'}
      label={'Search'}
      onChange={e => setValue(e.target.value)}
      placeholder={'Enter search query'}
      type={'search'}
      value={value}
    />
  )
}
