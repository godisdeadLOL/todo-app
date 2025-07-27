import { useAppDispatch, useAppSelector } from "@/app/hooks"
import TodoStepDisplay from "@/features/todos/components/TodoStepDisplay"

import { DndContext, type DragEndEvent } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { reorderTodoStep } from "@/features/todos/todosSlice"

import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers"
import classNames from "classnames"
import { useCurrentTodo } from "@/features/todos/context/TodoContext"
import { useCurrentTodoGroup } from "@/features/todos/context/TodoGroupContext"
import Stack from "@/components/Stack"

type TodoStepListProps = {
	className?: string
}

export default function TodoStepList({ className }: TodoStepListProps) {
	const groupData = useCurrentTodoGroup()
	const todoData = useCurrentTodo()
	const stepsData = todoData.steps

	const dispatch = useAppDispatch()

	const handleDragEnd = (event: DragEndEvent) => {
		const fromId = event.active?.id as string
		const toId = event.over?.id as string

		dispatch(reorderTodoStep({ groupId: groupData.id, todoId: todoData.id, fromId, toId }))
	}

	return (
		<DndContext onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
			<SortableContext items={stepsData} strategy={verticalListSortingStrategy} id={todoData.id}>
				<Stack className={classNames(className)}>
					{stepsData.map((step) => (
						<TodoStepDisplay key={step.id} stepData={step} />
					))}
				</Stack>
			</SortableContext>
		</DndContext>
	)
}
