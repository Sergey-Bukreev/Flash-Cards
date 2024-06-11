import { Pagination } from '@/services/decks/decks.type'

export type CardsResponse = {
  items: Card[]
  pagination: Pagination
}

export type Card = {
  answer: string
  answerImg?: null | string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg?: null | string
  shots: number
  updated: string
  userId: string
}
export type CardsParams = {
  answer?: string
  question?: string
} | void
