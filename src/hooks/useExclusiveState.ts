import { useEffect, useRef, useState } from "react";

export default function useExclusiveState(name: string) {
    const [value, setValue] = useState(false)
    const ignoreSignal = useRef(false)

    useEffect(() => {
        const handleSignal = () => {
            if (!ignoreSignal.current) setValue(false)
            else ignoreSignal.current = false
        }

        window.addEventListener(`signal-${name}`, handleSignal)
        return () => window.removeEventListener(`signal-${name}`, handleSignal)
    }, [name])

    useEffect(() => {
        if (value) {
            ignoreSignal.current = true
            window.dispatchEvent(new Event(`signal-${name}`))
        }
    }, [value])

    return [value, setValue] as const
}