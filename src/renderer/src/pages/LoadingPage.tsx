import React from 'react'
import { Bouncy } from 'ldrs/react'
import 'ldrs/react/Bouncy.css'

export function LoadingPage(): React.JSX.Element {
  return (
    <div className="flex h-screen items-center justify-center">
      <Bouncy size="45" speed="1.75" color="#0080C0" />
    </div>
  )
}
