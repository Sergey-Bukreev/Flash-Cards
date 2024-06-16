import { CardForm } from '@/components/forms/card-form/card-form'
import { CardFormProps } from '@/components/forms/card-form/use-card-form-logic'
import { Meta, StoryFn } from '@storybook/react'

export default {
  component: CardForm,
  tags: ['autodocs'],
  title: 'Components/Forms/CardForm',
} as Meta

const Template: StoryFn<CardFormProps> = args => <CardForm {...args} />

export const Default = Template.bind({})
Default.args = {
  defaultValues: {
    answer: '',
    answerImg: '',
    question: '',
    questionImg: '',
  },
  onSubmit: data => {
    console.log('Form submitted with data:', data)
  },
}
