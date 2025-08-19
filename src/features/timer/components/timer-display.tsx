

function pad(n: number) {
    return n.toString().padStart(2, "0")
}

function formatHMS(totalSeconds: number) {
    const s = Math.floor(totalSeconds)
    const m = Math.floor((s % 3600) / 60)
    const h = Math.floor(s / 3600)
    const sec = s % 60

    return `${pad(h)}:${pad(m)}:${pad(sec)}`
}

export function TimerDisplay({ seconds }: { seconds: number }) {
    return <span className="tabular-nums">{formatHMS(seconds)}</span>
}