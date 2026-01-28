import { cn } from '@renderer/utils/cn'
import { State } from '@shared/types/state'
import { Timer } from '@shared/types/timer'
import { Pause, Play } from 'lucide-react'
import React from 'react'

type StartPauseTimerButtonProps = {
  timer: Timer
}

export function StartPauseTimerButton({ timer }: StartPauseTimerButtonProps): React.JSX.Element {
  const disabled = !timer.connected

  const handleClick = (): void => {
    // TODO: Implement start/pause timer functionality
  }

  return (
    <button
      className={cn(
        'group cursor-pointer rounded-md p-2 transition-all duration-300',
        'hover:scale-105',
        'active:scale-95',
        disabled && 'cursor-default opacity-40 hover:scale-100'
      )}
      disabled={disabled}
      onClick={handleClick}
    >
      {timer.state !== State.ACTIVE ? (
        <Play className="size-5 transition-all duration-300 group-hover:opacity-100" />
      ) : (
        <Pause className="size-5 transition-all duration-300 group-hover:opacity-100" />
      )}
    </button>
  )
}
