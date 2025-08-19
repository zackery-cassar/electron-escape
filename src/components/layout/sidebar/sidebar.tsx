import EscapeRoomItem from "./sidebar-item/escape-room-item";
import Scrollbar from "react-scrollbars-custom";
import SidebarSection from "./sidebar-section";
import SidebarTitle from "./sidebar-title";
import SidebarItem from "./sidebar-item/sidebar-item";
import EscapeRoomsSection from "./escape-rooms-section";

export default function Sidebar() {
  return (
    <div className="w-sm flex flex-col gap-5 shadow-lg">
        <SidebarTitle />

        {/* Sidebar Main Sections */}
        <Scrollbar
          trackYProps={{
            style: {
              background: 'transparent',
              width: 3,
              marginRight: 5,
            }
          }}
          thumbYProps={{
            style: {
              background: 'oklch(70.7% 0.022 261.325)'
            }
          }}
        >
          <SidebarSection title="Escape Rooms">
            <EscapeRoomsSection />
          </SidebarSection>
          <SidebarSection title="Other Games">
            <EscapeRoomItem name="Floor is Lava" time="05:21" progress={73} statusColor="oklch(58.8% 0.158 241.966)"/>
          </SidebarSection>
        </Scrollbar>

        {/* Sidebar Footer Section */}
        <div className="mb-5">
          <SidebarSection title="Settings">
            <SidebarItem name="General Settings" />
            <SidebarItem name="Developer Tools" />
          </SidebarSection>
        </div>
        
    </div>
  );
}
