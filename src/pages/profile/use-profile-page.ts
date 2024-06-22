import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    } catch (error) {
      console.log(error)
    }
  }
  const onLogOut = async () => {
    try {
      await signOut().unwrap()
      navigate('/sign-in')
    } catch (error) {
      console.log(error)
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
