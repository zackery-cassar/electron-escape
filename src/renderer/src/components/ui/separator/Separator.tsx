import { Separator as RadixSeparator } from 'radix-ui'
import { cn } from '@renderer/utils/cn'
import React from 'react'

type SeparatorProps = {
  className?: string
}

export function Separator({ className }: SeparatorProps): React.JSX.Element {
  return (
    <RadixSeparator.Root
      className={cn('bg-radial from-[#8ba5cc] from-0% to-transparent to-70% opacity-30', className)}
    />
  )
}
