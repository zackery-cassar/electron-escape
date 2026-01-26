import React from 'react'
import { StartPauseTimerButton } from './StartPauseTimerButton'
import { Separator } from '@renderer/components/ui/separator'
import { ResetTimerButton } from './ResetTimerButton'
import { State } from '@shared/types/state'

const mockTimer = {
  id: 'timer',
  duration: '01:00:00',
  state: State.ACTIVE,
  connected: true
}

export function Timer(): React.JSX.Element {
  return (
    <div className="inline-flex items-center gap-3">
      <StartPauseTimerButton timer={mockTimer} />

      <Separator className="h-full w-0.5" />

      <div className="inline-block px-2 text-4xl font-bold">
        <span>01:00:00</span>
      </div>

      <Separator className="h-full w-0.5" />

      <ResetTimerButton timer={mockTimer} />
    </div>
  )
}
