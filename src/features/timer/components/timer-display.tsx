import { useTimer } from "../hooks/useTimer";
import { TimerToggleButton } from "./timer-toggle-button";
import { TimerResetButton } from "./timer-reset-button";
import { EditableTimer } from "./editable-timer";
import { TimerContextMenu } from "./timer-context-menu";
import type { EscapeRoom } from "@/features/escape-rooms/types/escape-room";

export function TimerDisplay({ escapeRoom } : { escapeRoom: EscapeRoom | undefined }) {
  const id: string = escapeRoom ? escapeRoom.id : ""
  const { timeRemaining, isRunning, timer} = useTimer(id);

  return (
    <div>
      <div className="inline-flex items-center gap-5 px-3 py-2">
        {/* Toggle ( Start/Stop ) */}
        <TimerToggleButton isRunning={isRunning} onToggle={timer.toggle} />

        {/* Separator */}
        <div className="w-px h-5 bg-border" />

        {/* Timer display */}
        <TimerContextMenu adjustTimer={timer.adjust}>
          <EditableTimer
            className="text-4xl font-semibold"
            value={timeRemaining}
            onChange={timer.set}
          />
        </TimerContextMenu>
        

        {/* Separator */}
        <div className="w-px h-5 bg-border" />

        {/* Reset */}
        <TimerResetButton onReset={timer.reset} />
      </div>
    </div>
  );
}
