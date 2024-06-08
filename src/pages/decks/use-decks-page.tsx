import { ChangeEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useDebounce } from '@/components/common/hooks/use-debounce'
import { useMeQuery } from '@/services/auth/auth.service'
import { useGetDecksQuery, useGetMinMaxCardsQuery } from '@/services/decks/decks.sevice'

export const useDecksPage = () => {
  const tabs = [
    { name: 'All Decks', value: 'all' },
    { name: 'My Decks', value: 'my' },
    { name: 'Favorite', value: 'favorites' },
  ]
  const { data: me } = useMeQuery()
  const currentUserId = me ? me.id : ''

  const [searchParams, setSearchParams] = useSearchParams()
  const { data: minMaxCardsData } = useGetMinMaxCardsQuery()

  const search = searchParams.get('search') ?? ''
  const debouncedSearch = useDebounce(search, 500)
  const pageSize = Number(searchParams.get('pageSize')) || 10
  const currentPage = Number(searchParams.get('currentPage')) || 1
  const maxCardsCount = Number(searchParams.get('max')) || 100
  const minCardsCount = Number(searchParams.get('min'))
  const minCardsValue = minMaxCardsData?.min || 0
  const maxCardsValue = minMaxCardsData?.max || 100

  const [sliderValue, setSliderValue] = useState<number[]>([minCardsCount, maxCardsCount])
  const debouncedSliderValue = useDebounce(sliderValue, 500)
  const [currentTab, setCurrentTab] = useState('all')

  const { data, error, isLoading } = useGetDecksQuery({
    authorId: currentTab === 'my' ? currentUserId : '',
    currentPage,
    favoritedBy: currentTab === 'favorites' ? currentUserId : undefined,
    itemsPerPage: pageSize,
    maxCardsCount: debouncedSliderValue[1],
    minCardsCount: debouncedSliderValue[0],
    ...(debouncedSearch ? { name: debouncedSearch } : {}),
  })

  const handleOnPageChange = (pageNumber: number) => {
    setSearchParams({
      currentPage: pageNumber.toString(),
      max: maxCardsCount.toString(),
      min: minCardsCount.toString(),
      pageSize: pageSize.toString(),
      search,
    })
  }

  const handleOnPageSizeChange = (size: number) => {
    setSearchParams({
      currentPage: '1',
      max: maxCardsCount.toString(),
      min: minCardsCount.toString(),
      pageSize: size.toString(),
      search,
    })
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

  return {
    currentPage,
    currentTab,
    currentUserId,
    data,
    error,
    handleClear,
    handleOnPageChange,
    handleOnPageSizeChange,
    handleSearchChange,
    handleSliderChange,
    handleTabChange,
    isLoading,
    maxCardsValue,
    minCardsValue,
    pageSize,
    resetFilters,
    search,
    sliderValue,
    tabs,
  }
}
