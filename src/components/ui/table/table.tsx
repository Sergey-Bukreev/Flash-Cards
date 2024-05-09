import { ComponentPropsWithoutRef, FC } from 'react'

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
export const CustomTable = { Body, DataCell, Head, HeadCell, Root, Row }
