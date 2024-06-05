export const useDecksPage = () => {
  const tabs = [
    { name: 'All Decks', value: '' },
    { name: 'My Decks', value: 'page 2 content' },
    { name: 'Favorite', value: 'page 3 content' },
  ]

  return { tabs }
}
