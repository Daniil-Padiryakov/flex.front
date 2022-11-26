import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchTodos} from "./ActionCreators";
import {ITodo} from "../../domain/ITodo";

interface TodoSliceState {
    todos: ITodo[]
    isLoading: boolean
    error: string
    currentProjectId: number
}

const initialState: TodoSliceState = {
    todos: [],
    isLoading: false,
    error: '',
    currentProjectId: 1,
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        changeCurrentProjectId(state, action: PayloadAction<number>) {
            state.currentProjectId = action.payload;
        },
        changeTodoIsDone(state, action: PayloadAction<number>) {
            const todo = state.todos.find(todo => todo.id === action.payload)
            if (todo) {
                todo.is_done = !todo.is_done;
            }
        }
    },
    extraReducers: {
        [fetchTodos.fulfilled.type]: (state, action: PayloadAction<ITodo[]>) => {
            state.todos = action.payload;
            state.error = '';
            state.isLoading = false;
        },
        [fetchTodos.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchTodos.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default todoSlice.reducer;