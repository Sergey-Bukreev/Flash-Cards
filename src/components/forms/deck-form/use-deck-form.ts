import { useForm } from 'react-hook-form'

import { fileSchema } from '@/components/common/utils/fileSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const DeckFormSchema = z.object({
  cover: fileSchema,
  isPrivate: z.boolean(),
  name: z.string().trim(),
})

export type FormValues = z.infer<typeof DeckFormSchema>
export const useCreateDeck = (props: FormValues) => {
  return useForm<FormValues>({
    defaultValues: props,
    mode: 'onSubmit',
    resolver: zodResolver(DeckFormSchema),
  })
}
