import { cn } from '@renderer/utils/cn'
import { ClockAlert } from 'lucide-react'
import React from 'react'

type TimerAlertProps = {
  size?: number
  className?: string
}

export function TimerAlert({ size = 15, className }: TimerAlertProps): React.JSX.Element {
  return (
    <div className={cn('inline-flex items-center justify-center', className)}>
      <ClockAlert
        size={size}
        className="animate-[pulse_1s_ease-in-out_infinite] text-yellow-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.5)]"
        strokeWidth={2}
        fill="rgba(239,68,68,0.2)"
      />
    </div>
  )
}
