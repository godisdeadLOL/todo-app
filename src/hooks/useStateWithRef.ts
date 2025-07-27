import { useState, useRef } from "react";

export function useStateWithRef<T>(initialValue: T) {
    const [state, setState] = useState<T>(initialValue);
    const ref = useRef<T>(state);

    const setValue = (value: T) => {
        ref.current = value
        setState(value)
    }

    return [state, setValue, ref] as const;
}