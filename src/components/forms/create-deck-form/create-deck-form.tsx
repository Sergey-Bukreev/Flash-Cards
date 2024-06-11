import { FormCheckbox } from '@/components/controled/form-checkbox'
import { FromFileLoader } from '@/components/controled/form-file-loader/from-file-loader'
import { FormInput } from '@/components/controled/form-input'
import { FormValues } from '@/components/forms/create-deck-form/use-create-deck-form'
import { useCreateDeckFormLogic } from '@/components/forms/create-deck-form/use-create-deck-form-logic'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import s from './create-deck-form.module.scss'

export type CreateDeckFormProps = {
  onCancel: () => void
  onSubmit: (data: FormValues) => void
}
export const CreateDeckForm = ({ onCancel, onSubmit }: CreateDeckFormProps) => {
  const { control, coverError, deleteCoverHandler, downloaded, extraActions, handleOnSubmit } =
    useCreateDeckFormLogic(onSubmit)

  return (
    <Card className={s.card}>
      <form onSubmit={handleOnSubmit}>
        <FromFileLoader
          control={control}
          deleteCoverHandler={deleteCoverHandler}
          errorMessage={coverError}
          extraActions={extraActions}
          fullWidth
          name={'cover'}
          preview={downloaded}
          variant={'secondary'}
        >
          {'Upload Cover'}
        </FromFileLoader>
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
          <Button type={'submit'} variant={'primary'}>
            {'Add Deck'}
          </Button>
        </div>
      </form>
    </Card>
  )
}
