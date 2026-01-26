import { Brand } from '@renderer/components/ui/brand'
import React from 'react'
import { NavLink } from 'react-router-dom'

export function SidebarHeader(): React.JSX.Element {
  return (
    <div className="my-2.5 flex justify-center">
      <NavLink to="/" draggable="false">
        <Brand size="md" variant="full" />
      </NavLink>
    </div>
  )
}
