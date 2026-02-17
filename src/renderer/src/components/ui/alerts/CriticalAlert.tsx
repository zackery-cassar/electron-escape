import { cn } from '@renderer/utils/cn'
import { CircleAlert } from 'lucide-react'
import React from 'react'

type CriticalAlertProps = {
  size?: number
  className?: string
}

export function CriticalAlert({ size = 15, className }: CriticalAlertProps): React.JSX.Element {
  return (
    <div className={cn('inline-flex items-center justify-center', className)}>
      <CircleAlert
        size={size}
        className="animate-[pulse_1s_ease-in-out_infinite] text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.5)]"
        strokeWidth={2}
        fill="rgba(239,68,68,0.2)"
      />
    </div>
  )
}
