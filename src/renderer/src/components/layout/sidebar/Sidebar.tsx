import React from 'react'
import { SidebarHeader } from './SidebarHeader'
import { EscapeRoomSection } from './sections/EscapeRoomSection'
import { SettingsSection } from './sections/SettingsSection'
import { Separator } from '@renderer/components/ui/separator'

export function Sidebar(): React.JSX.Element {
  return (
    <aside className="flex h-screen w-87.5 flex-col overflow-hidden border-r border-[#FFFFFF]/18 py-5">
      <SidebarHeader />
      <Separator className="h-0.5 w-full" />
      <EscapeRoomSection />
      <SettingsSection />
    </aside>
  )
}
