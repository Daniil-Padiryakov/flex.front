import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {changeTodoProject, createTodo, deleteTodo, fetchTodos} from "./thunks/todo";
import {ITodo} from "../../domain/ITodo";
import {getTreeIds, tree} from "../../utils/tree";
import {IUser} from "../../domain/IUser";
import {checkAuth, login, registration} from "./thunks/auth";
import {IAuth} from "../../domain/IAuth";

interface TodoSliceState {
    user: IUser | null
    isAuth: boolean
    isLoading: boolean
    error: string
}

export interface LoginPayload {
    username: string
    password: string
}

const initialState: TodoSliceState = {
    user: null,
    isAuth: false,
    isLoading: false,
    error: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction) {
            
        },
        // changeTodoIsDone(state, action: PayloadAction<number>) {
        //     const todo = state.todos.find(todo => todo.id === action.payload)
        //     if (todo) {
        //         todo.is_done = !todo.is_done;
        //     }
        // },
        // changeCurrentTodo(state, action: PayloadAction<ITodo>) {
        //     state.currentTodo = action.payload;
        // },
        // changeMenuVisible(state, action: PayloadAction<boolean>) {
        //     state.menu = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, {payload}) => {
            localStorage.setItem('token', payload.tokens.accessToken)
            state.user = payload.user;
            state.isAuth = true;
            
            state.error = '';
            state.isLoading = false;
        })
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            if (action.payload) {
                // @ts-ignore
                state.error = action.payload;
            }
        })

        builder.addCase(registration.fulfilled, (state, {payload}) => {
            localStorage.setItem('token', payload.tokens.accessToken)
            state.user = payload.user;
            state.isAuth = true;

            state.error = '';
            state.isLoading = false;
        })
        builder.addCase(registration.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(registration.rejected, (state, action) => {
            state.isLoading = false;
            if (action.payload) {
                // @ts-ignore
                state.error = action.payload;
            }
        })

        builder.addCase(checkAuth.fulfilled, (state, {payload}) => {
            console.log(payload)
            localStorage.setItem('token', payload.tokens.accessToken)
            state.user = payload.user;
            state.isAuth = true;

            state.error = '';
            state.isLoading = false;
        })
        builder.addCase(checkAuth.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(checkAuth.rejected, (state, action) => {
            state.isLoading = false;
            if (action.payload) {
                // @ts-ignore
                state.error = action.payload;
            }
        })
    }
})

export default authSlice.reducer;