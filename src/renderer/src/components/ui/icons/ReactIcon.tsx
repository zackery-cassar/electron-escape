import { cn } from '@renderer/utils/cn'
import React from 'react'
import reactLogo from '@renderer/assets/images/react-logo.svg'

type ReactIconProps = {
  size?: number
  className?: string
}

export function ReactIcon({ size = 24, className }: ReactIconProps): React.JSX.Element {
  return (
    <img
      src={reactLogo}
      width={size}
      height={size}
      draggable={false}
      className={cn('animate-[spin_15s_linear_infinite]', className)}
    />
  )
}
