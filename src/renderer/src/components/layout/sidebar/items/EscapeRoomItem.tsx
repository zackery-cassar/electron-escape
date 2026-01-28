import { ProgressBar } from '@renderer/components/ui/progress-bar'
import { EscapeRoom } from '@shared/types/escape-room'
import { State } from '@shared/types/state'
import React from 'react'
import { SidebarItem } from '../SidebarItem'

type EscapeRoomItemProps = {
  room: EscapeRoom
}

export function EscapeRoomItem({ room }: EscapeRoomItemProps): React.JSX.Element {
  const finished = room.puzzles.filter((puzzle) => puzzle.state === State.FINISHED).length
  const progress = room.puzzles.length > 0 ? (finished / room.puzzles.length) * 100 : 0

  return (
    <SidebarItem name={room.name} to={`/escape-rooms/${room.id}`}>
      <div className="mb-0.5 flex justify-between">
        <h4>{room.name}</h4>
        <div className="flex justify-end">
          <span className="font-mono">{room.timer.timeRemaining}</span>
        </div>
      </div>

      <ProgressBar value={progress} />
    </SidebarItem>
  )
}
