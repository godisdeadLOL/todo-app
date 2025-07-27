import style from "./style.module.scss"

import { forwardRef, type HTMLAttributes } from "react"
import { LuGrip, LuGripVertical } from "react-icons/lu"

type GripHandleProps = {
	variant?: "vertical" | "all"
} & HTMLAttributes<HTMLDivElement>

const GripHandle = forwardRef<HTMLDivElement, GripHandleProps>(({ variant = "vertical", ...other }, ref) => {
	return (
		<div className={style.gripHandle} ref={ref} {...other}>
			{variant === "vertical" && <LuGripVertical />}
			{variant === "all" && <LuGrip />}
		</div>
	)
})

export default GripHandle
