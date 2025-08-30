import clsx from "clsx"
import { useEffect, useLayoutEffect, useState, useRef } from "react"



export function TriToggle({ options, tooltips, colors, defaultIndex = 0}: { options: [string, string, string], tooltips?: [string, string, string], colors?: [string, string, string], defaultIndex?: number}) {
    const [i, setI] = useState<number>(defaultIndex)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])
    const setButtonRef = (index: number): React.RefCallback<HTMLButtonElement> =>
        (element) => { buttonRefs.current[index] = element }
    const [thumb, setThumb] = useState<{ left: number, width: number }> ({left: 0, width: 0})

    
    const measure = (index: number) => {
        const button = buttonRefs.current[index]
        const container = containerRef.current

        if(!button || !container) return

        setThumb({ left: button.offsetLeft, width: button.offsetWidth })
    }

    // Measure when the selection or whenever the options change
    useLayoutEffect(() => {
        measure(i)
    }, [options, i])

    useEffect(() => {
        const onResize = () => measure(i)
        window.addEventListener("resize", onResize)
        return() => window.removeEventListener("resize", onResize)
    }, [i])


    const select = (index: number) => {
        setI(index)
    }


    return (
        <div
            ref={containerRef}
            className="relative inline-flex items-center rounded-md border bg-background border-input p-0.5 backdrop-blur">

            {/* Dynamic Thumb */}
            <div
                className={clsx(
                    "absolute top-0.5 bottom-0.5 rounded-md shadow-sm ring-slate-200 transition-all duration-300",
                    colors?.[i] ?? "bg-white"
                )}
                style={{ left: thumb.left, width: thumb.width}}
            />
            {options.map((option, index) => (
                <button
                    key={option}
                    title={ tooltips?.[index] }
                    ref={setButtonRef(index)}
                    onClick={() => select(index)}
                    className={clsx(
                        "relative z-10 px-2 text-[12px] font-medium rounded-md transition-colors cursor-pointer",
                        index === i ? "text-slate-900" : "text-slate-600 hover:text-slate-800" 
                    )}
                >
                    {option}
                </button>
            ))}
        </div>
    )
}