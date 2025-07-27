import { useAppSelector } from "@/app/hooks"
import { useCurrentTodo } from "@/features/todos/context/TodoContext"

export default function useCurrentTags() {
    const tagsData = useAppSelector((state) => state.tags)
    const tagIds = useCurrentTodo().tagIds

    return tagsData.filter(tag => tagIds.includes(tag.id))
}