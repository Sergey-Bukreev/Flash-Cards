import { DropDown, DropDownItem, DropDownSeparator } from '@/components/ui/drop-down/drop-down'
import { DeleteIcon } from '@/components/ui/drop-down/icons/delete-icon'
import { EditIcon } from '@/components/ui/drop-down/icons/edit-icon'
import { MoreIcon } from '@/components/ui/drop-down/icons/more-icon'
import { PlayIcon } from '@/components/ui/drop-down/icons/play-icon'

export function App() {
  return (
    <div>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <DropDown trigger={<MoreIcon />}>
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
    </div>
  )
}
