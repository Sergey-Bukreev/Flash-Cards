import {
  CreateDecksArgs,
  Deck,
  DeckMinMaxCardsResponse,
  DeckResponse,
  DecksListResponse,
  DeleteDecksArgs,
  GetDecksArgs,
  UpdateDecksArgs,
} from '@/services/decks/decks.type'
import { flashcardsApi } from '@/services/flashcards-api'

export const decksService = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      addDeckToFavorites: builder.mutation<void, { id: string }>({
        invalidatesTags: ['Decks'],
        query: ({ id }) => ({
          method: 'POST',
          url: `v1/decks/${id}/favorite`,
        }),
      }),
      createDeck: builder.mutation<Deck, CreateDecksArgs>({
        invalidatesTags: ['Decks'],
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/decks`,
        }),
      }),
      deleteDeck: builder.mutation<void, DeleteDecksArgs>({
        invalidatesTags: ['Decks'],
        query: ({ id }) => ({
          method: 'DELETE',
          url: `v1/decks/${id}`,
        }),
      }),
      getDeckById: builder.query<DeckResponse, { id: string }>({
        query: ({ id }) => `v1/decks/${id}`,
      }),
      getDecks: builder.query<DecksListResponse, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: args => ({
          method: 'GET',
          params: args ?? undefined,
          url: `v2/decks`,
        }),
      }),
      getMinMaxCards: builder.query<DeckMinMaxCardsResponse, void>({
        query: () => `v2/decks/min-max-cards`,
      }),
      removeDeckFromFavorites: builder.mutation<void, { id: string }>({
        invalidatesTags: ['Decks'],
        query: ({ id }) => ({
          method: 'DELETE',
          url: `v1/decks/${id}/favorite`,
        }),
      }),
      updateDeck: builder.mutation<Deck, UpdateDecksArgs>({
        invalidatesTags: ['Decks'],
        query: ({ body, id }) => ({
          body: body,
          method: 'PATCH',
          url: `v1/decks/${id}`,
        }),
      }),
    }
  },
})
export const {
  useAddDeckToFavoritesMutation,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDeckByIdQuery,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
  useRemoveDeckFromFavoritesMutation,
  useUpdateDeckMutation,
} = decksService
