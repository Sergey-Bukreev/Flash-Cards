import { useForm } from 'react-hook-form'

import { fileSchema } from '@/components/common/utils/fileSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const createDeckFormSchema = z.object({
  cover: fileSchema,
  isPrivate: z.boolean(),
  name: z.string().trim(),
})

export type FormValues = z.infer<typeof createDeckFormSchema>
export const useCreateDeck = () => {
  return useForm<FormValues>({
    defaultValues: {
      cover: null,
      isPrivate: false,
      name: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(createDeckFormSchema),
  })
}
