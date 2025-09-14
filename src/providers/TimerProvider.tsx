import { TimerContext } from "@/features/timer/stores/time-context";
import { useCallback, useState, type ReactNode } from "react";

export function TimerProvider({ children }: { children: ReactNode }) {
  const [timers, setTimers] = useState<Record<string, number>>({});

  // Read from the timer with the ID
  const get = useCallback(
    (id: string) => {
      return id in timers ? timers[id] : 0;
    },
    [timers]
  );

  // Write to the timer with the ID
  const set = useCallback((id: string, value: number) => {
    setTimers((prev) => (prev[id] === value ? prev : { ...prev, [id]: value }));
  }, []);

	// Update the timer with the ID
  const update = useCallback((id: string, fn: (prev: number) => number) => {
    setTimers((prev) => {
      const prevVal = prev[id] ?? 0;
      const nextVal = fn(prevVal);
      if (nextVal === prevVal) return prev;
      return { ...prev, [id]: nextVal };
    });
  }, []);

  return <TimerContext value={{ get, set, update }}>{children}</TimerContext>;
}
