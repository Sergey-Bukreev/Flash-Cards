import { CustomTable } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { Card } from '@/services/cards/card.type'

export type CardsTableProps = {
  cards: Card[] | undefined
}
export const CardsTable = ({ cards }: CardsTableProps) => {
  return (
    <CustomTable.Root>
      <CustomTable.Head>
        <CustomTable.Row>
          <CustomTable.HeadCell>{'Question'}</CustomTable.HeadCell>
          <CustomTable.HeadCell>{'Answer'}</CustomTable.HeadCell>
          <CustomTable.HeadCell>{'Last Updated'}</CustomTable.HeadCell>
          <CustomTable.HeadCell>{'Grade'}</CustomTable.HeadCell>
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
                <Typography variant={'body2'}>{card.grade}</Typography>
              </CustomTable.DataCell>
            </CustomTable.Row>
          )
        })}
      </CustomTable.Body>
    </CustomTable.Root>
  )
}
