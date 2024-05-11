import { Option } from '@/components/ui/radio-group/radio-group'
import { ArrowDownIcon } from '@/components/ui/select/icons/arrow-down-icon'
import { Typography } from '@/components/ui/typography'
import * as CustomSelect from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

export type SelectProps = {
  defaultValue?: string
  disabled?: boolean
  label?: string
  onValueChange?: (value?: string) => void
  options: Option[]
  placeholder?: string
  value?: string
}

export const Select = (props: SelectProps) => {
  const { defaultValue, disabled, label, onValueChange, options, placeholder, value } = props

  return (
    <Typography as={'label'} className={clsx(s.Label, disabled && s.disabled)} variant={'body2'}>
      {label}
      <CustomSelect.Root
        defaultValue={defaultValue}
        disabled={disabled}
        onValueChange={onValueChange}
        value={value}
      >
        <CustomSelect.Trigger className={clsx(s.SelectTrigger, disabled && s.disabled)}>
          <CustomSelect.Value placeholder={placeholder} />
          <ArrowDownIcon className={clsx(s.Icon, disabled && s.disabled)} />
        </CustomSelect.Trigger>
        <CustomSelect.Portal>
          <CustomSelect.Content className={s.SelectContent} position={'popper'}>
            <CustomSelect.Viewport className={s.SelectViewport}>
              {options.map(option => (
                <CustomSelect.Item
                  className={clsx(s.SelectItem, disabled && s.disabled)}
                  key={option.value}
                  value={option.value}
                >
                  <CustomSelect.ItemText>
                    <Typography className={clsx(disabled && s.disabled)} variant={'body2'}>
                      {option.label}
                    </Typography>
                  </CustomSelect.ItemText>
                </CustomSelect.Item>
              ))}
            </CustomSelect.Viewport>
          </CustomSelect.Content>
        </CustomSelect.Portal>
      </CustomSelect.Root>
    </Typography>
  )
}
