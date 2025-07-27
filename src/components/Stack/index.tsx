import style from "./style.module.scss"

import classNames from "classnames"
import { forwardRef, type HTMLAttributes, type PropsWithChildren } from "react"

type StackProps = {
	variant?: "vertical" | "horizontal"
	className?: string
} & PropsWithChildren &
	HTMLAttributes<HTMLDivElement>

const Stack = forwardRef<HTMLDivElement, StackProps>(({ variant = "vertical", className, children, ...other }, ref) => {
	return (
		<div ref={ref} className={classNames(style.stack, variant, className)} {...other}>
			{children}
		</div>
	)
})

export default Stack
