export const colors = ["neutral", "red", "blue", "green", "yellow", "purple"] as const;
export type Color = typeof colors[number];