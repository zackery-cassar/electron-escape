import { Scrollbar } from "@/components/ui/scrollbar";
import { SidebarHeader } from "./sidebar-header";
import { SettingsSection } from "./sections/settings-section";
import { EscapeRoomsSection } from "./sections/escape-rooms-section";
import { OtherGamesSection } from "./sections/other-games-section";

export function Sidebar() {
  return (
    <div className="w-sm flex flex-col gap-5 shadow-lg">
      <SidebarHeader />
      
      <Scrollbar>
        <EscapeRoomsSection />
        <OtherGamesSection />
      </Scrollbar>

      <SettingsSection />
    </div>
  );
}
