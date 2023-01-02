import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../domain/IUser'
import { checkAuth, login, registration } from './thunks/auth'

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

export interface SignupPayload {
    username: string
    email: string
    password: string
}

const initialState: TodoSliceState = {
    user: null,
    isAuth: false,
    isLoading: false,
    error: '',
}

// todo refactor
const auth = (state: any, payload: any) => {
    console.log(payload)
    localStorage.setItem('token', payload.tokens.accessToken)
    state.user = payload.user
    state.isAuth = true

    state.error = ''
    state.isLoading = false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, { payload }) => {
            auth(state, payload)
        })
        builder.addCase(login.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false
            // if (action.payload) {
            //     state.error = action.payload
            // }
        })

        builder.addCase(registration.fulfilled, (state, { payload }) => {
            auth(state, payload)
        })
        builder.addCase(registration.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(registration.rejected, (state, action) => {
            state.isLoading = false
            // if (action.payload) {
            //     state.error = action.payload
            // }
        })

        builder.addCase(checkAuth.fulfilled, (state, { payload }) => {
            auth(state, payload)
        })
        builder.addCase(checkAuth.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(checkAuth.rejected, (state, action) => {
            state.isLoading = false
            // if (action.payload) {
            //     state.error = action.payload
            // }
        })
    },
})

export default authSlice.reducer
