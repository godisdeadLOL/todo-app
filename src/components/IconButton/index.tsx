import type { ButtonHTMLAttributes, PropsWithChildren } from "react"
import style from "./style.module.scss"
import classNames from "classnames"

type IconButtonProps = {
	className?: string
} & ButtonHTMLAttributes<HTMLButtonElement> &
	PropsWithChildren

export default function IconButton({ className, children, ...other }: IconButtonProps) {
	return (
		<button className={classNames(className, style.iconButton)} {...other}>
			{children}
		</button>
	)
}
