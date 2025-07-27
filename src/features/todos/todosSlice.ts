import { nanoid } from "nanoid"
import type { Todo, TodoGroup, TodoStep } from "./types"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

const initialState: TodoGroup[] = [
    {
        id: "todo",
        title: "Сделать",
        todos: [],
        color: "blue"
    },
    {
        id: "progress",
        title: "В процессе",
        todos: [],
        color: "yellow"
    },
    {
        id: "completed",
        title: "Завершены",
        todos: [],
        color: "green"
    }
]

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        // todos
        addTodo: {
            reducer(state, action: PayloadAction<{ groupId: string, todo: Todo }>) {
                const { groupId, todo } = action.payload

                const group = state.find(entry => entry.id === groupId)!

                group.todos.push(todo)
            },
            prepare(groupId: string) {
                return {
                    payload: {
                        groupId,
                        todo: {
                            id: nanoid(),
                            title: "Новая задача",
                            content: "",
                            createdAt: new Date().toISOString(),
                            steps: [],
                            tagIds: []
                        }
                    },
                }
            },
        },
        updateTodo(state, action: PayloadAction<{ groupId: string, todo: Todo }>) {
            const { groupId, todo } = action.payload

            const group = state.find(entry => entry.id === groupId)!

            group.todos = group.todos.map(entry => entry.id === todo.id ? { ...entry, ...todo } : entry)
        },
        deleteTodo(state, action: PayloadAction<{ groupId: string, todoId: string }>) {
            const { groupId, todoId } = action.payload

            const group = state.find(entry => entry.id === groupId)!

            group.todos = group.todos.filter(entry => entry.id !== todoId)
        },

        reorderTodo(state, action: PayloadAction<{ fromGroupId: string, fromTodoId: string, toGroupId: string, toTodoId?: string, mode?: "append" | "prepend" }>) {
            const { fromGroupId, fromTodoId, toGroupId, toTodoId, mode } = action.payload

            const fromGroup = state.find(entry => entry.id === fromGroupId)!
            const toGroup = state.find(entry => entry.id === toGroupId)!

            const fromIndex = fromGroup.todos.findIndex(entry => entry.id === fromTodoId)
            const toIndex = toTodoId ? toGroup.todos.findIndex(entry => entry.id === toTodoId) : (mode === "prepend" ? 0 : toGroup.todos.length)

            const [todo] = fromGroup.todos.splice(fromIndex, 1)
            toGroup.todos.splice(toIndex, 0, todo)
        },

        // steps
        addTodoStep: {
            reducer(state, action: PayloadAction<{ groupId: string, todoId: string, step: TodoStep }>) {
                const { groupId, todoId, step } = action.payload

                const group = state.find(entry => entry.id === groupId)!
                const todo = group.todos.find(entry => entry.id === todoId)!

                todo.steps.push(step)
            },
            prepare(groupId: string, todoId: string) {
                return {
                    payload: {
                        groupId,
                        todoId,
                        step: {
                            id: nanoid(),
                            content: "Новый шаг",
                            checked: false
                        }
                    },
                }
            },
        },
        updateTodoStep(state, action: PayloadAction<{ groupId: string, todoId: string, step: TodoStep }>) {
            const { groupId, todoId, step } = action.payload

            const group = state.find(entry => entry.id === groupId)!
            const todo = group.todos.find(entry => entry.id === todoId)!

            todo.steps = todo.steps.map(entry => entry.id === step.id ? { ...entry, ...step } : entry)
        },

        deleteTodoStep(state, action: PayloadAction<{ groupId: string, todoId: string, stepId: string }>) {
            const { groupId, todoId, stepId } = action.payload

            const group = state.find(entry => entry.id === groupId)!
            const todo = group.todos.find(entry => entry.id === todoId)!

            todo.steps = todo.steps.filter(entry => entry.id !== stepId)
        },

        reorderTodoStep(state, action: PayloadAction<{ groupId: string, todoId: string, fromId: string, toId: string }>) {
            const { groupId, todoId, fromId, toId } = action.payload

            const group = state.find(entry => entry.id === groupId)!
            const todo = group.todos.find(entry => entry.id === todoId)!

            const fromIndex = todo.steps.findIndex(entry => entry.id === fromId)
            const toIndex = todo.steps.findIndex(entry => entry.id === toId)

            const [step] = todo.steps.splice(fromIndex, 1)
            todo.steps.splice(toIndex, 0, step)
        },

        // tags
        toggleTodoTag(state, action: PayloadAction<{ groupId: string, todoId: string, tagId: string }>) {
            const { groupId, todoId, tagId } = action.payload

            const group = state.find(entry => entry.id === groupId)!
            const todo = group.todos.find(entry => entry.id === todoId)!

            const isAdded = !!todo.tagIds.includes(tagId)

            if (isAdded) todo.tagIds = todo.tagIds.filter(entry => entry !== tagId)
            else todo.tagIds.push(tagId)
        }
    },
})

export const { addTodo, updateTodo, deleteTodo, reorderTodo, addTodoStep, updateTodoStep, deleteTodoStep, reorderTodoStep, toggleTodoTag } = todosSlice.actions

export default todosSlice.reducer
