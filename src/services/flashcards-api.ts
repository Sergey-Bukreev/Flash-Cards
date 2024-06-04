import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const flashcardsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    prepareHeaders: headers => {
      const token = localStorage.getItem('accessToken')

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: () => ({}),
  reducerPath: 'flashcardsApi',
  tagTypes: ['Decks', 'Me'],
})
