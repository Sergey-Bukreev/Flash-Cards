import { FC } from 'react'

import { Select } from '@/components/ui/select'

type PaginationSelectProps = {
  onPageSizeChange: (newPageSize: number) => void
  pageSize: number
}
export const PaginationSelect: FC<PaginationSelectProps> = (props: PaginationSelectProps) => {
  const { onPageSizeChange, pageSize } = props
  const options = [
    { label: '5', value: '5' },
    { label: '10', value: '10' },
    { label: '15', value: '15' },
    { label: '20', value: '20' },
  ]

  const onValueChange = (value?: string) => {
    if (value) {
      onPageSizeChange(+value)
    }
  }

  return <Select onValueChange={onValueChange} options={options} small value={`${pageSize}`} />
}
