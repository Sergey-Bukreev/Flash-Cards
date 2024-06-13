import { FormCheckbox } from '@/components/controled/form-checkbox'
import { FromFileLoader } from '@/components/controled/form-file-loader/from-file-loader'
import { FormInput } from '@/components/controled/form-input'
import { DeckFormProps, useDeckFormLogic } from '@/components/forms/deck-form/use-deck-form-logic'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import s from './deck-form.module.scss'

export const DeckForm = ({ defaultValues, onCancel, onSubmit }: DeckFormProps) => {
  const { control, coverError, deleteCoverHandler, downloaded, extraActions, handleOnSubmit } =
    useDeckFormLogic({ defaultValues, onSubmit } as DeckFormProps)

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
            {'Submit'}
          </Button>
        </div>
      </form>
    </Card>
  )
}
