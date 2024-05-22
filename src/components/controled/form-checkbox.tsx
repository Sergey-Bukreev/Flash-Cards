import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@/components/ui/checkbox'

export type FormCheckboxProps<T extends FieldValues> = { control: any; name: 'rememberMe' } & Omit<
  CheckboxProps,
  'checked' | 'onChange'
> &
  UseControllerProps<T>
export function FormCheckbox<T extends FieldValues>({
  control,
  name,
  ...rest
}: FormCheckboxProps<T>) {
  const {
    field: { onChange, value, ...field },
  } = useController({
    control,
    defaultValue: name === 'rememberMe' ? false : (undefined as any),
    name,
  })

  return <Checkbox {...rest} {...field} checked={value} onChange={onChange} />
}
