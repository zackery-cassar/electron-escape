import { cn } from '@renderer/utils/cn'
import { ReactIcon } from '../icons'

type BrandSize = 'sm' | 'md' | 'lg'
type BrandVariant = 'full' | 'text' | 'icon'

type BrandProps = {
  size: BrandSize
  variant: BrandVariant
}

const sizeMap: Record<BrandSize, { icon: number; text: string }> = {
  sm: { icon: 16, text: 'text-sm' },
  md: { icon: 24, text: 'text-base' },
  lg: { icon: 112, text: 'text-5xl' }
}

export function Brand({ size = 'md', variant = 'full' }: BrandProps): React.JSX.Element {
  const iconSize = sizeMap[size].icon
  const textSize = sizeMap[size].text

  return (
    <div className="inline-flex items-center gap-2">
      {(variant === 'full' || variant === 'icon') && <ReactIcon size={iconSize} />}

      {(variant === 'full' || variant === 'text') && (
        <span
          className={cn(
            'font-medium text-white uppercase text-shadow-[0_0_10px_#FFFFFF]',
            textSize
          )}
        >
          Electron Escape
        </span>
      )}
    </div>
  )
}
