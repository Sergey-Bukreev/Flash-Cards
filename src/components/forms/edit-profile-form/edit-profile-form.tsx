import { PropsWithChildren } from 'react'

import { FormInput } from '@/components/controled/form-input'
import {
  EditProfileFormDefaultValues,
  FormValues,
  useEditProfileForm,
} from '@/components/forms/edit-profile-form/use-edit-profile-form'
import { Button } from '@/components/ui/button'

import s from './edit-profile-form.module.scss'

export type EditProfileFormProps = {
  className?: string
  defaultValues?: EditProfileFormDefaultValues
  onSubmit: (data: FormValues) => Promise<void>
} & PropsWithChildren

export const EditProfileForm = ({ className, defaultValues, onSubmit }: EditProfileFormProps) => {
  const { control, handleSubmit } = useEditProfileForm(defaultValues)

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.inputWrapper}>
        <FormInput
          control={control}
          defaultValue={defaultValues?.name}
          label={'Nickname'}
          name={'name'}
          type={'text'}
        />
      </div>
      <Button className={s.button} fullWidth>
        {'Save Changes'}
      </Button>
    </form>
  )
}
