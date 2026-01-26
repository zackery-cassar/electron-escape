import { cn } from '@renderer/utils/cn'
import React from 'react'
import { NavLink } from 'react-router-dom'

type SidebarItemProps = {
  name: string
  to?: string
  children?: React.ReactNode
}

export function SidebarItem({ name, to = '/404', children }: SidebarItemProps): React.JSX.Element {
  return (
    <li className="mx-5">
      <NavLink
        to={to}
        draggable={false}
        className={({ isActive }) =>
          cn(
            'block rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200',
            isActive
              ? 'bg-white/10 text-white text-shadow-[0_0_8px_white]'
              : 'text-[#959ca4] hover:bg-white/5 hover:text-white hover:text-shadow-[0_0_8px_white]'
          )
        }
      >
        {children ? children : <h4>{name}</h4>}
      </NavLink>
    </li>
  )
}
