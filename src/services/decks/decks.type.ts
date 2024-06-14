export interface DecksListResponse {
  items: Deck[]
  maxCardsCount: number
  pagination: Pagination
}

export interface Pagination {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export interface Deck {
  author: Author
  cardsCount: number
  cover?: string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}

export interface Author {
  id: string
  name: string
}
export interface GetDecksArgs {
  authorId?: string
  currentPage?: number
  favoritedBy?: string
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: string
}
export interface CreateDecksArgs {
  cover?: string
  isPrivate?: boolean
  name: string
}
export type UpdateDecksArgs = {
  body: Partial<CreateDecksArgs>
  id: string
}
export type DeleteDecksArgs = {
  id: string
}
export type DeckMinMaxCardsResponse = {
  max: number
  min: number
}

export type DeckResponse = Deck
