import { z } from 'zod'
export const fileSchema = z
  .instanceof(File)
  .refine(
    file => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
    'Only .jpg, .jpeg, .png and .webp formats are supported.'
  )
  .refine(file => file.size <= 1024 * 1024, `Max image size is 1MB.`)
  .nullable()
  .optional()
