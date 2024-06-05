import { ChangeEvent } from 'react'
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
import { useGetDecksQuery } from '@/services/decks/decks.sevice'

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
  const maxSliderValue = Number(searchParams.get('max')) || 100
  const minSliderValue = Number(searchParams.get('min')) || 1

  const handleOnPageChange = (pageNumber: number) => {
    setSearchParams({ currentPage: pageNumber.toString(), pageSize: pageSize.toString(), search })
  }

  const handleOnPageSizeChange = (size: number) => {
    setSearchParams({ currentPage: '1', pageSize: size.toString(), search })
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

  // Decks
  const { data, error, isLoading } = useGetDecksQuery({
    currentPage,
    itemsPerPage: pageSize,
    name: search,
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
          <div className={s.inputWraper}>
            <Input
              clear={handleClear}
              onChange={handleSearchChange}
              placeholder={'Search'}
              type={'search'}
              value={search}
            />
          </div>
          <div className={s.tabsWrapper}>
            <Tabs tabs={tabs} value={tabs[0].value} />
          </div>
          <div className={s.sliderWrapper}>
            <Slider
              max={maxSliderValue}
              min={minSliderValue}
              onValueChange={() => {}}
              step={1}
              value={[2, 50]}
            />
          </div>

          <div className={s.buttonWrapper}>
            <Button variant={'secondary'}>{'Reset Filters'} </Button>
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
