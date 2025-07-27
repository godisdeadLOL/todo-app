import { useDropdownMenuContext } from "./Context"
import style from "./style.module.scss"
import type { ButtonHTMLAttributes, MouseEventHandler, PropsWithChildren } from "react"

type ButtonProps = {
	onClick?: MouseEventHandler<HTMLButtonElement>
} & ButtonHTMLAttributes<HTMLButtonElement> &
	PropsWithChildren

export default function Action({ onClick, children, ...other }: ButtonProps) {
	const { setOpen } = useDropdownMenuContext()

	const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
		setOpen(false)
		onClick?.(e)
	}

	return (
		<button onClick={handleClick} className={style.action} {...other}>
			{children}
		</button>
	)
}
