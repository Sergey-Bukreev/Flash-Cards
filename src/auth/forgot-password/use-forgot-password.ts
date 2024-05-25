import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const forgotPasswordSchema = z.object({
  email: z.string().trim().email(),
})

export type FormValues = z.infer<typeof forgotPasswordSchema>
export const useForgotPassword = () => {
  return useForm<FormValues>({
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(forgotPasswordSchema),
  })
}
