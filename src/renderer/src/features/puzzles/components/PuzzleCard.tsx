import { ColorDot } from '@renderer/components/ui/indicators'
import { Puzzle } from '@shared/types/puzzle'
import React from 'react'
import { StateBadge } from './StateBadge'
import { ActivateFinishPuzzleButton } from './ActivateFinishPuzzleButton'
import { ResetPuzzleButton } from './ResetPuzzleButton'
import { HintButton } from '@renderer/features/hints/components/HintButton'
import { ConnectionStatus } from '@renderer/components/ui/status/ConnectionStatus'
import { State } from '@shared/types/state'
import { cn } from '@renderer/utils/cn'
import { Separator } from '@renderer/components/ui/separator'

type PuzzleCardProps = {
  puzzle: Puzzle
}

export function PuzzleCard({ puzzle }: PuzzleCardProps): React.JSX.Element {
  const isFinished = puzzle.state == State.FINISHED
  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-lg border p-3',
        isFinished ? 'border-green-500/50 bg-green-500/10' : 'border-[#5B678E]/43 bg-white/5'
      )}
    >
      <div className="grid grid-cols-[1fr_1fr] items-center">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h3 className="text-[15px]">{puzzle.name}</h3>
            <ColorDot color={'#FFFFFF'} size={5} />
            <StateBadge puzzle={puzzle} />
          </div>
          {puzzle.isTech && <ConnectionStatus connected={puzzle.connected} size="small" />}
        </div>
        <div className="flex items-start justify-end gap-2">
          <ActivateFinishPuzzleButton puzzle={puzzle} />
          <ResetPuzzleButton puzzle={puzzle} />
        </div>
      </div>

      <Separator className="h-0.5 w-full bg-linear-0" />

      {/* Solution section */}
      {puzzle.solution && (
        <>
          <div className="flex flex-col gap-1">
            <span className="text-[12px]">Solution</span>
            <span className="px-2 text-[10px]">{puzzle.solution}</span>
          </div>
          <Separator className="h-0.5 w-full bg-linear-0" />
        </>
      )}

      {/* Hints section */}
      {puzzle.hints.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-[12px]">Hints</span>
          <div className="flex gap-2">
            {puzzle.hints.map((hint) => (
              <HintButton key={hint.id} roomId={puzzle.roomId} hint={hint} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
