import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const editNameSchema = z.object({
  name: z.string().trim().min(3, 'The name must be at least 3 characters'),
})

export type FormValues = z.infer<typeof editNameSchema>
export const useEditProfile = () => {
  return useForm<FormValues>({
    defaultValues: {
      name: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(editNameSchema),
  })
}
