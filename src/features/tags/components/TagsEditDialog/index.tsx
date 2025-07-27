import style from "./style.module.scss"
import { useState, type JSX } from "react"
import { LuPlus } from "react-icons/lu"
import Dialog from "@/components/Dialog"
import TagStack from "@/features/tags/components/TagStack"
import EditableTagDisplay from "@/features/tags/components/EditableTagDisplay"
import SearchInput from "@/components/SearchInput"
import Button from "@/components/Button"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { addTag, reorderTag } from "@/features/tags/tagsSlice"
import TagsEditListFallback from "./TagsEditListFallback"
import { normalizeString } from "@/utils"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { DndContext, type DragEndEvent } from "@dnd-kit/core"
import { restrictToVerticalAxis, restrictToParentElement } from "@dnd-kit/modifiers"
import Stack from "@/components/Stack"

const checkQuery = (value: string, query: string) => {
	return normalizeString(value).includes(normalizeString(query))
}

type DialogProps = {
	triggerElement?: (onOpen: () => void) => JSX.Element
}

export default function TagsEditDialog({ triggerElement }: DialogProps) {
	const dispatch = useAppDispatch()

	const [searchQuery, setSearchQuery] = useState("")
	const tagsData = useAppSelector((state) => state.tags.filter((entry) => !searchQuery || checkQuery(entry.content, searchQuery)))

	return (
		<Dialog triggerElement={triggerElement} title="Теги" className="wide">
			<TagStack mode="edit" tagsData={[]} />

			<div className={style.tagsBlock}>
				<SearchInput value={searchQuery} onClear={() => setSearchQuery("")} onChange={(e) => setSearchQuery(e.target.value)} />

				<DndContext modifiers={[restrictToVerticalAxis, restrictToParentElement]} onDragEnd={handleDragEnd}>
					<SortableContext strategy={verticalListSortingStrategy} items={tagsData}>
						<Stack className={style.tagsStack}>
							{tagsData.length === 0 && <TagsEditListFallback />}
							{tagsData.map((tag) => (
								<EditableTagDisplay key={tag.id} tagData={tag} />
							))}
						</Stack>
					</SortableContext>
				</DndContext>

				<Button className="small" onClick={() => dispatch(addTag(searchQuery))}>
					Добавить тег
					<LuPlus />
				</Button>
			</div>
		</Dialog>
	)

	function handleDragEnd(event: DragEndEvent) {
		const fromId = event.active?.id as string
		const toId = event.over?.id as string

		dispatch(reorderTag({ fromId, toId }))
	}
}
