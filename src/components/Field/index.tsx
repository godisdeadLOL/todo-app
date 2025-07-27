import classNames from "classnames"
import style from "./style.module.scss"
import { useEffect, useRef, type ChangeEventHandler, type InputEventHandler, type KeyboardEventHandler, type TextareaHTMLAttributes } from "react"

type FieldProps = {
	value: string
	onChange?: ChangeEventHandler<HTMLElement>

	label?: string
	fallback?: string

	small?: boolean
	plainable?: boolean

	allowMultiline?: boolean

	className?: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export default function Field({ label, fallback, small = false, plainable = false, allowMultiline = false, value, onChange, className, ...other }: FieldProps) {
	const updateHeight = (textarea: HTMLTextAreaElement) => {
		textarea.style.height = "auto"
		textarea.style.height = `${textarea.scrollHeight}px`
	}

	const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
		updateHeight(event.target)
		onChange?.(event)
	}

	const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
		if (event.key === "Enter" && (!event.shiftKey || !allowMultiline)) {
			const element = event.target as HTMLTextAreaElement
			element.blur()

			event.preventDefault()
		}
	}

	const textareaRef = useRef<HTMLTextAreaElement>(null)
	useEffect(() => {
		if (textareaRef.current) updateHeight(textareaRef.current)
	}, [value])

	useEffect(() => {
		const handleResize = () => {
			if (textareaRef.current) updateHeight(textareaRef.current)
		}

		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [textareaRef.current])

	return (
		<div className={classNames(className, style.fieldWrapper, small ? style.small : "", plainable ? style.plainable : "")}>
			<textarea onKeyDown={handleKeyDown} rows={1} value={value} onChange={handleChange} ref={textareaRef} placeholder={fallback ?? " "} spellCheck={false} className={style.field} {...other} />
			{label && <div className={style.label}>{label ?? ""}</div>}
		</div>
	)
}
