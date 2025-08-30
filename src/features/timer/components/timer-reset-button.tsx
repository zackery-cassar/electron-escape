import { Button } from "@radix-ui/themes";
import { RotateCcw } from "lucide-react";

export function TimerResetButton({ onReset }: { onReset: () => void }) {
  return (
    <Button
      onClick={onReset}
      size="1"
      variant="ghost"
      className="h-6 w-6 p-0 rounded-full"
    >
      <RotateCcw className="h-4 w-4 text-slate-800" />
    </Button>
  );
}
