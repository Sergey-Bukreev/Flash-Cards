import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import * as CustomDropDown from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './drop-down.module.scss'

export type DropDownProps = {
  children?: ReactNode
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof CustomDropDown.Root>
export const DropDown = forwardRef<ElementRef<typeof CustomDropDown.Root>, DropDownProps>(
  ({ children, trigger, ...rest }, ref) => {
    return (
      <CustomDropDown.Root {...rest}>
        <CustomDropDown.Trigger asChild className={s.Trigger} ref={ref}>
          {trigger}
        </CustomDropDown.Trigger>
        <CustomDropDown.Portal>
          <CustomDropDown.Content align={'end'} className={s.Contetnt} sideOffset={8}>
            <div className={s.ItemWrapper}>{children}</div>
            <CustomDropDown.Arrow asChild>
              <div className={s.Arrow} />
            </CustomDropDown.Arrow>
          </CustomDropDown.Content>
        </CustomDropDown.Portal>
      </CustomDropDown.Root>
    )
  }
)

export type DropDownItemProps = ComponentPropsWithoutRef<typeof CustomDropDown.Item>

export const DropDownItem = forwardRef<ElementRef<typeof CustomDropDown.Item>, DropDownItemProps>(
  ({ className, ...rest }, ref) => (
    <CustomDropDown.Item className={clsx(s.Item, className)} ref={ref} {...rest} />
  )
)

export type DropDownSeparatorProps = ComponentPropsWithoutRef<typeof CustomDropDown.Separator>
export const DropDownSeparator = forwardRef<
  ElementRef<typeof CustomDropDown.Separator>,
  DropDownSeparatorProps
>(({ className, ...rest }, ref) => (
  <CustomDropDown.Separator className={clsx(s.Separator, className)} ref={ref} {...rest} />
))

export type DropDownLabelProps = ComponentPropsWithoutRef<typeof CustomDropDown.Label>
export const DropDownLabel = forwardRef<
  ElementRef<typeof CustomDropDown.Label>,
  DropDownLabelProps
>(({ className, ...rest }, ref) => (
  <CustomDropDown.Label className={clsx(s.Label, className)} ref={ref} {...rest} />
))
