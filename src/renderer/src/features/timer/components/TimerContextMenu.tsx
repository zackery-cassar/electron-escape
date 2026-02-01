import { Timer } from '@shared/types/timer'
import { ContextMenu } from 'radix-ui'
import React from 'react'
import { parseTime } from '../utils/parseTime'
import { formatSeconds } from '../utils/formatSeconds'
import { Minus, Plus } from 'lucide-react'

type TimerContextMenuProps = {
  timer: Timer
  children: React.JSX.Element
}

export function TimerContextMenu({ timer, children }: TimerContextMenuProps): React.JSX.Element {
  const disabled = !timer.connected

  const adjustTimer = (seconds: number): void => {
    const currentTime = parseTime(timer.timeRemaining)
    const newTime = formatSeconds(Math.max(0, currentTime + seconds))

    window.api.timer.set(timer.roomId, newTime)
  }

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>{children}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content
          className="z-50 min-w-40 rounded-md border border-white/10 bg-[#1D2022] p-1 shadow-lg"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {/* + 5 minutes */}
          <ContextMenu.Item
            disabled={disabled}
            className="hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center gap-2 rounded px-3 py-2 text-sm outline-none"
            onClick={() => adjustTimer(60 * 5)}
          >
            <Plus className="h-3 w-3 text-green-600" /> Add 5 minutes
          </ContextMenu.Item>

          {/* + 1 minute */}
          <ContextMenu.Item
            disabled={disabled}
            className="hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center gap-2 rounded px-3 py-2 text-sm outline-none"
            onClick={() => adjustTimer(60 * 1)}
          >
            <Plus className="h-3 w-3 text-green-600" /> Add 1 minute
          </ContextMenu.Item>

          {/* Separator */}
          <ContextMenu.Separator className="bg-border my-1 h-px" />

          {/* - 1 minute */}
          <ContextMenu.Item
            disabled={disabled}
            className="hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center gap-2 rounded px-3 py-2 text-sm outline-none"
            onClick={() => adjustTimer(60 * -1)}
          >
            <Minus className="h-3 w-3 text-red-600" /> Remove 1 minute
          </ContextMenu.Item>

          {/* - 5 minutes */}
          <ContextMenu.Item
            disabled={disabled}
            className="hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center gap-2 rounded px-3 py-2 text-sm outline-none"
            onClick={() => adjustTimer(60 * -5)}
          >
            <Minus className="h-3 w-3 text-red-600" /> Remove 5 minutes
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}
