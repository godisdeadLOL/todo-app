import { colors, type Color } from "@/types"
import style from "./style.module.scss"
import ColorItem from "@/components/ColorPicker/ColorItem"
import { useState } from "react"
import useClickAway from "@/hooks/useClickAway"

type ColorPickerProps = {
	value: Color
	onChange: (value: Color) => void
}

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
	const [menuOpen, setMenuOpen] = useState(false)
	const clickAwayRef = useClickAway(() => setMenuOpen(false))

	const onSelect = (color: Color) => {
		onChange(color)
		setMenuOpen(false)
	}

	return (
		<div className={style.colorPicker}>
			<ColorItem color={value} onClick={() => setMenuOpen(true)} />

			{menuOpen && (
				<div ref={clickAwayRef} className={style.menu}>
					{colors.map((color) => (
						<ColorItem data-selected={color === value} onClick={() => onSelect(color)} color={color} key={color} />
					))}
				</div>
			)}
		</div>
	)
}
