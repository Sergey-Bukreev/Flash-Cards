import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const createNewPasswordSchema = z.object({
  password: z.string().min(3),
})

export type FormValues = z.infer<typeof createNewPasswordSchema>
export const useCreateNewpPassword = () => {
  return useForm<FormValues>({
    defaultValues: {
      password: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(createNewPasswordSchema),
  })
}
