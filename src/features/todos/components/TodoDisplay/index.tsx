import style from "./style.module.scss"
import EditableValue from "@/components/EditableValue"
import { LuArrowLeft, LuArrowRight, LuChevronDown, LuChevronUp, LuPlus, LuTrash } from "react-icons/lu"
import { useAppDispatch } from "@/app/hooks"
import { addTodoStep, deleteTodo, reorderTodo, updateTodo } from "@/features/todos/todosSlice"
import Field from "@/components/Field"
import Expandable from "@/components/Expandable"
import { forwardRef, useEffect, useState, type HTMLAttributes } from "react"
import ToggleButton from "@/components/ToggleButton"
import TagStack from "@/features/tags/components/TagStack"
import Button from "@/components/Button"
import useExclusiveState from "@/hooks/useExclusiveState"
import DropdownMenu from "@/components/DropdownMenu"
import ConfirmDialog from "@/components/ConfirmDialog"
import TodoStepList from "@/features/todos/components/TodoStepList"
import { useCurrentTodo } from "@/features/todos/context/TodoContext"
import { useCurrentTodoGroup } from "@/features/todos/context/TodoGroupContext"
import GripHandle from "@/components/GripHandle"
import { useTodoGroups } from "@/features/todos/hooks/useTodoGroups"

type TodoDisplayProps = {
	gripHandleProps?: object
	isDragging?: boolean
} & HTMLAttributes<HTMLDivElement>

const TodoDisplay = forwardRef<HTMLElement, TodoDisplayProps>(({ gripHandleProps, isDragging = false, ...other }, ref) => {
	const { previous: previousGroupData, current: groupData, next: nextGroupData } = useTodoGroups()
	const todoData = useCurrentTodo()

	const dispatch = useAppDispatch()

	const [detailsExpanded, setDetailsExpanded] = useExclusiveState("todo-expanded")
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

	useEffect(() => {
		if (isDragging) setDetailsExpanded(false)
	}, [isDragging])

	return (
		<>
			<ConfirmDialog
				onConfirm={() => dispatch(deleteTodo({ groupId: groupData.id, todoId: todoData.id }))}
				open={deleteDialogOpen}
				setOpen={setDeleteDialogOpen}
				title="Удаление задачи"
				message="Вы точно хотите удалить задачу?"
			/>

			<article className={style.card} ref={ref} {...other} data-dragged={isDragging}>
				<div className={style.headerBlock}>
					<GripHandle variant="all" {...gripHandleProps} />

					<EditableValue
						onValueUpdate={(value) => dispatch(updateTodo({ groupId: groupData.id, todo: { ...todoData, title: value } }))}
						value={todoData.title}
						required
						element={(value, onClick, onChange, onBlur) => <Field className={style.titleField} value={value} onClick={onClick} onChange={onChange} onBlur={onBlur} label="Заголовок" plainable />}
					/>

					<ToggleButton toogled={detailsExpanded} onClick={() => setDetailsExpanded((value) => !value)} elementOff={<LuChevronDown />} elementOn={<LuChevronUp />} />

					<DropdownMenu.Root>
						{previousGroupData && (
							<DropdownMenu.Action onClick={handlePushPrevious}>
								{previousGroupData.title}
								<LuArrowLeft />
							</DropdownMenu.Action>
						)}

						{nextGroupData && (
							<DropdownMenu.Action onClick={handlePushNext}>
								{nextGroupData?.title}
								<LuArrowRight />
							</DropdownMenu.Action>
						)}

						<DropdownMenu.Action onClick={() => setDeleteDialogOpen(true)}>
							Удалить
							<LuTrash />
						</DropdownMenu.Action>
					</DropdownMenu.Root>
				</div>

				<Expandable expanded={detailsExpanded}>
					<div className={style.detailsBlock}>
						<EditableValue
							onValueUpdate={(value) => dispatch(updateTodo({ groupId: groupData.id, todo: { ...todoData, content: value } }))}
							value={todoData.content}
							element={(value, onClick, onChange, onBlur) => (
								<Field value={value} onClick={onClick} onChange={onChange} onBlur={onBlur} label="Описание" fallback="Нет описания" plainable allowMultiline />
							)}
						/>

						<div className={style.todoStepsBlock}>
							<TodoStepList />

							<Button className={"small"} onClick={() => dispatch(addTodoStep(groupData.id, todoData.id))}>
								Добавить шаг
								<LuPlus />
							</Button>
						</div>
					</div>
				</Expandable>

				<TagStack mode="show" className={style.tagsBlock} tagsData={[]} />
			</article>
		</>
	)

	function handlePushNext() {
		dispatch(reorderTodo({ fromGroupId: groupData.id, toGroupId: nextGroupData!.id, fromTodoId: todoData.id, mode: "prepend" }))
	}

	function handlePushPrevious() {
		dispatch(reorderTodo({ fromGroupId: groupData.id, toGroupId: previousGroupData!.id, fromTodoId: todoData.id, mode: "prepend" }))
	}
})

export default TodoDisplay
