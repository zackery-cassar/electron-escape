import { Separator } from '@renderer/components/ui/separator'
import { Timer as TimerType } from '@shared/types/timer'
import React from 'react'
import { EditableTimer } from './EditableTimer'
import { ResetTimerButton } from './ResetTimerButton'
import { StartPauseTimerButton } from './StartPauseTimerButton'
import { TimerContextMenu } from './TimerContextMenu'
import { TimerTooltip } from './TimerTooltip'

type TimerProps = {
  timer: TimerType
}

export function Timer({ timer }: TimerProps): React.JSX.Element {
  return (
    <div className="inline-flex items-center gap-3">
      <StartPauseTimerButton timer={timer} />

      <Separator className="h-full w-0.5" />

      <TimerTooltip timer={timer}>
        <TimerContextMenu timer={timer}>
          <div className="inline-block px-2 text-4xl font-bold">
            <EditableTimer timer={timer} />
          </div>
        </TimerContextMenu>
      </TimerTooltip>

      <Separator className="h-full w-0.5" />

      <ResetTimerButton timer={timer} />
    </div>
  )
}
