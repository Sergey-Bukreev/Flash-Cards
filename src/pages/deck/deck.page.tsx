import React from 'react'
import { Link } from 'react-router-dom'

import { DeckDropDown } from '@/components/deck/deck-drop-down'
import { CardsTable } from '@/components/decks/cards-table'
import { DeleteDeckModal } from '@/components/decks/delete-deck-modal'
import { EditDeckModal } from '@/components/decks/edit-deck-modal/edit-deck-modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/input'
import { Page } from '@/components/ui/page'
import { Typography } from '@/components/ui/typography'
import { useDeckPage } from '@/pages/deck/use-deck.page'

import s from './deck.page.module.scss'

export const DeckPage: React.FC = () => {
  const {
    cardsData,
    deckData,
    deckId,
    error,
    handleClear,
    handleCloseDeleteDeckModal,
    handleCloseEditDeckModal,
    handleOpenDeleteDeckModal,
    handleOpenEditDeckModal,
    handleSearchChange,
    isLoading,
    isMyDeck,
    isOpenDeleteDeckModal,
    isOpenEditDeckModal,
    search,
  } = useDeckPage()

  if (isLoading) {
    return <Typography variant={'h1'}>{'Loading ....'}</Typography>
  }
  if (error) {
    return <Typography variant={'h1'}>{`Error: ${JSON.stringify(error)}`}</Typography>
  }

  return (
    <Page>
      <div className={s.pageTitle}>
        <div className={s.titleInfo}>
          <Typography variant={'h1'}>{deckData?.name}</Typography>
          {isMyDeck && (
            <DeckDropDown
              onDeleteHandler={handleOpenDeleteDeckModal}
              onEditHandler={handleOpenEditDeckModal}
            />
          )}
        </div>
        {isMyDeck ? (
          <Button variant={'primary'}>{'Add New Card'}</Button>
        ) : (
          <Button as={Link} to={`/decks/${deckId}/learn`}>
            {'Learn'}
          </Button>
        )}
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
          <CardsTable cards={cardsData?.items} />
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
    </Page>
  )
}
