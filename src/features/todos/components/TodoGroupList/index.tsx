import style from "./style.module.scss"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import TodoDisplay from "@/features/todos/components/TodoDisplay"
import TodoGroupDisplay from "@/features/todos/components/TodoGroupDisplay"
import { TodoContextProvider } from "@/features/todos/context/TodoContext"
import { TodoGroupContextProvider } from "@/features/todos/context/TodoGroupContext"
import { reorderTodo } from "@/features/todos/todosSlice"
import type { Todo, TodoGroup } from "@/features/todos/types"
import { useStateWithRef } from "@/hooks/useStateWithRef"
import { DndContext, DragOverlay, pointerWithin, type DragEndEvent, type DragOverEvent, type DragStartEvent } from "@dnd-kit/core"

export default function TodoGroupList() {
	const groupsData = useAppSelector((state) => state.todos)
	const dispatch = useAppDispatch()

	const [draggedParams, setDraggedParams, draggedParamsRef] = useStateWithRef<{ todo: Todo; group: TodoGroup } | null>(null)

	return (
		<DndContext collisionDetection={pointerWithin} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
			<div className={style.todoGroupList}>
				{groupsData.map((group) => (
					<TodoGroupContextProvider groupData={group} key={group.id}>
						<TodoGroupDisplay />
					</TodoGroupContextProvider>
				))}
			</div>
			<DragOverlay>
				{draggedParams && (
					<TodoGroupContextProvider groupData={draggedParams.group}>
						<TodoContextProvider todoData={draggedParams.todo}>
							<TodoDisplay />
						</TodoContextProvider>
					</TodoGroupContextProvider>
				)}
			</DragOverlay>
		</DndContext>
	)

	function handleReorder(event: DragOverEvent | DragEndEvent, mode: "over" | "end") {
		if (!draggedParamsRef.current) return

		const fromGroupId: string = draggedParams?.group?.id!
		const toGroupId: string | undefined = event.over?.data.current?.sortable?.containerId ?? event.over?.id

		if (!toGroupId) return

		const fromTodoId = draggedParams?.todo?.id!
		const toTodoId = event.over?.data.current ? (event.over?.id as string) : undefined

		if (fromGroupId !== toGroupId || (mode === "end" && toTodoId && fromTodoId !== toTodoId)) {
			console.log(toGroupId, fromTodoId, toTodoId)

			dispatch(reorderTodo({ fromGroupId, fromTodoId, toGroupId, toTodoId }))

			if (mode === "over") setDraggedParams({ todo: draggedParamsRef.current.todo, group: groupsData.find((entry) => entry.id === toGroupId)! })
			else setDraggedParams(null)
		}
	}

	function handleDragStart(event: DragStartEvent) {
		const groupId = event.active.data.current?.sortable.containerId as string
		const todoId = event.active.id as string

		const group = groupsData.find((entry) => entry.id === groupId)!
		const todo = group.todos.find((entry) => entry.id === todoId)!

		setDraggedParams({ todo, group })
	}

	function handleDragOver(event: DragOverEvent) {
		handleReorder(event, "over")
	}

	function handleDragEnd(event: DragEndEvent) {
		// setDraggedParams(null)
		handleReorder(event, "end")
	}
}
