import { ChangeEvent } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { useDebounce } from '@/components/common/hooks/use-debounce'
import { useGetCardsQuery } from '@/services/cards/card.service'
import { useGetDeckByIdQuery } from '@/services/decks/decks.sevice'

export const useDeckPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const debouncedSearchValue = useDebounce(search, 500)

  const { deckId } = useParams()

  const { data: deckData } = useGetDeckByIdQuery({
    id: deckId || '',
  })
  const { data: cardsData } = useGetCardsQuery({
    id: deckId || '',
    params: {
      question: debouncedSearchValue || '',
    },
  })

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

  return { cardsData, deckData, deckId, handleClear, handleSearchChange, search }
}
