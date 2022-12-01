import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createTodo, deleteTodo, fetchTodos} from "./ActionCreators";
import {ITodo} from "../../domain/ITodo";
import {getTree} from "../../utils/getTree";

interface TodoSliceState {
    todos: ITodo[]
    todosOfCurrentProject: ITodo[]
    isLoading: boolean
    error: string
    currentProjectId: number
}

const initialState: TodoSliceState = {
    todos: [],
    todosOfCurrentProject: [],
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
            const todos = state.todos.filter(todo => todo.project_id === state.currentProjectId);

            state.todosOfCurrentProject = getTree(todos);
        },
        changeTodoIsDone(state, action: PayloadAction<number>) {
            const todo = state.todos.find(todo => todo.id === action.payload)
            if (todo) {
                todo.is_done = !todo.is_done;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action: PayloadAction<ITodo[]>) => {
            state.todos = action.payload;
            const todos = state.todos.filter(todo => todo.project_id === state.currentProjectId);

            state.todosOfCurrentProject = getTree(todos);
            state.error = '';
            state.isLoading = false;
        })
        builder.addCase(fetchTodos.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.isLoading = false;
            if (action.payload) {
                // @ts-ignore
                state.error = action.payload;
            }
        })
        builder.addCase(createTodo.fulfilled, (state, {payload}) => {
            console.log(payload)
            state.todos.push(payload);
            state.error = '';
            state.isLoading = false;
        })
        builder.addCase(createTodo.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(createTodo.rejected, (state, action) => {
            state.isLoading = false;
            if (action.payload) {
                // @ts-ignore
                state.error = action.payload;
            }
        })
        builder.addCase(deleteTodo.fulfilled, (state, {payload}) => {
            state.todos = state.todos.filter(todo => todo.id !== payload[0].id);
            state.error = '';
            state.isLoading = false;
        })
        builder.addCase(deleteTodo.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(deleteTodo.rejected, (state, action) => {
            state.isLoading = false;
            if (action.payload) {
                // @ts-ignore
                state.error = action.payload;
            }
        })
    }
})
export const todosTree = (todos: ITodo[]): ITodo[] => getTree(todos);

export default todoSlice.reducer;