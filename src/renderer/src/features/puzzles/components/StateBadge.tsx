import { cn } from '@renderer/utils/cn'
import { Puzzle } from '@shared/types/puzzle'
import { State } from '@shared/types/state'
import React from 'react'

const STATE_LABELS: Record<State, string> = {
  [State.UNKNOWN]: 'UNKNOWN',
  [State.READY]: 'READY',
  [State.ACTIVE]: 'ACTIVE',
  [State.PAUSED]: 'PAUSED',
  [State.FINISHED]: 'FINISHED',
  [State.RESETTING]: 'RESETTING'
}

const STATE_COLORS: Record<State, string> = {
  [State.UNKNOWN]: 'bg-red-100 text-red-700',
  [State.READY]: 'bg-gray-200 text-gray-700',
  [State.ACTIVE]: 'bg-blue-100 text-blue-700',
  [State.PAUSED]: 'bg-yellow-100 text-yellow-700',
  [State.FINISHED]: 'bg-green-100 text-green-700',
  [State.RESETTING]: 'bg-gray-200 text-gray-700'
}

type StateBadgeProps = {
  puzzle: Puzzle
}

export function StateBadge({ puzzle }: StateBadgeProps): React.JSX.Element {
  const isUnknown = puzzle.isTech && !puzzle.connected
  const label = isUnknown ? STATE_LABELS[State.UNKNOWN] : STATE_LABELS[puzzle.state]
  const color = isUnknown ? STATE_COLORS[State.UNKNOWN] : STATE_COLORS[puzzle.state]

  return (
    <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-semibold', color)}>
      <span className="">{label}</span>
    </span>
  )
}
