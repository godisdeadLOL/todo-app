import style from "./style.module.scss"
import { LuTags } from "react-icons/lu"

export default function TagsEditListFallback() {
	return (
		<div className={style.tagsEditListFallback}>
			<LuTags />
			Нет тегов
		</div>
	)
}
