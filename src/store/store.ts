import { configureStore } from '@reduxjs/toolkit'
import { todoSlice } from './reducers/TodoSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { projectApi } from '../services/ProjectService'
import { authSlice } from './reducers/AuthSlice'

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        todo: todoSlice.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(projectApi.middleware),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
