import { SidebarItem } from "../sidebar-item/sidebar-item";
import { SidebarSection } from "../sidebar-section";


export function SettingsSection() {

	return (
		<SidebarSection title="Settings">
			<SidebarItem name="General Settings" />
			<SidebarItem name="Developer Tools" />
		</SidebarSection>
	)
}