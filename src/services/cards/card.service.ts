import {
  Card,
  CardParams,
  CardRateArgs,
  CardResponse,
  CardsResponse,
  RandomCardArgs,
} from '@/services/cards/card.type'
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
    getRandomCard: builder.query<CardResponse, RandomCardArgs>({
      query: ({ id, previousCardId }) => ({
        method: 'GET',
        params: { previousCardId },
        url: `v1/decks/${id}/learn`,
      }),
    }),
    rateCard: builder.mutation<CardResponse, CardRateArgs>({
      invalidatesTags: ['Cards'],
      async onQueryStarted({ packId }, { dispatch, queryFulfilled }) {
        try {
          const { data: newCard } = await queryFulfilled

          dispatch(
            cardService.util.updateQueryData('getRandomCard', { id: packId }, () => {
              return newCard
            })
          )
        } catch (error) {
          console.log(error)
        }
      },
      query: ({ packId, ...rest }) => ({
        body: rest,
        method: 'POST',
        url: `v1/decks/${packId}/learn`,
      }),
    }),
    updateCard: builder.mutation<Card, { id: string; params: CardParams }>({
      invalidatesTags: ['Cards'],
      query: ({ id, params }) => ({
        body: params,
        method: 'PATCH',
        url: `v1/cards/${id}`,
      }),
    }),
  }),
})

export const {
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
  useGetRandomCardQuery,
  useRateCardMutation,
  useUpdateCardMutation,
} = cardService
