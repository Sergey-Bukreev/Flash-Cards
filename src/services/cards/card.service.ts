import { CardParams, CardResponse, CardsResponse } from '@/services/cards/card.type'
import { flashcardsApi } from '@/services/flashcards-api'

export const cardService = flashcardsApi.injectEndpoints({
  endpoints: builder => ({
    createCard: builder.mutation<CardResponse, { body: CardParams; id: string }>({
      invalidatesTags: ['Cards'],
      query: ({ body, id }) => ({
        body: body,
        method: 'POST',
        url: `v1/decks/${id}/cards`,
      }),
    }),
    deleteCard: builder.mutation<void, { id: string }>({
      invalidatesTags: ['Cards'],
      query: ({ id }) => ({
        body: { id },
        method: 'DELETE',
        url: `v1/cards/${id}`,
      }),
    }),
    getCards: builder.query<CardsResponse, { id: string; params: CardParams }>({
      providesTags: ['Cards'],
      query: ({ id, params }) => ({
        method: 'GET',
        params: params ?? {},
        url: `v1/decks/${id}/cards`,
      }),
    }),
  }),
})

export const { useCreateCardMutation, useDeleteCardMutation, useGetCardsQuery } = cardService
