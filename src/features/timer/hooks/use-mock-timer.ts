import { useCallback, useEffect, useRef, useState } from "react"

export function useMockTimer(initial = 3600, running = true) {
    const [seconds, setSeconds] = useState<number>(initial)
    const [isRunning, setIsRunning] = useState<boolean>(running)

    const raf = useRef<number | null>(null)
    const last = useRef<number | null>(null)

    const tick = useCallback((t: number) => {
        if(!isRunning) return;
        if(last.current == null) last.current = t

        const delta = (t - last.current) / 1000
        last.current = t
        setSeconds((s) => {
            const next = s - delta
            return next > 0 ? next : 0
        })
        raf.current = requestAnimationFrame(tick)
    }, [isRunning])

    useEffect(() => {
        if(isRunning && raf.current == null) raf.current = requestAnimationFrame(tick)

        return () => {
            if(raf.current) {
                cancelAnimationFrame(raf.current)
                raf.current = null
                last.current = null
            }
        }
    }, [isRunning, tick])

    return {
        seconds,
        isRunning,
        start: () => setIsRunning(true),
        stop: () => setIsRunning(false),
        reset: (to = 0) => { 
            setSeconds(to)
            last.current = null
        },
        set: (to: number) => setSeconds(to)
    }
}