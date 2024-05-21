import { useState } from 'react'

import { Pagination } from '@/components/ui/pagination/pagination'
import { PolymorphicTable } from '@/components/ui/table'
import { Meta, StoryFn } from '@storybook/react'

const meta: Meta<typeof Pagination> = {
  argTypes: {
    onPageChanged: { action: 'page changed' },
    onPageSizeChange: { action: 'page size changed' },
  },
  component: Pagination,
  title: 'Components/UI/Pagination',
}

export default meta

const Template: StoryFn<typeof Pagination> = args => {
  const [currentPage, setCurrentPage] = useState(args.currentPage)
  const [pageSize, setPageSize] = useState(args.pageSize)

  const handlePageChanged = (page: number) => {
    setCurrentPage(page)
    args.onPageChanged(page)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
    args.onPageSizeChange(size)
  }

  const items = Array.from({ length: args.totalCount }, (_, i) => `Item ${i + 1}`)
  const startIndex = (currentPage - 1) * pageSize
  const currentItems = items.slice(startIndex, startIndex + pageSize)

  return (
    <div>
      <PolymorphicTable data={currentItems.map((item, index) => ({ id: index, name: item }))} />
      <Pagination
        currentPage={currentPage}
        onPageChanged={handlePageChanged}
        onPageSizeChange={handlePageSizeChange}
        pageSize={pageSize}
        totalCount={args.totalCount}
      />
    </div>
  )
}

export const ControlExample = Template.bind({})
ControlExample.args = {
  currentPage: 1,
  pageSize: 10,
  totalCount: 100,
}
