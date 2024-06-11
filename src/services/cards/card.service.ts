import { CardsParams, CardsResponse } from '@/services/cards/card.type'
import { flashcardsApi } from '@/services/flashcards-api'

export const cardService = flashcardsApi.injectEndpoints({
  endpoints: builder => ({
    getCards: builder.query<CardsResponse, { id: string; params: CardsParams }>({
      providesTags: ['Cards'],
      query: ({ id, params }) => ({
        method: 'GET',
        params: params ?? {},
        url: `v1/decks/${id}/cards`,
      }),
    }),
  }),
})

export const { useGetCardsQuery } = cardService
