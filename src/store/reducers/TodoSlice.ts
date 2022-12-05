import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {changeTodoProject, createTodo, deleteTodo, fetchTodos} from "./ActionCreators";
import {ITodo} from "../../domain/ITodo";
import {getTreeIds, tree} from "../../utils/tree";

interface TodoSliceState {
    todos: ITodo[]
    todosOfCurrentProject: ITodo[]
    isLoading: boolean
    error: string
    currentProjectId: number
    currentTodo: ITodo | null
    menu: boolean
}

const initialState: TodoSliceState = {
    todos: [],
    todosOfCurrentProject: [],
    isLoading: false,
    error: '',
    currentProjectId: 1,
    currentTodo: null,
    menu: false,
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        changeCurrentProjectId(state, action: PayloadAction<number>) {
            state.currentProjectId = action.payload;
            const todos = state.todos.filter(todo => todo.project_id === state.currentProjectId);

            state.todosOfCurrentProject = tree(todos);
        },
        changeTodoIsDone(state, action: PayloadAction<number>) {
            const todo = state.todos.find(todo => todo.id === action.payload)
            if (todo) {
                todo.is_done = !todo.is_done;
            }
        },
        changeCurrentTodo(state, action: PayloadAction<ITodo>) {
            state.currentTodo = action.payload;
        },
        changeMenuVisible(state, action: PayloadAction<boolean>) {
            state.menu = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action: PayloadAction<ITodo[]>) => {
            state.todos = action.payload;
            const todos = state.todos.filter(todo => todo.project_id === state.currentProjectId);

            state.todosOfCurrentProject = tree(todos);
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
            state.todos.push(payload);
            const todos = state.todos.filter(todo => todo.project_id === state.currentProjectId);

            state.todosOfCurrentProject = tree(todos);
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
            console.log(payload)
            state.todos = state.todos.filter(todo => !payload.id.includes(todo.id));
            const todos = state.todos.filter(todo => todo.project_id === state.currentProjectId);
            
            state.todosOfCurrentProject = tree(todos);
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
        builder.addCase(changeTodoProject.fulfilled, (state, {payload}) => {
            state.todos = state.todos.map(todo => {
                if (todo.id === payload.id) {
                    return {...todo, project_id: payload.projectId};
                }
                return todo;
            })
            const todos = state.todos.filter(todo => todo.project_id === state.currentProjectId);

            state.todosOfCurrentProject = tree(todos);
            state.error = '';
            state.isLoading = false;
        })
        builder.addCase(changeTodoProject.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(changeTodoProject.rejected, (state, action) => {
            state.isLoading = false;
            if (action.payload) {
                // @ts-ignore
                state.error = action.payload;
            }
        })
    }
})

export default todoSlice.reducer;