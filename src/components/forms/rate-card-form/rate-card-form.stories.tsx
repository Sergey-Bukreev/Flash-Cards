import type { Meta, StoryObj } from '@storybook/react'

import { RateCardForm, RateType } from './rate-card-form'

const meta: Meta<typeof RateCardForm> = {
  component: RateCardForm,
  tags: ['autodocs'],
  title: 'Components/Forms/Rate Card',
}

export default meta

type Story = StoryObj<typeof meta>

export const DefaultExample: Story = {
  args: {},
  render: () => {
    const onSubmit = (data: RateType) => {
      alert(JSON.stringify(data))
    }

    return <RateCardForm onSubmit={onSubmit} />
  },
}
