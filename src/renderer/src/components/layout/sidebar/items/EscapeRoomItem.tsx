import React from 'react'
import { SidebarItem } from '../SidebarItem'
import { ProgressBar } from '@renderer/components/ui/progress-bar'

type EscapeRoomItemProps = {
  id: string
  name: string
}

export function EscapeRoomItem({ id, name }: EscapeRoomItemProps): React.JSX.Element {
  return (
    <SidebarItem name={name} to={`/escape-rooms/${id}`}>
      <div className="mb-0.5 flex justify-between">
        <h4>{name}</h4>

        <div className="flex justify-end">
          <span className="font-mono">00:00:00</span>
        </div>
      </div>

      <ProgressBar value={45} />
    </SidebarItem>
  )
}
