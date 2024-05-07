import { CheckedIcon } from '@/components/ui/checkbox/icon/checkIcon'
import { Typography } from '@/components/ui/typography'
import * as CustomCheckbox from '@radix-ui/react-checkbox'
import clsx from 'clsx'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  checked?: boolean
  className?: string
  disabled?: boolean
  label?: string
  onChange?: (checked: boolean) => void
}
export const Checkbox: React.FC<CheckboxProps> = props => {
  const { checked, className, disabled, label, onChange } = props

  return (
    <form>
      <div style={{ alignItems: 'center', display: 'flex' }}>
        <CustomCheckbox.Root
          checked={checked}
          className={clsx(s.CheckboxRoot, disabled && s.disabled, className)}
          id={'c1'}
          onCheckedChange={onChange}
        >
          {checked && (
            <CustomCheckbox.Indicator className={clsx(s.CheckboxIndicator, disabled && s.disabled)}>
              <CheckedIcon className={clsx(disabled && s.disabled)} />
            </CustomCheckbox.Indicator>
          )}
        </CustomCheckbox.Root>
        <Typography
          as={'label'}
          className={clsx(s.Label, disabled && s.disabled)}
          htmlFor={'c1'}
          variant={'body2'}
        >
          {label}
        </Typography>
      </div>
    </form>
  )
}
