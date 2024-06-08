import { Link } from 'react-router-dom'

import { CardsTable } from '@/components/decks/cards-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/input'
import { Page } from '@/components/ui/page'
import { Typography } from '@/components/ui/typography'
import { useDeckPage } from '@/pages/deck/use-deck.page'

import s from './deck.page.module.scss'

export const DeckPage = () => {
  const { cardsData, deckData, deckId, handleClear, handleSearchChange, search } = useDeckPage()

  return (
    <Page>
      <div className={s.pageTitle}>
        <Typography variant={'h1'}>{deckData?.name}</Typography>
        <Button as={Link} to={`/decks/${deckId}/learn`}>
          {'Learn'}
        </Button>
      </div>

      {deckData?.cover && <img alt={'Deck cover'} className={s.cover} src={deckData?.cover} />}

      <Input
        clear={handleClear}
        onChange={handleSearchChange}
        placeholder={'Search Cards'}
        type={'search'}
        value={search}
      />
      <CardsTable cards={cardsData?.items} />
    </Page>
  )
}
