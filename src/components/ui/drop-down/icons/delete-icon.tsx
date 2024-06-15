import { Ref, SVGProps, forwardRef } from 'react'

type IconProps = {
  disabled?: boolean
} & SVGProps<SVGSVGElement>

const DeleteIcon = (props: IconProps, ref: Ref<SVGSVGElement>) => {
  const { disabled, ...restProps } = props
  const fillColor = disabled ? 'gray' : 'white'

  return (
    <svg
      fill={'none'}
      height={'24'}
      ref={ref}
      viewBox={'0 0 24 24'}
      width={'24'}
      xmlns={'http://www.w3.org/2000/svg'}
      {...restProps}
    >
      <g clipPath={'url(#clip0_5661_1775)'}>
        <path
          d={
            'M21 6H16V4.33C15.9765 3.68982 15.7002 3.08506 15.2316 2.64829C14.7629 2.21153 14.1402 1.97839 13.5 2H10.5C9.85975 1.97839 9.23706 2.21153 8.76843 2.64829C8.2998 3.08506 8.02346 3.68982 8 4.33V6H3C2.73478 6 2.48043 6.10536 2.29289 6.29289C2.10536 6.48043 2 6.73479 2 7C2 7.26522 2.10536 7.51957 2.29289 7.70711C2.48043 7.89464 2.73478 8 3 8H4V19C4 19.7957 4.31607 20.5587 4.87868 21.1213C5.44129 21.6839 6.20435 22 7 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7957 20 19V8H21C21.2652 8 21.5196 7.89464 21.7071 7.70711C21.8946 7.51957 22 7.26522 22 7C22 6.73479 21.8946 6.48043 21.7071 6.29289C21.5196 6.10536 21.2652 6 21 6ZM10 4.33C10 4.17 10.21 4 10.5 4H13.5C13.79 4 14 4.17 14 4.33V6H10V4.33ZM18 19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H7C6.73478 20 6.48043 19.8946 6.29289 19.7071C6.10536 19.5196 6 19.2652 6 19V8H18V19Z'
          }
          fill={fillColor}
        />
      </g>
      <defs>
        <clipPath id={'clip0_5661_1775'}>
          <rect fill={'white'} height={'24'} width={'24'} />
        </clipPath>
      </defs>
    </svg>
  )
}
const ForwardRef = forwardRef(DeleteIcon)

export { ForwardRef as DeleteIcon }
