import { useCallback, useEffect, useRef, useState } from "react";
import { useTimerContext } from "../stores/time-context";

type TimerOptions = {
  defaultSeconds?: number;
};

type TimerControls = {
  start: () => void;
  stop: () => void;
  toggle: () => void;
  reset: () => void;
  adjust: (deltaSeconds: number) => void;
  set: (newSeconds: number) => void;
};

export function useTimer(id: string, options: TimerOptions = {}) : { timeRemaining: number, isRunning: boolean, timer: TimerControls } {
	const { defaultSeconds = 3600 } = options

  const { get, set, update } = useTimerContext();
	const [isRunning, setIsRunning] = useState<boolean>(false)
	const intervalRef = useRef<number | null>(null)

	const timeRemaining: number = get(id)
	const startTimer = useCallback(() => setIsRunning(true), [])
	const stopTimer = useCallback(() => setIsRunning(false), [])
	const toggleTimer = useCallback(() => setIsRunning(prev => !prev), [])
	const setTimer = useCallback((newSeconds: number) => set(id, newSeconds), [id, set])

	const resetTimer = useCallback(() => {
		setIsRunning(false)
		set(id, defaultSeconds)
	}, [id, defaultSeconds, set])

	const adjustTimer = useCallback((deltaSeconds: number) => {
		update(id, prev => Math.max(0, prev + deltaSeconds))
	}, [id, update])


	useEffect(() => {
		if(!isRunning) return

		intervalRef.current = window.setInterval(() => {
			update(id, (prev) => Math.max(0, prev - 1))
		}, 1000)

		return () => {
			if (intervalRef.current !== null) {
				window.clearInterval(intervalRef.current)
				intervalRef.current = null;
			}
		}
	}, [isRunning, update, id])

  return {
		timeRemaining,
		isRunning,
		timer: {
			start: startTimer,
			stop: stopTimer,
			toggle: toggleTimer,
			reset: resetTimer,
			adjust: adjustTimer,
			set: setTimer
		}
	};
}
