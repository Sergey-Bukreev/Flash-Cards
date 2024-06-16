import { FromFileLoader } from '@/components/controled/form-file-loader'
import { FormInput } from '@/components/controled/form-input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select } from '@/components/ui/select'

import s from './card-form.module.scss'

import { CardFormProps, useCardFormLogic } from './use-card-form-logic'

export const CardForm = ({ defaultValues, onCancel, onSubmit }: CardFormProps) => {
  const {
    control,
    deleteAnswerImgHandler,
    deleteQuestionImgHandler,
    errorData,
    extraActions,
    handleOnSubmit,
    handleSetVariant,
    options,
    pictureVariant,
    previewData,
    variant,
  } = useCardFormLogic({
    defaultValues,
    onSubmit,
  } as CardFormProps)

  return (
    <Card className={s.card}>
      <form onSubmit={handleOnSubmit}>
        <Select
          label={'Chose a Question variant'}
          onValueChange={handleSetVariant}
          options={options}
          value={variant}
        />
        <div className={s.inputWrapper}>
          <FormInput control={control} name={'question'} placeholder={'Write Question...'} />
        </div>

        {pictureVariant && (
          <FromFileLoader
            control={control}
            deleteCoverHandler={deleteQuestionImgHandler}
            errorMessage={errorData.questionImg.text}
            extraActions={extraActions('questionImg')}
            fullWidth
            name={'questionImg'}
            preview={previewData.questionImg.picture}
            variant={'secondary'}
          />
        )}
        <div className={s.inputWrapper}>
          <FormInput control={control} name={'answer'} placeholder={'Write Answer...'} />
        </div>
        {pictureVariant && (
          <FromFileLoader
            control={control}
            deleteCoverHandler={deleteAnswerImgHandler}
            errorMessage={errorData.answerImg.text}
            extraActions={extraActions('answerImg')}
            fullWidth
            name={'answerImg'}
            preview={previewData.answerImg.picture}
            variant={'secondary'}
          />
        )}
        <div className={s.buttonWrapper}>
          <Button onClick={onCancel} type={'button'} variant={'secondary'}>
            {'Cancel'}
          </Button>
          <Button variant={'primary'}>{'Submit'}</Button>
        </div>
      </form>
    </Card>
  )
}
