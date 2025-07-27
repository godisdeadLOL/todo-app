import type { Tag } from "@/features/tags/types";
import { colors } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

const initialState: Tag[] = []

export const tagsSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {
        addTag: {
            reducer(state, action: PayloadAction<Tag>) {
                const tag = action.payload
                state.push({ ...tag, content: !tag.content ? `Новый тег ${state.length + 1}` : tag.content })
            },
            prepare(content: string | undefined = undefined) {
                return {
                    payload: {
                        id: nanoid(),
                        content: content ?? "",
                        color: colors[Math.floor(Math.random() * colors.length)]
                    },
                }
            },
        },

        updateTag(state, action: PayloadAction<Tag>) {
            const tag = action.payload
            return state.map(entry => entry.id === tag.id ? { ...entry, ...tag } : entry)
        },

        deleteTag(state, action: PayloadAction<string>) {
            const tagId = action.payload
            return state.filter(entry => entry.id !== tagId)
        },

        reorderTag(state, action: PayloadAction<{ fromId: string, toId: string }>) {
            const { fromId, toId } = action.payload

            const fromIndex = state.findIndex(entry => entry.id === fromId)
            const toIndex = state.findIndex(entry => entry.id === toId)

            const [tag] = state.splice(fromIndex, 1)
            state.splice(toIndex, 0, tag)
        }
    }
})

export const { addTag, deleteTag, updateTag, reorderTag } = tagsSlice.actions
export default tagsSlice.reducer