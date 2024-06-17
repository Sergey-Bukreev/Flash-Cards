import { StarIcon } from '@/assets/star-icon'
import clsx from 'clsx'

import s from './rating.module.scss'
type RatingProps = {
  className?: string
  selectedGrade?: number
  size?: number
}
const grade = [1, 2, 3, 4, 5]

export const Rating = ({ className, selectedGrade = 0, size = 16 }: RatingProps) => {
  return (
    <div className={className}>
      {grade.map(gradeNumber => (
        <StarIcon
          className={clsx(s.starIcon, selectedGrade >= gradeNumber ? s.hovered : s.normal)}
          height={size}
          key={gradeNumber}
          width={size}
        />
      ))}
    </div>
  )
}
