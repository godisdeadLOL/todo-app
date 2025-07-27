import { useEffect, useRef } from "react";

export default function useClickAway(callback?: () => void) {
    const elementRef = useRef<any>(null)

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (!elementRef.current) return

            const { pageX: mouseX, pageY: mouseY } = event

            const element = elementRef.current as HTMLElement
            const rect = element.getBoundingClientRect()

            const isInside = mouseX > rect.left && mouseX < rect.right && mouseY > rect.top && mouseY < rect.bottom

            if (!isInside) callback?.()
        }

        window.addEventListener("mousedown", handleClick)
        return () => window.removeEventListener("mousedown", handleClick)
    }, [])

    return elementRef
}