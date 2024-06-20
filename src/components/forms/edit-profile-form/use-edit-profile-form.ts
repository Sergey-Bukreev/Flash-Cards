import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const editNameSchema = z.object({
  name: z.string().trim().min(3, 'The name must be at least 3 characters'),
})

export type FormValues = z.infer<typeof editNameSchema>
export type EditProfileFormDefaultValues = {
  name: string
}

export const useEditProfileForm = (defaultValues?: EditProfileFormDefaultValues) => {
  return useForm<FormValues>({
    defaultValues: defaultValues,
    mode: 'onSubmit',
    resolver: zodResolver(editNameSchema),
  })
}
