import TodoDisplay from "@/features/todos/components/TodoDisplay"
import { useCurrentTodo } from "@/features/todos/context/TodoContext"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export default function SortableTodoDisplay() {
	const todoData = useCurrentTodo()

	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: todoData.id })
	const style = {
		transform: CSS.Translate.toString(transform),
		transition,
	}

	return <TodoDisplay ref={setNodeRef} style={style} isDragging={isDragging} gripHandleProps={{ ...attributes, ...listeners }} />
}
