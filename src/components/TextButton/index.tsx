import type { ButtonHTMLAttributes, PropsWithChildren } from "react"
import style from "./style.module.scss"
import classNames from "classnames"

type TextButtonProps = {
	className?: string
} & ButtonHTMLAttributes<HTMLButtonElement> &
	PropsWithChildren

export default function TextButton({ className, children, ...other }: TextButtonProps) {
	return (
		<button className={classNames(className, style.textButton)} {...other}>
			{children}
		</button>
	)
}
