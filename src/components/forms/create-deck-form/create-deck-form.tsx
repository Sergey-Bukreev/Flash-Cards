import { FormCheckbox } from '@/components/controled/form-checkbox'
import { FormInput } from '@/components/controled/form-input'
import { FormValues, useCreateDeck } from '@/components/forms/create-deck-form/use-create-deck-form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import s from './create-deck-form.module.scss'

export type CreateDeckFormPops = {
  onCancel: () => void
  onSubmit: (data: FormValues) => void
}
export const CreateDeckForm = ({ onCancel, onSubmit }: CreateDeckFormPops) => {
  const { control, handleSubmit } = useCreateDeck()
  const handleOnSubmit = handleSubmit(onSubmit)

  return (
    <Card className={s.card}>
      <form onSubmit={handleOnSubmit}>
        <div className={s.inputWrapper}>
          <FormInput control={control} label={'Deck Name'} name={'name'} type={'text'} />
        </div>

        <FormCheckbox
          className={s.checkbox}
          control={control}
          label={'Private pack'}
          name={'isPrivate'}
        />
        <div className={s.buttonWrapper}>
          <Button onClick={onCancel} variant={'secondary'}>
            {'Cancel'}
          </Button>
          <Button variant={'primary'}>{'Add New Pack'}</Button>
        </div>
      </form>
    </Card>
  )
}
