import { PaginationSelect } from '@/components/ui/pagination/pagination-select/pagination-selecct'
import { Typography } from '@/components/ui/typography'

import classes from './paginnation.module.scss'

import { DOTS, usePagination } from './usePagination'

export type PaginatorPropsType = {
  currentPage: number
  onPageChanged: (page: number) => void
  onPageSizeChange: (size: number) => void
  pageSize: number
  totalCount: number
}

export const Pagination = (props: PaginatorPropsType) => {
  const { currentPage, onPageChanged, onPageSizeChange, pageSize, totalCount } = props

  const paginationRange = usePagination({
    currentPage,
    pageSize,
    totalCount,
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChanged(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChanged(currentPage - 1)
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <div className={classes.pagination}>
      <button className={classes.button} disabled={currentPage === 1} onClick={onPrevious}>
        {'❮'}
      </button>
      <div className={classes.pages}>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <Typography className={classes.dots} key={index}>
                {DOTS}
              </Typography>
            )
          }

          return (
            <Typography
              className={`${classes.page} ${
                currentPage === pageNumber ? classes.selectedPage : ''
              }`}
              key={index}
              onClick={() => onPageChanged(pageNumber as number)}
              variant={'body2'}
            >
              {pageNumber}
            </Typography>
          )
        })}
      </div>
      <button className={classes.button} disabled={currentPage === lastPage} onClick={onNext}>
        {'❯'}
      </button>
      <div className={classes.selectBlock}>
        <Typography variant={'body2'}>Показать</Typography>
        <PaginationSelect onPageSizeChange={onPageSizeChange} pageSize={pageSize} />
        <Typography variant={'body2'}>на странице</Typography>
      </div>
    </div>
  )
}
