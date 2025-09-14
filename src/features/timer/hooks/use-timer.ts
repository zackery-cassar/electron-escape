import { useCallback, useEffect, useRef, useState } from "react";

export type TimerOptions = {
  defaultSeconds?: number;
  intervalMs?: number;
};

type TimerControllers = {
  startTimer: () => void;
  stopTimer: () => void;
	toggleTimer: () => void;
  resetTimer: () => void;
  adjustTimer: (deltaSeconds: number) => void;
  setTimer: (newSeconds: number) => void;
};

export function useTimer(
  id: string,
  options: TimerOptions = {}
): [number, boolean, TimerControllers] {
  const { defaultSeconds = 3600 } = options;

  const [seconds, setSeconds] = useState<number>(defaultSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const intervalRef = useRef<number | null>(null);

  const startTimer = useCallback(() => setIsRunning(true), []);
  const stopTimer = useCallback(() => setIsRunning(false), []);
	const toggleTimer = useCallback(() => setIsRunning(prev => !prev), []);
  const setTimer = useCallback((newSeconds: number) => setSeconds(newSeconds), []);

  const resetTimer = useCallback(() => {
		setIsRunning(false)
		setSeconds(defaultSeconds)
	}, [defaultSeconds]);

  const adjustTimer = useCallback((deltaSeconds: number) => {
		setSeconds(prev => Math.max(0, prev + deltaSeconds))
	}, []);

	// Ticking effect
  useEffect(() => {
    if (!isRunning) return;

    // Start interval
    intervalRef.current = window.setInterval(() => {
			setSeconds((prev) => Math.max(0, prev - 1))
		}, 1000);

    // Cleanup on stop/unmount or when intervalMs changes
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

	useEffect(() => {
		if(isRunning && seconds <= 0) setIsRunning(false)
	}, [isRunning, seconds])

  return [
    seconds,
		isRunning,
    { startTimer, stopTimer, toggleTimer, resetTimer, adjustTimer, setTimer },
  ];
}
