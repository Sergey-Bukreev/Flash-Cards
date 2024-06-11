import { configureStore } from '@reduxjs/toolkit'

import { flashcardsApi } from './flashcards-api'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(flashcardsApi.middleware),
  reducer: {
    [flashcardsApi.reducerPath]: flashcardsApi.reducer,
  },
})
