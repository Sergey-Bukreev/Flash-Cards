import { ChangeEvent, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { useDebounce } from '@/components/common/hooks/use-debounce'
import { useMeQuery } from '@/services/auth/auth.service'
import { User } from '@/services/auth/auth.types'
import { useGetCardsQuery } from '@/services/cards/card.service'
import { CardsResponse } from '@/services/cards/card.type'
import { useGetDeckByIdQuery } from '@/services/decks/decks.sevice'
import { DeckResponse } from '@/services/decks/decks.type'

interface DeckPageData {
  cardForDeleteId: null | string
  cardsData: CardsResponse | undefined
  deckData: DeckResponse | undefined
  deckId: string | undefined
  error: any
  handleClear: () => void
  handleCloseAddCardModal: () => void
  handleCloseDeleteCardModal: () => void
  handleCloseDeleteDeckModal: () => void
  handleCloseEditDeckModal: () => void
  handleOpenAddCardModal: () => void
  handleOpenDeleteCardModal: (id: string) => void
  handleOpenDeleteDeckModal: () => void
  handleOpenEditDeckModal: () => void
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  isLoading: boolean
  isMyDeck: boolean
  isOpenAddCardModal: boolean
  isOpenDeleteCardModal: boolean
  isOpenDeleteDeckModal: boolean
  isOpenEditDeckModal: boolean
  nameCardForDelete: string | undefined
  ownerId: string
  search: string
}

export const useDeckPage = (): DeckPageData => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [cardForDeleteId, setCardForDeleteId] = useState<null | string>(null)

  const [isOpenEditDeckModal, setIsOpenEditDeckModal] = useState<boolean>(false)
  const [isOpenDeleteDeckModal, setIsOpenDeleteDeckModal] = useState<boolean>(false)

  const [isOpenAddCardModal, setIsOpenAddCardModal] = useState<boolean>(false)
  const [isOpenDeleteCardModal, setIsOpenDeleteCardModal] = useState<boolean>(false)

  const navigate = useNavigate()
  const { deckId } = useParams()

  const { data: deckData, refetch: refetchDeck } = useGetDeckByIdQuery({
    id: deckId || '',
  })

  const {
    data: cardsData,
    error,
    isLoading,
    refetch: refetchCards,
  } = useGetCardsQuery({
    id: deckId || '',
    params: {
      answer: '',
      question: useDebounce(searchParams.get('search') || '', 500),
    },
  })
  const nameCardForDelete = cardsData?.items.find(card => card.id === cardForDeleteId)?.question

  const { data: me } = useMeQuery()
  const ownerId = (me as User)?.id

  const isMyDeck = deckData?.userId === ownerId

  const handleClear = () => {
    setSearchParams('')
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value

    if (value.length) {
      searchParams.set('search', value)
    } else {
      searchParams.delete('search')
    }
    setSearchParams(searchParams)
  }

  const handleOpenDeleteDeckModal = () => {
    setIsOpenDeleteDeckModal(true)
  }

  const handleCloseDeleteDeckModal = () => {
    setIsOpenDeleteDeckModal(false)
    navigate('/')
  }

  const handleOpenEditDeckModal = () => {
    setIsOpenEditDeckModal(true)
  }

  const handleCloseEditDeckModal = () => {
    setIsOpenEditDeckModal(false)
    refetchCards()
    refetchDeck()
  }

  const handleOpenAddCardModal = () => {
    setIsOpenAddCardModal(true)
  }
  const handleCloseAddCardModal = () => {
    setIsOpenAddCardModal(false)
    refetchCards()
    refetchDeck()
  }
  const handleOpenDeleteCardModal = (id: string) => {
    setCardForDeleteId(id)
    setIsOpenDeleteCardModal(true)
  }

  const handleCloseDeleteCardModal = () => {
    setCardForDeleteId('')
    setIsOpenDeleteCardModal(false)
  }

  return {
    cardForDeleteId,
    cardsData,
    deckData,
    deckId,
    error,
    handleClear,
    handleCloseAddCardModal,
    handleCloseDeleteCardModal,
    handleCloseDeleteDeckModal,
    handleCloseEditDeckModal,
    handleOpenAddCardModal,
    handleOpenDeleteCardModal,
    handleOpenDeleteDeckModal,
    handleOpenEditDeckModal,
    handleSearchChange,
    isLoading,
    isMyDeck,
    isOpenAddCardModal,
    isOpenDeleteCardModal,
    isOpenDeleteDeckModal,
    isOpenEditDeckModal,
    nameCardForDelete,
    ownerId,
    search: searchParams.get('search') || '',
  }
}
