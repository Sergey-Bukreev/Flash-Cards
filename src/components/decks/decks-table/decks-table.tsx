import { Link, useNavigate } from 'react-router-dom'

import { StarIcon } from '@/assets/star-icon'
import { Button } from '@/components/ui/button'
import { DeleteIcon } from '@/components/ui/drop-down/icons/delete-icon'
import { EditIcon } from '@/components/ui/drop-down/icons/edit-icon'
import { PlayIcon } from '@/components/ui/drop-down/icons/play-icon'
import { Column, CustomTable, Sort } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { Deck } from '@/services/decks/decks.type'
import clsx from 'clsx'

import s from './decks-table.module.scss'

import baseDeckImage from '../../../assets/base-deck-image.png'

const columns: Column[] = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'cardsCount',
    title: 'Cards',
  },
  {
    key: 'updated',
    title: 'Last Updated',
  },
  {
    key: 'author.name',
    title: 'Created By',
  },
  {
    key: 'actions',
    title: '',
  },
]

export type DecksTableProps = {
  currentUserId: string
  decks: Deck[] | undefined
  onDeleteClick: (id: string) => void
  onEditClick: (id: string) => void
  onFavoriteClick: (id: string, isFavorite: boolean) => void
  onSort?: (key: Sort) => void
  sort?: Sort
}

export const DecksTable = (props: DecksTableProps) => {
  const { currentUserId, decks, onDeleteClick, onEditClick, onFavoriteClick, onSort, sort } = props
  const handleEditClick = (id: string) => () => onEditClick(id)
  const handleDeleteClick = (id: string) => () => onDeleteClick(id)
  const handleFavoriteClick = (id: string, isFavorite: boolean) => () =>
    onFavoriteClick(id, isFavorite)
  const navigate = useNavigate()

  return (
    <CustomTable.Root className={s.tableRoot}>
      <CustomTable.TableHeader columns={columns} onSort={onSort} sort={sort} />
      <CustomTable.Body>
        {decks?.map(deck => {
          const updateAt = new Date(deck.updated).toLocaleDateString('ru-Ru')

          return (
            <CustomTable.Row key={deck.id}>
              <CustomTable.DataCell>
                <div className={s.nameWrapper}>
                  <img alt={deck.name} src={deck.cover ?? baseDeckImage} />
                  <Typography as={Link} to={`/decks/${deck.id}`} variant={'body2'}>
                    {deck.name}
                  </Typography>
                </div>
              </CustomTable.DataCell>
              <CustomTable.DataCell className={s.cardsCount}>
                {deck.cardsCount}
              </CustomTable.DataCell>
              <CustomTable.DataCell className={s.date}>{updateAt}</CustomTable.DataCell>
              <CustomTable.DataCell className={s.author}>{deck.author.name}</CustomTable.DataCell>
              <CustomTable.DataCell className={s.actions}>
                <div className={s.iconsWrapper}>
                  <Button
                    className={s.button}
                    disabled={deck.cardsCount === 0}
                    onClick={() => navigate(`/decks/${deck.id}/learn`)}
                    variant={'icon'}
                  >
                    <PlayIcon disabled={deck.cardsCount === 0} height={20} width={20} />
                  </Button>
                  <Button
                    className={s.button}
                    onClick={handleFavoriteClick(deck.id, deck.isFavorite)}
                    variant={'icon'}
                  >
                    <StarIcon
                      className={clsx(s.favoriteIcon, deck.isFavorite && s.selected)}
                      height={20}
                      width={20}
                    />
                  </Button>
                  <Button
                    className={s.button}
                    disabled={currentUserId !== deck.author.id}
                    onClick={handleEditClick(deck.id)}
                    variant={'icon'}
                  >
                    <EditIcon disabled={currentUserId !== deck.author.id} height={20} width={20} />
                  </Button>
                  <Button
                    className={s.button}
                    disabled={currentUserId !== deck.author.id}
                    onClick={handleDeleteClick(deck.id)}
                    variant={'icon'}
                  >
                    <DeleteIcon
                      disabled={currentUserId !== deck.author.id}
                      height={20}
                      width={20}
                    />
                  </Button>
                </div>
              </CustomTable.DataCell>
            </CustomTable.Row>
          )
        })}
      </CustomTable.Body>
    </CustomTable.Root>
  )
}
