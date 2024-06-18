import { useNavigate } from 'react-router-dom'

import { DropDown, DropDownItem, DropDownSeparator } from '@/components/ui/drop-down'
import { DeleteIcon } from '@/components/ui/drop-down/icons/delete-icon'
import { EditIcon } from '@/components/ui/drop-down/icons/edit-icon'
import { MoreIcon } from '@/components/ui/drop-down/icons/more-icon'
import { PlayIcon } from '@/components/ui/drop-down/icons/play-icon'

import s from './deck-drop-down.module.scss'
type EditDeckDropDownProps = {
  id: string
  onDeleteHandler: () => void
  onEditHandler: (value: boolean) => void
}
export const DeckDropDown = ({ id, onDeleteHandler, onEditHandler }: EditDeckDropDownProps) => {
  const navigate = useNavigate()

  return (
    <DropDown trigger={<MoreIcon className={s.triggerIcon} />}>
      <DropDownItem onSelect={() => navigate(`/decks/${id}/learn`)}>
        <PlayIcon />
        {'Learn'}
      </DropDownItem>
      <DropDownSeparator />
      <DropDownItem onSelect={() => onEditHandler(true)}>
        <EditIcon />
        {'Edit'}
      </DropDownItem>
      <DropDownSeparator />
      <DropDownItem onSelect={onDeleteHandler}>
        <DeleteIcon />
        {'Delete'}
      </DropDownItem>
    </DropDown>
  )
}
