import IconButton from "@/components/IconButton"
import style from "./style.module.scss"
import { LuChevronDown, LuChevronUp, LuPlus } from "react-icons/lu"

import { useAppDispatch } from "@/app/hooks"
import { addTodo } from "@/features/todos/todosSlice"
import { useEffect, useState } from "react"
import Expandable from "@/components/Expandable"
import ToggleButton from "@/components/ToggleButton"
import TodoList from "@/features/todos/components/TodoList"
import { useCurrentTodoGroup } from "@/features/todos/context/TodoGroupContext"
import { useDroppable } from "@dnd-kit/core"
import Badge from "@/components/Badge"

export default function TodoGroupDisplay() {
	const groupData = useCurrentTodoGroup()
	const dispatch = useAppDispatch()

	const [expanded, setExpanded] = useState(false)

	const { setNodeRef } = useDroppable({ id: groupData.id })

	useEffect(() => {
		setExpanded(groupData.todos.length !== 0)
	}, [groupData.todos.length])

	const isEmpty = groupData.todos.length === 0

	return (
		<div data-length-value={groupData.todos.length} className={style.todoGroupDisplay} ref={setNodeRef}>
			<div className={style.headerBlock}>
				<ToggleButton disabled={isEmpty} toogled={expanded} onClick={() => setExpanded((value) => !value)} elementOff={<LuChevronDown />} elementOn={<LuChevronUp />} />

				<h2>{groupData.title}</h2>

				<Badge className={style.counter} color={groupData.color}>
					{groupData.todos.length}
				</Badge>

				<IconButton onClick={handleAddTodo}>
					<LuPlus />
				</IconButton>
			</div>

			<Expandable expanded={expanded}>
				<TodoList />
			</Expandable>
		</div>
	)

	function handleAddTodo() {
		setExpanded(true)
		dispatch(addTodo(groupData.id))
	}
}
