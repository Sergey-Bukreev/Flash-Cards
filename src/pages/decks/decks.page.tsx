import { useState } from 'react'

import { CreateDeckModal } from '@/components/decks/create-deck-modal/create-deck-modal'
import { DecksTable } from '@/components/decks/decks-table/decks-table'
import { DeleteDeckModal } from '@/components/decks/delete-deck-modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/input'
import { Page } from '@/components/ui/page'
import { Pagination } from '@/components/ui/pagination'
import { Slider } from '@/components/ui/slider'
import { Tabs } from '@/components/ui/tabs'
import { Typography } from '@/components/ui/typography'
import { useDecksPage } from '@/pages/decks/use-decks-page'

import s from './decks-page.module.scss'

export function DecksPage() {
  const {
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
  } = useDecksPage()

  const [isOpenAddDeckModal, setIsOpenAddDeckModal] = useState(false)
  const [isOpenDeleteDeckModal, setIsOpenDeleteDeckModal] = useState(false)
  const [deckToDeleteID, setDeckToDeleteID] = useState('')
  const deckToDeleteName = data?.items?.find(deck => deck.id === deckToDeleteID)?.name
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
          <Button onClick={handleOpenAddDeckModal} variant={'primary'}>
            {'Create Deck'}
          </Button>
          <CreateDeckModal isOpen={isOpenAddDeckModal} onClose={handleCloseAddDeckModal} />
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
          onDeleteClick={handleOpenDeleteDeckModal}
          onEditClick={() => {}}
        />
        <DeleteDeckModal
          id={deckToDeleteID}
          isOpen={isOpenDeleteDeckModal}
          name={deckToDeleteName}
          onClose={handleCloseDeleteDeckModal}
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
