import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { FormValues } from '@/components/forms/edit-profile-form/use-edit-profile-form'
import {
  useMeQuery,
  useSignOutMutation,
  useUpdateProfileMutation,
} from '@/services/auth/auth.service'

export const useProfilePage = () => {
  const { data: me, error, isLoading } = useMeQuery()
  const [signOut] = useSignOutMutation()
  const [updateProfile] = useUpdateProfileMutation()

  const [isEditMode, setEditMode] = useState(false)

  const navigate = useNavigate()
  const updateAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files.length) {
        const file = e.target.files[0]

        if (file) {
          const formData = new FormData()

          formData.append('avatar', file)
          await updateProfile(formData).unwrap()
        }
      }
    } catch (error: any) {
      toast.error(
        error.data.message ??
          'An unexpected error occurred while updating your avatar. Please try again later.'
      )
    }
  }
  const onLogOut = async () => {
    try {
      await signOut().unwrap()
      toast.success('Log-out successfully')
      navigate('/sign-in')
    } catch (error: any) {
      toast.error(error.data.message ?? 'Could not Log Out')
    }
  }
  const onEditModeHandler = () => {
    setEditMode(true)
  }

  const handleOnUpdateName = async (data: FormValues) => {
    const form = new FormData()

    Object.keys(data).forEach(key => {
      form.append(key, data[key as keyof FormValues])
    })
    await updateProfile(form).unwrap()
    setEditMode(false)
  }

  return {
    error,
    handleOnUpdateName,
    isEditMode,
    isLoading,
    me,
    onEditModeHandler,
    onLogOut,
    updateAvatar,
  }
}
