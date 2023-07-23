import { createAsyncThunk } from '@reduxjs/toolkit'
import { ITodo } from '../../../domain/ITodo'
import $api from '../../../api'

export const fetchTodos = createAsyncThunk(
    'todo/fetchAll',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await $api.get<ITodo[]>('http://localhost:3050/api/todo')

            return response.data
        } catch (e) {
            return rejectWithValue('Cannot get list of todos')
        }
    },
)

export const createTodo = createAsyncThunk('todo/createTodo', async (newTodo: ITodo, thunkAPI) => {
    try {
        const response = await $api.post<ITodo>('http://localhost:5000/todo', newTodo)
        return response.data
    } catch (e) {
        return thunkAPI.rejectWithValue('Cannot create todo')
    }
})

export const deleteTodo = createAsyncThunk('todo/deleteTodo', async (payload: any, thunkAPI) => {
    const { id, idForDelete } = payload
    const params = idForDelete.join(',')
    try {
        console.log('asdasd')
        const response = await $api.delete<any>(`http://localhost:5000/todo/${params}`)
        const result = response.data

        result.id = idForDelete
        return result
    } catch (e) {
        return thunkAPI.rejectWithValue('Cannot delete todo')
    }
})

export const changeTodoComplete = createAsyncThunk(
    'todo/complete',
    async (payload: any, thunkAPI) => {
        const { id, is_completed } = payload
        try {
            const response = await $api.patch<any>(`http://localhost:5000/todo/complete/${id}`, {
                is_completed: is_completed,
            })
            return payload
        } catch (e) {
            return thunkAPI.rejectWithValue('Cannot change complete todo')
        }
    },
)

export const changeTodoProject = createAsyncThunk(
    'todo/changeProject',
    async (payload: any, thunkAPI) => {
        const { id, projectId } = payload
        try {
            const response = await $api.patch<any>(
                `http://localhost:5000/todo/change-project/${id}`,
                {
                    project_id: projectId,
                },
            )
            return payload
        } catch (e) {
            return thunkAPI.rejectWithValue('Cannot delete todo')
        }
    },
)
