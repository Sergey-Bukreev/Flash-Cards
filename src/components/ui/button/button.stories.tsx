import type { Meta, StoryObj } from '@storybook/react'

import { PlayIcon } from '@/components/ui/drop-down/icons/play-icon'
import { SignOutIcon } from '@/components/ui/drop-down/icons/sing-out-icon'

import { Button } from './'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'Components/UI/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    disabled: false,
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    disabled: false,
    variant: 'secondary',
  },
}

export const FullWidth: Story = {
  args: {
    children: 'Full Width Primary Button',
    disabled: false,
    fullWidth: true,
    variant: 'primary',
  },
}
export const AsLinkPrimary: Story = {
  args: {
    as: 'a',
    children: 'Link that looks like a button',
    href: 'https://www.google.com/',
    target: '_blank',
    variant: 'primary',
  },
}
export const AsLinkSecondary: Story = {
  args: {
    as: 'a',
    children: 'Link that looks like a button',
    href: 'https://www.google.com/',
    target: '_blank',
    variant: 'secondary',
  },
}
export const WithIconExample: Story = {
  args: {
    as: 'a',
    children: (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          gap: '4px',
          justifyContent: 'space-between',
        }}
      >
        <SignOutIcon /> {'Back to Google'}
      </div>
    ),
    href: 'https://www.google.com/',
    target: '_blank',
    variant: 'primary',
  },
}
export const IconButtonExample: Story = {
  args: {
    as: 'a',
    children: <PlayIcon />,
    href: 'https://www.google.com/',
    target: '_blank',
    variant: 'icon',
  },
}
