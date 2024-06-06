import { LoginArgs, LoginResponse, SignUpArgs, User } from '@/services/auth/auth.types'
import { flashcardsApi } from '@/services/flashcards-api'

const authService = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      me: builder.query<User, void>({
        providesTags: ['Me'],
        query: () => '/v1/auth/me',
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
        query: () => ({
          method: 'POST',
          url: `v1/auth/logout`,
        }),
      }),
      signUp: builder.mutation<User, SignUpArgs>({
        query: body => ({
          body,
          method: 'POST',
          url: `v1/auth/sign-up`,
        }),
      }),
    }
  },
})

export const { useMeQuery, useSignInMutation, useSignUpMutation } = authService