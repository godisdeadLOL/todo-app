import style from "./style.module.scss"
import type { InputHTMLAttributes } from "react"

type CheckboxProps = {} & InputHTMLAttributes<HTMLInputElement>

export default function Checkbox({ ...other }: CheckboxProps) {
	return <input className={style.checkbox} type="checkbox" {...other} />
}
