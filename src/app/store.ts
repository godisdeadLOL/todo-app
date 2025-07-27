import tagsReducer from "@/features/tags/tagsSlice";
import todosReducer from "@/features/todos/todosSlice";
import { loadData, saveData } from "@/utils/localStorage";
import defaultState from "./defaultState.json"

import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    todos: todosReducer,
    tags: tagsReducer
})

export type RootState = ReturnType<typeof rootReducer>


export const store = configureStore({
    reducer: rootReducer,
    preloadedState: loadData("redux") as RootState ?? defaultState
})

store.subscribe(() => {
    saveData("redux", store.getState())
})


export default store
export type AppDispatch = typeof store.dispatch