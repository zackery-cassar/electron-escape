import { cn } from '@renderer/utils/cn'
import { State } from '@shared/types/state'
import { Timer } from '@shared/types/timer'
import { RotateCcw } from 'lucide-react'
import React, { useState } from 'react'

type ResetTimerButtonProps = {
  timer: Timer
}

export function ResetTimerButton({ timer }: ResetTimerButtonProps): React.JSX.Element {
  const [animating, setAnimating] = useState(false)
  const disabled = !timer.connected || timer.state === State.RESETTING

  const handleClick = (): void => {
    window.api.timer.reset(timer.roomId)
    setAnimating(true)
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
      <RotateCcw
        className={cn(
          'size-5 transition-all duration-300',
          'group-hover:opacity-100',
          !disabled && 'group-hover:-rotate-45',
          animating && 'animate-[spin-ccw_0.5s_ease-in-out]'
        )}
        onAnimationEnd={() => setAnimating(false)}
      />
    </button>
  )
}
