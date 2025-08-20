import { Separator } from "radix-ui";
import { Brand } from "@/components/ui/brand";

export function SidebarHeader() {
  return (
    <div className="flex flex-col gap-2">
      <div className="mt-7 flex gap-2 justify-center items-center">
        <Brand size="base" />
      </div>
      <Separator.Root className="h-px w-full bg-gradient-to-r from-transparent via-stone-400 to-transparent" />
    </div>
  );
}
