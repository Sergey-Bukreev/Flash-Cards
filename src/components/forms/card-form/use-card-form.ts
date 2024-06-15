import { useForm } from 'react-hook-form'

import { fileSchema } from '@/components/common/utils/fileSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
const CardFormScheme = z.object({
  answer: z.string().trim(),
  answerImg: fileSchema,
  question: z.string().trim(),
  questionImg: fileSchema,
})

export type FormValues = z.infer<typeof CardFormScheme>
export const useCardForm = (props: FormValues) => {
  return useForm<FormValues>({
    defaultValues: props,
    mode: 'onSubmit',
    resolver: zodResolver(CardFormScheme),
  })
}
