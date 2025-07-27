import type { Todo } from "@/features/todos/types"
import { createContext, useContext, type PropsWithChildren } from "react"

const TodoContext = createContext<Todo | undefined>(undefined)

type TodoContextProviderProps = {
    todoData: Todo
} & PropsWithChildren

export function TodoContextProvider({ children, todoData }: TodoContextProviderProps) {
    return <TodoContext.Provider value={ todoData }> { children } </TodoContext.Provider>
}

export function useCurrentTodo() {
    const value = useContext(TodoContext)!
    return value
}
