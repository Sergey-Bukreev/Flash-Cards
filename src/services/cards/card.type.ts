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
export type CardParams = {
  answer: string
  answerImg?: string
  answerVideo?: string
  currentPage?: number
  itemsPerPage?: number
  orderBy?: string
  question: string
  questionImg?: string
  questionVideo?: string
} | void

export type CardResponse = Omit<Card, 'userId'>
export type RandomCardArgs = {
  id: string
  previousCardId?: string
}
export type CardRateArgs = {
  cardId: string
  grade: number
  packId: string
}
