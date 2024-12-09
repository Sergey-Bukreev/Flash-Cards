import { ChangeEvent, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { useDebounce } from '@/components/common/hooks/use-debounce'
import { Sort } from '@/components/ui/table'
import { useMeQuery } from '@/services/auth/auth.service'
import { User } from '@/services/auth/auth.types'
import { useGetCardsQuery } from '@/services/cards/card.service'
import { CardsResponse } from '@/services/cards/card.type'
import { useGetDeckByIdQuery } from '@/services/decks/decks.sevice'
import { DeckResponse } from '@/services/decks/decks.type'

interface DeckPageData {
  answerForEdit: string | undefined
  answerImgForEdit: null | string | undefined
  cardForDeleteId: null | string
  cardForEditId: null | string
  cardsData: CardsResponse | undefined
  deckData: DeckResponse | undefined
  deckId: string | undefined
  error: any
  handleClear: () => void
  handleCloseAddCardModal: () => void
  handleCloseDeleteCardModal: () => void
  handleCloseDeleteDeckModal: () => void
  handleCloseEditCardModal: () => void
  handleCloseEditDeckModal: () => void
  handleOnPageCahnge: (pageNumber: number) => void
  handleOnPageSizeChange: (size: number) => void
  handleOpenAddCardModal: () => void
  handleOpenDeleteCardModal: (id: string) => void
  handleOpenDeleteDeckModal: () => void
  handleOpenEditCardModal: (id: string) => void
  handleOpenEditDeckModal: () => void
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSort: (sort: Sort | null) => void
  isLoading: boolean
  isMyDeck: boolean
  isOpenAddCardModal: boolean
  isOpenDeleteCardModal: boolean
  isOpenDeleteDeckModal: boolean
  isOpenEditCardModal: boolean
  isOpenEditDeckModal: boolean
  nameCardForDelete: string | undefined
  ownerId: string
  questionForEdit: string | undefined
  questionImgForEdit: null | string | undefined
  search: string
  sort: Sort
}

export const useDeckPage = (): DeckPageData => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [cardForDeleteId, setCardForDeleteId] = useState<null | string>(null)

  const [isOpenEditDeckModal, setIsOpenEditDeckModal] = useState<boolean>(false)
  const [isOpenDeleteDeckModal, setIsOpenDeleteDeckModal] = useState<boolean>(false)

  const [isOpenAddCardModal, setIsOpenAddCardModal] = useState<boolean>(false)
  const [isOpenDeleteCardModal, setIsOpenDeleteCardModal] = useState<boolean>(false)
  const [isOpenEditCardModal, setIsOpenEditCardModal] = useState<boolean>(false)

  const [cardForEditId, setCardForEditId] = useState<null | string>(null)

  const [sort, setSort] = useState<Sort>({
    direction: (searchParams.get('sortDirection') as 'asc' | 'desc') || 'asc',
    key: searchParams.get('sortKey') || 'updated',
  })

  const navigate = useNavigate()
  const { deckId } = useParams()

  const pageSize = Number(searchParams.get('pageSize')) || 10
  const currentPage = Number(searchParams.get('currentPage')) || 1
  const search = searchParams.get('search') || ''

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
      currentPage: currentPage,
      itemsPerPage: pageSize,
      orderBy: sort ? `${sort.key}-${sort.direction}` : undefined,
      question: useDebounce(search, 500),
    },
  })

  const nameCardForDelete = cardsData?.items.find(card => card.id === cardForDeleteId)?.question

  const answerForEdit = cardsData?.items.find(card => card.id === cardForEditId)?.answer
  const answerImgForEdit = cardsData?.items.find(card => card.id === cardForEditId)?.answerImg
  const questionForEdit = cardsData?.items.find(card => card.id === cardForEditId)?.question
  const questionImgForEdit = cardsData?.items.find(card => card.id === cardForEditId)?.questionImg

  const { data: me } = useMeQuery()
  const ownerId = (me as User)?.id

  const isMyDeck = deckData?.userId === ownerId

  const handleSort = (sort: Sort | null) => {
    setSort(sort)
    if (sort) {
      searchParams.set('sortKey', sort.key)
      searchParams.set('sortDirection', sort.direction)
    } else {
      searchParams.delete('sortKey')
      searchParams.delete('sortDirection')
    }
    setSearchParams(searchParams)
  }

  const handleOnPageCahnge = (pageNumber: number) => {
    setSearchParams(params => {
      params.set('currentPage', pageNumber.toString())
      params.set('pageSize', pageSize.toString())
      if (search) {
        params.set('search', search)
      } else {
        params.delete('search')
      }

      return params
    })
  }
  const handleOnPageSizeChange = (size: number) => {
    setSearchParams(params => {
      params.set('currentPage', '1')
      params.set('pageSize', size.toString())
      if (search) {
        params.set('search', search)
      } else {
        params.delete('search')
      }

      return params
    })
  }
  const handleClear = () => {
    setSearchParams(params => {
      params.delete('search')
      params.set('currentPage', currentPage.toString())
      params.set('pageSize', pageSize.toString())

      return params
    })
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value

    setSearchParams(params => {
      if (value.length) {
        params.set('search', value)
      } else {
        params.delete('search')
      }
      params.set('currentPage', '1')

      return params
    })
  }

  const handleOpenDeleteDeckModal = () => {
    setIsOpenDeleteDeckModal(true)
  }

  const handleCloseDeleteDeckModal = () => {
    setIsOpenDeleteDeckModal(false)
    navigate('/decks')
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
  const handleOpenEditCardModal = (id: string) => {
    setCardForEditId(id)
    setIsOpenEditCardModal(true)
  }
  const handleCloseEditCardModal = () => {
    setCardForEditId('')
    setIsOpenEditCardModal(false)
    refetchCards()
    refetchDeck()
  }

  return {
    answerForEdit,
    answerImgForEdit,
    cardForDeleteId,
    cardForEditId,
    cardsData,
    deckData,
    deckId,
    error,
    handleClear,
    handleCloseAddCardModal,
    handleCloseDeleteCardModal,
    handleCloseDeleteDeckModal,
    handleCloseEditCardModal,
    handleCloseEditDeckModal,
    handleOnPageCahnge,
    handleOnPageSizeChange,
    handleOpenAddCardModal,
    handleOpenDeleteCardModal,
    handleOpenDeleteDeckModal,
    handleOpenEditCardModal,
    handleOpenEditDeckModal,
    handleSearchChange,
    handleSort,
    isLoading,
    isMyDeck,
    isOpenAddCardModal,
    isOpenDeleteCardModal,
    isOpenDeleteDeckModal,
    isOpenEditCardModal,
    isOpenEditDeckModal,
    nameCardForDelete,
    ownerId,
    questionForEdit,
    questionImgForEdit,
    search,
    sort,
  }
}
