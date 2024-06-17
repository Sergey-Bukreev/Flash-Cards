import { useForm } from 'react-hook-form'

import { FormRadioGroup } from '@/components/controled/form-radio-group'
import { Button } from '@/components/ui/button'

import s from './rate-card-form.module.scss'

const options = [
  { label: 'Did not know', value: '1' },
  { label: 'Forgot', value: '2' },
  { label: 'A lot of thought', value: '3' },
  { label: 'Confused', value: '4' },
  { label: 'Knew the answer', value: '5' },
]

export type RateType = { grade: string }
export type RateCardFormProps = {
  onSubmit: (data: RateType) => void
}
export const RateCardForm = ({ onSubmit }: RateCardFormProps) => {
  const { control, handleSubmit } = useForm<RateType>({
    defaultValues: { grade: '1' },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRadioGroup control={control} name={'grade'} options={options} />
      <Button className={s.button} fullWidth>
        Next Question
      </Button>
    </form>
  )
}
