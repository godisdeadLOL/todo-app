import IconButton from "@/components/IconButton"
import type { ButtonHTMLAttributes, ReactNode } from "react"

type ToggleButtonProps = {
	toogled: boolean

	elementOn: ReactNode
	elementOff: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function ToggleButton({ toogled, elementOn, elementOff, ...other }: ToggleButtonProps) {
	return <IconButton {...other}>{toogled ? elementOn : elementOff}</IconButton>
}
