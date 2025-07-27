import Stack from "@/components/Stack"
import SortableTodoDisplay from "@/features/todos/components/SortableTodoDisplay"
import { TodoContextProvider } from "@/features/todos/context/TodoContext"
import { useCurrentTodoGroup } from "@/features/todos/context/TodoGroupContext"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

export default function TodoList() {
	const groupData = useCurrentTodoGroup()
	
	return (
		<SortableContext strategy={verticalListSortingStrategy} items={groupData.todos} id={groupData.id}>
			<Stack>
				{groupData.todos.map((todo) => (
					<TodoContextProvider key={todo.id} todoData={todo}>
						<SortableTodoDisplay />
					</TodoContextProvider>
				))}
			</Stack>
		</SortableContext>
	)
}
