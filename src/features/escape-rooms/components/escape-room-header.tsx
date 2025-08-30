import type { EscapeRoom } from "../types/escape-room";
import { Selector, SelectorItem } from "@/components/ui/selector";
import { Minus, Pause, Play, Plus, RotateCcw } from "lucide-react";
import { Button } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import { TriToggle } from "@/components/ui/tri-toggle";
import { ContextMenu } from "radix-ui";

export function EscapeRoomHeader({
  escapeRoom,
}: {
  escapeRoom: EscapeRoom | undefined;
}) {
  const [isOnline] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(3600);
  const [displayWidth, setDisplayWidth] = useState<number | null>(null);
  const [displayHeight, setDisplayHeight] = useState<number | null>(null);
  const [currentPhase, setCurrentPhase] = useState("pre-game");
  const [hintCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    seconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const parseTimeInput = (input: string): number | null => {
    const timeRegex = /^(\d{1,2}):(\d{2}):(\d{2})$/;
    const match = input.match(timeRegex);

    if (!match) return null;

    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const seconds = parseInt(match[3], 10);

    return hours * 3600 + minutes * 60 + seconds;
  };

  const handleTimerClick = (e: React.MouseEvent) => {
    if (displayRef.current) {
      setDisplayWidth(displayRef.current.offsetWidth);
      setDisplayHeight(displayRef.current.offsetHeight);

      // Calculate click position relative to the display element
      const rect = displayRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const elementWidth = rect.width;

      // Calculate which character position this corresponds to
      const timeString = formatTime(time); // "HH:MM:SS" format (8 characters)
      const charPosition = Math.round(
        (clickX / elementWidth) * timeString.length
      );
      const clampedPosition = Math.max(
        0,
        Math.min(charPosition, timeString.length)
      );

      setIsEditing(true);
      setInputValue(formatTime(time));

      // Set cursor position after the input is focused
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(clampedPosition, clampedPosition);
        }
      }, 0);
    }
  };

  const handleInputSubmit = () => {
    const newTime = parseTimeInput(inputValue);
    if (newTime !== null) {
      setTime(newTime);
    }
    setIsEditing(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleInputSubmit();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setInputValue("");
    } else if (e.key === "Delete" || e.key === "Backspace") {
      e.preventDefault();
      const input = inputRef.current;
      if (!input) return;

      const selectionStart = input.selectionStart || 0;
      const selectionEnd = input.selectionEnd || 0;

      if (selectionStart !== selectionEnd) {
        const currentValue = inputValue;
        let newValue = currentValue;

        // Zero out all selected digits
        for (let i = selectionStart; i < selectionEnd; i++) {
          if (currentValue[i] !== ":") {
            newValue =
              newValue.substring(0, i) + "0" + newValue.substring(i + 1);
          }
        }

        setInputValue(newValue);
        setTimeout(() => {
          input.setSelectionRange(selectionStart, selectionStart);
        }, 0);
      } else if (e.key === "Backspace") {
        const cursorPos = input.selectionStart || 0;
        const currentValue = inputValue;

        // Find previous digit position
        let prevDigitPos = cursorPos - 1;
        while (prevDigitPos >= 0 && currentValue[prevDigitPos] === ":") {
          prevDigitPos--;
        }

        // If we're at the beginning or no digit found, don't do anything
        if (prevDigitPos < 0) return;

        // Replace the digit at the found position with zero
        const newValue =
          currentValue.substring(0, prevDigitPos) +
          "0" +
          currentValue.substring(prevDigitPos + 1);
        setInputValue(newValue);

        // Move cursor to the position we just zeroed
        setTimeout(() => {
          input.setSelectionRange(prevDigitPos, prevDigitPos);
        }, 0);
      }
    } else if (/^\d$/.test(e.key)) {
      e.preventDefault();
      const input = inputRef.current;
      if (!input) return;

      const selectionStart = input.selectionStart || 0;
      const selectionEnd = input.selectionEnd || 0;
      const currentValue = inputValue;

      if (selectionStart !== selectionEnd) {
        let newValue = currentValue;

        // First, zero out all selected digits
        for (let i = selectionStart; i < selectionEnd; i++) {
          if (currentValue[i] !== ":") {
            newValue =
              newValue.substring(0, i) + "0" + newValue.substring(i + 1);
          }
        }

        // Then find the first digit position in the selection and replace it with the typed digit
        let firstDigitPos = selectionStart;
        while (
          firstDigitPos < selectionEnd &&
          newValue[firstDigitPos] === ":"
        ) {
          firstDigitPos++;
        }

        if (firstDigitPos < selectionEnd) {
          newValue =
            newValue.substring(0, firstDigitPos) +
            e.key +
            newValue.substring(firstDigitPos + 1);
        }

        setInputValue(newValue);

        setTimeout(() => {
          input.setSelectionRange(firstDigitPos + 1, firstDigitPos + 1);
        }, 0);
      } else {
        // Normal overwrite behavior
        const cursorPos = selectionStart;

        // Find next digit position to overwrite
        let nextDigitPos = cursorPos;
        while (
          nextDigitPos < currentValue.length &&
          currentValue[nextDigitPos] === ":"
        ) {
          nextDigitPos++;
        }

        // If we're at the end or past the last digit, don't do anything
        if (nextDigitPos >= currentValue.length) return;

        // Replace the digit at the found position
        const newValue =
          currentValue.substring(0, nextDigitPos) +
          e.key +
          currentValue.substring(nextDigitPos + 1);
        setInputValue(newValue);

        // Move cursor to next position after the inserted digit
        setTimeout(() => {
          let newCursorPos = nextDigitPos + 1;
          // Skip over colons
          while (
            newCursorPos < newValue.length &&
            newValue[newCursorPos] === ":"
          ) {
            newCursorPos++;
          }
          input.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
      }
    }
  };

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };
  const handleReset = () => {
    setIsRunning(false);
    setTime(3600);
  };

  const adjustTime = (minutes: number) => {
    const newTime = Math.max(0, time + minutes * 60);
    setTime(newTime);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prev) => {
          const newTime = Math.max(0, prev - 1);
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  return (
    <div className="w-full h-32 px-12 border-b grid grid-cols-[1fr_auto_1fr] items-center gap-4">
      {/* Escape Room Details */}
      <div className="flex flex-col gap-2">
        {/* Escape Room Name */}
        <h1 className="text-3xl font-semibold text-slate-800 whitespace-nowrap">
          {escapeRoom?.name}
        </h1>
        <div className="flex gap-5 items-center">
          {/* Online/Offline Status Indiciator */}
          <div className="flex w-18 gap-2 align items-center px-1">
            {" "}
            {/* Using w-18 to stop shifting other elements. */}
            <div
              className={`w-3 h-3 rounded-full shrink-0 ${
                isOnline ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <p className="text-sm font-semibold text-slate-600">
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>

          {/* Hint Mode Selector */}
          <TriToggle
            options={["No Hints", "On Request", "Nudge Occasionally"]}
            tooltips={[
              "Don't send any hints at all.",
              "Only send a hint if they ask for one.",
              "Send a hint if they seem like they are struggling.",
            ]}
            colors={["bg-red-300", "bg-yellow-100", "bg-green-300"]}
            defaultIndex={-1}
          />
        </div>
      </div>

      {/* Timer */}
      <div className="flex flex-col items-center">
        <div className="inline-flex items-center gap-5 px-3 py-2">
          <Button
            onClick={handleStartStop}
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

          <div className="w-px h-5 bg-border" />

          <ContextMenu.Root>
            <ContextMenu.Trigger asChild>
              {isEditing ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onBlur={handleInputSubmit}
                  onKeyDown={handleInputKeyDown}
                  placeholder="00:00:00"
                  autoFocus
                  className="text-4xl font-semibold w-[180px]
                                        tracking-wide bg-transparent border-0 rounded px-2 py-1 text-center
                                        focus:outline-none focus:ring-0 focus:bg-muted/30
                                        transition-colors"
                  style={{
                    width: displayWidth ? `${displayWidth}px` : "auto",
                    height: displayHeight ? `${displayHeight}px` : "auto",
                  }}
                />
              ) : (
                <div
                  ref={displayRef}
                  className="text-4xl font-semibold text-center w-[180px] tracking-wide cursor-pointer select-none px-2 py-1 rounded hover:bg-muted/50 transition-colors"
                  onClick={handleTimerClick}
                >
                  {formatTime(time)}
                </div>
              )}
            </ContextMenu.Trigger>

            <ContextMenu.Portal>
              <ContextMenu.Content className="min-w-[160px] bg-background border border-border rounded-md shadow-lg p-1 z-50">
                <ContextMenu.Item
                  className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer rounded hover:bg-accent hover:text-accent-foreground outline-none"
                  onClick={() => adjustTime(5)}
                >
                  <Plus className="h-3 w-3 text-green-600" />
                  Add 5 minutes
                </ContextMenu.Item>
                <ContextMenu.Item
                  className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer rounded hover:bg-accent hover:text-accent-foreground outline-none"
                  onClick={() => adjustTime(1)}
                >
                  <Plus className="h-3 w-3 text-green-600" />
                  Add 1 minute
                </ContextMenu.Item>

                <ContextMenu.Separator className="h-px bg-border my-1" />

                <ContextMenu.Item
                  className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer rounded hover:bg-accent hover:text-accent-foreground outline-none"
                  onClick={() => adjustTime(-1)}
                >
                  <Minus className="h-3 w-3 text-red-600" />
                  Remove 1 minute
                </ContextMenu.Item>
                <ContextMenu.Item
                  className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer rounded hover:bg-accent hover:text-accent-foreground outline-none"
                  onClick={() => adjustTime(-5)}
                >
                  <Minus className="h-3 w-3 text-red-600" />
                  Remove 5 minutes
                </ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu.Portal>
          </ContextMenu.Root>
          <div className="w-px h-5 bg-border" />

          <Button
            onClick={handleReset}
            size="1"
            variant="ghost"
            className="h-6 w-6 p-0 rounded-full"
          >
            <RotateCcw className="h-4 w-4 text-slate-800" />
          </Button>
        </div>
        <span className="text-sm text-muted-foreground font-semibold">
          Hints: {hintCount}
        </span>
      </div>

      {/* Phase Selector + Room Controls */}
      <div className="inline-flex flex-col w-fit items-center justify-end gap-4 ml-auto">
        {/* Buttons */}
        <div className="flex gap-2">
          <Button className="gap-2" color="gray" highContrast radius="large">
            <Play className="h-4 w-4" />
            Start Room
          </Button>
          <Button
            className="gap-2"
            color="gray"
            highContrast
            variant="outline"
            radius="large"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="flex w-full items-center gap-2 rounded-lg">
          <span className="text-sm font-medium">Phase</span>
          <div className="w-px h-4 bg-border" />
          <Selector
            value={currentPhase}
            className="w-full"
            onValueChange={setCurrentPhase}
          >
            <SelectorItem value="pre-game">Pre-Game</SelectorItem>
            <SelectorItem value="main-game">Main Game</SelectorItem>
            <SelectorItem value="end-game-collapse">
              End Game Collapse
            </SelectorItem>
            <SelectorItem value="post-game">Post-Game</SelectorItem>
          </Selector>
        </div>
      </div>
    </div>
  );
}
