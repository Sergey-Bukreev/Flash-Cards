import { Avatar } from '@/components/ui/avatar/avatar'
import { DropDown, DropDownItem, DropDownSeparator } from '@/components/ui/drop-down/drop-down'
import { DeleteIcon } from '@/components/ui/drop-down/icons/delete-icon'
import { EditIcon } from '@/components/ui/drop-down/icons/edit-icon'
import { MoreIcon } from '@/components/ui/drop-down/icons/more-icon'
import { PersonIcon } from '@/components/ui/drop-down/icons/person-icon'
import { PlayIcon } from '@/components/ui/drop-down/icons/play-icon'
import { SignOutIcon } from '@/components/ui/drop-down/icons/sing-out-icon'
import { Typography } from '@/components/ui/typography'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: DropDown,
  tags: ['autodocs'],
  title: 'Components/UI/Dropdown',
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>
export const DefaultExample: Story = {
  args: {},
  render: () => (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <DropDown
        trigger={
          <MoreIcon
            style={{
              border: '1px solid white',
              borderRadius: '50%',
              height: '16px',
              width: '16px',
            }}
          />
        }
      >
        <DropDownItem>
          <PlayIcon />
          {'Learn'}
        </DropDownItem>
        <DropDownSeparator />
        <DropDownItem>
          <EditIcon />
          {'Edit'}
        </DropDownItem>
        <DropDownSeparator />
        <DropDownItem>
          <DeleteIcon />
          {'Delete'}
        </DropDownItem>
      </DropDown>
    </div>
  ),
}

export const ProfileExample: Story = {
  args: {},
  render: () => (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <DropDown
        trigger={
          <img
            src={
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXBnJCBrKnx5d9Ru8Pe6I9JjZR5SaMsdGk2A&usqp=CAU'
            }
            style={{
              border: '1px solid black',
              borderRadius: '50%',
              height: '50px',
              width: '50px',
            }}
          />
        }
      >
        <DropDownItem>
          <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <Avatar
              src={
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXBnJCBrKnx5d9Ru8Pe6I9JjZR5SaMsdGk2A&usqp=CAU'
              }
            />
            <div
              style={{
                alignItems: 'start',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'start',
              }}
            >
              <Typography variant={'subTitle2'}>{'Name'}</Typography>
              <Typography variant={'body2'}>{'testEmail@google.com'}</Typography>
            </div>
          </div>
        </DropDownItem>
        <DropDownSeparator />
        <DropDownItem>
          <PersonIcon />
          {'My Profile'}
        </DropDownItem>
        <DropDownSeparator />
        <DropDownItem>
          <SignOutIcon />
          {'Sign Out'}
        </DropDownItem>
      </DropDown>
    </div>
  ),
}
