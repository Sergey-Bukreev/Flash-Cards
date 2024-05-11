import { Typography } from '@/components/ui/typography'
import * as CustomRadioGroup from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import s from './radio-group.module.scss'

export type Option = {
  label: string
  value: string
}
export type RadioGroupProps = {
  disabled?: boolean
  errorMessage?: string
  name?: string
  onValueChange?: (value: string) => void
  options: Option[]
  value?: string
}
export const RadioGroup = (props: RadioGroupProps) => {
  const { disabled, errorMessage, name, onValueChange, options, value } = props

  return (
    <CustomRadioGroup.Root
      className={s.RadioGroupRoot}
      disabled={disabled}
      name={name}
      onValueChange={onValueChange}
      value={value}
    >
      {options.map((option, index) => (
        <Typography as={'label'} className={s.Label} key={index} variant={'body2'}>
          <CustomRadioGroup.Item
            className={clsx(s.RadioGroupItem, disabled && s.disabled)}
            value={option.value}
          >
            <CustomRadioGroup.Indicator
              className={clsx(s.RadioGroupIndicator, disabled && s.disabled)}
            />
          </CustomRadioGroup.Item>
          {option.label}
        </Typography>
      ))}
      {errorMessage && (
        <Typography className={s.errorMessage} variant={'caption'}>
          {errorMessage}
        </Typography>
      )}
    </CustomRadioGroup.Root>
  )
}
