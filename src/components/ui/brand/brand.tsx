import { ReactIcon } from "@/components/ui/icons/react-icon"
import clsx from "clsx"

type BrandSize = "sm" | "base" | "6xl"
type BrandVariant = "full" | "text" | "icon"

type BrandProps = {
    size?: BrandSize
    variant?: BrandVariant
    className?: string
}

const sizeMap: Record<BrandSize, { icon: number; text: string }> = {
    "sm":     { icon: 18, text: "text-sm"},
    "base":   { icon: 24, text: "text-base"},
    "6xl":     { icon: 90, text: "text-6xl"}
}

export function Brand({ variant="full", size="base", className }: BrandProps) {
    const iconSize = sizeMap[size].icon
    const textSize = sizeMap[size].text

    return (
        <div className={clsx("inline-flex items-center gap-2 uppercase leading-none text-gray-800", className)}>
            {(variant === "full" || variant === "icon") && (
                <ReactIcon size={iconSize}/>
            )}

            {(variant === "full" || variant === "text") && (
                <span className={`font-bold ${textSize}`}>Electron Escape</span>
            )}
        </div>
    )
}