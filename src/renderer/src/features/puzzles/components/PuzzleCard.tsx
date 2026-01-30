import { ColorDot } from '@renderer/components/ui/indicators'
import { Puzzle } from '@shared/types/puzzle'
import React from 'react'
import { StateBadge } from './StateBadge'
import { ActivateFinishPuzzleButton } from './ActivateFinishPuzzleButton'
import { ResetPuzzleButton } from './ResetPuzzleButton'
import { HintButton } from '@renderer/features/hints/components/HintButton'
import { ConnectionStatus } from '@renderer/components/ui/status/ConnectionStatus'

type PuzzleCardProps = {
  puzzle: Puzzle
}

export function PuzzleCard({ puzzle }: PuzzleCardProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-[#5B678E]/43 bg-white/5 p-3">
      <div className="grid grid-cols-[1fr_1fr]">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h3 className="text-[15px]">{puzzle.name}</h3>
            <ColorDot color={'#FFFFFF'} size={5} />
            <StateBadge state={puzzle.state} />
          </div>
          {puzzle.isTech && <ConnectionStatus connected={puzzle.connected} size="small" />}
        </div>
        <div className="flex items-start justify-end gap-2">
          <ActivateFinishPuzzleButton puzzle={puzzle} />
          <ResetPuzzleButton puzzle={puzzle} />
        </div>
      </div>

      {puzzle.hints.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-[12px]">Hints</span>
          <div className="flex gap-2">
            {puzzle.hints.map((hint) => (
              <HintButton key={hint.id} hint={hint} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
