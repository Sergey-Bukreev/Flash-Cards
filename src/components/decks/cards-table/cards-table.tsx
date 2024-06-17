import { Button } from '@/components/ui/button'
import { DeleteIcon } from '@/components/ui/drop-down/icons/delete-icon'
import { EditIcon } from '@/components/ui/drop-down/icons/edit-icon'
import { Rating } from '@/components/ui/rating'
import { CustomTable } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { Card } from '@/services/cards/card.type'

import s from './cards-table.module.scss'

export type CardsTableProps = {
  cards: Card[] | undefined
  currentUserId: string
  onDeleteClick: (id: string) => void
  onEditClick: (id: string) => void
}
export const CardsTable = ({
  cards,
  currentUserId,
  onDeleteClick,
  onEditClick,
}: CardsTableProps) => {
  const handleEditClick = (id: string) => () => onEditClick(id)
  const handleDeleteClick = (id: string) => () => onDeleteClick(id)

  return (
    <CustomTable.Root>
      <CustomTable.Head>
        <CustomTable.Row>
          <CustomTable.HeadCell>{'Question'}</CustomTable.HeadCell>
          <CustomTable.HeadCell>{'Answer'}</CustomTable.HeadCell>
          <CustomTable.HeadCell>{'Last Updated'}</CustomTable.HeadCell>
          <CustomTable.HeadCell>{'Grade'}</CustomTable.HeadCell>
          <CustomTable.HeadCell></CustomTable.HeadCell>
        </CustomTable.Row>
      </CustomTable.Head>
      <CustomTable.Body>
        {cards?.map(card => {
          const updateAt = new Date(card.updated).toLocaleDateString('ru-Ru')

          return (
            <CustomTable.Row key={card.id}>
              <CustomTable.DataCell>
                <Typography variant={'body2'}>{card.question}</Typography>
              </CustomTable.DataCell>
              <CustomTable.DataCell>
                <Typography variant={'body2'}>{card.answer}</Typography>
              </CustomTable.DataCell>
              <CustomTable.DataCell>
                <Typography variant={'body2'}>{updateAt}</Typography>
              </CustomTable.DataCell>
              <CustomTable.DataCell>
                <Rating selectedGrade={card.grade} />
              </CustomTable.DataCell>
              <CustomTable.DataCell>
                <div className={s.iconsWrapper}>
                  <Button
                    className={s.button}
                    disabled={currentUserId !== card.userId}
                    onClick={handleEditClick(card.id)}
                    variant={'icon'}
                  >
                    <EditIcon disabled={currentUserId !== card.userId} height={20} width={20} />
                  </Button>
                  <Button
                    className={s.button}
                    disabled={currentUserId !== card.userId}
                    onClick={handleDeleteClick(card.id)}
                    variant={'icon'}
                  >
                    <DeleteIcon disabled={currentUserId !== card.userId} height={20} width={20} />
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
