import type { Todo, TodoGroup } from "@/features/todos/types"
import { createContext, useContext, type PropsWithChildren } from "react"

const TodoGroupContext = createContext<TodoGroup | undefined>(undefined)

type TodoGroupContextProviderProps = {
	groupData: TodoGroup
} & PropsWithChildren

export function TodoGroupContextProvider({ children, groupData }: TodoGroupContextProviderProps) {
	return <TodoGroupContext.Provider value={groupData}> {children} </TodoGroupContext.Provider>
}

export function useCurrentTodoGroup() {
	const value = useContext(TodoGroupContext)!
	return value
}
