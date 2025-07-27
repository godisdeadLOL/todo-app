import type { Tag } from "@/features/tags/types"
import type { Color } from "@/types"

export type TodoStep = {
    id: string

    content: string
    checked: boolean
}

export type Todo = {
    id: string

    title: string
    content: string

    steps: TodoStep[]
    tagIds: string[]

    createdAt: string
}

export type TodoGroup = {
    id: string
    title: string
    color: Color

    todos: Todo[]
}