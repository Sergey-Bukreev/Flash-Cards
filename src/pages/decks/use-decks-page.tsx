export const useDecksPage = () => {
  const tabs = [
    { name: 'All Decks', value: 'all' },
    { name: 'My Decks', value: 'my' },
    { name: 'Favorite', value: 'favorites' },
  ]

  return { tabs }
}
