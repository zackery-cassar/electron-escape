import { useTimer } from "../hooks/use-timer";
import { TimerToggleButton } from "./timer-toggle-button";
import { TimerResetButton } from "./timer-reset-button";
import { EditableTimer } from "./editable-timer";

export function TimerDisplay() {
  const [seconds, isRunning, timer] = useTimer();

  return (
    <div>
      <div className="inline-flex items-center gap-5 px-3 py-2">
        {/* Toggle ( Start/Stop ) */}
        <TimerToggleButton isRunning={isRunning} onToggle={timer.toggleTimer} />

        {/* Separator */}
        <div className="w-px h-5 bg-border" />

        {/* Timer display */}
        <EditableTimer
            className="text-4xl font-semibold"
            value={seconds}
            onChange={timer.setTimer}
        />

        {/* Separator */}
        <div className="w-px h-5 bg-border" />

        {/* Reset */}
        <TimerResetButton onReset={timer.resetTimer} />
      </div>
    </div>
  );
}
