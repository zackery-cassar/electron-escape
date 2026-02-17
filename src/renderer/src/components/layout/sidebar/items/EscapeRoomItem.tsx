import { WarningAlert } from '@renderer/components/ui/alerts/WarningAlert'
import { ProgressBar } from '@renderer/components/ui/progress-bar'
import { parseTime } from '@renderer/features/timer/utils/parseTime'
import { EscapeRoom } from '@shared/types/escape-room'
import { State } from '@shared/types/state'
import React from 'react'
import { SidebarItem } from '../SidebarItem'

type EscapeRoomItemProps = {
  room: EscapeRoom
}

export function EscapeRoomItem({ room }: EscapeRoomItemProps): React.JSX.Element {
  const puzzles = Object.values(room.puzzles)
  const finished = puzzles.filter((puzzle) => puzzle.state === State.FINISHED).length
  const progress = puzzles.length > 0 ? (finished / puzzles.length) * 100 : 0

  return (
    <SidebarItem name={room.name} to={`/escape-rooms/${room.id}`}>
      <div className="mb-0.5 flex justify-between">
        <h4>{room.name}</h4>
        <div className="flex justify-end gap-2">
          {parseTime(room.timer.timeRemaining) < parseTime('00:05:00') && <WarningAlert />}
          <span className="font-mono">{room.timer.timeRemaining}</span>
        </div>
      </div>

      <ProgressBar value={progress} />
    </SidebarItem>
  )
}
