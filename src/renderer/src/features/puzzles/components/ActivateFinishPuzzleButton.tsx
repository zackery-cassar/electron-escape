import { cn } from '@renderer/utils/cn'
import { Puzzle } from '@shared/types/puzzle'
import { State } from '@shared/types/state'
import React from 'react'

type ActivateFinishPuzzleButtonProps = {
  puzzle: Puzzle
}

export function ActivateFinishPuzzleButton({
  puzzle
}: ActivateFinishPuzzleButtonProps): React.JSX.Element {
  const disabled = puzzle.isTech && !puzzle.connected

  const handleClick = (): void => {
    // TODO: Implement activate/finish puzzle functionality
  }

  return (
    <button
      className={cn(
        'group relative w-22 cursor-pointer rounded-lg border border-white/40 bg-[#E0822D] px-2 py-1 transition-all duration-300',
        'hover:scale-102 hover:border-white/60 hover:shadow-[0_0_10px_rgba(224,130,45,0.3),0_0_20px_rgba(224,130,45,0.15)]',
        'active:scale-[0.98] active:shadow-[0_0_5px_rgba(224,130,45,0.2)]',
        disabled && 'cursor-default opacity-50 hover:scale-100 hover:shadow-none'
      )}
      disabled={disabled}
      onClick={handleClick}
    >
      {/* Subtle background glow layer that appears on hover */}
      <div
        className={cn(
          'absolute inset-0 rounded-lg bg-white/0 transition-all duration-300',
          'group-hover:bg-white/10',
          disabled && 'group-hover:bg-transparent'
        )}
      />

      {/* Button content layer (positioned above the glow layer) */}
      <div className="relative flex items-center justify-center gap-2">
        {/* Button Text */}
        <span className="relative text-xs font-medium tracking-wide uppercase">
          {puzzle.state !== State.ACTIVE ? 'ACTIVATE' : 'FINISH'}
        </span>
      </div>
    </button>
  )
}
