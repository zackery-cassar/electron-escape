import { Minus, Plus } from "lucide-react";
import { ContextMenu } from "radix-ui";
import type React from "react";

export function TimerContextMenu({
  adjustTimer,
  children,
}: {
  adjustTimer: (deltaSeconds: number) => void;
  children: React.ReactNode;
}) {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>{children}</ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content className="min-w-[160px] bg-background border border-border rounded-md shadow-lg p-1 z-50">
          {/* + 5 minutes */}
          <ContextMenu.Item
            className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer rounded hover:bg-accent hover:text-accent-foreground outline-none"
            onClick={() => adjustTimer(60 * 5)}
          >
            <Plus className="h-3 w-3 text-green-600" /> Add 5 minutes
          </ContextMenu.Item>

          {/* + 1 minute */}
          <ContextMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer rounded hover:bg-accent hover:text-accent-foreground outline-none" onClick={() => adjustTimer(60 * 1)}>
            <Plus className="h-3 w-3 text-green-600" /> Add 1 minute
          </ContextMenu.Item>

          {/* Seperator */}
					<ContextMenu.Separator className="h-px bg-border my-1" />

          {/* - 1 minute */}
          <ContextMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer rounded hover:bg-accent hover:text-accent-foreground outline-none" onClick={() => adjustTimer(60 * -1)}>
            <Minus className="h-3 w-3 text-red-600" /> Remove 1 minute
          </ContextMenu.Item>

          {/* - 5 minutes */}
          <ContextMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer rounded hover:bg-accent hover:text-accent-foreground outline-none" onClick={() => adjustTimer(60 * -5)}>
            <Minus className="h-3 w-3 text-red-600" /> Remove 5 minutes
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
