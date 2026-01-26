import React from 'react'
import { Sidebar } from './sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

export function AppLayout(): React.JSX.Element {
  return (
    // Background picture and blur effect
    <div className="bg-[#111416]">
      <div className="flex h-screen">
        <Sidebar />
        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
