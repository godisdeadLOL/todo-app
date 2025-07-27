import { useAppDispatch } from "@/app/hooks"
import Badge from "@/components/Badge"
import TextButton from "@/components/TextButton"
import type { Tag } from "@/features/tags/types"
import { useCurrentTodo } from "@/features/todos/context/TodoContext"
import { useCurrentTodoGroup } from "@/features/todos/context/TodoGroupContext"
import { toggleTodoTag } from "@/features/todos/todosSlice"
import { LuX } from "react-icons/lu"

type TagDisplayProps = {
	tagData: Tag
	deletable?: boolean
}

export default function TagDisplay({ tagData, deletable = false }: TagDisplayProps) {
	const groupData = useCurrentTodoGroup()
	const todoData = useCurrentTodo()

	const dispatch = useAppDispatch()

	return (
		<Badge color={tagData.color}>
			{tagData.content}
			{deletable && (
				<TextButton onClick={() => dispatch(toggleTodoTag({ groupId: groupData.id, todoId: todoData.id, tagId: tagData.id }))}>
					<LuX />
				</TextButton>
			)}
		</Badge>
	)
}
