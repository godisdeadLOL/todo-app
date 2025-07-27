import React, { useState, type JSX, type PropsWithChildren } from "react"
import style from "./style.module.scss"
import { createPortal } from "react-dom"
import IconButton from "@/components/IconButton"
import { LuX } from "react-icons/lu"
import classNames from "classnames"
import useClickAway from "@/hooks/useClickAway"

type DialogProps = {
	title: string

	triggerElement?: (onOpen: () => void) => JSX.Element

	open?: boolean
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>

	className?: string
} & PropsWithChildren

export default function Dialog({ open: controlledOpen, setOpen: setControlledOpen, triggerElement, title, className, children }: DialogProps) {
	const [internalOpen, setInternalOpen] = useState(false)
	const open = controlledOpen ?? internalOpen
	const setOpen = setControlledOpen ?? setInternalOpen

	const rootElement = document.getElementById("dialog-root")

	const clickAwayRef = useClickAway(() => setOpen(false))

	return (
		<>
			{triggerElement?.(() => setOpen(true))}
			{open &&
				createPortal(
					<div className={style.dialogWrapper}>
						<div className={style.backdrop} />

						<div className={style.positioner}>
							<div className={classNames(style.dialog, className)} ref={clickAwayRef}>
								<div className={style.headerBlock}>
									<h1>{title}</h1>
									<IconButton onClick={() => setOpen(false)}>
										<LuX />
									</IconButton>
								</div>
								<div className={style.contentBlock}>{children}</div>
							</div>
						</div>
					</div>,
					rootElement!
				)}
		</>
	)
}
