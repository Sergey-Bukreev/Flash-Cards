import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const createDeckFormSchema = z.object({
  cover: z.string().trim(),
  isPrivate: z.boolean(),
  name: z.string().trim(),
})

export type FormValues = z.infer<typeof createDeckFormSchema>
export const useCreateDeck = () => {
  return useForm<FormValues>({
    defaultValues: {
      cover: '',
      isPrivate: false,
      name: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(createDeckFormSchema),
  })
}
