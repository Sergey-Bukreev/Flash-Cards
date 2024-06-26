import React from 'react'
import { Link } from 'react-router-dom'

import { CreateCardModal } from '@/components/deck/create-card-modal'
import { DeckDropDown } from '@/components/deck/deck-drop-down'
import { DeleteCardModal } from '@/components/deck/delete-card-modal/delete-card-modal'
import { EditCardModal } from '@/components/deck/edit-card-modal/edit-card-modal'
import { CardsTable } from '@/components/decks/cards-table'
import { DeleteDeckModal } from '@/components/decks/delete-deck-modal'
import { EditDeckModal } from '@/components/decks/edit-deck-modal/edit-deck-modal'
import { BackButton } from '@/components/ui/back-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/input'
import { Page } from '@/components/ui/page'
import { Pagination } from '@/components/ui/pagination'
import { Spiner } from '@/components/ui/spiner/spiner'
import { Typography } from '@/components/ui/typography'
import { useDeckPage } from '@/pages/deck/use-deck.page'

import s from './deck.page.module.scss'

export const DeckPage: React.FC = () => {
  const {
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
  } = useDeckPage()

  if (isLoading) {
    return <Spiner />
  }
  if (error) {
    return <Typography variant={'h1'}>{`Error: ${JSON.stringify(error)}`}</Typography>
  }

  const renderButton = () => {
    if (isMyDeck) {
      return (
        <Button onClick={handleOpenAddCardModal} variant={'primary'}>
          {'Add New Card'}
        </Button>
      )
    }

    if (deckData?.cardsCount === 0) {
      return (
        <Button disabled variant={'secondary'}>
          {'Learn'}
        </Button>
      )
    }

    return (
      <Button as={Link} to={`/decks/${deckId}/learn`}>
        {'Learn'}
      </Button>
    )
  }

  return (
    <Page className={s.page}>
      <div className={s.backContainer}>
        <BackButton link={'/'} text={'Back to Decks List'} />
      </div>

      <div className={s.pageTitle}>
        <div className={s.titleInfo}>
          <Typography variant={'h1'}>{deckData?.name}</Typography>
          {isMyDeck && (
            <DeckDropDown
              id={deckId || ''}
              onDeleteHandler={handleOpenDeleteDeckModal}
              onEditHandler={handleOpenEditDeckModal}
            />
          )}
        </div>
        {renderButton()}
      </div>
      {deckData?.cardsCount !== 0 ? (
        <>
          <Input
            clear={handleClear}
            onChange={handleSearchChange}
            placeholder={'Search Cards'}
            type={'search'}
            value={search}
          />
          <CardsTable
            cards={cardsData?.items}
            currentUserId={ownerId}
            onDeleteClick={handleOpenDeleteCardModal}
            onEditClick={handleOpenEditCardModal}
            onSort={handleSort}
            sort={sort}
          />
        </>
      ) : (
        <div>
          <Typography className={s.message} variant={'h2'}>
            {isMyDeck
              ? 'This Deck is empty. Click add new card to fill this pack'
              : 'This Deck is empty.'}
          </Typography>
        </div>
      )}
      <div className={s.pagination}>
        <Pagination
          currentPage={cardsData?.pagination.currentPage ?? 1}
          onPageChanged={handleOnPageCahnge}
          onPageSizeChange={handleOnPageSizeChange}
          pageSize={cardsData?.pagination.itemsPerPage ?? 1}
          totalCount={cardsData?.pagination.totalItems ?? 1}
        />
      </div>

      <EditDeckModal
        cover={deckData?.cover || null}
        id={deckId || ''}
        isOpen={isOpenEditDeckModal}
        isPrivate={deckData?.isPrivate || false}
        name={deckData?.name || ''}
        onClose={handleCloseEditDeckModal}
      />
      <DeleteDeckModal
        id={deckId || ''}
        isOpen={isOpenDeleteDeckModal}
        name={deckData?.name}
        onClose={handleCloseDeleteDeckModal}
      />
      <CreateCardModal
        id={deckId || ''}
        isOpen={isOpenAddCardModal}
        onClose={handleCloseAddCardModal}
      />
      <DeleteCardModal
        id={cardForDeleteId || ''}
        isOpen={isOpenDeleteCardModal}
        name={nameCardForDelete}
        onClose={handleCloseDeleteCardModal}
      />
      <EditCardModal
        answer={answerForEdit || ''}
        answerImg={answerImgForEdit || ''}
        id={cardForEditId || ''}
        isOpen={isOpenEditCardModal}
        onClose={handleCloseEditCardModal}
        question={questionForEdit || ''}
        questionImg={questionImgForEdit || ''}
      />
    </Page>
  )
}
