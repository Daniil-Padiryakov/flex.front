import {AxiosResponse} from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import $api from "../../../api";
import {IAuth} from "../../../domain/IAuth";

export const login = createAsyncThunk(
    'auth/login',
    async ({email, password}: any, thunkAPI): Promise<AxiosResponse<IAuth>> => {
        return $api.post<IAuth>('auth/signin', {email, password})
    }
)

export const registration = createAsyncThunk(
    'auth/registration',
    async ({email, password}: any, thunkAPI): Promise<AxiosResponse<IAuth>> => {
        return $api.post<IAuth>('auth/signin', {email, password})
    }
)

// export const logout = createAsyncThunk(
//     'auth/logout',
//     async ({email, password}: any, thunkAPI): Promise<AxiosResponse<IAuth>> => {
//         return $api.post<IAuth>('auth/signin', {email, password})
//     }
// )