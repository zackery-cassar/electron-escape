import { createContext, useContext } from "react";

type TimerContextType = {
  get(id: string): number;
  set(id: string, value: number): void;
  update(id: string, func: (prev: number) => number): void;
};

export const TimerContext = createContext<TimerContextType | null>(null);

export function useTimerContext() {
  const context = useContext(TimerContext);
  if (!context)
    throw new Error("useTimerContext must be used within a <TimerProvider>");
  return context;
}
