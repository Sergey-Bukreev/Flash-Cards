import { Typography } from '@/components/ui/typography'
import * as CustomTabs from '@radix-ui/react-tabs'
import clsx from 'clsx'

import s from './tabs.module.scss'

export type Tab = {
  disabled?: boolean
  name: string
  value: string
}
export type TabsProps = {
  className?: string
  label?: string
  onValueChange?: (value: string) => void
  tabs: Tab[]
  value: string
}
export const Tabs = (props: TabsProps) => {
  const { className, label, onValueChange, tabs, value } = props

  const handleChange = (newValue: string) => {
    onValueChange ? onValueChange(newValue) : null
  }

  return (
    <Typography as={'label'} className={clsx(s.Label, className)} variant={'body2'}>
      {label}
      <CustomTabs.Root className={s.TabsRoot} onValueChange={handleChange} value={value}>
        <CustomTabs.TabsList>
          {tabs.map((tab, index) => (
            <CustomTabs.TabsTrigger
              className={s.TabsTrigger}
              disabled={tab.disabled}
              key={index}
              value={tab.value}
            >
              {tab.name}
            </CustomTabs.TabsTrigger>
          ))}
        </CustomTabs.TabsList>
        {tabs.map(tab => (
          <CustomTabs.Content className={s.TabsContent} value={tab.value}>
            {tab.value}
          </CustomTabs.Content>
        ))}
      </CustomTabs.Root>
    </Typography>
  )
}
