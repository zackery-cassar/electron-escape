import { ReactIcon } from '@renderer/components/ui/icons'
import React from 'react'

export function WelcomePage(): React.JSX.Element {
  return (
    <div className="flex h-screen w-full items-center justify-center gap-5">
      <ReactIcon size={134} />

      <div className="flex flex-col items-center font-medium text-white text-shadow-[0_0_10px_#FFFFFF]">
        <span className="text-[20px] uppercase">Welcome to</span>
        <span className="py-3 text-5xl uppercase">Electron Escape</span>
        <span className="text-[20px]">Built with React + Tailwindcss + Radix UI</span>
      </div>
    </div>
  )
}
