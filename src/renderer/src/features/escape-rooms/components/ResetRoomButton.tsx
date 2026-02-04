import { cn } from '@renderer/utils/cn'
import { EscapeRoom } from '@shared/types/escape-room'
import { RotateCcw } from 'lucide-react'
import React, { useState } from 'react'

type ResetRoomButtonProps = {
  room: EscapeRoom
}

export function ResetRoomButton({ room }: ResetRoomButtonProps): React.JSX.Element {
  const [animating, setAnimating] = useState(false)
  const disabled = true // Temporarily disable the button until functionality is implemented
  // const disabled = !room.connected || room.state === State.RESETTING

  const handleClick = (): void => {
    // TODO: Implement reset room functionality
    if (!room.connected) return // This is just a placeholder to avoid unused variable linting error
    setAnimating(true)
  }

  return (
    <button
      className={cn(
        'group relative w-24 cursor-pointer rounded-lg border border-white/60 bg-transparent px-4 py-1.5 transition-all duration-300',
        'hover:scale-102 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.15),0_0_40px_rgba(255,255,255,0.05)]',
        'active:scale-[0.98] active:shadow-[0_0_10px_rgba(255,255,255,0.15)]',
        disabled &&
          'cursor-default opacity-50 hover:scale-100 hover:border-white/60 hover:shadow-none'
      )}
      disabled={disabled}
      onClick={handleClick}
    >
      {/* Subtle background glow layer that appears on hover */}
      <div
        className={cn(
          'absolute inset-0 rounded-lg bg-white/0 transition-all duration-300',
          'group-hover:bg-white/5',
          disabled && 'group-hover:bg-transparent'
        )}
      />

      {/* Button content layer (positioned above the glow layer) */}
      <div className="relative flex items-center justify-center gap-2">
        {/* Button Icon */}
        <RotateCcw
          className={cn(
            'size-4 transition-all duration-300',
            'group-hover:opacity-100',
            // Rotate icon counter-clockwise on hover (only when enabled)
            !disabled && 'group-hover:-rotate-45',
            animating && 'animate-[spin-ccw_0.5s_ease-in-out]'
          )}
          onAnimationEnd={() => setAnimating(false)}
        />

        {/* Button Text */}
        <span className="text-xs font-medium tracking-wide">Reset</span>
      </div>
    </button>
  )
}
