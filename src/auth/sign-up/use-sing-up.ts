import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const signupSchema = z
  .object({
    confirmPassword: z.string().min(3),
    email: z.string().trim().email(),
    password: z.string().min(3),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Oops! The passwords don't match. Try again.",
    path: ['confirmPassword'],
  })

export type FormValues = z.infer<typeof signupSchema>
export const useSignUp = () => {
  return useForm<FormValues>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(signupSchema),
  })
}
