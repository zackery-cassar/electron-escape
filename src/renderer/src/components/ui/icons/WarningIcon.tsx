import { cn } from '@renderer/utils/cn'
import { AlertTriangle } from 'lucide-react'
import React from 'react'

type WarningIconProps = {
  size?: number
  className?: string
}

export function WarningIcon({ size = 15, className }: WarningIconProps): React.JSX.Element {
  return (
    <div className={cn('inline-flex items-center justify-center', className)}>
      <AlertTriangle
        size={size}
        className="animate-[warning-pulse_2s_ease-in-out_infinite] text-yellow-500 drop-shadow-[0_0_12px_rgba(234,179,8,0.5)]"
        strokeWidth={2}
        fill="rgba(234,179,8,0.2)"
      />
    </div>
  )
}
