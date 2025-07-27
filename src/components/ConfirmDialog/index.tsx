import Button from "@/components/Button"
import style from "./style.module.scss"
import Dialog from "@/components/Dialog"
import { useState, type JSX } from "react"

type ConfirmDialogProps = {
	title: string
	message: string

	triggerElement?: (onOpen: () => void) => JSX.Element

	open?: boolean
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>

	onConfirm: () => void
}

export default function ConfirmDialog({ open: controlledOpen, setOpen: setControlledOpen, onConfirm, title, message, triggerElement }: ConfirmDialogProps) {
	const [internalOpen, setInternalOpen] = useState(false)
	const open = controlledOpen ?? internalOpen
	const setOpen = setControlledOpen ?? setInternalOpen

	const handleConfirm = () => {
		onConfirm()
		setOpen(false)
	}

	return (
		<Dialog open={open} setOpen={setOpen} title={title} triggerElement={triggerElement}>
			<div className={style.messageBlock}>{message}</div>
			<div className={style.buttonsBlock}>
				<Button onClick={handleConfirm}>Подтвердить</Button>
				<Button onClick={() => setOpen(false)}>Отмена</Button>
			</div>
		</Dialog>
	)
}
