export function convertInputToChangeEvent(e: any) {
    e.target.value = e.target.innerHTML
    return e
}

export function formatDebugString(line: string) {
    return `"${line.replaceAll("\n", "N").replaceAll(" ", "S")}"`
}

export const normalizeString = (value: string) => value.replace(/\s+/g, "").toLowerCase()