import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { RadioGroup, RadioGroupProps } from '@/components/ui/radio-group/radio-group'

type FormRadioGroupProps<T extends FieldValues> = {
  control: any
  name: 'grade'
} & Omit<RadioGroupProps, 'onValueChange' | 'value'> &
  UseControllerProps<T>

export function FormRadioGroup<T extends FieldValues>({
  control,
  name,
  ...rest
}: FormRadioGroupProps<T>) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  return (
    <RadioGroup errorMessage={error?.message} onValueChange={onChange} value={value} {...rest} />
  )
}
