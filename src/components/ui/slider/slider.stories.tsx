import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Slider, SliderProps } from '@/components/ui/slider/slider'

const meta: Meta<typeof Slider> = {
  component: Slider,
  tags: ['autodocs'],
  title: 'Components/UI/Slider',
}

export default meta

type Story = StoryObj<typeof meta>

export const DefaultExample: Story = {
  args: {
    label: 'Slide slide slide',
    max: 20,
    min: 0,
    value: [6, 15],
  },
}
export const ControlExample: Story = {
  args: {
    label: 'Chose value',
    max: 40,
    min: 0,
    value: [0, 30],
  },
  render: (args: SliderProps) => {
    const [sliderValue, setSliderValue] = useState<number[]>(args.value)

    const onChangeSliderValue = (value: number[]) => {
      setSliderValue(value)
    }

    return <Slider {...args} onValueChange={onChangeSliderValue} value={sliderValue} />
  },
}
