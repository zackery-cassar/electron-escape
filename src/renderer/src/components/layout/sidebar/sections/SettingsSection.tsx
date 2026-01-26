import React from 'react'
import { SidebarSection } from '../SidebarSection'
import { SidebarItem } from '../SidebarItem'
import { CodeXml, Settings } from 'lucide-react'

export function SettingsSection(): React.JSX.Element {
  return (
    <SidebarSection title="Settings">
      <SidebarItem name="General Settings" to="settings/general">
        <div className="flex items-center gap-2">
          <Settings size={20} />
          <h4>General Settings</h4>
        </div>
      </SidebarItem>
      <SidebarItem name="Developer Tools" to="settings/developer">
        <div className="flex items-center gap-2">
          <CodeXml size={20} />
          <h4>Developer Tools</h4>
        </div>
      </SidebarItem>
    </SidebarSection>
  )
}
