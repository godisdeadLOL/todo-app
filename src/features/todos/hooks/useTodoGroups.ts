import { useAppSelector } from "@/app/hooks";
import { useCurrentTodoGroup } from "@/features/todos/context/TodoGroupContext";

export function useTodoGroups() {
    const currentGroup = useCurrentTodoGroup()
    const groups = useAppSelector(state => state.todos)

    const currentIndex = groups.findIndex(entry => entry.id === currentGroup.id)

    return {
        previous: currentIndex > 0 ? groups[currentIndex - 1] : undefined,
        current: currentGroup,
        next: currentIndex < groups.length - 1 ? groups[currentIndex + 1] : undefined
    }
}