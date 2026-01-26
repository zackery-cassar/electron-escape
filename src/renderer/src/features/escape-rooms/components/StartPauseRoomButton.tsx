import { cn } from '@renderer/utils/cn'
import { EscapeRoom } from '@shared/types/escape-room'
import { State } from '@shared/types/state'
import { Pause, Play } from 'lucide-react'
import React from 'react'

type StartPauseRoomButtonProps = {
  room: EscapeRoom
}

export function StartPauseRoomButton({ room }: StartPauseRoomButtonProps): React.JSX.Element {
  const disabled = !room.connected
  const isActive = room.state === State.ACTIVE

  const handleClick = (): void => {
    // TODO: Implement start/pause room functionality
  }

  return (
    <button
      className={cn(
        'group relative w-34 cursor-pointer rounded-lg border border-white/40 bg-[#E0822D] px-4 py-1.5 transition-all duration-300',
        'hover:scale-102 hover:border-white/60 hover:shadow-[0_0_20px_rgba(224,130,45,0.3),0_0_40px_rgba(224,130,45,0.15)]',
        'active:scale-[0.98] active:shadow-[0_0_10px_rgba(224,130,45,0.2)]',
        disabled && 'cursor-default opacity-50 hover:scale-100 hover:shadow-none'
      )}
      disabled={disabled}
      onClick={handleClick}
    >
      {/* Subtle background glow layer that appears on hover */}
      <div
        className={cn(
          'absolute inset-0 rounded-lg bg-white/0 transition-all duration-300',
          'group-hover:bg-white/10',
          disabled && 'group-hover:bg-transparent'
        )}
      />

      {/* Button content layer (positioned above the glow layer) */}
      <div className="relative flex items-center justify-center gap-2">
        {/* Button Icon */}
        {!isActive ? <Play className="size-4" /> : <Pause className="size-4" />}

        {/* Button Text */}
        <span className="text-xs font-medium tracking-wide">
          {!isActive ? 'Start Room' : 'Pause Room'}
        </span>
      </div>
    </button>
  )
}
