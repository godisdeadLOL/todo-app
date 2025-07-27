import { LuMinus } from "react-icons/lu"
import style from "./style.module.scss"
import IconButton from "@/components/IconButton"
import type { TodoStep } from "@/features/todos/types"
import Checkbox from "@/components/Checkbox"
import { useAppDispatch } from "@/app/hooks"
import { deleteTodoStep, updateTodoStep } from "@/features/todos/todosSlice"
import Field from "@/components/Field"
import EditableValue from "@/components/EditableValue"
import classNames from "classnames"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import GripHandle from "@/components/GripHandle"
import { useCurrentTodo } from "@/features/todos/context/TodoContext"
import { useCurrentTodoGroup } from "@/features/todos/context/TodoGroupContext"

type TodoStepDisplay = {
	stepData: TodoStep
}
export default function TodoStepDisplay({ stepData }: TodoStepDisplay) {
	const groupData = useCurrentTodoGroup()
	const todoData = useCurrentTodo()

	const dispatch = useAppDispatch()

	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: stepData.id })
	const css = {
		transform: CSS.Translate.toString(transform),
		transition,
		zIndex: isDragging ? 100 : "auto",
	}

	return (
		<div ref={setNodeRef} className={style.todoStepDisplay} style={css}>
			<GripHandle {...attributes} {...listeners} />

			<Checkbox checked={stepData.checked} onChange={() => dispatch(updateTodoStep({ groupId: groupData.id, todoId: todoData.id, step: { ...stepData, checked: !stepData.checked } }))} />

			<EditableValue
				required
				onValueUpdate={(value) => dispatch(updateTodoStep({ groupId: groupData.id, todoId: todoData.id, step: { ...stepData, content: value } }))}
				value={stepData.content}
				element={(value, onClick, onChange, onBlur) => (
					<Field className={classNames(stepData.checked ? style.completed : "", style.contentField)} value={value} onClick={onClick} onChange={onChange} onBlur={onBlur} plainable small />
				)}
			/>

			<IconButton onClick={() => dispatch(deleteTodoStep({ groupId: groupData.id, todoId: todoData.id, stepId: stepData.id }))}>
				<LuMinus />
			</IconButton>
		</div>
	)
}
