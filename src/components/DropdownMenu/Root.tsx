import { type PropsWithChildren, useState } from "react"
import style from "./style.module.scss"

import IconButton from "@/components/IconButton"
import { LuEllipsisVertical } from "react-icons/lu"

import { DropdownMenuContextProvider } from "./Context"
import useClickAway from "@/hooks/useClickAway"

type MenuButtonProps = {} & PropsWithChildren

export default function Root({ children }: MenuButtonProps) {
	const [menuOpen, setMenuOpen] = useState(false)
	const clickAwayRef = useClickAway(() => setMenuOpen(false))

	return (
		<DropdownMenuContextProvider value={{ open: menuOpen, setOpen: setMenuOpen }}>
			<div className={style.dropdownMenu}>
				<IconButton onClick={() => setMenuOpen(true)}>
					<LuEllipsisVertical />
				</IconButton>
				{menuOpen && (
					<div ref={clickAwayRef} className={style.menu}>
						{children}
					</div>
				)}
			</div>
		</DropdownMenuContextProvider>
	)
}
