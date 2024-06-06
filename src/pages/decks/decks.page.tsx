import { ChangeEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { DecksTable } from '@/components/decks/decks-table/decks-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/input'
import { Page } from '@/components/ui/page'
import { Pagination } from '@/components/ui/pagination'
import { Slider } from '@/components/ui/slider'
import { Tabs } from '@/components/ui/tabs'
import { Typography } from '@/components/ui/typography'
import { useDecksPage } from '@/pages/decks/use-decks-page'
import { useMeQuery } from '@/services/auth/auth.service'
import { useGetDecksQuery, useGetMinMaxCardsQuery } from '@/services/decks/decks.sevice'

import s from './decks-page.module.scss'

export function DecksPage() {
  const { data: me } = useMeQuery()
  const currentUserId = me ? me.id : ''
  const { tabs } = useDecksPage()

  /// Search and Pagination
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') ?? ''
  const pageSize = Number(searchParams.get('pageSize')) || 10
  const currentPage = Number(searchParams.get('currentPage')) || 1
  const maxCardsCount = Number(searchParams.get('max')) || 100
  const minCardsCount = Number(searchParams.get('min'))

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

  /// Min Max Filter
  const { data: minMaxCardsData } = useGetMinMaxCardsQuery()
  const minCardsValue = minMaxCardsData?.min || 0
  const maxCardsValue = minMaxCardsData?.max || 100
  const [sliderValue, setSliderValue] = useState<number[]>([minCardsCount, maxCardsCount])

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value)
    searchParams.set('min', value[0].toString())
    searchParams.set('max', value[1].toString())
    setSearchParams(searchParams)
  }

  // Tabs filter
  const [currentTab, setCurrentTab] = useState('all')
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
  // Reset filters
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

  // Decks
  const { data, error, isLoading } = useGetDecksQuery({
    authorId: currentTab === 'my' ? currentUserId : '',
    currentPage,
    favoritedBy: currentTab === 'favorites' ? currentUserId : undefined,
    itemsPerPage: pageSize,
    maxCardsCount: sliderValue[1],
    minCardsCount: sliderValue[0],
    ...(search ? { name: search } : {}),
  })

  if (isLoading) {
    return <Typography variant={'h1'}>{'Loading ....'}</Typography>
  }
  if (error) {
    return <Typography variant={'h1'}>{`Error: ${JSON.stringify(error)}`}</Typography>
  }

  return (
    <Page>
      <div className={s.page}>
        <div className={s.pageTitle}>
          <Typography variant={'h1'}>{'Decks List'}</Typography>
          <Button variant={'primary'}>{'Create Deck'}</Button>
        </div>
        <div className={s.filtersWrapper}>
          <div className={s.inputWrapper}>
            <Input
              clear={handleClear}
              onChange={handleSearchChange}
              placeholder={'Search'}
              type={'search'}
              value={search}
            />
          </div>
          <div className={s.tabsWrapper}>
            <Tabs onValueChange={handleTabChange} tabs={tabs} value={currentTab} />
          </div>
          <div className={s.sliderWrapper}>
            <Slider
              max={maxCardsValue}
              min={minCardsValue}
              onValueChange={handleSliderChange}
              step={1}
              value={sliderValue}
            />
          </div>

          <div className={s.buttonWrapper}>
            <Button onClick={resetFilters} variant={'secondary'}>
              {'Reset Filters'}
            </Button>
          </div>
        </div>

        <DecksTable
          currentUserId={currentUserId}
          decks={data?.items}
          onDeleteClick={() => {}}
          onEditClick={() => {}}
        />
        <div className={s.paginnation}>
          <Pagination
            currentPage={currentPage ?? 1}
            onPageChanged={handleOnPageChange}
            onPageSizeChange={handleOnPageSizeChange}
            pageSize={pageSize}
            totalCount={data?.pagination?.totalItems || 1}
          />
        </div>
      </div>
    </Page>
  )
}
