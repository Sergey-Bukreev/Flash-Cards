import { Typography } from '@/components/ui/typography'
import * as CustomSlider from '@radix-ui/react-slider'

import s from './slider.module.scss'
export type SliderProps = {
  label?: string
  max: number
  min: number
  onValueChange?: (value: number[]) => void
  step: number
  value: number[]
}
export const Slider = (props: SliderProps) => {
  const { label, max, min, onValueChange, step, value } = props

  return (
    <Typography as={'label'} className={s.sliderLabel} variant={'body2'}>
      {label}
      <div className={s.root}>
        <Typography as={'h3'} className={s.sliderValue} variant={'body1'}>
          {value[0]}
        </Typography>
        <CustomSlider.Root
          className={s.SliderRoot}
          max={max}
          min={min}
          onValueChange={onValueChange}
          step={step}
          value={value}
        >
          <CustomSlider.Track className={s.SliderTrack}>
            <CustomSlider.Range className={s.SliderRange} />
            <CustomSlider.Thumb className={s.SliderThumb} />
            <CustomSlider.Thumb className={s.SliderThumb} />
          </CustomSlider.Track>
        </CustomSlider.Root>
        <Typography as={'h3'} className={s.sliderValue} variant={'body1'}>
          {value[1]}
        </Typography>
      </div>
    </Typography>
  )
}
