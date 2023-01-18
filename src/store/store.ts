import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit'
import { todoSlice } from './reducers/TodoSlice'
import { projectApi } from '../services/ProjectService'
import { authSlice } from './reducers/AuthSlice'

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    todo: todoSlice.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(projectApi.middleware),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
