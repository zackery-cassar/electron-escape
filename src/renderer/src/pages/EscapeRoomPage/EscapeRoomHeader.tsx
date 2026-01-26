import { EscapeRoom } from '@shared/types/escape-room'
import React from 'react'
import { Timer } from '@renderer/features/timer/components/Timer'
import { ConnectionStatus } from '@renderer/components/ui/status/ConnectionStatus'
import { StartPauseRoomButton } from '@renderer/features/escape-rooms/components/StartPauseRoomButton'
import { ResetRoomButton } from '@renderer/features/escape-rooms/components/ResetRoomButton'

type EscapeRoomHeaderProps = {
  room: EscapeRoom
}

export function EscapeRoomHeader({ room }: EscapeRoomHeaderProps): React.JSX.Element {
  return (
    <div className="grid h-32 min-h-32 w-full grid-cols-[1fr_auto_1fr] border-b border-[#FFFFFF]/18 px-7.5">
      {/* Left section */}
      <div className="flex flex-col justify-center">
        {/* Escape Room Name */}
        <span className="text-[32px] text-shadow-[0_0_10px_#FFFFFF]">{room.name}</span>

        {/* Room Connection Status */}
        <ConnectionStatus connected={room.connected} size="medium" />
      </div>

      {/* Center section */}
      <div className="flex flex-col items-center justify-center gap-2">
        {/* Timer */}
        <Timer />
        {/* Hint Counter */}
        <span className="text-[14px] text-shadow-[0_0_10px_#FFFFFF]">Hints: 0</span>
      </div>

      {/* Right section */}
      <div className="flex items-center justify-end gap-2">
        {/* Start Room Button */}
        <StartPauseRoomButton room={room} />

        {/* Reset Room Button */}
        <ResetRoomButton room={room} />
      </div>
    </div>
  )
}
