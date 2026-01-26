import { cn } from '@renderer/utils/cn'

type ColorDotProps = {
  color: string
  size: number | string
  className?: string
  style?: React.CSSProperties
}

export function ColorDot({ color, size, className, style }: ColorDotProps): React.JSX.Element {
  return (
    <div
      className={cn('shrink-0 rounded-full', className)}
      style={{
        backgroundColor: color,
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
        ...style
      }}
    />
  )
}
