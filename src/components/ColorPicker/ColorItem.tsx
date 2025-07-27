import style from "./style.module.scss"

import type { Color } from "@/types"
import classNames from "classnames"
import type { ButtonHTMLAttributes, PropsWithChildren } from "react"

type ColorItemProps = {
	color: Color
	className?: string
} & PropsWithChildren &
	ButtonHTMLAttributes<HTMLButtonElement>

export default function ColorItem({ color, className, ...other }: ColorItemProps) {
	return <button className={classNames(style.colorItem, className, color)} {...other} />
}
