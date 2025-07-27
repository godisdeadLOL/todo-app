import type { Color } from "@/types"
import style from "./style.module.scss"

import classNames from "classnames"
import type { HTMLAttributes, PropsWithChildren } from "react"

type BadgeProps = {
	className?: string
	color?: Color
} & PropsWithChildren &
	HTMLAttributes<HTMLDivElement>

export default function Badge({ color = "neutral", className, children, ...other }: BadgeProps) {
	return (
		<div className={classNames(style.badge, color, className)} {...other}>
			{children}
		</div>
	)
}
