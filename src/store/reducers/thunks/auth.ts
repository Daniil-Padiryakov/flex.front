import { createAsyncThunk } from '@reduxjs/toolkit'
import $api from '../../../api'
import { IAuth } from '../../../domain/IAuth'
import { LoginPayload, SignupPayload } from '../AuthSlice'
import axios from 'axios'

export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }: LoginPayload, { rejectWithValue }) => {
        try {
            const response = await $api.post<IAuth>('auth/signin', { username, password })

            return response.data
        } catch (e) {
            return rejectWithValue('Cannot get list of todos')
        }
    },
)

export const registration = createAsyncThunk(
    'auth/registration',
    async ({ username, email, password }: SignupPayload, { rejectWithValue }) => {
        try {
            const response = await $api.post<IAuth>('auth/signup', { username, email, password })

            return response.data
        } catch (e) {
            return rejectWithValue('Cannot get list of todos')
        }
    },
)

// export const logout = createAsyncThunk(
//     'auth/logout',
//     async ({email, password}: any, thunkAPI): Promise<AxiosResponse<IAuth>> => {
//         return $api.post<IAuth>('auth/signin', {email, password})
//     }
// )

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get<IAuth>('http://localhost:5010/auth/refresh', {
            withCredentials: true,
        })

        return response.data
    } catch (e) {
        return rejectWithValue('Cannot get list of todos')
    }
})
