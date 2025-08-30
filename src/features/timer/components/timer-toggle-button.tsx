import { Button } from "@radix-ui/themes";
import { Pause, Play } from "lucide-react";

export function TimerToggleButton({
  isRunning,
  onToggle,
}: {
  isRunning: boolean;
  onToggle: () => void;
}) {
  return (
    <Button
      onClick={onToggle}
      size="1"
      variant="ghost"
      className="h-6 w-6 p-0 rounded-full"
    >
      {isRunning ? (
        <Pause className="h-4 w-4 text-slate-800" />
      ) : (
        <Play className="h-4 w-4 text-slate-800" />
      )}
    </Button>
  );
}
