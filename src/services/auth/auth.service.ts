import {
  LoginArgs,
  LoginResponse,
  RecoverPassword,
  SignUpArgs,
  UpdateProfileArgs,
  User,
  UserResponse,
} from '@/services/auth/auth.types'
import { flashcardsApi } from '@/services/flashcards-api'

const authService = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      me: builder.query<User, void>({
        providesTags: ['Me'],
        query: () => '/v1/auth/me',
      }),
      recoverPassword: builder.mutation<void, RecoverPassword>({
        query: body => ({
          body,
          method: 'POST',
          url: 'v1/auth/recover-password',
        }),
      }),
      resetPassword: builder.mutation<void, { password: string; token: string }>({
        query: ({ password, token }) => ({
          body: { password },
          method: 'POST',
          url: `v1/auth/reset-password/${token}`,
        }),
      }),
      signIn: builder.mutation<LoginResponse, LoginArgs>({
        invalidatesTags: ['Me'],
        async onQueryStarted(_, { queryFulfilled }) {
          const { data } = await queryFulfilled

          if (!data) {
            return
          }

          localStorage.setItem('accessToken', data.accessToken.trim())
          localStorage.setItem('refreshToken', data.refreshToken.trim())
        },
        query: body => ({
          body,
          method: 'POST',
          url: '/v1/auth/login',
        }),
      }),
      signOut: builder.mutation<void, void>({
        invalidatesTags: ['Me'],
        async onQueryStarted(_, { queryFulfilled }) {
          await queryFulfilled

          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
        },
        query: () => ({
          method: 'POST',
          url: `v2/auth/logout`,
        }),
      }),
      signUp: builder.mutation<User, SignUpArgs>({
        query: body => ({
          body,
          method: 'POST',
          url: `v1/auth/sign-up`,
        }),
      }),
      updateProfile: builder.mutation<UserResponse, UpdateProfileArgs>({
        invalidatesTags: ['Me'],
        query: body => ({
          body,
          method: 'PATCH',
          url: `v1/auth/me`,
        }),
      }),
    }
  },
})

export const {
  useMeQuery,
  useRecoverPasswordMutation,
  useResetPasswordMutation,
  useSignInMutation,
  useSignOutMutation,
  useSignUpMutation,
  useUpdateProfileMutation,
} = authService
