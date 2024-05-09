import { PolymorphicTable } from '@/components/ui/table/table'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: PolymorphicTable,
  tags: ['autodocs'],
  title: 'Components/UI/Polymorphic Table',
} satisfies Meta<typeof PolymorphicTable>

export default meta
type Story = StoryObj<typeof meta>
export const DefaultExample: Story = {
  args: {
    data: [
      { id: 1, name: 'Product A', price: 100 },
      { id: 2, name: 'Product B', price: 200 },
      { id: 3, name: 'Product C', price: 150 },
    ],
  },
}
export const BigDataExample: Story = {
  args: {
    data: [
      {
        category: 'Category 1',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce feugiat purus a arcu porta, at venenatis lacus tincidunt.',
        id: 1,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2cpxqaBB92OWDgqO-b4r1A68tiS69Xf7GrSNA8yHaEYab590tA0KWM9Nn_2YbclBbS2c&usqp=CAU',
        name: 'Product A',
        price: 100,
        quantity: 10,
      },
      {
        category: 'Category 2',
        description:
          'Nullam ac libero quis quam condimentum rhoncus. Maecenas nec mi vehicula, congue nisi id, viverra metus.',
        id: 2,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2cpxqaBB92OWDgqO-b4r1A68tiS69Xf7GrSNA8yHaEYab590tA0KWM9Nn_2YbclBbS2c&usqp=CAU',
        name: 'Product B',
        price: 200,
        quantity: 5,
      },
      {
        category: 'Category 1',
        description:
          'Sed sollicitudin elit nec convallis molestie. Nam convallis, risus eu ultricies vestibulum, libero ex fermentum tortor.',
        id: 3,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2cpxqaBB92OWDgqO-b4r1A68tiS69Xf7GrSNA8yHaEYab590tA0KWM9Nn_2YbclBbS2c&usqp=CAU',
        name: 'Product C',
        price: 150,
        quantity: 8,
      },
      {
        category: 'Category 3',
        description:
          'Proin sit amet ipsum in ipsum pharetra consequat vitae nec nunc. Nam at felis id nisi ullamcorper malesuada.',
        id: 4,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2cpxqaBB92OWDgqO-b4r1A68tiS69Xf7GrSNA8yHaEYab590tA0KWM9Nn_2YbclBbS2c&usqp=CAU',
        name: 'Product D',
        price: 120,
        quantity: 12,
      },
      {
        category: 'Category 2',
        description:
          'Praesent id lorem a turpis scelerisque luctus a id lacus. Ut et eros sit amet diam aliquet ultricies.',
        id: 5,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2cpxqaBB92OWDgqO-b4r1A68tiS69Xf7GrSNA8yHaEYab590tA0KWM9Nn_2YbclBbS2c&usqp=CAU',
        name: 'Product E',
        price: 180,
        quantity: 15,
      },
    ],
  },
}
