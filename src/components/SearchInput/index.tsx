import classNames from "classnames"
import style from "./style.module.scss"
import { useRef, type InputHTMLAttributes } from "react"
import { LuSearch, LuX } from "react-icons/lu"
import TextButton from "@/components/TextButton"

type SearchInputProps = {
	value?: string
	className?: string
	onClear: () => void
} & InputHTMLAttributes<HTMLInputElement>

export default function SearchInput({ className, onClear, value, ...other }: SearchInputProps) {
	return (
		<div className={classNames(className, style.searchInputWrapper)}>
			<input value={value} className={style.searchInput} placeholder="Поиск..." {...other} />
			<div className={style.icon}>
				<LuSearch />
			</div>
			{value && (
				<TextButton onClick={onClear} className={style.button}>
					<LuX />
				</TextButton>
			)}
		</div>
	)
}
