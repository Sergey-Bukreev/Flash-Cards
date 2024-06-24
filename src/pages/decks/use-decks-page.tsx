import { ChangeEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useDebounce } from '@/components/common/hooks/use-debounce'
import { useMeQuery } from '@/services/auth/auth.service'
import {
  useAddDeckToFavoritesMutation,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
  useRemoveDeckFromFavoritesMutation,
} from '@/services/decks/decks.sevice'
import { DecksListResponse } from '@/services/decks/decks.type'

interface DecksPageData {
  currentPage: number
  currentTab: string
  currentUserId: string
  data: DecksListResponse | undefined
  deckToDeleteID: string
  deckToDeleteName?: string
  deckToEditCover?: string
  deckToEditID: string
  deckToEditName?: string
  deckToEditStatus?: boolean
  error: any
  handleClear: () => void
  handleCloseAddDeckModal: () => void
  handleCloseDeleteDeckModal: () => void
  handleCloseEditDeckModal: () => void
  handleFavoriteClick: (id: string, isFavorite: boolean) => void
  handleOnPageChange: (pageNumber: number) => void
  handleOnPageSizeChange: (size: number) => void
  handleOpenAddDeckModal: () => void
  handleOpenDeleteDeckModal: (id: string) => void
  handleOpenEditDeckModal: (id: string) => void
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSliderChange: (value: number[]) => void
  handleTabChange: (tabValue: string) => void
  isLoading: boolean
  isOpenAddDeckModal: boolean
  isOpenDeleteDeckModal: boolean
  isOpenEditDeckModal: boolean
  maxCardsValue: number
  minCardsValue: number
  pageSize: number
  resetFilters: () => void
  search: string
  sliderValue: number[]
  tabs: { name: string; value: string }[]
}
const tabs = [
  { name: 'All Decks', value: 'all' },
  { name: 'My Decks', value: 'my' },
  { name: 'Favorite', value: 'favorites' },
]

export const useDecksPage = (): DecksPageData => {
  const { data: me } = useMeQuery()
  const currentUserId = me ? me.id : ''

  const [searchParams, setSearchParams] = useSearchParams()
  const { data: minMaxCardsData } = useGetMinMaxCardsQuery()
  const [addDeckToFavorites] = useAddDeckToFavoritesMutation()
  const [removeDeckFromFavorites] = useRemoveDeckFromFavoritesMutation()

  const search = searchParams.get('search') || ''
  const debouncedSearch = useDebounce(search, 500)
  const pageSize = Number(searchParams.get('pageSize')) || 10
  const currentPage = Number(searchParams.get('currentPage')) || 1
  const maxCardsCount = Number(searchParams.get('max')) || 35
  const minCardsCount = Number(searchParams.get('min'))
  const minCardsValue = minMaxCardsData?.min || 0
  const maxCardsValue = minMaxCardsData?.max || 100

  const [sliderValue, setSliderValue] = useState<number[]>([minCardsCount, maxCardsCount])
  const debouncedSliderValue = useDebounce(sliderValue, 500)
  const [currentTab, setCurrentTab] = useState<string>('all')

  const { data, error, isLoading } = useGetDecksQuery({
    authorId: currentTab === 'my' ? currentUserId : '',
    currentPage,
    favoritedBy: currentTab === 'favorites' ? currentUserId : undefined,
    itemsPerPage: pageSize,
    maxCardsCount: debouncedSliderValue[1],
    minCardsCount: debouncedSliderValue[0],
    ...(debouncedSearch ? { name: debouncedSearch } : {}),
  })
  const [isOpenAddDeckModal, setIsOpenAddDeckModal] = useState<boolean>(false)
  const [isOpenDeleteDeckModal, setIsOpenDeleteDeckModal] = useState<boolean>(false)
  const [isOpenEditDeckModal, setIsOpenEditDeckModal] = useState<boolean>(false)
  const [deckToEditID, setDeckToEditID] = useState<string>('')
  const [deckToDeleteID, setDeckToDeleteID] = useState<string>('')
  const deckToDeleteName = data?.items?.find(deck => deck.id === deckToDeleteID)?.name
  const deckToEditName = data?.items?.find(deck => deck.id === deckToEditID)?.name
  const deckToEditCover = data?.items?.find(deck => deck.id === deckToEditID)?.cover
  const deckToEditStatus = data?.items?.find(deck => deck.id === deckToEditID)?.isPrivate

  const handleOnPageChange = (pageNumber: number) => {
    setSearchParams(params => ({
      ...params,
      currentPage: pageNumber.toString(),
      max: maxCardsCount.toString(),
      min: minCardsCount.toString(),
      pageSize: pageSize.toString(),
      search,
    }))
  }

  const handleOnPageSizeChange = (size: number) => {
    setSearchParams(params => ({
      ...params,
      currentPage: '1',
      max: maxCardsCount.toString(),
      min: minCardsCount.toString(),
      pageSize: size.toString(),
      search,
    }))
  }

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

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value)
    searchParams.set('min', value[0].toString())
    searchParams.set('max', value[1].toString())
    setSearchParams(searchParams)
  }

  const handleTabChange = (tabValue: string) => {
    setCurrentTab(tabValue)

    if (tabValue === 'favorites') {
      searchParams.set('favoritedBy', currentUserId)
      searchParams.delete('authorId')
    } else if (tabValue === 'my') {
      searchParams.set('authorId', currentUserId)
      searchParams.delete('favoritedBy')
    } else {
      searchParams.delete('favoritedBy')
      searchParams.delete('authorId')
    }

    setSearchParams(searchParams)
  }

  const resetFilters = () => {
    setSearchParams({
      currentPage: '1',
      max: maxCardsValue.toString(),
      min: minCardsValue.toString(),
      pageSize: '10',
      search: '',
    })
    setSliderValue([minCardsValue, maxCardsValue])
    setCurrentTab('all')
  }

  const handleOpenAddDeckModal = () => {
    setIsOpenAddDeckModal(true)
  }

  const handleCloseAddDeckModal = () => {
    setIsOpenAddDeckModal(false)
  }

  const handleOpenDeleteDeckModal = (id: string) => {
    setDeckToDeleteID(id)
    setIsOpenDeleteDeckModal(true)
  }

  const handleCloseDeleteDeckModal = () => {
    setDeckToDeleteID('')
    setIsOpenDeleteDeckModal(false)
  }

  const handleOpenEditDeckModal = (id: string) => {
    setDeckToEditID(id)
    setIsOpenEditDeckModal(true)
  }

  const handleCloseEditDeckModal = () => {
    setDeckToEditID('')
    setIsOpenEditDeckModal(false)
  }
  const handleFavoriteClick = async (id: string, isFavorite: boolean) => {
    if (isFavorite) {
      try {
        await removeDeckFromFavorites({ id })
        toast.success('Deck removed from Favorites')
      } catch (error: any) {
        toast.error(error.data.message ?? 'Failed to delete deck from Favorites')
      }
    } else {
      try {
        await addDeckToFavorites({ id })
        toast.success('Deck Adding To Favorites')
      } catch (error: any) {
        toast.error(error.data.message ?? 'Failed to add deck to Favorites')
      }
    }
  }

  return {
    currentPage,
    currentTab,
    currentUserId,
    data,
    deckToDeleteID,
    deckToDeleteName,
    deckToEditCover,
    deckToEditID,
    deckToEditName,
    deckToEditStatus,
    error,
    handleClear,
    handleCloseAddDeckModal,
    handleCloseDeleteDeckModal,
    handleCloseEditDeckModal,
    handleFavoriteClick,
    handleOnPageChange,
    handleOnPageSizeChange,
    handleOpenAddDeckModal,
    handleOpenDeleteDeckModal,
    handleOpenEditDeckModal,
    handleSearchChange,
    handleSliderChange,
    handleTabChange,
    isLoading,
    isOpenAddDeckModal,
    isOpenDeleteDeckModal,
    isOpenEditDeckModal,
    maxCardsValue,
    minCardsValue,
    pageSize,
    resetFilters,
    search,
    sliderValue,
    tabs,
  }
}
