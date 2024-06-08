import { ChangeEvent } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'

import { CardsTable } from '@/components/decks/cards-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/input'
import { Page } from '@/components/ui/page'
import { Typography } from '@/components/ui/typography'
import { useGetCardsQuery } from '@/services/cards/card.service'
import { useGetDeckByIdQuery } from '@/services/decks/decks.sevice'

import s from './deck.page.module.scss'

export const DeckPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''
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
  const { deckId } = useParams()
  const { data: deckData } = useGetDeckByIdQuery({
    id: deckId || '',
  })
  const { data: cardsData } = useGetCardsQuery({
    id: deckId || '',
    params: {
      question: search || '',
    },
  })

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
