import React from 'react'
import { StartPauseTimerButton } from './StartPauseTimerButton'
import { Separator } from '@renderer/components/ui/separator'
import { ResetTimerButton } from './ResetTimerButton'
import { Timer as TimerType } from '@shared/types/timer'

type TimerProps = {
  timer: TimerType
}

export function Timer({ timer }: TimerProps): React.JSX.Element {
  return (
    <div className="inline-flex items-center gap-3">
      <StartPauseTimerButton timer={timer} />

      <Separator className="h-full w-0.5" />

      <div className="inline-block px-2 text-4xl font-bold">
        <span>{timer.timeRemaining}</span>
      </div>

      <Separator className="h-full w-0.5" />

      <ResetTimerButton timer={timer} />
    </div>
  )
}
