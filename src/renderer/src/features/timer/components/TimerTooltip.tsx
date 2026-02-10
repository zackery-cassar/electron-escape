import { Timer } from '@shared/types/timer'
import { Tooltip } from 'radix-ui'
import { parseTime } from '../utils/parseTime'
import { formatSeconds } from '../utils/formatSeconds'

type TimerTooltipProps = {
  timer: Timer
  children: React.JSX.Element
}

export function TimerTooltip({ timer, children }: TimerTooltipProps): React.JSX.Element {
  // Convert time remaining to time taken
  const timeTaken = formatSeconds(parseTime(timer.duration) - parseTime(timer.timeRemaining))
  return (
    <Tooltip.Root delayDuration={300}>
      <Tooltip.Trigger>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="bottom"
          align="start"
          sideOffset={5}
          className="flex max-w-xs flex-col rounded-lg border border-[white]/15 bg-[#1D2022] px-3 py-2 text-[12px] text-white"
        >
          <span className="text-[10px] text-slate-400">Time taken</span> {timeTaken}
          <Tooltip.Arrow className="fill-white/15" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )
}
