import Field from "@/components/Field"
import style from "./style.module.scss"
import type { Tag } from "@/features/tags/types"
import EditableValue from "@/components/EditableValue"
import IconButton from "@/components/IconButton"
import { LuMinus, LuPlus, LuTrash } from "react-icons/lu"
import { useAppDispatch } from "@/app/hooks"
import { deleteTag, updateTag } from "@/features/tags/tagsSlice"
import { toggleTodoTag } from "@/features/todos/todosSlice"
import ToggleButton from "@/components/ToggleButton"
import ColorPicker from "@/components/ColorPicker"
import ConfirmDialog from "@/components/ConfirmDialog"
import { useCurrentTodo } from "@/features/todos/context/TodoContext"
import { useCurrentTodoGroup } from "@/features/todos/context/TodoGroupContext"
import GripHandle from "@/components/GripHandle"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

type EditableTagDisplayProps = {
	tagData: Tag
}

export default function EditableTagDisplay({ tagData }: EditableTagDisplayProps) {
	const groupData = useCurrentTodoGroup()
	const todoData = useCurrentTodo()
	const isAdded = todoData.tagIds.includes(tagData.id)

	const dispatch = useAppDispatch()

	const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id: tagData.id })
	const css = {
		transform: CSS.Translate.toString(transform),
		transition,
	}

	return (
		<div className={style.editableTagDisplay} data-selected={isAdded} ref={setNodeRef} style={css}>
			<GripHandle {...attributes} {...listeners} />

			<ColorPicker value={tagData.color} onChange={(value) => dispatch(updateTag({ ...tagData, color: value }))} />

			<EditableValue
				onValueUpdate={(value) => dispatch(updateTag({ ...tagData, content: value }))}
				value={tagData.content}
				required
				element={(value, onClick, onChange, onBlur) => <Field className={style.contentField} value={value} onClick={onClick} onChange={onChange} onBlur={onBlur} plainable />}
			/>

			<ToggleButton onClick={() => dispatch(toggleTodoTag({ groupId: groupData.id, todoId: todoData.id, tagId: tagData.id }))} toogled={isAdded} elementOn={<LuMinus />} elementOff={<LuPlus />} />

			<ConfirmDialog
				onConfirm={() => dispatch(deleteTag(tagData.id))}
				title="Удаление тега"
				message="Вы точно хотите удалить тег?"
				triggerElement={(onOpen) => (
					<IconButton onClick={onOpen}>
						<LuTrash />
					</IconButton>
				)}
			/>
		</div>
	)
}
