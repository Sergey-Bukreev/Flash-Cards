import { ComponentPropsWithoutRef, FC } from 'react'

import { ArrowDownIcon } from '@/components/ui/select/icons/arrow-down-icon'
import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import s from './table.module.scss'

const Root: FC<ComponentPropsWithoutRef<'table'>> = ({ className, ...rest }) => {
  return <table className={clsx(s.root, className)} {...rest} />
}

const Head: FC<ComponentPropsWithoutRef<'thead'>> = ({ className, ...rest }) => {
  return <thead className={clsx(s.head, className)} {...rest} />
}
const HeadCell: FC<ComponentPropsWithoutRef<'th'>> = ({ className, ...rest }) => {
  return <th className={clsx(s.headCell, className)} {...rest} />
}
const Body: FC<ComponentPropsWithoutRef<'tbody'>> = ({ className, ...rest }) => {
  return <tbody className={clsx(s.body, className)} {...rest} />
}
const Row: FC<ComponentPropsWithoutRef<'tr'>> = ({ className, ...rest }) => {
  return <tr className={clsx(s.row, className)} {...rest} />
}
const DataCell: FC<ComponentPropsWithoutRef<'td'>> = ({ className, ...rest }) => {
  return <td className={clsx(s.dataCell, className)} {...rest} />
}

export type TableProps = {
  data: Record<string, any>[]
}
export const PolymorphicTable: FC<TableProps> = (props: TableProps) => {
  const { data } = props

  const headers = Object.keys(data[0])

  return (
    <Root>
      <Head>
        <Row>
          {headers.map((header, index) => (
            <HeadCell key={index}>
              <Typography className={s.headCell} variant={'subTitle2'}>
                {header}
              </Typography>
            </HeadCell>
          ))}
        </Row>
      </Head>
      <Body>
        {data.map((rowData, rowIndex) => (
          <Row key={rowIndex}>
            {headers.map((header, cellIndex) => (
              <DataCell key={cellIndex}>
                {header === 'imageUrl' ? <img src={rowData[header]} /> : rowData[header]}
              </DataCell>
            ))}
          </Row>
        ))}
      </Body>
    </Root>
  )
}

export type Sort = {
  direction: 'asc' | 'desc'
  key: string
} | null

export type Column = {
  key: string
  sortable?: boolean
  title: string
}

export type TableHeaderProps = Omit<
  {
    columns: Column[]
    onSort?: (sort: Sort) => void
    sort?: Sort
  } & ComponentPropsWithoutRef<'thead'>,
  'children'
>

export const TableHeader: FC<TableHeaderProps> = ({ columns, onSort, sort, ...restProps }) => {
  const handleSort = (key: string, sortable?: boolean) => () => {
    if (!onSort || sortable === false) {
      return
    }

    if (sort?.key !== key) {
      return onSort({ direction: 'asc', key })
    }
    if (sort.direction === 'desc') {
      return onSort(null)
    }

    return onSort({
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
      key,
    })
  }

  return (
    <CustomTable.Head {...restProps}>
      <CustomTable.Row>
        {columns.map(({ key, sortable, title }) => {
          const sortTerms = sort && sort.key === key
          const classes = {
            cell: clsx(!(sortable === false) && s.hover),
            icon: clsx(s.icon, sortTerms && sort.direction === 'desc' && s.down),
          }

          return (
            <CustomTable.HeadCell
              className={classes.cell}
              key={key}
              onClick={handleSort(key, sortable)}
            >
              {title}
              {sortTerms && <ArrowDownIcon className={classes.icon} />}
            </CustomTable.HeadCell>
          )
        })}
      </CustomTable.Row>
    </CustomTable.Head>
  )
}

export const CustomTable = { Body, DataCell, Head, HeadCell, Root, Row, TableHeader }
