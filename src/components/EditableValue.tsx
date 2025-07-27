import { useEffect, useState, type ChangeEventHandler, type FocusEventHandler, type JSX, type MouseEventHandler } from "react"
type EditableValueProps = {
	value: string
	required?: boolean

	onValueUpdate: (value: string) => void

	element: (value: string, onClick: MouseEventHandler<HTMLElement>, onChange: ChangeEventHandler<HTMLElement>, onBlur: FocusEventHandler<HTMLElement>) => JSX.Element
}

export default function EditableValue({ onValueUpdate, value, required = false, element }: EditableValueProps) {
	const [isEditing, setIsEditing] = useState(false)
	const [internalValue, setInternalValue] = useState(value)

	useEffect(() => {
		if (!isEditing) setInternalValue(value)
	}, [value, isEditing])

	const onClick: MouseEventHandler<HTMLElement> = () => {
		setIsEditing(true)
	}

	const onBlur: FocusEventHandler<HTMLElement> = () => {
		if (!required || internalValue) onValueUpdate(internalValue)
		setIsEditing(false)
	}

	const onChange: ChangeEventHandler<HTMLElement> = (event) => {
		const element = event.target as HTMLInputElement | HTMLTextAreaElement
		setInternalValue(element.value)
	}

	return element(internalValue, onClick, onChange, onBlur)
}
