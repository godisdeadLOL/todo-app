import type { ButtonHTMLAttributes, PropsWithChildren } from "react"
import style from "./style.module.scss"
import classNames from "classnames"

type ButtonProps = {
	className?: string
} & ButtonHTMLAttributes<HTMLButtonElement> &
	PropsWithChildren

export default function Button({ className, children, ...other }: ButtonProps) {
	return (
		<button className={classNames(style.button, className)} {...other}>
			{children}
		</button>
	)
}
