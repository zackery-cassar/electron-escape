import React from 'react'

type ProgressBarProps = {
  value: number
  color?: string
}

export function ProgressBar({ value = 0, color = '#FFFFFF' }: ProgressBarProps): React.JSX.Element {
  // Clamp the value between 0 and 100
  value = Math.min(100, Math.max(0, value))

  return (
    <div className="flex items-center gap-3">
      {/* Progress Bar */}
      <div className="flex-auto bg-black/30 rounded-full h-1 mt-0.5">
        <div
          className="h-1 rounded-full transition-all duration-300"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>

      {/* Progress Percentage */}
      <div className="w-7 text-center text-xs">{Math.round(value)}%</div>
    </div>
  )
}
